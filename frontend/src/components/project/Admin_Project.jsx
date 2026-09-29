import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { UserRoundGroup } from "lucide-react";

const Admin_Project = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="Admin-Dashboard flex min-h-screen w-full">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="right-panel  w-full lg:w-[80%] min-w-0 bg-blue-50">
          <Navbar Page={"Projects"} setIsSidebarOpen={setIsSidebarOpen} />

          <div className="Projects-heading mt-5 mx-10">
            <div className="title-text  lg:flex lg:justify-between lg:items-center">
              <div className="left-panel w-[70%] ml-4">
                <h1 className="font-bold text-2xl lg:text-4xl text-gray-600 mb-1 ">
                   Projects
                </h1>
                <p className="text-gray-500 font-semibold">NeuroX Projects</p>
              </div>
              <div className="flex gap-2 pl-5 whitespace-nowrap">
               

                <button className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-sm bg-blue-700 text-white font-semibold rounded-md whitespace-nowrap">
                  <span className="text-lg  leading-none">+</span>
                  CREATE PROJECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Project;
