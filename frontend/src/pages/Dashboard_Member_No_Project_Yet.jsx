import { useState } from "react";

import { Folder, ListChecks, CircleCheckBig } from "lucide-react";

import No_Project from "../components/project/Project-components/Member_No_Project_component";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const No_Project_Yet_Dashboard = () => {
  // Sidebar ka state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* SIDEBAR */}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* RIGHT PANEL */}

      <div className="w-full lg:w-[80%] min-w-0 bg-blue-50">
        {/* NAVBAR */}

        <Navbar Page={"Dashboard"} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Yaha Navbar end hai */}
        {/* WELCOME */}

        <div className="mt-4 flex justify-between items-center">
          <div className="w-[60%] ml-4">
            <h1 className="font-bold text-2xl lg:text-4xl">
              Welcome back, Member
            </h1>

            <p className="text-gray-500">
              Review your project board and active task checklists.
            </p>
          </div>

          <div className="mr-5">
            <span className="font-semibold text-sm">NeuroX</span>

            <span className="ml-1 bg-gray-700 text-white font-semibold rounded-full px-2 py-1 text-sm">
              Member
            </span>
          </div>
        </div>

        {/* CARDS */}

        <div className="flex flex-col lg:flex-row">
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">
            <div className="w-[90%]">
              <h2 className="text-gray-600 font-semibold mb-4">My Projects</h2>

              <h1 className="text-4xl font-bold">0</h1>

              <p className="text-blue-700 mt-2">Active workspace involvement</p>
            </div>

            <Folder className="bg-blue-100 text-blue-700 p-2 w-12 h-12 rounded-xl" />
          </div>

          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">
            <div className="w-[90%]">
              <h2 className="text-gray-600 font-semibold mb-4">My Tasks</h2>

              <h1 className="text-4xl font-bold">0</h1>

              <p className="text-blue-700 mt-2">3 due this current week</p>
            </div>

            <ListChecks className="bg-blue-100 text-blue-700 p-2 w-12 h-12 rounded-xl" />
          </div>

          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">
            <div className="w-[90%]">
              <h2 className="text-gray-600 font-semibold mb-4">Completed</h2>

              <h1 className="text-4xl font-bold">0</h1>

              <p className="text-blue-700 mt-2">Tasks completed this month</p>
            </div>

            <CircleCheckBig className="bg-blue-100 text-blue-700 p-2 w-12 h-12 rounded-xl" />
          </div>
        </div>

        {/* PROJECTS */}

        <div className="mt-4 mx-5">
          <h1 className="font-bold text-xl lg:text-2xl text-gray-600 mb-2">
            Recent Projects
          </h1>

          <div>
            <No_Project />
          </div>
        </div>
      </div>
    </div>
  );
};

export default No_Project_Yet_Dashboard;
