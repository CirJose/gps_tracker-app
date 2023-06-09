import * as types from './actionTypes';

// SETEAR
export function setearUsers(payload) {
    return {
        type: types.SET_USERS_REQUEST,
        payload,
    };
}

// CREATE
export function requestCreateUsers(payload) {
    return {
        type: types.CREATE_USERS_REQUEST,
        payload,
    };
}

export function createUsersFailed(error) {
    return {
        type: types.CREATE_USERS_FAILED,
        error
    };
}

export function onCreateUsersResponse(response) {
    return {
        type: types.CREATE_USERS_RESPONSE,
        response,
    };
}

// UPDATE
export function requestUpdateUsers(payload) {
    return {
        type: types.UPDATE_USERS_REQUEST,
        payload,
    };
}

export function updateUsersFailed(error) {
    return {
        type: types.UPDATE_USERS_FAILED,
        error
    };
}

export function onUpdateUsersResponse(response) {
    return {
        type: types.UPDATE_USERS_RESPONSE,
        response,
    };
}