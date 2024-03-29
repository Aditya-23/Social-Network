import { REMOVE_ALERT, SET_ALERT } from './types';

export const setAlert = (message, alertType) => async dispatch => {
    console.log("aseaehyags")
    dispatch({
        type : SET_ALERT,
        payload : {
            msg: message,
            alertType: alertType
        }
    });
};

export const removeAlert = () => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
    })
}