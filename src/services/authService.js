import jwtDecode from "jwt-decode";
import http from "./httpServices";

const apiEndPoint = "/auth/login";
const token = "token";

http.setJwt(getJwt());

export async function login(body) {
  const { data: jwt } = await http.post(apiEndPoint, body);
  localStorage.setItem(token, jwt.access_token);
}

export function logout() {
  localStorage.removeItem(token);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(token);
}

const authServcice = { login, logout, getCurrentUser, getJwt };

export default authServcice;
