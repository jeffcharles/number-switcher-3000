'use strict';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export default initialState => createStoreWithMiddleware(reducer, initialState);
