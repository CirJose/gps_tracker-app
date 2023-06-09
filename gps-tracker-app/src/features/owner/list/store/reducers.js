/* Reducer
 * handles states in the app
 */

import { createPersistentReducer, createReducer } from "../../../../store/createReducer";
import { initialState } from "./initialState";
import * as types from './actionTypes';

export const ownerReducer = createReducer(initialState, {
  [types.LISTA_OWNER_REQUEST](state, action) {
    return {
      ...state,
      isChanging: true,
      showMsg: false,
      isError: false,
      message: '',
      listOwner: []
    };
  },
  [types.LISTA_OWNER_RESPONSE](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: false,
      message: action.response.message,
      listOwner: action.response.result
    };
  },
  [types.LISTA_OWNER_FAILED](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
  // DELETE
  [types.DELETE_OWNER_REQUEST](state, action) {
    return {
      ...state,
      showMsg: false,
      isError: false,
      message: '',
      listOwner: []
    };
  },
  [types.DELETE_OWNER_RESPONSE](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: true,
      message: action.response.message,
    };
  },
  [types.DELETE_OWNER_FAILED](state, action) {
    return {
      ...state,
      isError: true,
      showMsg: true,
      message: action.error.message
    };
  },
});