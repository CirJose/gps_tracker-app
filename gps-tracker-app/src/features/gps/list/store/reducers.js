/* Reducer
 * handles states in the app
 */

import { createPersistentReducer, createReducer } from "../../../../store/createReducer";
import { initialState } from "./initialState";
import * as types from './actionTypes';

export const gpsReducer = createReducer(initialState, {
  [types.LISTA_GPS_REQUEST](state, action) {
    return {
      ...state,
      isChanging: true,
      showMsg: false,
      isError: false,
      message: '',
      listGps: []
    };
  },
  [types.LISTA_GPS_RESPONSE](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: false,
      message: action.response.message,
      listGps: action.response.result
    };
  },
  [types.LISTA_GPS_FAILED](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
  // DELETE
  [types.DELETE_GPS_REQUEST](state, action) {
    return {
      ...state,
      showMsg: false,
      isError: false,
      message: '',
      listGps: []
    };
  },
  [types.DELETE_GPS_RESPONSE](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: true,
      message: action.response.message,
    };
  },
  [types.DELETE_GPS_FAILED](state, action) {
    return {
      ...state,
      isError: true,
      showMsg: true,
      message: action.error.message
    };
  },
});