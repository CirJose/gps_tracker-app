/* Reducer
 * handles states in the app
 */

import { createPersistentReducer, createReducer } from "../../../../store/createReducer";
import { initialState } from "../store/initialState";
import * as types from '../store/actionTypes';

export const usersReducer = createReducer(initialState, {
  [types.LISTA_USERS_REQUEST](state, action) {
    return {
      ...state,
      isChanging: true,
      showMsg: false,
      isError: false,
      message: '',
      listUsers: []
    };
  },
  [types.LISTA_USERS_RESPONSE](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: false,
      message: action.response.message,
      listUsers: action.response.result
    };
  },
  [types.LISTA_USERS_FAILED](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
  // DELETE
  [types.DELETE_USERS_REQUEST](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: false,
      message: '',
      listUsers: []
    };
  },
  [types.DELETE_USERS_RESPONSE](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: true,
      message: action.response.message,
    };
  },
  [types.DELETE_USERS_FAILED](state, action) {
    return {
      ...state,
      isError: true,
      showMsg: true,
      message: action.error.message
    };
  },
});