import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowLeft } from "lucide-react";

import Member_Single_Project_component from "../Project-components/Member_Single_Project_component";
import Member_Single_ProjectTasks_Members from "../Project-components/Member_Single_ProjectMembers&Tasks_component";

const Member_In_Single_Project = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">
      
      {/* SIDEBAR */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* RIGHT PANEL */}
      <div className="right-panel w-full lg:w-[80%] min-w-0 bg-blue-50">
        
        {/* NAVBAR */}
        <Navbar
          Page={"Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* BACK BUTTON */}
        <button className="bg-blue-700 cursor-pointer text-white px-3 rounded-md m-3 font-semibold py-1">
          <ArrowLeft className="inline" /> Back to Projects
        </button>

        {/* PROJECT DETAILS */}
        <Member_Single_Project_component />

        {/* MEMBERS + TASKS */}
        <Member_Single_ProjectTasks_Members />

      </div>
    </div>
  );
};

export default Member_In_Single_Project;