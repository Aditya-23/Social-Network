import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILE_ERROR,
    LOADING,
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

        default:
            return state;
    }
}

export default profileReducer;