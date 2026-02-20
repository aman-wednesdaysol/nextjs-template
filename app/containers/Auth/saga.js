import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, signupUser } from '@services/authApi';
import { authTypes, authCreators } from './reducer';

const { successAuth, failureAuth } = authCreators;

export function* handleLogin(action) {
  const { email, password } = action;
  const response = yield call(loginUser, { email, password });
  if (response.ok) {
    yield put(successAuth(response.data));
  } else {
    yield put(failureAuth(response.data));
  }
}

export function* handleSignup(action) {
  const { name, email, password } = action;
  const response = yield call(signupUser, { name, email, password });
  if (response.ok) {
    yield put(successAuth(response.data));
  } else {
    yield put(failureAuth(response.data));
  }
}

export default function* authSaga() {
  yield takeLatest(authTypes.REQUEST_LOGIN, handleLogin);
  yield takeLatest(authTypes.REQUEST_SIGNUP, handleSignup);
}
