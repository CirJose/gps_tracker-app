import * as types from './actionTypes';

// LIST
export function requestListaGps(payload) {
    return {
        type: types.LISTA_GPS_REQUEST,
        payload,
    };
}

export function listaGpsFailed(error) {
    return {
        type: types.LISTA_GPS_FAILED,
        error
    };
}

export function onListaGpsResponse(response) {
    return {
        type: types.LISTA_GPS_RESPONSE,
        response,
    };
}

// DELETE
export function requestDeleteGps(payload) {
    return {
        type: types.DELETE_GPS_REQUEST,
        payload,
    };
}

export function deleteGpsFailed(error) {
    return {
        type: types.DELETE_GPS_FAILED,
        error
    };
}

export function onDeleteGpsResponse(response) {
    return {
        type: types.DELETE_GPS_RESPONSE,
        response,
    };
}