/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import listaRolSaga from "./listaRolSaga";
import deleteRolSaga from "./deleteRolSaga";

export const rolSagas = [
    takeEvery(types.LISTA_ROL_REQUEST, listaRolSaga),
    takeEvery(types.DELETE_ROL_REQUEST, deleteRolSaga),
];