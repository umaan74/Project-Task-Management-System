
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";

import { getOrganizationMembers } from "../../../services/organizationMemberService";
import {
  getProjectMembers,
  addProjectMember,
} from "../../../services/projectMemberService";

const Admin_Add_Project_Member_component = ({ projectId }) => {
  const { AccessToken } = useContext(AuthContext);
  const { SelectedOrganization } = useContext(OrganizationContext);

  const organizationId = SelectedOrganization?.organizationId?._id;

  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMembers = async () => {
    if (!organizationId || !projectId || !AccessToken) return;

    setLoading(true);
    setError("");

    try {
      const [organizationResult, projectResult] = await Promise.all([
        getOrganizationMembers(organizationId, AccessToken),
        getProjectMembers(projectId, AccessToken),
      ]);

      if (!organizationResult.response.ok) {
        throw new Error(
          organizationResult.data.message || "Unable to load organization members"
        );
      }

      if (!projectResult.response.ok) {
        throw new Error(
          projectResult.data.message || "Unable to load project members"
        );
      }

      const organizationMembers =
        organizationResult.data.AllMember_of_Organization || [];

      const projectMembers =
        projectResult.data.Project_Members || [];

      const assignedIds = new Set(
        projectMembers.map((member) => {
          const user = member?.userId || member;
          return String(user?._id || user);
        })
      );

      const availableMembers = organizationMembers
        .map((member) => member?.userId || member)
        .filter((user) => {
          const userId = String(user?._id || user);
          return userId && userId !== "undefined" && !assignedIds.has(userId);
        });

      setMembers(availableMembers);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [organizationId, projectId, AccessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      setError("Please select an organization member.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const { response, data } = await addProjectMember(
        projectId,
        selectedUser,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(data.message || "Unable to add member");
      }

      setSuccess("Member successfully added to the project!");
      setSelectedUser("");

      await loadMembers();
    } catch (err) {
      setError(err.message || "Failed to add member");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-5 my-8 rounded-xl bg-white p-8 text-center shadow">
        Loading organization members...
      </div>
    );
  }

  return (
    <div className="my-8 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-lg lg:mx-10 lg:px-10">

      <h2 className="mb-2 text-xl font-bold text-gray-800">
        Add Existing Organization Member
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Select a member from your organization to add them to this project.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {members.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <p className="font-semibold text-gray-700">
            No available organization members
          </p>
          <p className="mt-1 text-sm text-gray-500">
            All existing organization members may already be assigned to this project.
          </p>

          <button
            type="button"
            onClick={loadMembers}
            className="mt-4 font-semibold text-blue-700 hover:underline"
          >
            Refresh members
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>

          <label
            htmlFor="organization-member"
            className="font-semibold text-gray-800"
          >
            Choose Member
          </label>

          <select
            id="organization-member"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="my-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 outline-none focus:border-blue-600"
            required
          >
            <option value="">Select an organization member</option>

            {members.map((member) => (
             <option key={member._id} value={member._id}>
  {member.username}
</option>
            ))}
          </select>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              disabled={submitting || !selectedUser}
              className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Adding Member..." : "ADD MEMBER"}
            </button>

          </div>
        </form>
      )}
    </div>
  );
};

export default Admin_Add_Project_Member_component;
