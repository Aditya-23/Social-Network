import axios from 'axios';
import { setAuthToken } from '../utils'
import { GET_PROFILE, GET_PROFILE_ERROR } from './types';

const getProfile =  () => async dispatch => {
    const token = localStorage.getItem('token');
    if(token){
        setAuthToken(token);
    }
    
    try {
       const response = await axios.get("api/profile"); 

       console.log(response)

       if(response.status == 200) {
            dispatch({
                type: GET_PROFILE,
                payload: {
                    profile: response.data
                }
            })
       }
       else if(response.status == 500 || response.status == 400 || response.status == 401){
            dispatch({
                type: GET_PROFILE_ERROR,
                payload: {
                    error: response.msg
                }
            })
       }
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_PROFILE_ERROR,
            payload: {
                error: "Some Other Error, Need to investigate!"
            }
        })
    }
}

export {getProfile};