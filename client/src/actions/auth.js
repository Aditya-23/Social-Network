import axios from 'axios';
import { setAuthToken } from '../utils'
import { 
    CLEAR_PROFILE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_AUTHENTICATED,
    USER_AUTHENTICATION_FAILED
   } from './types';

//Get user details by passing a token, return null if token isn't present in the local storage.
const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    if(token){
        setAuthToken(token);
    }
    
    try {
        const response = await axios.get("api/auth/");
        if(response.status == 200){
            dispatch({
                type: USER_AUTHENTICATED,
                payload: response.data.user
            })
        } else {
            dispatch({
                type: USER_AUTHENTICATION_FAILED,
                payload: null
            })
        }
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_FAILED,
            payload: null
        })
    }
}

//Login a user
const loginUser = (userObj) => async dispatch => {
    const { email, password } = userObj;
    const config = {
        headers: {
            'Content-Type' : "application/json"
        }
    };

    try {
        const response = await axios.post("api/auth", userObj, config);
        if(response.status == 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            dispatch({
                type: USER_AUTHENTICATED,
                payload: response.data
            })
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: null
            })
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: null
        })
    }
}

const logoutUser = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT_USER
    })
}

//Register a user
const authAction = (userObj) => async dispatch => {
    const { name, email, password } = userObj;

    const config = {
        headers: {
            'Content-Type' : "application/json"
        }
    };

    try {
        const response = await axios.post("api/user/register", userObj, config);
        if(response.status == 200){
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    token: response.data.token,
                    user: userObj
                }
            })
        }
        else{
            dispatch({
                type: REGISTER_FAIL,
                payload: null
            })
        }
        
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: null
        })
    }

}

export {authAction, loadUser, loginUser, logoutUser};