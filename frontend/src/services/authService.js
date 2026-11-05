
import { API_URL } from "./api";


// Golden rule: Jab bhi kisi API ko browser ki cookies send karni ho ya response mein cookies receive karni ho, credentials: "include" use karo.
// Register User
export async function registerUser(username, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  return { response, data };
}

// Login User
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  return { response, data };
}

// Refresh Access Token
export async function refreshToken() {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return { response, data };
}

// Logout User
export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return { response, data };
}

// Logout From All Devices
export async function logoutAll() {
  const response = await fetch(`${API_URL}/auth/logout-all`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return { response, data };
}
