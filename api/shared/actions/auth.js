'use strict';
import Immutable from 'immutable';
import request from 'superagent';

function getActions() {
  return request.get('/api')
    .then(res => Immutable.fromJS(res.body.actions));
}

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
function loginAttempt(loginToken) {
  return {
    type: LOGIN_ATTEMPT,
    loginToken
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(actions) {
  return {
    type: LOGIN_SUCCESS,
    actions
  };
}

export const LOGIN_FAIL = 'LOGIN_FAIL';
function loginFail(err) {
  return {
    type: LOGIN_FAIL,
    err
  };
}

export function login(loginToken) {
  return dispatch => {
    dispatch(loginAttempt(loginToken));
    return request.post('/api/login')
      .set('content-type', 'application/json')
      .send({ loginToken })
      .then(getActions)
      .then(actions => {
        dispatch(loginSuccess(actions));
      })
      .catch(err => {
        dispatch(loginFail(err));
      });
  };
}

export const LOGOUT_ATTEMPT = 'LOGOUT_ATTEMPT';
function logoutAttempt() {
  return {
    type: LOGOUT_ATTEMPT
  };
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
function logoutSuccess(actions) {
  return {
    type: LOGOUT_SUCCESS,
    actions
  };
}

export const LOGOUT_FAIL = 'LOGOUT_FAIL';
function logoutFail(err) {
  return {
    type: LOGOUT_FAIL,
    err
  };
}

export function logout() {
  return dispatch => {
    dispatch(logoutAttempt());
    return request.post('/api/logout')
      .then(getActions)
      .then(actions => {
        dispatch(logoutSuccess(actions));
      })
      .catch(err => {
        dispatch(logoutFail(err));
      });
  };
}
