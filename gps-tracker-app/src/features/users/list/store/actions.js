import * as types from './actionTypes';

// LIST
export function requestListaUsers(payload) {
    return {
        type: types.LISTA_USERS_REQUEST,
        payload,
    };
}

export function listaUsersFailed(error) {
    return {
        type: types.LISTA_USERS_FAILED,
        error
    };
}

export function onListaUsersResponse(response) {
    return {
        type: types.LISTA_USERS_RESPONSE,
        response,
    };
}

// DELETE
export function requestDeleteUsers(payload) {
    return {
        type: types.DELETE_USERS_REQUEST,
        payload,
    };
}

export function deleteUsersFailed(error) {
    return {
        type: types.DELETE_USERS_FAILED,
        error
    };
}

export function onDeleteUsersResponse(response) {
    return {
        type: types.DELETE_USERS_RESPONSE,
        response,
    };
}