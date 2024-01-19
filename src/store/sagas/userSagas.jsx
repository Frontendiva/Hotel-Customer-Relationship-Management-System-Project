// userSagas.js

import { call, put } from 'redux-saga/effects';
import { loginSuccess } from '../action/usersActions';
import authApi from '../../api/auth'; 

export function* userLogIn(action) {
  try {
    const userData = yield call(authApi.login, action.payload);
    yield put(loginSuccess(userData));
  } catch (error) {
    // Обработка ошибок, если необходимо
  }
}
