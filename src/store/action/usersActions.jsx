// usersActions.js

export const AuthAction = { 
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
}

export const login = (userData) => ({
    type: AuthAction.LOGIN,
    payload: userData,
});
  
export const loginSuccess = (user) => ({
    type: AuthAction.LOGIN_SUCCESS,
    payload: user,
});
  
export const logout = () => ({
    type: AuthAction.LOGOUT,
});
