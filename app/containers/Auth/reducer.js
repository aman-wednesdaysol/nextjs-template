import { PAYLOAD, startLoading, stopLoading, setError } from '@app/utils/reducer';
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const AUTH_PAYLOAD = {
  EMAIL: 'email',
  PASSWORD: 'password',
  USER: 'user',
  TOKEN: 'token'
};

export const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  needsEmailVerification: false,
  pendingEmail: null,
  [PAYLOAD.LOADING]: false,
  [PAYLOAD.ERROR]: null
};

export const { Types: authActionTypes, Creators: authActionCreators } = createActions({
  loginRequest: [AUTH_PAYLOAD.EMAIL, AUTH_PAYLOAD.PASSWORD],
  loginSuccess: [AUTH_PAYLOAD.USER, AUTH_PAYLOAD.TOKEN],
  loginFailure: [PAYLOAD.ERROR],
  signupRequest: [AUTH_PAYLOAD.EMAIL, AUTH_PAYLOAD.PASSWORD],
  signupSuccess: [AUTH_PAYLOAD.USER, AUTH_PAYLOAD.TOKEN],
  signupFailure: [PAYLOAD.ERROR],
  logout: null,
  clearAuthError: null
});

/** Helper: handle login/signup request */
function handleRequest(draft) {
  startLoading(draft);
  draft[PAYLOAD.ERROR] = null;
}

/** Helper: handle login/signup failure */
function handleFailure(draft, action) {
  stopLoading(draft);
  setError(draft, action);
  draft.isAuthenticated = false;
  draft.user = null;
  draft.token = null;
  draft.needsEmailVerification = false;
  draft.pendingEmail = null;
}

/** Helper: handle logout */
function handleLogout(draft) {
  draft.user = null;
  draft.token = null;
  draft.isAuthenticated = false;
  draft.needsEmailVerification = false;
  draft.pendingEmail = null;
  draft[PAYLOAD.ERROR] = null;
  clearUserFromLocalStorage();
}

function saveUserToLocalStorage(user, token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('music_app_token', token);
  localStorage.setItem('music_app_user', JSON.stringify(user));
}

function clearUserFromLocalStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('music_app_token');
  localStorage.removeItem('music_app_user');
}

function handleVerifiedUser(draft, user, token) {
  draft.user = user;
  draft.token = token;
  draft.isAuthenticated = true;
  saveUserToLocalStorage(user, token);
}

function handleUnverifiedUser(draft) {
  draft.user = null;
  draft.token = null;
  draft.isAuthenticated = false;
  clearUserFromLocalStorage();
}

// --- isEmailVerified helpers ---

const hasTimestampConfirmation = (user) =>
  Boolean(user.email_confirmed_at || user.confirmed_at || user.emailConfirmedAt || user.confirmedAt);

const hasMetadataConfirmation = (metadata) =>
  metadata?.email_verified === true || metadata?.emailVerified === true;

const hasIdentityConfirmation = (identity) =>
  hasMetadataConfirmation(identity?.identity_data);

const hasIdentitiesConfirmation = (identities) => {
  if (!Array.isArray(identities)) return false;
  return identities.some(hasIdentityConfirmation);
};

function isEmailVerified(user) {
  if (!user) return false;
  if (hasTimestampConfirmation(user)) return true;
  if (hasMetadataConfirmation(user.user_metadata)) return true;
  return hasIdentitiesConfirmation(user.identities);
}

// --- Post-auth state application ---

function applyUserPostAuth(draft, user, token) {
  const verified = isEmailVerified(user);
  draft.pendingEmail = user?.email || null;
  draft.needsEmailVerification = !verified;

  if (verified) {
    handleVerifiedUser(draft, user, token);
  } else {
    handleUnverifiedUser(draft);
  }
}

function handleSuccess(draft, action) {
  stopLoading(draft);
  applyUserPostAuth(draft, action.user, action.token);
  draft[PAYLOAD.ERROR] = null;
}

const ACTION_HANDLERS = {
  [authActionTypes.LOGIN_REQUEST]: handleRequest,
  [authActionTypes.SIGNUP_REQUEST]: handleRequest,
  [authActionTypes.LOGIN_SUCCESS]: handleSuccess,
  [authActionTypes.SIGNUP_SUCCESS]: handleSuccess,
  [authActionTypes.LOGIN_FAILURE]: handleFailure,
  [authActionTypes.SIGNUP_FAILURE]: handleFailure,
  [authActionTypes.LOGOUT]: handleLogout,
  [authActionTypes.CLEAR_AUTH_ERROR]: (draft) => {
    draft[PAYLOAD.ERROR] = null;
  },
};

export const authReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const handler = ACTION_HANDLERS[action.type];
    if (handler) handler(draft, action);
  });

export default authReducer;