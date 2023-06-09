/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import createUserOwnerSaga from "./createUserOwnerSaga";
import updateUserOwnerSaga from "./updateUserOwnerSaga";

export const editUserOwnerSagas = [
    takeEvery(types.CREATE_USER_OWNER_REQUEST, createUserOwnerSaga),
    takeEvery(types.UPDATE_USER_OWNER_REQUEST, updateUserOwnerSaga),
];