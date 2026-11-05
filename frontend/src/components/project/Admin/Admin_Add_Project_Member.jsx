
import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

import Admin_Add_Project_Member_component from "../Project-components/Admin_Add_Project_Member_component";

const Admin_Add_Project_Member = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { projectId } = useParams();

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel min-w-0 w-full bg-blue-50 lg:w-[80%]">

        <Navbar
          Page={"Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="mx-5 mt-5">

          <h1 className="mb-1 text-2xl font-bold lg:text-3xl">
            Add Project Member
          </h1>

          <p className="font-semibold text-gray-600">
            Add existing members of your organization to this project.
          </p>

        </div>

        <Link
          to={`/projects/${projectId}`}
          className="m-5 inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          <ArrowLeft size={18} />
          Back to Project
        </Link>

        <Admin_Add_Project_Member_component
          projectId={projectId}
        />

      </div>
    </div>
  );
};

export default Admin_Add_Project_Member;
