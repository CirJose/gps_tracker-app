/* Login Reducer
 * handles login states in the app
 */

// import createReducer from '../../lib/createReducer';
import { createPersistentReducer, createReducer } from "../../../store/createReducer";
import { initialState } from "./initialState";
import * as types from './actionTypes';

export const loginReducer = createPersistentReducer(initialState, {

  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      authToken: undefined
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      isLoggedIn: true,
      authToken: action.response,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
      authToken: undefined
    };
  },
  [types.REFRESH_RESPONSE](state, action) {
    return {
      ...state,
      id: action.response.id,
      isLoggedIn: true,
      authToken: action.response.result
    };
  },
  [types.INTROSPECT_REQUEST](state, action) {
    return {
      ...state,
      userInfo: {}
    };
  },
  [types.INTROSPECT_RESPONSE](state, action) {
    return {
      ...state,
      userInfo: action.response.result
    };
  },
  [types.INTROSPECT_FAILED](state) {
    return {
      ...state,
    };
  },
}, "loginReducer");