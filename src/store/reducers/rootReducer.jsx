// rootReducer.js

import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  // Другие редюсеры, если они есть
});

export default rootReducer;
