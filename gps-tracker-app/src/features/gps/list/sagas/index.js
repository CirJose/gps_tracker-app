/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import listaGpsSaga from "./listaGpsSaga";
import deleteGpsSaga from "./deleteGpsSaga";

export const gpsSagas = [
    takeEvery(types.LISTA_GPS_REQUEST, listaGpsSaga),
    takeEvery(types.DELETE_GPS_REQUEST, deleteGpsSaga),
];