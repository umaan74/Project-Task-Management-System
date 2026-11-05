
import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

import Member_Single_Project_component from "../Project-components/Member_Single_Project_component";
import Member_Single_ProjectTasks_Members from "../Project-components/Member_Single_ProjectMembers&Tasks_component";

const Member_In_Single_Project = () => {
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
          Page={"My Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="m-3">
          <Link
            to="/projects"
            className="inline-flex items-center rounded-md bg-blue-700 px-3 py-2 font-semibold text-white hover:bg-blue-800"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Projects
          </Link>
        </div>

        {projectId ? (
          <>
            <Member_Single_Project_component
              projectId={projectId}
            />

            <Member_Single_ProjectTasks_Members
              projectId={projectId}
            />
          </>
        ) : (
          <div className="m-5 rounded-xl bg-red-50 p-5 text-red-600">
            Invalid Project ID.
          </div>
        )}

      </div>
    </div>
  );
};

export default Member_In_Single_Project;
