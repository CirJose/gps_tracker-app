/*
 * Reducer actions related with login
 */
import * as types from './actionTypes';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

export function onRefreshResponse(response) {
  return {
    type: types.REFRESH_RESPONSE,
    response,
  };
}

// Funcionalidad de introspección (consulta de datos usuario)
export function requestIntrospect() {
  return {
    type: types.INTROSPECT_REQUEST
  };
}

export function onIntrospectResponse(response) {
  return {
    type: types.INTROSPECT_RESPONSE,
    response,
  };
}

export function introspectFailed() {
  return {
    type: types.INTROSPECT_FAILED,
  };
}