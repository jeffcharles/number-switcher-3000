'use strict';
import Immutable from 'immutable';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './../actions/auth';

export default function(state = Immutable.fromJS({}), action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return state.set('actions', action.actions);
  case LOGOUT_SUCCESS:
    return state.set('actions', action.actions);
  default:
    return state;
  }
}
