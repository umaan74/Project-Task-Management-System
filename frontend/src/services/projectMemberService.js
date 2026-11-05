
import { API_URL } from "./api";

// 1. ADD MEMBER TO PROJECT
export async function addProjectMember(projectId, userId, token) {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  const data = await response.json();
  return { response, data };
}

// 2. GET ALL PROJECT MEMBERS
export async function getProjectMembers(projectId, token) {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/members`,
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

// 3. REMOVE MEMBER FROM PROJECT
export async function removeProjectMember(projectId, userId, token) {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/members/${userId}`,
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
