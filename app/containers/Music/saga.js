import { call, put, select, takeLatest } from 'redux-saga/effects';
import { searchSongs } from '@services/musicApi';
import { musicTypes, musicCreators } from './reducer';
import { MUSIC_PAYLOAD, DEFAULT_PAGE_LIMIT } from './constants';
import { selectSearchTerm, selectNextOffset } from './selectors';

const { successSearchSongs, failureSearchSongs } = musicCreators;
const { successLoadMore, failureLoadMore } = musicCreators;

export const extractNextOffset = (headers) => {
  const val = headers?.['x-next-offset'];
  return val != null ? Number(val) : null;
};

export function* handleSearchSongs(action) {
  const term = action[MUSIC_PAYLOAD.SEARCH_TERM];
  const response = yield call(searchSongs, { term, limit: DEFAULT_PAGE_LIMIT });
  if (response.ok) {
    const nextOffset = extractNextOffset(response.headers);
    yield put(successSearchSongs(response.data, nextOffset));
  } else {
    yield put(failureSearchSongs(response.data));
  }
}

export function* handleLoadMore() {
  const term = yield select(selectSearchTerm());
  const offset = yield select(selectNextOffset());
  const response = yield call(searchSongs, { term, limit: DEFAULT_PAGE_LIMIT, offset });
  if (response.ok) {
    const nextOffset = extractNextOffset(response.headers);
    yield put(successLoadMore(response.data, nextOffset));
  } else {
    yield put(failureLoadMore(response.data));
  }
}

export default function* musicSaga() {
  yield takeLatest(musicTypes.REQUEST_SEARCH_SONGS, handleSearchSongs);
  yield takeLatest(musicTypes.REQUEST_LOAD_MORE, handleLoadMore);
}
