import { call, put, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
import { loginUser, signupUser } from '@services/authApi';
import { setStoredToken, setuid } from '@utils/authStorage';
import { setAuthHeader } from '@utils/apiUtils';
import { authTypes, authCreators } from './reducer';
import { identifyUser } from '@lib/analytics';

const { successAuth, failureAuth } = authCreators;

const persistToken = (data) => {
  if (data && data.accessToken) {
    setStoredToken(data.accessToken);
    setAuthHeader('music', data.accessToken);
    setuid(data.user.id);
  }
};

export function* handleLogin(action) {
  const { email, password } = action;
  const response = yield call(loginUser, { email, password });
  if (response.ok) {
    yield put(successAuth(response.data));
    persistToken(response.data);
    identifyUser(response.data.user.id, response.data.user.email);
    Router.push('/');
  } else {
    yield put(failureAuth(response.data));
  }
}

export function* handleSignup(action) {
  const { email, password } = action;
  const response = yield call(signupUser, { email, password });
  if (response.ok) {
    yield put(successAuth(response.data));
    persistToken(response.data);
    Router.push('/');
  } else {
    yield put(failureAuth(response.data));
  }
}

export default function* authSaga() {
  yield takeLatest(authTypes.REQUEST_LOGIN, handleLogin);
  yield takeLatest(authTypes.REQUEST_SIGNUP, handleSignup);
}
