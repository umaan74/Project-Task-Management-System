
import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Admin_Delete_Organization_component
    from "../Organization-component/Admin_Delete_Organization_component";
import Admin_Edit_Organization_component
    from "../Organization-component/Admin_Edit_Organization_component";
const Admin_Organization_Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    return (
        <div className="Admin-Dashboard flex min-h-screen w-full">
            {/* SIDEBAR */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* RIGHT PANEL */}
            <div className="right-panel w-full lg:w-[80%] min-w-0  bg-blue-50">
                {/* NAVBAR */}
                <Navbar
                    Page={"Organization Members"}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* PAGE HEADING */}

                <div className="Projects-heading mt-5 mx-5">
                    <div className="head-text">
                        <div className="ml-4">
                            <h1 className="font-bold text-2xl lg:text-3xl mb-1">
                                Organization Settings
                            </h1>

                            <h2 className="text-sm font-semibold">
                                NeuroX
                                <span className="text-gray-600 ml-2 font-semibold">
                                    Manage and view Workspace configurations.
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="General-container m-5 lg:m-10 border border-gray-200 rounded-2xl bg-white p-5 lg:p-10">
                        <div className="title my-5">
                            <h1 className="text-2xl font-bold">
                                General Configuration
                            </h1>
                            <p className="text-gray-600">Primary settings for the current  workspace configurations</p>
                        </div>
                        <div className="sub-title mb-5">
                            <h1 className="text-sm text-gray-700 font-semibold"> ORGANIZATION NAME </h1>
                            <p className="font-semibold">NeuroX</p>

                        </div>
                        <div className="invite-Code">
                            <h1 className="text-sm text-gray-700 font-semibold mb-1"> ACTIVATE INVITE CODE</h1>
                            <div className="flex items-center mb-5 bg-blue-50 rounded-lg border border-blue-100 py-2 px-5 justify-between">
                                <span className="font-bold text-blue-600">
                                    UMAN-VVUBW-VJBJ
                                </span>
                                <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1  rounded-lg">Copy</span>
                            </div>
                        </div>

                        <div className="create-info gap-5 flex">
                            <div className="creator text-sm text-gray-700 font-semibold">
                                <h1>
                                    CREATOR
                                    <p className="text-black p-1" >Uman Landge</p></h1></div>
                            <div className="created text-sm text-gray-700 font-semibold">
                                <h1>
                                    CREATED DATE <p className="text-black p-1">01 September 2025   </p>
                                </h1>
                            </div>
                        </div>

                        <hr className="text-gray-300" />

                        <div className="flex flex-wrap gap-3 mt-7 mb-1">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(true)}
                                className="rounded-lg border-2 border-blue-500 px-5 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-50 cursor-pointer"
                            >
                                EDIT WORKSPACE
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="rounded-lg border-2 border-red-500 px-5 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50 cursor-pointer"
                            >
                                DELETE ORGANIZATION
                            </button>
                        </div>
                        {isDeleteModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
                                <Admin_Delete_Organization_component
                                    onClose={() => setIsDeleteModalOpen(false)}
                                />
                            </div>
                        )}

                        {isEditModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
                                <Admin_Edit_Organization_component
                                    onClose={() => setIsEditModalOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Admin_Organization_Settings;
