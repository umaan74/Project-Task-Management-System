import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Admin_Create_Project_component from "../Project-components/Admin_Create_Project_component";

const Admin_Create_Project = () => {
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

                    <div className="Projects-heading mt-5 mx-5">
                        <div className="title-text  lg:flex lg:justify-between lg:items-center">
                            <div className="left-panel w-[70%] ml-4">
                                <h1 className="font-bold text-2xl lg:text-3xl  mb-1 ">
                                    Create Projects
                                </h1>
                                <p className="text-gray-600 ">Set up a new workspace project</p>
                            </div>

                        </div>
                    </div>

                    <div className="Create_project lg:mx-10 mx-5 ">
                        <Admin_Create_Project_component />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin_Create_Project;
