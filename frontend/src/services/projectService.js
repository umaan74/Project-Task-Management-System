
import { API_URL } from "./api";

// 1. CREATE PROJECT
export async function createProject(organizationId, projectData, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    }
  );

  const data = await response.json();
  return { response, data };
}

// 2. GET ALL ORGANIZATION PROJECTS
export async function getProjects(organizationId, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}/projects`,
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

// 3. GET SINGLE PROJECT
export async function getSingleProject(projectId, token) {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { response, data };
}

// 4. UPDATE PROJECT
export async function updateProject(projectId, projectData, token) {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  const data = await response.json();
  return { response, data };
}

// 5. DELETE PROJECT
export async function deleteProject(projectId, token) {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return { response, data };
}
