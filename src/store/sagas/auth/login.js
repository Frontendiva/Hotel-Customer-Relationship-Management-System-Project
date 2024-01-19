
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess } from '../../action/usersActions';
import authApi from '../../../api/auth'; // Замените на вашу функцию для входа пользователя
import {login} from '../../action/usersActions';


export function* getLogin(action) {
  try {
    const userData = yield call(authApi.login, action.payload);
    yield put(loginSuccess(userData));
  } catch (error) {
    // Обработка ошибок, если необходимо
  }
}

export default function* getLoginSaga() {
    yield takeLatest(login, getLogin);
  }
