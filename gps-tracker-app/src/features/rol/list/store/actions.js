import * as types from './actionTypes';

// LIST
export function requestListaRol(payload) {
    return {
        type: types.LISTA_ROL_REQUEST,
        payload,
    };
}

export function listaRolFailed(error) {
    return {
        type: types.LISTA_ROL_FAILED,
        error
    };
}

export function onListaRolResponse(response) {
    return {
        type: types.LISTA_ROL_RESPONSE,
        response,
    };
}

// DELETE
export function requestDeleteRol(payload) {
    return {
        type: types.DELETE_ROL_REQUEST,
        payload,
    };
}

export function deleteRolFailed(error) {
    return {
        type: types.DELETE_ROL_FAILED,
        error
    };
}

export function onDeleteRolResponse(response) {
    return {
        type: types.DELETE_ROL_RESPONSE,
        response,
    };
}