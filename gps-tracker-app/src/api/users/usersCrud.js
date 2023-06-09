import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LISTADO_USERS_URL = `${baseUrl}/user/list`;
export const DELETE_USERS_URL = `${baseUrl}/user/delete`;
export const UPDATE_USERS_URL = `${baseUrl}/user/update`;
export const CREATE_USERS_URL = `${baseUrl}/user/create`;

export function listadoUsers(payload) {
  return axios.post(LISTADO_USERS_URL, payload);
}

export function eliminarUsers(payload) {
  return axios.post(DELETE_USERS_URL, payload);
}

export function actualizarUsers(payload) {
  return axios.post(UPDATE_USERS_URL, payload);
}

export function crearUsers(payload) {
  return axios.post(CREATE_USERS_URL, payload);
}