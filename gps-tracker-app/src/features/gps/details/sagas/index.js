/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import createGpsSaga from "./createGpsSaga";
import updateGpsSaga from "./updateGpsSaga";

export const editGpsSagas = [
    takeEvery(types.CREATE_GPS_REQUEST, createGpsSaga),
    takeEvery(types.UPDATE_GPS_REQUEST, updateGpsSaga),
];