import * as types from './actionTypes';

// LIST
export function requestListaUserOwner(payload) {
    return {
        type: types.LISTA_USER_OWNER_REQUEST,
        payload,
    };
}

export function listaUserOwnerFailed(error) {
    return {
        type: types.LISTA_USER_OWNER_FAILED,
        error
    };
}

export function onListaUserOwnerResponse(response) {
    return {
        type: types.LISTA_USER_OWNER_RESPONSE,
        response,
    };
}

// DELETE
export function requestDeleteUserOwner(payload) {
    return {
        type: types.DELETE_USER_OWNER_REQUEST,
        payload,
    };
}

export function deleteUserOwnerFailed(error) {
    return {
        type: types.DELETE_USER_OWNER_FAILED,
        error
    };
}

export function onDeleteUserOwnerResponse(response) {
    return {
        type: types.DELETE_USER_OWNER_RESPONSE,
        response,
    };
}