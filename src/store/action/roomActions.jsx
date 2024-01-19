// roomActions.js
export const CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';

export const checkInSuccess = (roomId) => ({
  type: CHECK_IN_SUCCESS,
  payload: { id: roomId, checkedIn: true },
});

export const checkOutSuccess = (roomId) => ({
  type: CHECK_OUT_SUCCESS,
  payload: { id: roomId, checkedIn: false },
});
