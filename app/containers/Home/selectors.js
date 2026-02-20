import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { HOME_PAYLOAD, initialState } from './reducer';

const selectHomeDomain = (state) => state.home || initialState;

export const selectTrendingTracks = () =>
  createSelector(selectHomeDomain, (substate) => get(substate, PAYLOAD.DATA, []));

export const selectCountry = () =>
  createSelector(selectHomeDomain, (substate) => get(substate, HOME_PAYLOAD.COUNTRY, null));

export const selectHomeLoading = () =>
  createSelector(selectHomeDomain, (substate) => get(substate, PAYLOAD.LOADING, false));

export const selectHomeError = () => createSelector(selectHomeDomain, (substate) => get(substate, PAYLOAD.ERROR, null));
