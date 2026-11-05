
import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

import { AuthContext } from "../../contexts/AuthContext";
import { OrganizationContext } from "../../contexts/OrganizationContext";

const Profile_Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    CurrentUser,
    isUserLoading,
    Logout,
  } = useContext(AuthContext);

  const {
    Organizations = [],
    SelectedOrganization,
    SelectOrganization,
  } = useContext(OrganizationContext);

  const navigate = useNavigate();

  const username = CurrentUser?.username || "Loading...";
  const email = CurrentUser?.email || "—";

  const initial = CurrentUser?.username
    ? CurrentUser.username.charAt(0).toUpperCase()
    : "U";

  const role = SelectedOrganization?.role;

  const accountCreated = CurrentUser?.createdAt
    ? new Date(CurrentUser.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  // LOGOUT
  async function handleLogout() {
    try {
      await Logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // SWITCH ORGANIZATION
  function handleSwitchOrganization(organization) {
    SelectOrganization(organization);
    navigate("/dashboard");
  }

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-blue-50">
        <p className="font-semibold text-gray-600">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">

      {/* SIDEBAR */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* RIGHT PANEL */}
      <div className="right-panel min-w-0 w-full bg-blue-50 lg:w-[80%]">

        <Navbar
          Page={"Profile"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* PAGE TITLE */}
        <div className="Main-title mx-5 mt-6 lg:mx-10">

          <h1 className="text-2xl font-bold lg:text-3xl">
            Your Profile
          </h1>

          <p className="mt-1 text-sm text-gray-600 lg:text-base">
            View and manage your account credentials and personal information.
          </p>

        </div>

        {/* PROFILE CARD */}
        <div className="Profile-card mx-5 mt-6 mb-8 w-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm sm:px-8 lg:mx-10 lg:px-10 lg:py-8">

          {/* USER INFORMATION */}
          <div className="info flex flex-col items-center border-b-2 border-gray-200">

            {/* USER AVATAR */}
            <div className="logo my-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700">
              {initial}
            </div>

            {/* USERNAME */}
            <h1 className="text-2xl font-bold">
              {username}
            </h1>

            {/* EMAIL */}
            <p className="mb-8 text-gray-500">
              {email}
            </p>

          </div>

          {/* ACCOUNT DETAILS */}
          <div className="role-date my-6 space-y-4">

            {/* CURRENT ORGANIZATION ROLE */}
            <div className="role flex items-center justify-between gap-4">

              <span className="text-sm text-gray-600">
                Current Role
              </span>

              <span className="text-right text-sm font-bold text-blue-700">
                {role === "admin"
                  ? "Workspace Admin"
                  : role === "member"
                    ? "Workspace Member"
                    : "Not Selected"}
              </span>

            </div>

            {/* CURRENT ORGANIZATION */}
            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-gray-600">
                Current Organization
              </span>

              <span className="text-right text-sm font-semibold">
                {SelectedOrganization?.organizationId?.name || "Not Selected"}
              </span>

            </div>

            {/* ACCOUNT CREATED DATE */}
            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-gray-600">
                Account Created
              </span>

              <span className="text-right text-sm font-semibold">
                {accountCreated}
              </span>

            </div>

          </div>

          {/* MY ORGANIZATIONS */}
          <div className="organization-section mt-7 border-t border-gray-200 pt-6">

            <h2 className="text-lg font-bold">
              My Organizations
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You are part of {Organizations.length} organization(s).
            </p>

            <div className="mt-4 space-y-3">

              {Organizations.map((item) => {
                const organization = item.organizationId;

                if (!organization?._id) return null;

                const isCurrent =
                  SelectedOrganization?.organizationId?._id === organization._id;

                return (
                  <div
                    key={organization._id}
                    className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {organization.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Role: {item.role}
                      </p>

                    </div>

                    {isCurrent ? (

                      <span className="w-fit rounded-md bg-green-100 px-3 py-2 text-xs font-bold text-green-700">
                        CURRENT
                      </span>

                    ) : (

                      <button
                        type="button"
                        onClick={() => handleSwitchOrganization(item)}
                        className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                      >
                        SWITCH
                      </button>

                    )}

                  </div>
                );
              })}

              {Organizations.length === 0 && (
                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                  You are not part of any organization yet.
                </p>
              )}

            </div>

            <button
              type="button"
              onClick={() => navigate("/setup-organization")}
              className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              + ADD ANOTHER ORGANIZATION
            </button>

          </div>

          {/* PROFILE ACTIONS */}
          <div className="buttons mt-7 flex flex-col gap-3">

            <button
              type="button"
              onClick={() => navigate("/profile/edit")}
              className="w-full cursor-pointer rounded-lg border-2 border-blue-500 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              EDIT PROFILE
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile/change-password")}
              className="w-full cursor-pointer rounded-lg border-2 border-blue-500 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              CHANGE PASSWORD
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full cursor-pointer rounded-lg border-2 border-red-500 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
            >
              LOGOUT
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile_Page;
