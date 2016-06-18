'use strict';
import Immutable from 'immutable';
import request from 'superagent';

export const QUERY_NUMBERS_ATTEMPT = 'QUERY_NUMBERS_ATTEMPT';
function queryNumbersAttempt() {
  return {
    type: QUERY_NUMBERS_ATTEMPT
  };
}

export const QUERY_NUMBERS_SUCCESS = 'QUERY_NUMBERS_SUCCESS';
function queryNumbersSuccess(numbers) {
  return {
    type: QUERY_NUMBERS_SUCCESS,
    numbers
  };
}

export const QUERY_NUMBERS_FAIL = 'QUERY_NUMBERS_FAIL';
function queryNumbersFail(err) {
  return {
    type: QUERY_NUMBERS_FAIL,
    err
  };
}

export function queryNumbers() {
  return dispatch => {
    dispatch(queryNumbersAttempt());
    return request.get('/api/phonenumbers')
      .then(res => {
        dispatch(queryNumbersSuccess(Immutable.fromJS(res.body.numbers)));
      })
      .catch(err => {
        dispatch(queryNumbersFail(err));
      });
  };
}

export const UPDATE_NUMBER_ATTEMPT = 'UPDATE_NUMBER_ATTEMPT';
function updateNumberAttempt() {
  return {
    type: UPDATE_NUMBER_ATTEMPT
  };
}

export const UPDATE_NUMBER_SUCCESS = 'UPDATE_NUMBER_SUCCESS';
function updateNumberSuccess(number) {
  return {
    type: UPDATE_NUMBER_SUCCESS,
    number
  };
}

export const UPDATE_NUMBER_FAIL = 'UPDATE_NUMBER_FAIL';
function updateNumberFail(err) {
  return {
    type: UPDATE_NUMBER_FAIL,
    err
  };
}

export function updateNumber(number) {
  return dispatch => {
    dispatch(updateNumberAttempt());
    return request.put('/api/activephonenumber')
      .set('content-type', 'application/json')
      .send({ number })
      .then(() => {
        dispatch(updateNumberSuccess(number));
      })
      .catch(err => {
        dispatch(updateNumberFail(err));
      });
  };
}
