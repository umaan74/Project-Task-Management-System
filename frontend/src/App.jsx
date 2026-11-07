
import { Routes, Route, Navigate, Outlet } from "react-router";
import { useContext } from "react";

import { AuthContext } from "./contexts/AuthContext";
import { OrganizationContext } from "./contexts/OrganizationContext";

// Authentication pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Organization setup pages
import Setup_Organ from "./pages/Setup_Organ";
import Create_Organ from "./pages/Create_Organ";
import Join_Organ from "./pages/Join_Organ";
import Organi_Created from "./pages/Organi_Created";
import Organi_Joined from "./pages/Organi_Joined";
import Invalid_Code from "./pages/Invalid_Code";
import Already_joined from "./pages/Already_joined";
import OrganizationSelection from "./pages/OrganizationSelection";

// Dashboard pages
import Admin_Dashboard from "./pages/Admin_Dashboard";
import Member_Dashboard from "./pages/Member_Dashboard";

// Project pages
import Admin_Project from "./components/project/Admin/Admin_Project";
import Member_Project from "./components/project/Member/Member_Project";

import Admin_Create_Project from "./components/project/Admin/Admin_Create_Project";

import Admin_In_Single_Project from "./components/project/Admin/Admins_Inside_the_single_Project";
import Member_In_Single_Project from "./components/project/Member/Member_Inside_the_single_Project";

// Task pages
import Admin_Inside_Task from "./components/project/Admin/Admin_Inside_the_Task";
import Member_Inside_Task from "./components/project/Member/Member_Inside_the_Task";

// Organization members
import Admin_Organization_Members from "./components/organization/admin/Admin_Organization_Members_Page.jsx";
import Member_Organization_Members from "./components/organization/member/Members_Organization_Members_Page.jsx";

// Organization settings
import Admin_Organization_Settings from "./components/organization/admin/Admin_Organization_Settings.jsx";

// Profile pages
import Edit_Profile from "./components/Profile/Edit_Profile.jsx";
import Profile_Page from "./components/Profile/profile_page.jsx";
import Change_Password from "./components/Profile/Password_change.jsx";

// Project management
import Admin_Add_Project_Member from "./components/project/Admin/Admin_Add_Project_Member.jsx";
import Admin_Create_Task from "./components/project/Admin/Admin_Create_Task.jsx";


// AUTHENTICATION PROTECTED ROUTE
function ProtectedRoute() {
  const { AccessToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <h2 className="p-5">Loading...</h2>;
  }

  if (!AccessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}


// ORGANIZATION REQUIRED ROUTE
function OrganizationRequired() {
  const {
    Organizations,
    SelectedOrganization,
    isOrgLoading,
    organizationError,
    LoadOrganizations,
  } = useContext(OrganizationContext);

  if (isOrgLoading) {
    return <h2 className="p-5">Loading Organization...</h2>;
  }

  if (organizationError) {
    return (
      <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
        <p>{organizationError}</p>
        <button
          type="button"
          onClick={() => LoadOrganizations()}
          className="mt-3 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!Organizations || Organizations.length === 0) {
    return <Navigate to="/setup-organization" replace />;
  }

  if (!SelectedOrganization) {
    return <Navigate to="/organization-selection" replace />;
  }

  return <Outlet />;
}


// MAIN APP
function App() {
  const { SelectedOrganization } = useContext(OrganizationContext);

  // Role is always lowercase: admin or member
  const role = SelectedOrganization?.role?.toLowerCase();

  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* AUTHENTICATION PROTECTED ROUTES */}

      <Route element={<ProtectedRoute />}>

        {/* ORGANIZATION SETUP ROUTES */}

        <Route
          path="/setup-organization"
          element={<Setup_Organ />}
        />

        <Route
          path="/create-organization"
          element={<Create_Organ />}
        />

        <Route
          path="/join-organization"
          element={<Join_Organ />}
        />

        <Route
          path="/organization-created"
          element={<Organi_Created />}
        />

        <Route
          path="/organization-joined"
          element={<Organi_Joined />}
        />

        <Route
          path="/invalid-code"
          element={<Invalid_Code />}
        />

        <Route
          path="/already-joined"
          element={<Already_joined />}
        />

        <Route
          path="/organization-selection"
          element={<OrganizationSelection />}
        />


        {/* PROFILE ROUTES */}

        <Route
          path="/profile"
          element={<Profile_Page />}
        />

        <Route
          path="/profile/edit"
          element={<Edit_Profile />}
        />

        <Route
          path="/profile/change-password"
          element={<Change_Password />}
        />


        {/* ORGANIZATION REQUIRED ROUTES */}

        <Route element={<OrganizationRequired />}>

          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={
              role === "admin"
                ? <Admin_Dashboard />
                : role === "member"
                  ? <Member_Dashboard />
                  : <Navigate to="/organization-selection" replace />
            }
          />


          {/* PROJECT ROUTES */}

          <Route
            path="/projects"
            element={
              role === "admin"
                ? <Admin_Project />
                : role === "member"
                  ? <Member_Project />
                  : <Navigate to="/organization-selection" replace />
            }
          />

          {/* CREATE PROJECT - ADMIN ONLY */}

          <Route
            path="/project/create"
            element={
              role === "admin"
                ? <Admin_Create_Project />
                : <Navigate to="/dashboard" replace />
            }
          />

          {/* SINGLE PROJECT */}

          <Route
            path="/projects/:projectId"
            element={
              role === "admin"
                ? <Admin_In_Single_Project />
                : role === "member"
                  ? <Member_In_Single_Project />
                  : <Navigate to="/organization-selection" replace />
            }
          />


          {/* TASK DETAILS */}

          <Route
            path="/projects/:projectId/tasks/:taskId"
            element={
              role === "admin"
                ? <Admin_Inside_Task />
                : role === "member"
                  ? <Member_Inside_Task />
                  : <Navigate to="/organization-selection" replace />
            }
          />


          {/* ORGANIZATION MEMBERS */}

          <Route
            path="/members"
            element={
              role === "admin"
                ? <Admin_Organization_Members />
                : role === "member"
                  ? <Member_Organization_Members />
                  : <Navigate to="/organization-selection" replace />
            }
          />


          {/* ORGANIZATION SETTINGS - ADMIN ONLY */}

          <Route
            path="/settings"
            element={
              role === "admin"
                ? <Admin_Organization_Settings />
                : <Navigate to="/dashboard" replace />
            }
          />


          {/* ADMIN-ONLY PROJECT ACTIONS */}

          <Route
            path="/projects/:projectId/add-members"
            element={
              role === "admin"
                ? <Admin_Add_Project_Member />
                : <Navigate to="/dashboard" replace />
            }
          />

          <Route
            path="/projects/:projectId/create-task"
            element={
              role === "admin"
                ? <Admin_Create_Task />
                : <Navigate to="/dashboard" replace />
            }
          />

        </Route>

      </Route>


      {/* FALLBACK ROUTE */}

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default App;
