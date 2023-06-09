/*
 * Will dynamically create reducers
 * enforcing a unique way to describe reducers
 */

import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";

const createPersistentReducer = function (initialState, handlers, storeKey = "dummy") {
  const customPersistConfig = { ...persistConfig, key: storeKey };
  return persistReducer(customPersistConfig, function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  });
}

const createReducer = function (initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export { createPersistentReducer, createReducer }