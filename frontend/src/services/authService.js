
import { API_URL } from "./api";

// REGISTER USER
export async function registerUser(username, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  return { response, data };
}

// LOGIN USER
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  return { response, data };
}

// REFRESH ACCESS TOKEN
export async function refreshToken() {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  return { response, data };
}

// GET CURRENT LOGGED-IN USER
export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { response, data };
}

// LOGOUT USER
export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  return { response, data };
}

// LOGOUT FROM ALL DEVICES
export async function logoutAll() {
  const response = await fetch(`${API_URL}/auth/logout-all`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  return { response, data };
}
