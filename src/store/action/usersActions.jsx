// usersActions.js

export const AuthAction = { 
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
}

export const login = (user) => ({
    type: 'LOGIN',
    payload: user,
});
  
export const loginSuccess = (user) => ({
    type: AuthAction.LOGIN_SUCCESS,
    payload: user,
});
  
export const logout = () => ({
    type: 'LOGOUT',
});
