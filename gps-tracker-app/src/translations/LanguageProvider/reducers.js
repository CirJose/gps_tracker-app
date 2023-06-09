/*
 *
 * LanguageProvider reducer
 *
 */

import { createPersistentReducer, createReducer } from "../../store/createReducer";
import * as types from './actionTypes';
import { initialState } from "./initialState";

export const languageProviderReducer = createPersistentReducer(initialState, {
  [types.CHANGE_LOCALE](state, action) {
    return {
      ...state,
      locale: action.locale,
      country: action.country,
      language: action.language
    };
  },
}, "languageProviderReducer");