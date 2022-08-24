import {createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import rootReducer from './reducers';

// Use CreateStore itself and ignore everyone else's opinion :)
const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;