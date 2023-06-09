import * as types from './actionTypes';

// SETEAR
export function setearGps(payload) {
    return {
        type: types.SET_GPS_REQUEST,
        payload,
    };
}

// CREATE
export function requestCreateGps(payload) {
    return {
        type: types.CREATE_GPS_REQUEST,
        payload,
    };
}

export function createGpsFailed(error) {
    return {
        type: types.CREATE_GPS_FAILED,
        error
    };
}

export function onCreateGpsResponse(response) {
    return {
        type: types.CREATE_GPS_RESPONSE,
        response,
    };
}

// UPDATE
export function requestUpdateGps(payload) {
    return {
        type: types.UPDATE_GPS_REQUEST,
        payload,
    };
}

export function updateGpsFailed(error) {
    return {
        type: types.UPDATE_GPS_FAILED,
        error
    };
}

export function onUpdateGpsResponse(response) {
    return {
        type: types.UPDATE_GPS_RESPONSE,
        response,
    };
}