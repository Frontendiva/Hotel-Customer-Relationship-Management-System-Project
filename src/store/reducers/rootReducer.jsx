// rootReducer.js

import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  room: roomReducer,
});

export default rootReducer;
