import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/reducer';
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;