/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import listaUserOwnerSaga from "./listaUserOwnerSaga";
import deleteUserOwnerSaga from "./deleteUserOwnerSaga";

export const userOwnerSagas = [
    takeEvery(types.LISTA_USER_OWNER_REQUEST, listaUserOwnerSaga),
    takeEvery(types.DELETE_USER_OWNER_REQUEST, deleteUserOwnerSaga),
];