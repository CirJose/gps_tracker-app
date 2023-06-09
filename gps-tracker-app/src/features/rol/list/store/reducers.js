/* Reducer
 * handles states in the app
 */

import { createPersistentReducer, createReducer } from "../../../../store/createReducer";
import { initialState } from "./initialState";
import * as types from './actionTypes';

export const rolReducer = createReducer(initialState, {
  [types.LISTA_ROL_REQUEST](state, action) {
    return {
      ...state,
      isChanging: true,
      showMsg: false,
      isError: false,
      message: '',
      listRol: []
    };
  },
  [types.LISTA_ROL_RESPONSE](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: false,
      message: action.response.message,
      listRol: action.response.result
    };
  },
  [types.LISTA_ROL_FAILED](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
  // DELETE
  [types.DELETE_ROL_REQUEST](state, action) {
    return {
      ...state,
      showMsg: false,
      isError: false,
      message: '',
      listRol: []
    };
  },
  [types.DELETE_ROL_RESPONSE](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: true,
      message: action.response.message,
    };
  },
  [types.DELETE_ROL_FAILED](state, action) {
    return {
      ...state,
      isError: true,
      showMsg: true,
      message: action.error.message
    };
  },
});