import { call, put, select, takeLatest } from 'redux-saga/effects';
import { searchSongs } from '@services/musicApi';
import { searchActionCreators, searchActionTypes } from './reducer';
import { selectSearchTerm, selectSearchOffset } from './selectors';
import { getStoredCountry } from '@app/utils/geolocation';

const SEARCH_LIMIT = 20;
const DEFAULT_COUNTRY = 'US';
const DEFAULT_ERROR = 'Search failed';

// --- parseSearchResponse helpers ---

const extractResults = (data) => {
  // if (Array.isArray(data)) return data;
  if (data?.songs) {
    return data.songs;
  }
  return data?.results ?? [];
};

const getRawHeaderOffset = (headers) => headers['x-next-offset'] ?? headers['X-Next-Offset'];

const isValidHeaderValue = (raw) => raw !== undefined && raw !== null && `${raw}`.length > 0;

const extractNextOffsetFromHeader = (headers = {}) => {
  const raw = getRawHeaderOffset(headers);
  return isValidHeaderValue(raw) ? Number(raw) : null;
};

const inferHasMore = (results, limit) => results.length === limit;

const inferNextOffset = (hasMore, offset, results, defaultNextOffsetIfFull) => {
  if (hasMore) {
    return (offset ?? 0) + results.length;
  }
  return defaultNextOffsetIfFull ?? 0;
};

const inferPagination = (results, offset, limit, defaultNextOffsetIfFull) => {
  const hasMore = inferHasMore(results, limit);
  const nextOffset = inferNextOffset(hasMore, offset, results, defaultNextOffsetIfFull);
  return { hasMore, nextOffset };
};

const resolveNextOffset = (headerOffset, inferred) => headerOffset ?? inferred.nextOffset;

const resolveHasMore = (headerOffset, inferred) => (headerOffset !== null ? true : inferred.hasMore);

const buildParsedResponse = (response, offset, limit, defaultNextOffsetIfFull) => {
  const results = extractResults(response.data);
  const headerOffset = extractNextOffsetFromHeader(response.headers);
  const inferred = inferPagination(results, offset, limit, defaultNextOffsetIfFull ?? null);
  return {
    results,
    nextOffset: resolveNextOffset(headerOffset, inferred),
    hasMore: resolveHasMore(headerOffset, inferred)
  };
};

export function parseSearchResponse(response, offset, limit, defaultNextOffsetIfFull) {
  if (!response?.ok || !response?.data) {
    return null;
  }
  return buildParsedResponse(response, offset, limit, defaultNextOffsetIfFull);
}

// --- Shared saga helpers ---

const getSearchParams = (searchTerm, offset) => ({
  term: searchTerm.trim(),
  limit: SEARCH_LIMIT,
  offset,
  country: getStoredCountry() ?? DEFAULT_COUNTRY
});

const extractDataMessage = (response) => response?.data?.message;
const extractErrorMessage = (response) => extractDataMessage(response) ?? response?.problem ?? DEFAULT_ERROR;

function* executeSearch(params, defaultNextOffset, isLoadMore) {
  const response = yield call(searchSongs, params);
  const parsed = parseSearchResponse(response, params.offset, params.limit, defaultNextOffset);

  if (parsed) {
    yield put(searchActionCreators.searchSuccess(parsed.results, parsed.nextOffset, parsed.hasMore, isLoadMore));
  } else {
    yield put(searchActionCreators.searchFailure(extractErrorMessage(response)));
  }
}

const isBlankTerm = (term) => !term || term.trim() === '';

// --- Sagas ---

export function* handleSearch(action) {
  try {
    if (isBlankTerm(action.searchTerm)) {
      yield put(searchActionCreators.clearSearch());
      return;
    }

    const offset = 0;
    const params = getSearchParams(action.searchTerm, offset);
    yield* executeSearch(params, offset, false);
  } catch (error) {
    yield put(searchActionCreators.searchFailure(error.message ?? DEFAULT_ERROR));
  }
}

export function* handleSearchMore() {
  try {
    const searchTerm = yield select(selectSearchTerm());

    if (isBlankTerm(searchTerm)) {
      return;
    }

    const offset = yield select(selectSearchOffset());
    const params = getSearchParams(searchTerm, offset);
    yield* executeSearch(params, offset, true);
  } catch (error) {
    yield put(searchActionCreators.searchFailure(error.message ?? DEFAULT_ERROR));
  }
}

export default function* searchSaga() {
  yield takeLatest(searchActionTypes.SEARCH_REQUEST, handleSearch);
  yield takeLatest(searchActionTypes.SEARCH_MORE_REQUEST, handleSearchMore);
}
