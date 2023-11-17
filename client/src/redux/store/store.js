import { createStore, applyMiddleware,compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducer/reducer';
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    rootReducer,
    composeWithDevTools(composeEnhancer(applyMiddleware(thunkMiddleware))),
    
);

export default store;