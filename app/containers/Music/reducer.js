import { PAYLOAD, startLoading, stopLoading, setError } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { MUSIC_PAYLOAD } from './constants';

export const initialState = {
  [MUSIC_PAYLOAD.SEARCH_TERM]: '',
  [MUSIC_PAYLOAD.SONGS]: [],
  [MUSIC_PAYLOAD.CURRENT_SONG]: null,
  [MUSIC_PAYLOAD.IS_PLAYING]: false,
  [MUSIC_PAYLOAD.NEXT_OFFSET]: null,
  [MUSIC_PAYLOAD.HAS_MORE]: false,
  [MUSIC_PAYLOAD.LOADING_MORE]: false,
  [PAYLOAD.ERROR]: null,
  [PAYLOAD.LOADING]: false
};

export const { Types: musicTypes, Creators: musicCreators } = createActions({
  requestSearchSongs: [MUSIC_PAYLOAD.SEARCH_TERM],
  successSearchSongs: [PAYLOAD.DATA, MUSIC_PAYLOAD.NEXT_OFFSET],
  failureSearchSongs: [PAYLOAD.ERROR],
  requestLoadMore: null,
  successLoadMore: [PAYLOAD.DATA, MUSIC_PAYLOAD.NEXT_OFFSET],
  failureLoadMore: [PAYLOAD.ERROR],
  setCurrentSong: [MUSIC_PAYLOAD.CURRENT_SONG],
  setIsPlaying: [MUSIC_PAYLOAD.IS_PLAYING],
  clearMusic: null
});

const handleRequest = (draft, action) => {
  startLoading(draft);
  draft[PAYLOAD.ERROR] = null;
  draft[MUSIC_PAYLOAD.SEARCH_TERM] = action[MUSIC_PAYLOAD.SEARCH_TERM];
  draft[MUSIC_PAYLOAD.NEXT_OFFSET] = null;
  draft[MUSIC_PAYLOAD.HAS_MORE] = false;
};

const handleSuccess = (draft, action) => {
  stopLoading(draft);
  draft[MUSIC_PAYLOAD.SONGS] = action[PAYLOAD.DATA] || [];
  draft[MUSIC_PAYLOAD.NEXT_OFFSET] = action[MUSIC_PAYLOAD.NEXT_OFFSET] ?? null;
  draft[MUSIC_PAYLOAD.HAS_MORE] = action[MUSIC_PAYLOAD.NEXT_OFFSET] != null;
};

const handleFailure = (draft, action) => {
  stopLoading(draft);
  setError(draft, action);
};

const handleRequestLoadMore = (draft) => {
  draft[MUSIC_PAYLOAD.LOADING_MORE] = true;
};

const handleSuccessLoadMore = (draft, action) => {
  draft[MUSIC_PAYLOAD.LOADING_MORE] = false;
  draft[MUSIC_PAYLOAD.SONGS] = [...draft[MUSIC_PAYLOAD.SONGS], ...(action[PAYLOAD.DATA] || [])];
  draft[MUSIC_PAYLOAD.NEXT_OFFSET] = action[MUSIC_PAYLOAD.NEXT_OFFSET] ?? null;
  draft[MUSIC_PAYLOAD.HAS_MORE] = action[MUSIC_PAYLOAD.NEXT_OFFSET] != null;
};

const handleFailureLoadMore = (draft, action) => {
  draft[MUSIC_PAYLOAD.LOADING_MORE] = false;
  setError(draft, action);
};

const handleSetSong = (draft, action) => {
  draft[MUSIC_PAYLOAD.CURRENT_SONG] = action[MUSIC_PAYLOAD.CURRENT_SONG];
  draft[MUSIC_PAYLOAD.IS_PLAYING] = true;
};

const handleSetIsPlaying = (draft, action) => {
  draft[MUSIC_PAYLOAD.IS_PLAYING] = action[MUSIC_PAYLOAD.IS_PLAYING];
};

const handlers = {
  [musicTypes.REQUEST_SEARCH_SONGS]: handleRequest,
  [musicTypes.SUCCESS_SEARCH_SONGS]: handleSuccess,
  [musicTypes.FAILURE_SEARCH_SONGS]: handleFailure,
  [musicTypes.REQUEST_LOAD_MORE]: handleRequestLoadMore,
  [musicTypes.SUCCESS_LOAD_MORE]: handleSuccessLoadMore,
  [musicTypes.FAILURE_LOAD_MORE]: handleFailureLoadMore,
  [musicTypes.SET_CURRENT_SONG]: handleSetSong,
  [musicTypes.SET_IS_PLAYING]: handleSetIsPlaying,
  [musicTypes.CLEAR_MUSIC]: () => initialState
};

export const musicReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const handler = handlers[action.type];
    return handler ? handler(draft, action) : state;
  });

export default musicReducer;
