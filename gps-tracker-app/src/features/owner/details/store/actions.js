import * as types from './actionTypes';

// SETEAR
export function setearOwner(payload) {
    return {
        type: types.SET_OWNER_REQUEST,
        payload,
    };
}

// CREATE
export function requestCreateOwner(payload) {
    return {
        type: types.CREATE_OWNER_REQUEST,
        payload,
    };
}

export function createOwnerFailed(error) {
    return {
        type: types.CREATE_OWNER_FAILED,
        error
    };
}

export function onCreateOwnerResponse(response) {
    return {
        type: types.CREATE_OWNER_RESPONSE,
        response,
    };
}

// UPDATE
export function requestUpdateOwner(payload) {
    return {
        type: types.UPDATE_OWNER_REQUEST,
        payload,
    };
}

export function updateOwnerFailed(error) {
    return {
        type: types.UPDATE_OWNER_FAILED,
        error
    };
}

export function onUpdateOwnerResponse(response) {
    return {
        type: types.UPDATE_OWNER_RESPONSE,
        response,
    };
}