// rootSaga.js
import { all } from 'redux-saga/effects';
import { userLogIn } from './userSagas';

function* rootSaga() {
    yield all([
      userLogIn(),
      // Другие саги, если они есть
    ]);
  }
  
  export default rootSaga;