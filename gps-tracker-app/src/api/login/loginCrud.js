import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const LOGIN_URL = `${baseUrl}/auth/login`;
export const REFRESH_URL = `${baseUrl}/auth/refresh`;
export const INTROSPECT_URL = `${baseUrl}/auth/introspect`;
export const REGISTER_URL = `${baseUrl}/auth/register`;
export const REQUEST_PASSWORD_URL = `${baseUrl}/auth/recuperar`;

export function login(email, pass) {
  return axios.post(LOGIN_URL, { email, pass });
}

export function refresh(refresh_token) {
  return axios.post(REFRESH_URL, { refresh_token }, { _retry: true });
}

export function introspect() {
  return axios.post(INTROSPECT_URL, {});
}

export function register(email, fullname, username, telefono, ruc, tempresa, password, acceptTerms) {

  return axios.post(REGISTER_URL, { email, fullname, username, telefono, ruc, tempresa, password, acceptTerms });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

