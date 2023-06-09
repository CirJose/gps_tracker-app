/* Reducer
 * handles states in the app
 */

import { createPersistentReducer, createReducer } from "../../../../store/createReducer";
import { initialState } from "../store/initialState";
import * as types from '../store/actionTypes';

export const editUsersReducer = createReducer(initialState, {
  [types.SET_USERS_REQUEST](state, action) {
    return {
      ...state,
      showMsg: false,
      item: action.payload
    };
  },
  [types.CREATE_USERS_REQUEST](state, action) {
    return {
      ...state,
      isChanging: true,
      showMsg: false,
      isError: false,
      message: '',
      item: {}
    };
  },
  [types.CREATE_USERS_RESPONSE](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: false,
      message: action.response.message,
      item: action.response.result
    };
  },
  [types.CREATE_USERS_FAILED](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
  // UPDATE
  [types.UPDATE_USERS_REQUEST](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: false,
      message: '',
      item: {}
    };
  },
  [types.UPDATE_USERS_RESPONSE](state, action) {
    return {
      ...state,
      showMsg: true,
      isError: false,
      message: action.response.message,
    };
  },
  [types.UPDATE_USERS_FAILED](state, action) {
    return {
      ...state,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
});