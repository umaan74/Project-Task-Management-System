import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Admin_Create_Project_component from "../Project-components/Admin_Create_Project_component";
import { ArrowLeft } from 'lucide-react'
import Admin_Single_Project_component from "../Project-components/Admin_Single_Project_component";
import Admin_Single_ProjectTasks_Members from "../Project-components/Admin_Single_ProjectMembers&Tasks_component";
const Admin_In_Single_Project = () => {
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
                    <button className="bg-blue-700 cursor-pointer text-white px-3 rounded-md m-3 font-semibold py-1"><ArrowLeft className="inline" /> Back to Projects</button>
                   
                   <Admin_Single_Project_component/>
<Admin_Single_ProjectTasks_Members/>

                </div>
            </div>
        </>
    );
};

export default Admin_In_Single_Project;
