/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import createDeviceOwnerSaga from "./createDeviceOwnerSaga";
import updateDeviceOwnerSaga from "./updateDeviceOwnerSaga";

export const editDeviceOwnerSagas = [
    takeEvery(types.CREATE_DEVICE_OWNER_REQUEST, createDeviceOwnerSaga),
    takeEvery(types.UPDATE_DEVICE_OWNER_REQUEST, updateDeviceOwnerSaga),
];