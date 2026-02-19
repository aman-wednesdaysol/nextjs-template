import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { SEARCH_PAYLOAD, initialState } from './reducer';

const selectSearchDomain = (state) => state.search || initialState;

export const selectSearchResults = () => createSelector(selectSearchDomain, (substate) => get(substate, PAYLOAD.DATA, []));

export const selectSearchTerm = () => createSelector(selectSearchDomain, (substate) => get(substate, SEARCH_PAYLOAD.SEARCH_TERM, ''));

export const selectSearchLoading = () => createSelector(selectSearchDomain, (substate) => get(substate, PAYLOAD.LOADING, false));

export const selectSearchError = () => createSelector(selectSearchDomain, (substate) => get(substate, PAYLOAD.ERROR, null));

export const selectSearchOffset = () =>
  createSelector(selectSearchDomain, (substate) => get(substate, SEARCH_PAYLOAD.OFFSET, 0));

export const selectSearchHasMore = () =>
  createSelector(selectSearchDomain, (substate) => get(substate, SEARCH_PAYLOAD.HAS_MORE, false));
