import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_AUTHENTICATION_FAILED,
    USER_AUTHENTICATED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
    token: null,
}

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true
            }
        case USER_AUTHENTICATED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }
        case REGISTER_FAIL:
        case USER_AUTHENTICATION_FAILED:
        case LOGIN_FAIL:
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
            }
        default: // Remember to always have a default case in every reducer!
            return state;
    }
}

export default auth;