import { PAYLOAD } from '@app/utils/reducer';
import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthDomain = (state) => state.auth || initialState;

export const selectUser = () => createSelector(selectAuthDomain, (substate) => substate.user);

export const selectToken = () => createSelector(selectAuthDomain, (substate) => substate.token);

export const selectIsAuthenticated = () => createSelector(selectAuthDomain, (substate) => substate.isAuthenticated);

export const selectAuthLoading = () => createSelector(selectAuthDomain, (substate) => get(substate, PAYLOAD.LOADING, false));

export const selectAuthError = () => createSelector(selectAuthDomain, (substate) => get(substate, PAYLOAD.ERROR, null));

export const selectNeedsEmailVerification = () =>
  createSelector(selectAuthDomain, (substate) => !!substate.needsEmailVerification);

export const selectPendingEmail = () =>
  createSelector(selectAuthDomain, (substate) => substate.pendingEmail);

export const selectCanUseApp = () =>
  createSelector(selectAuthDomain, (substate) => !!substate.isAuthenticated && !substate.needsEmailVerification);
