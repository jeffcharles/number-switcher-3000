'use strict';
import Immutable from 'immutable';
import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGOUT_ATTEMPT, LOGOUT_SUCCESS } from './../actions/auth';

export default function(state = Immutable.fromJS({}), action) {
  switch (action.type) {
  case LOGIN_ATTEMPT:
    return state.set('isLoggingIn', true);
  case LOGIN_SUCCESS:
    return state.merge({ actions: action.actions, isLoggingIn: false });
  case LOGOUT_ATTEMPT:
    return state.set('isLoggingOut', true);
  case LOGOUT_SUCCESS:
    return state.merge({ actions: action.actions, isLoggingOut: false });
  default:
    return state;
  }
}
