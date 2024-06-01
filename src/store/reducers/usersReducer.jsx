// usersReducer.js
// import { AuthAction } from '../action/usersActions';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default usersReducer;

