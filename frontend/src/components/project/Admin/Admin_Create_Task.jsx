
import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Admin_Create_Task_component from "../Project-components/Admin_Create_Task_component";

const Admin_Create_Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { projectId } = useParams();

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full min-w-0 bg-blue-50 lg:w-[80%]">
        <Navbar
          Page={"Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Link
          to={projectId ? `/projects/${projectId}` : "/projects"}
          className="m-3 inline-flex items-center rounded-md bg-blue-700 px-3 py-2 font-semibold text-white hover:bg-blue-800"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Project
        </Link>

        {projectId ? (
          <Admin_Create_Task_component projectId={projectId} />
        ) : (
          <div className="m-5 rounded-xl bg-red-50 p-5 text-red-600">
            Invalid project ID.
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_Create_Task;
