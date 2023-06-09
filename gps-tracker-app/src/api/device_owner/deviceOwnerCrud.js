import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LISTADO_DEVICE_OWNER_URL = `${baseUrl}/device_owner/list`;
export const DELETE_DEVICE_OWNER_URL = `${baseUrl}/device_owner/delete`;
export const UPDATE_DEVICE_OWNER_URL = `${baseUrl}/device_owner/update`;
export const CREATE_DEVICE_OWNER_URL = `${baseUrl}/device_owner/create`;

export function listadoDeviceOwner(payload) {
  return axios.post(LISTADO_DEVICE_OWNER_URL, payload);
}

export function eliminarDeviceOwner(payload) {
  return axios.post(DELETE_DEVICE_OWNER_URL, payload);
}

export function actualizarDeviceOwner(payload) {
  return axios.post(UPDATE_DEVICE_OWNER_URL, payload);
}

export function crearDeviceOwner(payload) {
  return axios.post(CREATE_DEVICE_OWNER_URL, payload);
}