import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import {Link} from 'react-router'
const Profile_Page = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            {/* SIDEBAR */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* RIGHT PANEL */}
            <div className="right-panel min-w-0 w-full bg-blue-50 lg:w-[80%]">
                <Navbar
                    Page={"Profile"}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* PAGE TITLE */}
                <div className="Main-title mx-5 mt-6 lg:mx-10">
                    <h1 className="text-2xl font-bold lg:text-3xl">
                        Your Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-600 lg:text-base">
                        View and manage your account credentials and personal
                        information.
                    </p>
                </div>

                {/* PROFILE CARD */}
                <div className="Profile-card mx-5 mt-6 mb-8 w-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm sm:px-8 lg:mx-10 lg:px-10 lg:py-8">

                    {/* PROFILE INFO */}
                    <div className="info flex flex-col items-center border-b-2 border-gray-200">

                        <div className="logo my-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-700">
                            U
                        </div>

                        <h1 className="text-2xl font-bold">
                            Uman
                        </h1>

                        <p className="mb-8 text-gray-500">
                            umanlandge@gmail.com
                        </p>

                    </div>

                    {/* ROLE & JOINED DATE */}
                    <div className="role-date my-6 space-y-3">

                        <div className="role flex items-center justify-between gap-4">
                            <span Link className="text-sm text-gray-600">
                                Role
                            </span>

                            <span className="text-right text-sm font-bold text-blue-700">
                                Workspace Admin
                            </span>
                        </div>

                        <div className="joined-date flex items-center justify-between gap-4">
                            <span className="text-sm text-gray-600">
                                Joined Date
                            </span>

                            <span className="text-right text-sm font-semibold">
                                10 Oct 2026
                            </span>
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="buttons mt-7 flex flex-col gap-3">

                        <button
                            type="button"
                            onClick={() => console.log("Edit Profile")}
                            className="w-full cursor-pointer rounded-lg border-2 border-blue-500 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                        >
                            <Link to={"/profile/edit"}>
                            EDIT PROFILE
                            </Link>
                        </button>

                        <button
                            type="button"
                            onClick={() => console.log("Change Password")}
                            className="w-full cursor-pointer rounded-lg border-2 border-blue-500 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                        >
                          <Link to={"/profile/change-password"}>
                            CHANGE PASSWORD
                          </Link>
                          
                        </button>

                        <button
                            type="button"
                            onClick={() => console.log("Logout")}
                            className="w-full cursor-pointer rounded-lg border-2 border-red-500 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                        >
                           <Link to="/login">
                           
                            LOGOUT
                           </Link>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile_Page;