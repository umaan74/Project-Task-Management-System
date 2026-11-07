
import { useState, useEffect, useContext, useCallback } from "react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";

import {
  getOrganizationMembers,
  changeMemberRole,
  removeOrganizationMember,
} from "../../../services/organizationMemberService";

const Admin_Organization_Members = () => {
  const { AccessToken } = useContext(AuthContext);

  const { SelectedOrganization } = useContext(OrganizationContext);

  const organizationId = SelectedOrganization?.organizationId?._id;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [processingId, setProcessingId] = useState(null);

  const LoadMembers = useCallback(async () => {
    if (!organizationId || !AccessToken) return;

    try {
      setLoading(true);
      setError("");

      const { response, data } = await getOrganizationMembers(
        organizationId,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(data.message || "Failed to load members");
      }

      setMembers(data.AllMember_of_Organization || []);
    } catch (error) {
      console.error("Load Members Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [organizationId, AccessToken]);

  useEffect(() => {
    LoadMembers();
  }, [LoadMembers]);

  const handleRoleChange = async (member) => {
    const newRole = member.role === "admin" ? "member" : "admin";

    const confirmed = window.confirm(
      `Change ${member.userId?.username}'s role to ${newRole.toUpperCase()}?`
    );

    if (!confirmed) return;

    try {
      setProcessingId(member.userId._id);

      const { response, data } = await changeMemberRole(
        organizationId,
        member.userId._id,
        newRole,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(data.message || "Role update failed");
      }

      await LoadMembers();
    } catch (error) {
      alert(error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleRemoveMember = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${member.userId?.username}?`
    );

    if (!confirmed) return;

    try {
      setProcessingId(member.userId._id);

      const { response, data } = await removeOrganizationMember(
        organizationId,
        member.userId._id,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(data.message || "Member removal failed");
      }

      await LoadMembers();
    } catch (error) {
      alert(error.message);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full lg:w-[80%] min-w-0 bg-blue-50">
        <Navbar
          Page={"Organization Members"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="Projects-heading mt-5 mx-5">
          <div className="ml-4">
            <h1 className="font-bold text-2xl lg:text-3xl mb-1">
              Organization Members
            </h1>

            <h2 className="text-sm text-gray-700">
              {SelectedOrganization?.organizationId?.name || "Organization"}
              <span className="text-gray-600 font-semibold">
                {" "}· {members.length} Members
              </span>
            </h2>
          </div>
        </div>

        <div className="mx-3 lg:mx-5 mt-6 mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <p className="p-8 text-center text-gray-500">
              Loading organization members...
            </p>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 mb-3">{error}</p>

              <button
                onClick={LoadMembers}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Retry
              </button>
            </div>
          ) : members.length === 0 ? (
            <p className="p-8 text-center text-gray-500">
              No organization members found.
            </p>
          ) : (
            <table className="w-full min-w-212.5 border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-600">
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {members.map((member) => {
                  const user = member.userId;

                  if (!user) return null;

                  const isAdmin = member.role === "admin";

                  return (
                    <tr
                      key={member._id}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            {user.username?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <span className="whitespace-nowrap text-sm font-semibold text-slate-900">
                            {user.username}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${
                            isAdmin
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {member.role?.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {formatDate(member.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <button
                            type="button"
                            disabled={processingId === user._id}
                            onClick={() => handleRoleChange(member)}
                            className="rounded-md border border-blue-500 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                          >
                            CHANGE ROLE
                          </button>

                          {!isAdmin && (
                            <button
                              type="button"
                              disabled={processingId === user._id}
                              onClick={() => handleRemoveMember(member)}
                              className="rounded-md border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                            >
                              REMOVE
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_Organization_Members;
