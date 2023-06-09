import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LISTADO_USER_OWNER_URL = `${baseUrl}/user_owner/list`;
export const DELETE_USER_OWNER_URL = `${baseUrl}/user_owner/delete`;
export const UPDATE_USER_OWNER_URL = `${baseUrl}/user_owner/update`;
export const CREATE_USER_OWNER_URL = `${baseUrl}/user_owner/create`;

export function listadoUserOwner(payload) {
  return axios.post(LISTADO_USER_OWNER_URL, payload);
}

export function eliminarUserOwner(payload) {
  return axios.post(DELETE_USER_OWNER_URL, payload);
}

export function actualizarUserOwner(payload) {
  return axios.post(UPDATE_USER_OWNER_URL, payload);
}

export function crearUserOwner(payload) {
  return axios.post(CREATE_USER_OWNER_URL, payload);
}