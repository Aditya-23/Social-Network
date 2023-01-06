import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {setAuthToken} from '../utils'
import {setAlert} from './alert';
import {
    CREATE_EDUCATION,
    CREATE_EDUCATION_FAILED,
    CREATE_EXPERIENCE,
    CREATE_EXPERIENCE_FAILED,
    GET_PROFILE,
    GET_PROFILE_ERROR,
    LOADING,
    LOADING_DONE,
    REMOVE_ALERT,
    SET_ALERT,
    UPDATE_PROFILE
} from './types';

const getProfile = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    try {
        dispatch({type: LOADING});
        const response = await axios.get("api/profile");

        if (response.status == 200) {
            dispatch({
                type: GET_PROFILE,
                payload: {
                    profile: response.data
                }
            })
        } else if (response.status == 400 || response.status == 401 || response.status == 500) {
            dispatch({
                type: GET_PROFILE_ERROR,
                payload: {
                    error: response.data.msg
                }
            })
        }
        dispatch({type: LOADING_DONE})
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
    if (token) {
        setAuthToken(token);
    }

    const config = {
        headers: {
            'Content-Type': "application/json"
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
        "email": profileObj.email
    }
    try {
        var response;
        dispatch({type: LOADING});
        if (edit) {
            response = await axios.put("api/profile", profileObjToSend, config);
        } else {
            response = await axios.post("api/profile", profileObjToSend, config);
        }

        dispatch({
            type: GET_PROFILE,
            payload: {
                profile: response.data
            }
        });

        dispatch({type: LOADING_DONE});

        dispatch({
            type: SET_ALERT,
            payload: {
                msg: "Updated profile successfully!",
                alertType: "success"
            }
        });

        if (!edit) {
            history("/dashboard");
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_PROFILE_ERROR,
            payload: {
                profile: null
            }
        });
        dispatch({type: LOADING_DONE});
    }
}

const addEducation = (educationObj) => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    };

    try {
        dispatch({type: LOADING});
        const response = await axios.post("api/profile/education", educationObj, config);
        dispatch({type: CREATE_EDUCATION, payload: response.data});
        dispatch({type: LOADING_DONE});
        dispatch({
            type: SET_ALERT,
            payload: {
                msg: "Added education successfully",
                alertType: "success"
            }
        });
    } catch (AxiosError) {
        dispatch({type: CREATE_EDUCATION_FAILED});
        dispatch({type: LOADING_DONE});
    }
}

const addExperience = (experienceObj) => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    };

    try {
        dispatch({type: LOADING});
        const response = await axios.post("api/profile/experience", experienceObj, config);
        dispatch({type: CREATE_EXPERIENCE, payload: response.data});
        dispatch({type: LOADING_DONE});
        dispatch({
            type: SET_ALERT,
            payload: {
                msg: "Added experience successfully",
                alertType: "success"
            }
        });
    } catch (AxiosError) {
        dispatch({type: CREATE_EXPERIENCE_FAILED});
        dispatch({type: LOADING_DONE});
    }
}

const deleteExperience = (id) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
        dispatch({type: LOADING});
        const response = await axios.delete("api/profile/experience/" + id);
        // const profileResponse = await axios.get("api/profile");
        if(response.status == 200){
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            });
        }
        dispatch({type: LOADING_DONE});

    } catch (AxiosError) {
        dispatch({type: LOADING_DONE});
    }
}

export {getProfile, createProfile, addEducation, addExperience, deleteExperience};