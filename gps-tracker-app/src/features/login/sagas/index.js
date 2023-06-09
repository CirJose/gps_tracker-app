/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import { LOGIN_REQUEST, INTROSPECT_REQUEST } from '../store/actionTypes';
import { introspectAsync, loginAsync } from './loginSaga';

export const loginSagas = [
    takeEvery(LOGIN_REQUEST, loginAsync),
    takeEvery(INTROSPECT_REQUEST, introspectAsync)
];
