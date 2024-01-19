import { call, put, takeEvery } from 'redux-saga/effects';
import { CHECK_IN_SUCCESS as CHECK_IN, CHECK_OUT_SUCCESS as CHECK_OUT } from '../action/roomActions';

const apiCheckIn = (roomId) => {
  return fetch(`Rooms/${roomId}`, {
    method: 'POST',
  }).then(response => response.json());
};

const apiCheckOut = (roomId) => {
  return fetch(`Rooms/${roomId}`, {
    method: 'POST',
  }).then(response => response.json());
};

function* handleCheckIn(action) {
  try {
    const result = yield call(apiCheckIn, action.payload.roomId);
    yield put({ type: CHECK_IN, payload: result });
  } catch (error) {
    yield put({ type: 'CHECK_IN_ERROR', error });
  }
}

function* handleCheckOut(action) {
  try {
    const result = yield call(apiCheckOut, action.payload.roomId);
    yield put({ type: CHECK_OUT, payload: result });
  } catch (error) {
    yield put({ type: 'CHECK_OUT_ERROR', error });
  }
}

function* watchCheckIn() {
  yield takeEvery(CHECK_IN, handleCheckIn);
}

function* watchCheckOut() {
  yield takeEvery(CHECK_OUT, handleCheckOut);
}

export { CHECK_IN, CHECK_OUT, watchCheckIn, watchCheckOut };
