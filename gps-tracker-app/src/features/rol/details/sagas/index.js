/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import createRolSaga from "./createRolSaga";
import updateRolSaga from "./updateRolSaga";

export const editRolSagas = [
    takeEvery(types.CREATE_ROL_REQUEST, createRolSaga),
    takeEvery(types.UPDATE_ROL_REQUEST, updateRolSaga),
];