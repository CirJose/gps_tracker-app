import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LISTADO_ROL_URL = `${baseUrl}/rol/list`;
export const DELETE_ROL_URL = `${baseUrl}/rol/delete`;
export const UPDATE_ROL_URL = `${baseUrl}/rol/update`;
export const CREATE_ROL_URL = `${baseUrl}/rol/create`;

export function listadoRol(payload) {
  return axios.post(LISTADO_ROL_URL, payload);
}

export function eliminarRol(payload) {
  return axios.post(DELETE_ROL_URL, payload);
}

export function actualizarRol(payload) {
  return axios.post(UPDATE_ROL_URL, payload);
}

export function crearRol(payload) {
  return axios.post(CREATE_ROL_URL, payload);
}