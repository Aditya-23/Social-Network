
const initialState = []

// This is where the state variables are updated
const alertReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case 'SET_ALERT' :
            return [...state, payload];
        case 'REMOVE_ALERT' :
            return state.filter(item => item.id != payload.id);
        default : 
            return state;
    }
};

export default alertReducer;