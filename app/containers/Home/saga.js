import { call, put, takeLatest } from 'redux-saga/effects';
import { getTrendingTracks } from '@services/musicApi';
import { homeActionCreators, homeActionTypes } from './reducer';

function extractTracksFromResponse(response) {
  if (!response) {
    return null;
  }
  if (Array.isArray(response.data)) {
    return response.data;
  }
  return response.data.tracks || response.data.results || [];
}

/**
 * Handle trending tracks request
 * @param {object} action - The action
 * @returns {void}
 */
export function* handleTrendingTracks(action) {
  try {
    const { country } = action;
    const response = yield call(getTrendingTracks, country || 'US');

    const tracks = extractTracksFromResponse(response);
    if (tracks !== null) {
      yield put(homeActionCreators.successTrendingTracks(tracks));
      return;
    }

    const errorMessage = 'Failed to load trending tracks';
    yield put(homeActionCreators.failureTrendingTracks(errorMessage));
  } catch (error) {
    yield put(homeActionCreators.failureTrendingTracks('Failed to load trending tracks'));
  }
}

/**
 * The root of the home saga
 * @returns {void}
 */
export default function* homeSaga() {
  yield takeLatest(homeActionTypes.REQUEST_TRENDING_TRACKS, handleTrendingTracks);
}
