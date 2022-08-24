import { v4 } from 'uuid';

export const setAlert = (message, alertType) => dispatch => {
    const id = v4();
    dispatch({
        type : 'SET_ALERT',
        payload : {
            id,
            message,
            alertType
        }
    });
    setTimeout(() => dispatch({
        type : 'REMOVE_ALERT',
        payload : {
            id,
            message,
            alertType
        }
    }), 5000);
};