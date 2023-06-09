import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LISTADO_GPS_URL = `${baseUrl}/gps/list`;
export const DELETE_GPS_URL = `${baseUrl}/gps/delete`;
export const UPDATE_GPS_URL = `${baseUrl}/gps/update`;
export const CREATE_GPS_URL = `${baseUrl}/gps/create`;

export function listadoGps(payload) {
  return axios.post(LISTADO_GPS_URL, payload);
}

export function eliminarGps(payload) {
  return axios.post(DELETE_GPS_URL, payload);
}

export function actualizarGps(payload) {
  return axios.post(UPDATE_GPS_URL, payload);
}

export function crearGps(payload) {
  return axios.post(CREATE_GPS_URL, payload);
}