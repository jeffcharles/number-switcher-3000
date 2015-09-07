'use strict';
import Immutable from 'immutable';
import { DISMISS_ALERT, QUERY_NUMBERS_SUCCESS, UPDATE_NUMBER_ATTEMPT, UPDATE_NUMBER_SUCCESS, UPDATE_NUMBER_FAIL } from './../actions/numbers';

export default function(state = Immutable.fromJS({}), action) {
  switch (action.type) {
  case DISMISS_ALERT:
    return state.merge({ saved: null, saveError: null });
  case QUERY_NUMBERS_SUCCESS:
    return state.set('numbers', action.numbers);
  case UPDATE_NUMBER_ATTEMPT:
    return state.set('isSaving', true);
  case UPDATE_NUMBER_SUCCESS:
    return state.merge(Immutable.Map({
      isSaving: false,
      numbers: state.get('numbers').map(
        n => n.set('active', n.get('number') === action.number)
      ),
      saved: true
    }));
  case UPDATE_NUMBER_FAIL:
    return state.merge(Immutable.Map({
      isSaving: false,
      saveError: action.err,
      saved: false
    }));
  default:
    return state;
  }
}
