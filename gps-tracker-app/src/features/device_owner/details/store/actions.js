import * as types from './actionTypes';

// SETEAR
export function setearDeviceOwner(payload) {
    return {
        type: types.SET_DEVICE_OWNER_REQUEST,
        payload,
    };
}

// CREATE
export function requestCreateDeviceOwner(payload) {
    return {
        type: types.CREATE_DEVICE_OWNER_REQUEST,
        payload,
    };
}

export function createDeviceOwnerFailed(error) {
    return {
        type: types.CREATE_DEVICE_OWNER_FAILED,
        error
    };
}

export function onCreateDeviceOwnerResponse(response) {
    return {
        type: types.CREATE_DEVICE_OWNER_RESPONSE,
        response,
    };
}

// UPDATE
export function requestUpdateDeviceOwner(payload) {
    return {
        type: types.UPDATE_DEVICE_OWNER_REQUEST,
        payload,
    };
}

export function updateDeviceOwnerFailed(error) {
    return {
        type: types.UPDATE_DEVICE_OWNER_FAILED,
        error
    };
}

export function onUpdateDeviceOwnerResponse(response) {
    return {
        type: types.UPDATE_DEVICE_OWNER_RESPONSE,
        response,
    };
}