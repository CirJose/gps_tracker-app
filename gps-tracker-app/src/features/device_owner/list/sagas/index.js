/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import listaUserOwnerSaga from "./listaDeviceOwnerSaga";
import deleteUserOwnerSaga from "./deleteDeviceOwnerSaga";

export const deviceOwnerSagas = [
    takeEvery(types.LISTA_DEVICE_OWNER_REQUEST, listaUserOwnerSaga),
    takeEvery(types.DELETE_DEVICE_OWNER_REQUEST, deleteUserOwnerSaga),
];