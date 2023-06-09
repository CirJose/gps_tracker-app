import * as types from './actionTypes';

// SETEAR
export function setearUserOwner(payload) {
    return {
        type: types.SET_USER_OWNER_REQUEST,
        payload,
    };
}

// CREATE
export function requestCreateUserOwner(payload) {
    return {
        type: types.CREATE_USER_OWNER_REQUEST,
        payload,
    };
}

export function createUserOwnerFailed(error) {
    return {
        type: types.CREATE_USER_OWNER_FAILED,
        error
    };
}

export function onCreateUserOwnerResponse(response) {
    return {
        type: types.CREATE_USER_OWNER_RESPONSE,
        response,
    };
}

// UPDATE
export function requestUpdateUserOwner(payload) {
    return {
        type: types.UPDATE_USER_OWNER_REQUEST,
        payload,
    };
}

export function updateUserOwnerFailed(error) {
    return {
        type: types.UPDATE_USER_OWNER_FAILED,
        error
    };
}

export function onUpdateUserOwnerResponse(response) {
    return {
        type: types.UPDATE_USER_OWNER_RESPONSE,
        response,
    };
}