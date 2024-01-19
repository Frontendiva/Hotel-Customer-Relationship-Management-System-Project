// rootSaga.js
import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import { watchCheckIn, watchCheckOut } from './roomSaga'; // Импорт вашей roomSaga

const sagas = [
  auth,
  watchCheckIn, // Добавление watchCheckIn
  watchCheckOut, // Добавление watchCheckOut
];

export default function* rootSaga() {
  yield all(sagas.flat().map((saga) => fork(saga)));
}
