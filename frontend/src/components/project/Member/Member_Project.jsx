import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import ProjectCard from "../Project-components/ProjectCard";

const Member_Project = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="Admin-Dashboard flex min-h-screen w-full">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="right-panel  w-full lg:w-[80%] min-w-0 bg-blue-50">
          <Navbar Page={"My Projects"} setIsSidebarOpen={setIsSidebarOpen} />

          <div className="Projects-heading mt-5 mx-5">
            <div className="title-text  lg:flex lg:justify-between lg:items-center">
              <div className="left-panel w-[70%] ml-4">
                <h1 className="font-bold text-2xl lg:text-3xl text-gray-600 mb-1 ">
                  My Projects
                </h1>
                <p className="text-gray-500 ">NeuroX</p>
              </div>
             
            </div>
          </div>

          <div className="Projects-list">
            <ProjectCard/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member_Project;
