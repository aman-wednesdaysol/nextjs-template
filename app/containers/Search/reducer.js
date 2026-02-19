/*
 *
 * Search reducer
 *
 */
import {
  PAYLOAD,
  startLoading,
  stopLoading,
  setError,
  setData
} from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const SEARCH_PAYLOAD = {
  SEARCH_TERM: 'searchTerm',
  OFFSET: 'offset',
  HAS_MORE: 'hasMore'
};

export const initialState = {
  [SEARCH_PAYLOAD.SEARCH_TERM]: '',
  [PAYLOAD.DATA]: [],
  [PAYLOAD.ERROR]: null,
  [SEARCH_PAYLOAD.OFFSET]: 0,
  [SEARCH_PAYLOAD.HAS_MORE]: false
};

export const {
  Types: searchActionTypes,
  Creators: searchActionCreators
} = createActions({
  searchRequest: [SEARCH_PAYLOAD.SEARCH_TERM],
  searchMoreRequest: null,
  // data, offset, hasMore, append
  searchSuccess: [
    PAYLOAD.DATA,
    SEARCH_PAYLOAD.OFFSET,
    SEARCH_PAYLOAD.HAS_MORE,
    'append'
  ],
  searchFailure: [PAYLOAD.ERROR],
  clearSearch: null
});

/* -------------------------------------------------------------------------- */
/*                               HANDLERS                                     */
/* -------------------------------------------------------------------------- */

const handleSearchRequest = (draft, action) => {
  startLoading(draft);
  draft[SEARCH_PAYLOAD.SEARCH_TERM] = action.searchTerm;
  draft[PAYLOAD.ERROR] = null;
  draft[SEARCH_PAYLOAD.OFFSET] = 0;
  draft[SEARCH_PAYLOAD.HAS_MORE] = false;
};

const handleSearchMoreRequest = (draft) => {
  startLoading(draft);
  draft[PAYLOAD.ERROR] = null;
};

const handleSearchSuccess = (draft, action) => {
  stopLoading(draft);

  if (action.append) {
    const existing = draft[PAYLOAD.DATA] || [];
    const incoming = action[PAYLOAD.DATA] || [];
    draft[PAYLOAD.DATA] = [...existing, ...incoming];
  } else {
    setData(draft, action);
  }

  draft[SEARCH_PAYLOAD.OFFSET] =
    action[SEARCH_PAYLOAD.OFFSET] ?? 0;

  draft[SEARCH_PAYLOAD.HAS_MORE] =
    !!action[SEARCH_PAYLOAD.HAS_MORE];
};

const handleSearchFailure = (draft, action) => {
  stopLoading(draft);
  setError(draft, action);
};

const handleClearSearch = (draft) => {
  draft[SEARCH_PAYLOAD.SEARCH_TERM] = '';
  draft[PAYLOAD.DATA] = [];
  draft[PAYLOAD.ERROR] = null;
  draft[SEARCH_PAYLOAD.OFFSET] = 0;
  draft[SEARCH_PAYLOAD.HAS_MORE] = false;
};

/* -------------------------------------------------------------------------- */
/*                               HANDLER MAP                                  */
/* -------------------------------------------------------------------------- */

const handlers = {
  [searchActionTypes.SEARCH_REQUEST]: handleSearchRequest,
  [searchActionTypes.SEARCH_MORE_REQUEST]: handleSearchMoreRequest,
  [searchActionTypes.SEARCH_SUCCESS]: handleSearchSuccess,
  [searchActionTypes.SEARCH_FAILURE]: handleSearchFailure,
  [searchActionTypes.CLEAR_SEARCH]: handleClearSearch
};

/* -------------------------------------------------------------------------- */
/*                                REDUCER                                     */
/* -------------------------------------------------------------------------- */

export function searchReducer(state = initialState, action) {
  return produce(state, (draft) => {
    const handler = handlers[action.type];
    if (handler) {
      handler(draft, action);
    }
  });
}

export default searchReducer;
