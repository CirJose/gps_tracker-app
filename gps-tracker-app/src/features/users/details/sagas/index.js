/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import createUsersSaga from "./createUsersSaga";
import updateUsersSaga from "./updateUsersSaga";

export const editUsersSagas = [
    takeEvery(types.CREATE_USERS_REQUEST, createUsersSaga),
    takeEvery(types.UPDATE_USERS_REQUEST, updateUsersSaga),
];