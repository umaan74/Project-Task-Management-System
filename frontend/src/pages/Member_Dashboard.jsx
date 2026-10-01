import {
  Folder,
  ListChecks,
  CircleCheckBig,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/project/Project-components/ProjectCard";

const Member_Dashboard = () => {
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
        <Navbar Page={"Dashboard"} setIsSidebarOpen={setIsSidebarOpen} />


        <div className="Welcome-Back-Panel  mt-4 flex justify-between items-center">
          <div className="left-panel w-[60%] ml-4">
            <h1 className="font-bold text-2xl lg:text-4xl lg:mt-4 lg:mb-2">
              Welcome back ,  Member
            </h1>
            <p className="text-gray-500">
              Review your project board and active task checklists.
            </p>
          </div>
          <div className="right-panel  relative right-10 lg:text-2xl  ">
            <span className="font-semibold lg:text-xl text-[14px]">NeuroX </span>
            <span className="lg:mr-2 lg:text-2xl text-[14px] bg-gray-700 text-white font-semibold rounded-full  px-2 lg:px-4 py-1 text-sm">
              Member
            </span>
          </div>
        </div>

        <div className="Cards flex flex-wrap flex-col  lg:flex-row ">
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">
            <div className="left-panel w-[90%]">
              <h2 className="text-gray-600 font-semibold mb-4">
                My Projects
              </h2>
              <h1 className="text-4xl font-bold">12</h1>
              <p className="text-blue-700 mt-2">Active workspace involvement</p>
            </div>
            <div className="right-panel ">
              <Folder className="bg-blue-100 text-blue-700 p-2 w-12.5 h-12.5 rounded-xl" />
            </div>
          </div>
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">
            <div className="left-panel w-[90%]">
              <h2 className="text-gray-600 font-semibold mb-4">My Tasks</h2>
              <h1 className="text-4xl font-bold">148</h1>
              <p className="text-blue-700 mt-2">3 due this current week</p>
            </div>
            <div className="right-panel ">
              <ListChecks className="bg-blue-100 text-blue-700 p-2 w-12.5 h-12.5 rounded-xl" />
            </div>
          </div>
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">
            <div className="left-panel w-[90%]">
              <h2 className="text-gray-600 font-semibold mb-4">
                Completed.
              </h2>
              <h1 className="text-4xl font-bold">34</h1>
              <p className="text-blue-700 mt-2">Tasks completed this month</p>
            </div>
            <div className="right-panel ">
              <CircleCheckBig className="bg-blue-100 text-blue-700 p-2 w-12.5 h-12.5 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="Projects-Panel  mt-4 lg:mx-5 my-2 ">

          <div className="title-text lg:flex lg:justify-between lg:items-center">
            <div className="left-panel w-[70%] ml-4">
              <h1 className="font-bold text-xl lg:text-2xl text-gray-600 mb-2 ">
                Recent Projects
              </h1>
            </div>

          </div>

          <div className="Project-cards ">

            {/* <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl mt-5 mx-3 p-5 flex items-center">
            <div className="left-panel w-[90%]">
              <h1 className="lg:text-2xl font-bold">Legal Ease</h1>
              <h2 className="text-gray-600 lg:text-lg text-sm font-semibold mb-4">
               NeuroX Workspace
              </h2>
              <p className=" font-bold text-gray-500  mt-2">Due: 15 Oct</p>
            </div>
            <div className="right-panel ">
            
              <span className="bg-green-100 text-green-500 font-bold p-2 px-4 rounded-xl" >
                ACTIVE
              </span>
            </div>
          </div>
              <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl mt-5 mx-3 p-5 flex items-center">
            <div className="left-panel w-[90%]">
              <h1 className="lg:text-2xl font-bold">Legal Ease</h1>
              <h2 className="text-gray-600 lg:text-lg text-sm font-semibold mb-4">
               NeuroX Workspace
              </h2>
              <p className=" font-bold text-gray-500  mt-2">Due: 15 Oct</p>
            </div>
            <div className="right-panel ">
            
              <span className="bg-green-100 text-green-500 font-bold p-2 px-4 rounded-xl" >
                ACTIVE
              </span>
            </div>
          </div>
              <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl mt-5 mx-3 p-5 flex items-center">
            <div className="left-panel w-[90%]">
              <h1 className="lg:text-2xl font-bold">Legal Ease</h1>
              <h2 className="text-gray-600 lg:text-lg text-sm font-semibold mb-4">
               NeuroX Workspace
              </h2>
              <p className=" font-bold text-gray-500  mt-2">Due: 15 Oct</p>
            </div>
            <div className="right-panel ">
            
              <span className="bg-green-100 text-green-500 font-bold p-2 px-4 rounded-xl" >
                ACTIVE
              </span>
            </div>
          </div> */}
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Member_Dashboard;
