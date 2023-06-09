import * as types from './actionTypes';

// LIST
export function requestListaOwner(payload) {
    return {
        type: types.LISTA_OWNER_REQUEST,
        payload,
    };
}

export function listaOwnerFailed(error) {
    return {
        type: types.LISTA_OWNER_FAILED,
        error
    };
}

export function onListaOwnerResponse(response) {
    return {
        type: types.LISTA_OWNER_RESPONSE,
        response,
    };
}

// DELETE
export function requestDeleteOwner(payload) {
    return {
        type: types.DELETE_OWNER_REQUEST,
        payload,
    };
}

export function deleteOwnerFailed(error) {
    return {
        type: types.DELETE_OWNER_FAILED,
        error
    };
}

export function onDeleteOwnerResponse(response) {
    return {
        type: types.DELETE_OWNER_RESPONSE,
        response,
    };
}