
import { API_URL } from "./api";

// 1. JOIN ORGANIZATION USING INVITE CODE
export async function joinOrganization(inviteCode, token) {
  const response = await fetch(`${API_URL}/organizations/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ inviteCode }),
  });

  const data = await response.json();
  return { response, data };
}

// 2. GET ALL ORGANIZATION MEMBERS
export async function getOrganizationMembers(organizationId, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}/members`,
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

// 3. CHANGE MEMBER ROLE
export async function changeMemberRole(organizationId, userId, role, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}/members/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    }
  );

  const data = await response.json();
  return { response, data };
}

// 4. REMOVE ORGANIZATION MEMBER
export async function removeOrganizationMember(organizationId, userId, token) {
  const response = await fetch(
    `${API_URL}/organizations/${organizationId}/members/${userId}`,
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
