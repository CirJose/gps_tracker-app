import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LISTADO_OWNER_URL = `${baseUrl}/owner/list`;
export const DELETE_OWNER_URL = `${baseUrl}/owner/delete`;
export const UPDATE_OWNER_URL = `${baseUrl}/owner/update`;
export const CREATE_OWNER_URL = `${baseUrl}/owner/create`;

export function listadoOwner(payload) {
  return axios.post(LISTADO_OWNER_URL, payload);
}

export function eliminarOwner(payload) {
  return axios.post(DELETE_OWNER_URL, payload);
}

export function actualizarOwner(payload) {
  return axios.post(UPDATE_OWNER_URL, payload);
}

export function crearOwner(payload) {
  return axios.post(CREATE_OWNER_URL, payload);
}