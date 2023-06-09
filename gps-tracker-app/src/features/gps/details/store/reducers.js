/* Reducer
 * handles states in the app
 */

import { createPersistentReducer, createReducer } from "../../../../store/createReducer";
import { initialState } from "../store/initialState";
import * as types from '../store/actionTypes';

export const editGpsReducer = createReducer(initialState, {
  [types.SET_GPS_REQUEST](state, action) {
    return {
      ...state,
      showMsg: false,
      item: action.payload
    };
  },
  [types.CREATE_GPS_REQUEST](state, action) {
    return {
      ...state,
      isChanging: true,
      showMsg: false,
      isError: false,
      message: '',
      item: {}
    };
  },
  [types.CREATE_GPS_RESPONSE](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: false,
      message: action.response.message,
      item: action.response.result
    };
  },
  [types.CREATE_GPS_FAILED](state, action) {
    return {
      ...state,
      isChanging: false,
      showMsg: true,
      isError: true,
      message: action.error.message
    };
  },
  // UPDATE
  [types.UPDATE_GPS_REQUEST](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: false,
      message: '',
      item: {}
    };
  },
  [types.UPDATE_GPS_RESPONSE](state, action) {
    return {
      ...state,
      isError: false,
      showMsg: true,
      message: action.response.message,
    };
  },
  [types.UPDATE_GPS_FAILED](state, action) {
    return {
      ...state,
      isError: true,
      showMsg: true,
      message: action.error.message
    };
  },
});