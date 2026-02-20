import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPlayerDomain = (state) => state.musicPlayer || initialState;

export const selectCurrentSong = () => createSelector(selectPlayerDomain, (substate) => substate.currentSong);

export const selectIsPlaying = () => createSelector(selectPlayerDomain, (substate) => substate.isPlaying);

export const selectCurrentTime = () => createSelector(selectPlayerDomain, (substate) => substate.currentTime);

export const selectDuration = () => createSelector(selectPlayerDomain, (substate) => substate.duration);

export const selectVolume = () => createSelector(selectPlayerDomain, (substate) => substate.volume);

export const selectQueue = () => createSelector(selectPlayerDomain, (substate) => substate.queue);

export const selectPlaylist = () => createSelector(selectPlayerDomain, (substate) => substate.playlist || []);

export const selectPlaylistIndex = () => createSelector(selectPlayerDomain, (substate) => substate.playlistIndex ?? -1);
