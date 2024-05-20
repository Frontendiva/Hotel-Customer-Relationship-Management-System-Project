// usersReducer.js
import { AuthAction } from '../action/usersActions';

const initialState = {
    user: null,
    isAuthenticated: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthAction.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default usersReducer;
