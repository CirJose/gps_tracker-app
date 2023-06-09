import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reduxBatch } from "@manaflair/redux-batch";
import { persistStore } from "redux-persist";
import logger from 'redux-logger';
// import { rootReducer, rootSaga } from "./rootReducer";
import rootReducers from './reducers'; // where reducers is a object of reducers
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
// const middleware = [
//   ...getDefaultMiddleware({
//     immutableCheck: true,
//     serializableCheck: false,
//     thunk: true
//   }),
//   sagaMiddleware
// ];

// if (__DEV__) {
// if (process.env.REACT_APP_DEV) {
//   middleware.push(createLogger());
// }

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    let customMiddleware = getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: false
    }).concat(sagaMiddleware);

    if (process.env.REACT_APP_DEV) {
      customMiddleware.concat(logger);
    }

    return customMiddleware;
  },
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch]
});

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const configStore = () => {
  return { persistor, store };
};

export default configStore;
