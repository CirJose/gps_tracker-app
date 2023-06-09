/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import listaUsersSaga from "./listaUsersSaga";
import deleteUsersSaga from "./deleteUsersSaga";

export const usersSagas = [
    takeEvery(types.LISTA_USERS_REQUEST, listaUsersSaga),
    takeEvery(types.DELETE_USERS_REQUEST, deleteUsersSaga),
];