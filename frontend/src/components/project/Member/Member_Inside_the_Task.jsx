
import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

import Member_Inside_Task_component from "../Project-components/Member_Inside_the_Task_component";

const Member_Inside_Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { projectId, taskId } = useParams();

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

        {/* Back Button */}
        <div className="m-3">
          <Link
            to={projectId ? `/projects/${projectId}` : "/projects"}
            className="inline-flex items-center rounded-md bg-blue-700 px-3 py-2 font-semibold text-white hover:bg-blue-800"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Project
          </Link>
        </div>

        {projectId && taskId ? (
          <Member_Inside_Task_component
            projectId={projectId}
            taskId={taskId}
          />
        ) : (
          <div className="m-5 rounded-xl bg-red-50 p-5 text-red-600">
            Invalid Project or Task ID.
          </div>
        )}

      </div>
    </div>
  );
};

export default Member_Inside_Task;
