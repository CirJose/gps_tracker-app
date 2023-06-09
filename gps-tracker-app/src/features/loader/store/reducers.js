/* Loader Reducer
 * handles loader states
 */

import { createPersistentReducer, createReducer } from "../../../store/createReducer";
import { initialState } from "./initialState";
import { ENABLE_LOADER, DISABLE_LOADER } from './actionTypes';

export const loaderReducer = createReducer(initialState, {
  [ENABLE_LOADER](state, action) {
    return {
      ...state,
      isLoading: true
    };
  },
  [DISABLE_LOADER](state, action) {
    return {
      ...state,
      isLoading: false
    };
  },
});