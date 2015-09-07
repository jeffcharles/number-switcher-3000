'use strict';
import { combineReducers } from 'redux';
import auth from './auth';
import numbers from './numbers';

const reducers = combineReducers({ auth, numbers });
export default reducers;
