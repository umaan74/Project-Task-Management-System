
import { API_URL } from "./api";

// 1. CREATE TASK
export async function createTask(projectId, taskData, token) {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    }
  );

  const data = await response.json();
  return { response, data };
}

// 2. GET ALL PROJECT TASKS
export async function getProjectTasks(projectId, token) {
  const response = await fetch(
    `${API_URL}/projects/${projectId}/tasks`,
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

// 3. GET SINGLE TASK
export async function getTask(taskId, token) {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}`,
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

// 4. UPDATE TASK STATUS
export async function updateTask(taskId, status, token) {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();
  return { response, data };
}

// 5. ASSIGN TASK
export async function assignTask(taskId, userId, token) {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}/assign`,
    {
      method: "PATCH",
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

// 6. DELETE TASK
export async function deleteTask(taskId, token) {
  const response = await fetch(
    `${API_URL}/tasks/${taskId}`,
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
