import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Admin_Create_Project_component from "../Project-components/Admin_Create_Project_component";
import { ArrowLeft } from 'lucide-react'
import Admin_Single_Project_component from "../Project-components/Admin_Single_Project_component";
import Admin_Single_ProjectTasks_Members from "../Project-components/Admin_Single_ProjectMembers&Tasks_component";
import Admin_Add_Project_Member_component from "../Project-components/Admin_Add_Project_Member_component";
const Admin_Add_Project_Member = () => {
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
                                    Add Project Member
                                </h1>
                                <p className="text-gray-600 font-semibold">Add people to the LegalEase Team.</p>
                            </div>

                        </div>
                    </div>

                    <Admin_Add_Project_Member_component className=""/>
                </div>
            </div>
        </>
    );
};

export default Admin_Add_Project_Member;
