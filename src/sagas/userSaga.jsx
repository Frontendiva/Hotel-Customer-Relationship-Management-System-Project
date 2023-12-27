// src/store/sagas/userSaga.js

import { call, put, takeEvery } from 'redux-saga/effects';
import { database } from '../../firebase'; // ваш объект firebase

function* fetchUserData(action) {
  try {
    // Вам нужно адаптировать этот код в соответствии с вашей структурой данных в Realtime Database
    const snapshot = yield call([database.ref('users'), 'once'], 'value');
    const userData = snapshot.val();
    yield put({ type: 'USER_DATA_SUCCESS', payload: userData });
  } catch (error) {
    yield put({ type: 'USER_DATA_FAILURE', error });
  }
}

function* userSaga() {
  yield takeEvery('FETCH_USER_DATA', fetchUserData);
}

export default userSaga;
