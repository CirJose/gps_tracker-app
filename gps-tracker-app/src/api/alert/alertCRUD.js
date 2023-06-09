import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

// Device Owner URLs
export const LISTADO_DEVICE_OWNER_URL = `${baseUrl}/device_owner/list`;
export const DELETE_DEVICE_OWNER_URL = `${baseUrl}/device_owner/delete`;
export const UPDATE_DEVICE_OWNER_URL = `${baseUrl}/device_owner/update`;
export const CREATE_DEVICE_OWNER_URL = `${baseUrl}/device_owner/create`;

// Alert URLs
export const HISTORIAL_ALERT_URL = `${baseUrl}/alert/historial`;
export const FUGA_ALERT_URL = `${baseUrl}/alert/fuga`;
export const AGRUPACION_ALERT_URL = `${baseUrl}/alert/agrupacion`;

// Device Owner API calls
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

// Alert API calls
export function historialAlertas(payload) {
  return axios.post(HISTORIAL_ALERT_URL, payload);
}

export function fugaAlert(payload) {
  return axios.post(FUGA_ALERT_URL, payload);
}

export function agrupacionAlert(payload) {
  return axios.post(AGRUPACION_ALERT_URL, payload);
}
