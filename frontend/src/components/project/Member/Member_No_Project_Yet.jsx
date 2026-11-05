
import { useState, useContext } from "react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

import No_Project from "../Project-components/Member_No_Project_component";

import { OrganizationContext } from "../../../contexts/OrganizationContext";

const Member_No_Project_Yet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { SelectedOrganization } = useContext(OrganizationContext);

  const organizationName =
    SelectedOrganization?.organizationId?.name || "your organization";

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full min-w-0 bg-blue-50 lg:w-[80%]">

        <Navbar
          Page={"My Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="Projects-heading mx-5 mt-5">
          <div className="title-text lg:flex lg:items-center lg:justify-between">

            <div className="left-panel ml-4 w-[70%]">
              <h1 className="mb-1 text-2xl font-bold text-gray-600 lg:text-3xl">
                My Projects
              </h1>

              <p className="font-semibold text-gray-500">
                {organizationName}
              </p>
            </div>

          </div>
        </div>

        <div className="Projects-list mx-5 lg:mx-10">
          <No_Project organizationName={organizationName} />
        </div>

      </div>
    </div>
  );
};

export default Member_No_Project_Yet;
