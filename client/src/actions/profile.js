import axios from 'axios';
import { setAuthToken } from '../utils'
import { setAlert } from './alert';
import { GET_PROFILE, GET_PROFILE_ERROR, LOADING, LOADING_DONE, REMOVE_ALERT, SET_ALERT } from './types';

const getProfile =  () => async dispatch => {
    const token = localStorage.getItem('token');
    if(token){
        setAuthToken(token);
    }
    
    try {
        dispatch({
            type:LOADING
        });
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
       else if(response.status == 400 || response.status == 401 ||response.status == 500){
            dispatch({
                type: GET_PROFILE_ERROR,
                payload: {
                    error: response.data.msg
                }
            })
       }
       dispatch({
            type:LOADING_DONE
       })
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

const createProfile = (profileObj, history, edit = false) => async dispatch => {
    const token = localStorage.getItem('token');
    if(token){
        setAuthToken(token);
    }

    const config = {
        headers: {
            'Content-Type' : "application/json"
        }
    };

    const socialmedia = {
        "facebook": profileObj.facebook,
        "instagram": profileObj.instagram,
        "youtube": profileObj.youtube,
        "twitter": profileObj.twitter,
        "linkedin": profileObj.linkedin
    };
    const profileObjToSend = {
        socialmedia,
        "fullName": profileObj.fullName,
        "bio": profileObj.bio,
        "website": profileObj.website,
        "status": profileObj.status,
        "github": profileObj.github,
        "skills": profileObj.skills,
        "company": profileObj.company,
        "email": profileObj.email,
    }
    try {
        var response;
        dispatch({
            type:LOADING
        });
        if(edit){
            response = await axios.put("api/profile", profileObjToSend, config);
        }
        else{
            response = await axios.post("api/profile", profileObjToSend, config);
        }
        
        console.log(response);
        dispatch({
            type: GET_PROFILE,
            payload: {
                profile: response.data,
            }
        })


        dispatch({
            type: LOADING_DONE
        })

        dispatch({
            type: SET_ALERT,
            payload: {
                msg: "Updated profile succesfully!",
                alertType: "success"
            }
        })
        
        if(!edit){
            history("/dashboard");
        }
        
    } catch (error) {
        console.log(error);
    }
}

export {getProfile, createProfile};