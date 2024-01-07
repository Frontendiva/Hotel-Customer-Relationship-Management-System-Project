// userSagas.js

import { call, put } from 'redux-saga/effects';
import { loginSuccess } from '../action/usersActions';
import { loginUserAPI } from '../api/api'; // Замените на вашу функцию для входа пользователя

export function* userLogIn(action) {
  try {
    const userData = yield call(loginUserAPI, action.payload);
    yield put(loginSuccess(userData));
  } catch (error) {
    // Обработка ошибок, если необходимо
  }
}
