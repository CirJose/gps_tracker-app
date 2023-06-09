/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import listaOwnerSaga from "./listaOwnerSaga";
import deleteOwnerSaga from "./deleteOwnerSaga";

export const ownerSagas = [
    takeEvery(types.LISTA_OWNER_REQUEST, listaOwnerSaga),
    takeEvery(types.DELETE_OWNER_REQUEST, deleteOwnerSaga),
];