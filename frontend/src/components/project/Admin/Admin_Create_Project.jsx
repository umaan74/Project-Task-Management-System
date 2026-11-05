
import { useState, useContext } from "react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

import Admin_Create_Project_component from "../Project-components/Admin_Create_Project_component";

import { OrganizationContext } from "../../../contexts/OrganizationContext";

const Admin_Create_Project = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { SelectedOrganization } = useContext(OrganizationContext);

  const organizationName =
    SelectedOrganization?.organizationId?.name || "Your Organization";

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full lg:w-[80%] min-w-0 bg-blue-50">

        <Navbar
          Page={"Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Page Heading */}
        <div className="Projects-heading mt-5 mx-5">

          <div className="title-text lg:flex lg:justify-between lg:items-center">

            <div className="left-panel w-full lg:w-[70%] ml-4">

              <h1 className="font-bold text-2xl lg:text-3xl mb-1 text-gray-700">
                Create Project
              </h1>

              <p className="text-gray-600">
                Set up a new project for {organizationName}
              </p>

            </div>

          </div>

        </div>

        {/* Create Project Form */}
        <div className="Create_project lg:mx-10 mx-5">
          <Admin_Create_Project_component />
        </div>

      </div>

    </div>
  );
};

export default Admin_Create_Project;
