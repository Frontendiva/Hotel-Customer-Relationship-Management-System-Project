// roomReducer.js
import { CHECK_IN_SUCCESS, CHECK_OUT_SUCCESS } from '../action/roomActions';

const initialState = {
  rooms: [], 
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IN_SUCCESS:
    case CHECK_OUT_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.id ? { ...room, checkedIn: action.payload.checkedIn } : room
        ),
      };

    default:
      return state;
  }
};

export default roomReducer;
