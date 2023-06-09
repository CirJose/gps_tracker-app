import * as types from './actionTypes';

// SETEAR
export function setearRol(payload) {
    return {
        type: types.SET_ROL_REQUEST,
        payload,
    };
}

// CREATE
export function requestCreateRol(payload) {
    return {
        type: types.CREATE_ROL_REQUEST,
        payload,
    };
}

export function createRolFailed(error) {
    return {
        type: types.CREATE_ROL_FAILED,
        error
    };
}

export function onCreateRolResponse(response) {
    return {
        type: types.CREATE_ROL_RESPONSE,
        response,
    };
}

// UPDATE
export function requestUpdateRol(payload) {
    return {
        type: types.UPDATE_ROL_REQUEST,
        payload,
    };
}

export function updateRolFailed(error) {
    return {
        type: types.UPDATE_ROL_FAILED,
        error
    };
}

export function onUpdateRolResponse(response) {
    return {
        type: types.UPDATE_ROL_RESPONSE,
        response,
    };
}