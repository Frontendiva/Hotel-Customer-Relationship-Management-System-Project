// src/store/sagas/roomSaga.js

import { call, put, takeEvery } from 'redux-saga/effects';
import { database } from '../../firebase'; // ваш объект firebase

function* fetchRoomData(action) {
  try {
    // Вам нужно адаптировать этот код в соответствии с вашей структурой данных в Realtime Database
    const snapshot = yield call([database.ref('rooms'), 'once'], 'value');
    const roomData = snapshot.val();
    yield put({ type: 'ROOM_DATA_SUCCESS', payload: roomData });
  } catch (error) {
    yield put({ type: 'ROOM_DATA_FAILURE', error });
  }
}

function* roomSaga() {
  yield takeEvery('FETCH_ROOM_DATA', fetchRoomData);
}

export default roomSaga;
