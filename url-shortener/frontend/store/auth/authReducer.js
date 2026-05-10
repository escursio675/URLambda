import { LOGIN, LOGOUT } from './authActions';

export const defaultAuthState = {
    isLoggedIn: false,
    token: null,
    user: null,
    loading: true
};

const authReducer = (state, action) => {

    if(action.type === LOGIN){

        localStorage.setItem('token', action.payload.token);

        localStorage.setItem(
            'user',
            JSON.stringify(action.payload.user)
        );

        return {
            ...state,
            isLoggedIn: true,
            token: action.payload.token,
            user: action.payload.user,
            loading: false
        };

    }

    if(action.type === LOGOUT){

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return { ...defaultAuthState, loading: false };

    }

    return state;
};

export default authReducer;