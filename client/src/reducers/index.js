import {combineReducers} from 'redux';
import alertReducer from './alert';
import auth from './auth';
import profileReducer from './profile';

export default combineReducers({
    alertReducer,
    auth,
    profileReducer
});