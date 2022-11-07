import {
    CLEAR_PROFILE,
    CREATE_EDUCATION,
    CREATE_EDUCATION_FAILED,
    CREATE_EXPERIENCE,
    GET_PROFILE,
    GET_PROFILE_ERROR,
    LOADING,
    CREATE_EXPERIENCE_FAILED,
    LOADING_DONE
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: null
}

const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            }

        case LOADING_DONE:
            return {
                ...state,
                loading: false,
            }

        case GET_PROFILE:
            return {
                profile: payload.profile,
                loading: false
            }

        case GET_PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                error: payload.error
            }

        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading: false
            }

        case CREATE_EDUCATION:
            return {
                ...state,
                profile: payload.profile,
                loading: false
            }
        
        case CREATE_EDUCATION_FAILED:
            return {
                ...state,
                loading: false,
                profile: null
            }

        case CREATE_EXPERIENCE:
            return {
                ...state,
                profile: payload.profile,
                loading: false
            }
        
        case CREATE_EXPERIENCE_FAILED:
            return {
                ...state,
                loading: false,
                profile: null
            }  
              
        default:
            return state;
    }
}

export default profileReducer;