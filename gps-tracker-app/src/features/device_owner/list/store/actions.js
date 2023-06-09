import * as types from './actionTypes';

// LIST
export function requestListaDeviceOwner(payload) {
    return {
        type: types.LISTA_DEVICE_OWNER_REQUEST,
        payload,
    };
}

export function listaDeviceOwnerFailed(error) {
    return {
        type: types.LISTA_DEVICE_OWNER_FAILED,
        error
    };
}

export function onListaDeviceOwnerResponse(response) {
    return {
        type: types.LISTA_DEVICE_OWNER_RESPONSE,
        response,
    };
}

// DELETE
export function requestDeleteDeviceOwner(payload) {
    return {
        type: types.DELETE_DEVICE_OWNER_REQUEST,
        payload,
    };
}

export function deleteDeviceOwnerFailed(error) {
    return {
        type: types.DELETE_DEVICE_OWNER_FAILED,
        error
    };
}

export function onDeleteDeviceOwnerResponse(response) {
    return {
        type: types.DELETE_DEVICE_OWNER_RESPONSE,
        response,
    };
}