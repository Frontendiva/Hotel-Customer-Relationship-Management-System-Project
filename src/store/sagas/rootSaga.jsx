// rootSaga.js
import { all, fork } from 'redux-saga/effects';
import auth from './auth';

const sagas = [
  auth,

];
export default function* rootSaga() {
  yield all(sagas.flat().map((saga) => fork(saga)));
}