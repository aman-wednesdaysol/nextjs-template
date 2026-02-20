import produce from 'immer';
import { createActions } from 'reduxsauce';

export const PLAYER_PAYLOAD = {
  SONG: 'song',
  PLAYLIST: 'playlist',
  CURRENT_TIME: 'currentTime',
  DURATION: 'duration',
  VOLUME: 'volume',
  QUEUE: 'queue'
};

export const initialState = {
  currentSong: null,
  playlist: [],
  playlistIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  queue: []
};

export const { Types: playerActionTypes, Creators: playerActionCreators } = createActions({
  playSong: [PLAYER_PAYLOAD.SONG, PLAYER_PAYLOAD.PLAYLIST],
  pauseSong: null,
  resumeSong: null,
  setCurrentTime: [PLAYER_PAYLOAD.CURRENT_TIME],
  setDuration: [PLAYER_PAYLOAD.DURATION],
  setVolume: [PLAYER_PAYLOAD.VOLUME],
  addToQueue: [PLAYER_PAYLOAD.QUEUE],
  nextSong: null,
  previousSong: null,
  clearPlayer: null
});

function hasSameId(a, b) {
  if (a.trackId != null) {
    return a.trackId === b.trackId;
  }
  if (a.id != null) {
    return a.id === b.id;
  }
  return false;
}

function isSameSong(a, b) {
  if (!a || !b) {
    return false;
  }
  if (hasSameId(a, b)) {
    return true;
  }
  return a.trackName === b.trackName && a.artistName === b.artistName;
}

export function findSongIndex(playlist, song) {
  if (!playlist || !song) {
    return -1;
  }

  return playlist.findIndex((item) => isSameSong(item, song));
}

const resetPlayback = (draft) => {
  draft.isPlaying = true;
  draft.currentTime = 0;
};

const handlePlaySong = (draft, action) => {
  draft.currentSong = action.song;
  resetPlayback(draft);

  const playlist = action.playlist;
  if (!Array.isArray(playlist) || playlist.length === 0) {
    return;
  }

  draft.playlist = playlist;
  const index = findSongIndex(playlist, action.song);
  draft.playlistIndex = index >= 0 ? index : 0;
};

const handlePauseSong = (draft) => {
  draft.isPlaying = false;
};

const handleResumeSong = (draft) => {
  draft.isPlaying = true;
};

const handleSetCurrentTime = (draft, action) => {
  draft.currentTime = action.currentTime;
};

const handleSetDuration = (draft, action) => {
  draft.duration = action.duration;
};

const handleSetVolume = (draft, action) => {
  draft.volume = action.volume;
};

const handleAddToQueue = (draft, action) => {
  draft.queue = Array.isArray(action.queue) ? action.queue : [...draft.queue, action.queue];
};

const playFromPlaylist = (draft) => {
  draft.currentSong = draft.playlist[draft.playlistIndex];
  resetPlayback(draft);
};

const playFromQueue = (draft) => {
  draft.currentSong = draft.queue[0];
  draft.queue = draft.queue.slice(1);
  resetPlayback(draft);
};

const hasNextPlaylistSong = (draft) => draft.playlist.length > 0 && draft.playlistIndex < draft.playlist.length - 1;

const handleNextSong = (draft) => {
  if (hasNextPlaylistSong(draft)) {
    draft.playlistIndex += 1;
    playFromPlaylist(draft);
    return;
  }

  if (draft.queue.length > 0) {
    playFromQueue(draft);
  }
};

const hasPreviousPlaylistSong = (draft) => draft.playlist.length > 0 && draft.playlistIndex > 0;

const handlePreviousSong = (draft) => {
  if (hasPreviousPlaylistSong(draft)) {
    draft.playlistIndex -= 1;
    playFromPlaylist(draft);
    return;
  }

  if (draft.currentSong) {
    draft.currentTime = 0;
  }
};

const handleClearPlayer = () => initialState;

const handlers = {
  [playerActionTypes.PLAY_SONG]: handlePlaySong,
  [playerActionTypes.PAUSE_SONG]: handlePauseSong,
  [playerActionTypes.RESUME_SONG]: handleResumeSong,
  [playerActionTypes.SET_CURRENT_TIME]: handleSetCurrentTime,
  [playerActionTypes.SET_DURATION]: handleSetDuration,
  [playerActionTypes.SET_VOLUME]: handleSetVolume,
  [playerActionTypes.ADD_TO_QUEUE]: handleAddToQueue,
  [playerActionTypes.NEXT_SONG]: handleNextSong,
  [playerActionTypes.PREVIOUS_SONG]: handlePreviousSong,
  [playerActionTypes.CLEAR_PLAYER]: handleClearPlayer
};

export function playerReducer(state = initialState, action) {
  return produce(state, (draft) => {
    const handler = handlers[action.type];
    if (!handler) {
      return;
    }

    const result = handler(draft, action);
    if (result) {
      return result;
    }
  });
}

export default playerReducer;
