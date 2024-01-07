// usersActions.js

export const login = (userData) => ({
    type: 'LOGIN',
    payload: userData,
  });
  
  export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  