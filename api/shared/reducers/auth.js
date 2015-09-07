'use strict';
import Immutable from 'immutable';
import { DISMISS_ALERT } from './../actions/alert';
import { LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_ATTEMPT, LOGOUT_SUCCESS, LOGOUT_FAIL } from './../actions/auth';

export default function(state = Immutable.fromJS({}), action) {
  switch (action.type) {
  case DISMISS_ALERT:
    return state.set('error', null);
  case LOGIN_ATTEMPT:
    return state.set('isLoggingIn', true);
  case LOGIN_SUCCESS:
    return state.merge({ actions: action.actions, error: null, isLoggingIn: false });
  case LOGIN_FAIL:
    return state.merge({ error: action.err, isLoggingIn: false });
  case LOGOUT_ATTEMPT:
    return state.set('isLoggingOut', true);
  case LOGOUT_SUCCESS:
    return state.merge({ actions: action.actions, error: null, isLoggingOut: false });
  case LOGOUT_FAIL:
    return state.merge({ error: action.err, isLoggingOut: false });
  default:
    return state;
  }
}
