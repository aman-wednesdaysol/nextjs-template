import { call, put, takeLatest } from 'redux-saga/effects';
import { login, signup } from '@services/authApi';
import { authActionCreators, authActionTypes } from './reducer';

/**
 * Handle login request
 * @param {object} action - The login action
 * @returns {void}
 */
function createSuccessAction(response, successCreator) {
  if (response && response.ok && response.data) {
    const { accessToken, user } = response.data;
    return successCreator(user, accessToken);
  }
  return null;
}

function createFailureMessage(response, fallback) {
  return response?.data?.message  || fallback;
}

export function* handleLogin(action) {
  try {
    const { email, password } = action;
    const response = yield call(login, email, password);

    const successAction = createSuccessAction(response, authActionCreators.loginSuccess);
    if (successAction) {
      yield put(successAction);
    } else {
      yield put(authActionCreators.loginFailure(createFailureMessage(response, 'Login failed')));
    }
  } catch (error) {
    yield put(authActionCreators.loginFailure(error.message || 'Login failed'));
  }
}

/**
 * Handle signup request
 * @param {object} action - The signup action
 * @returns {void}
 */
export function* handleSignup(action) {
  try {
    const { email, password } = action;
    const response = yield call(signup, email, password);

    const successAction = createSuccessAction(response, authActionCreators.signupSuccess);
    if (successAction) {
      yield put(successAction);
    } else {
      yield put(authActionCreators.signupFailure(createFailureMessage(response, 'Signup failed')));
    }
  } catch (error) {
    yield put(authActionCreators.signupFailure(error.message || 'Signup failed'));
  }
}

/**
 * The root of the auth saga
 * @returns {void}
 */
export default function* authSaga() {
  yield takeLatest(authActionTypes.LOGIN_REQUEST, handleLogin);
  yield takeLatest(authActionTypes.SIGNUP_REQUEST, handleSignup);
}
