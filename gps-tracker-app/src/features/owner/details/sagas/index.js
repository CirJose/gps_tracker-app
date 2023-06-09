/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import createOwnerSaga from "./createOwnerSaga";
import updateOwnerSaga from "./updateOwnerSaga";

export const editOwnerSagas = [
    takeEvery(types.CREATE_OWNER_REQUEST, createOwnerSaga),
    takeEvery(types.UPDATE_OWNER_REQUEST, updateOwnerSaga),
];