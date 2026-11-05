
import { API_URL } from "./api";

// 1. CREATE ORGANIZATION
export async function createOrganization(organizationName, token) {
  const response = await fetch(`${API_URL}/organizations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ organizationName }),
  });

  const data = await response.json();
  return { response, data };
}

// 2. GET ALL USER ORGANIZATIONS
export async function getOrganizations(token) {
  const response = await fetch(`${API_URL}/organizations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { response, data };
}

// 3. GET SINGLE ORGANIZATION
export async function getOrganization(organizationId, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return { response, data };
}

// 4. UPDATE ORGANIZATION
export async function updateOrganization(organizationId, newName, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newName }),
    }
  );

  const data = await response.json();
  return { response, data };
}

// 5. DELETE ORGANIZATION
export async function deleteOrganization(organizationId, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return { response, data };
}
