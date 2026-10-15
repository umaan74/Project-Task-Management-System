import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const Edit_Profile = () => {
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
                        Edit Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-600 lg:text-base">
                        Update Your Profile identity and primary contact email.
                    </p>
                </div>

                {/*EDIT PROFILE CARD */}
              <div className="Profile-card mx-5 mt-6 mb-8 w-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm sm:px-8 lg:mx-10 lg:px-10 lg:py-8">

                <form action="">
                    <label htmlFor="username" className="font-semibold text-gray-600">Username</label>
                    <br />
                    <input type="text" placeholder="Enter New username" className="outline-0  py-2 px-3 w-full my-2 border border-gray-200 shadow rounded-lg"/>

                    <label htmlFor="username" className="font-semibold text-gray-600">Password</label>
                    <br />
                    <input type="password" placeholder="Enter Password for username change" className="outline-0  py-2 px-3 w-full my-2 border border-gray-200 shadow rounded-lg"/>
                </form>
                  <div className="buttons mt-7 flex flex-col items-center lg:flex-row gap-3">

                        <button
                            type="button"
                            onClick={() => console.log("Edit Profile")}
                            className="w-1/2 cursor-pointer rounded-lg border-2 bg-blue-700 hover:text-blue-700 border-blue-500 py-2.5 text-sm font-bold text-white transition hover:bg-blue-50"
                        >
                          SAVE
                        </button>

                        <button
                            type="button"
                            onClick={() => console.log("Change Password")}
                            className="w-1/2 cursor-pointer rounded-lg border-2 border-blue-500 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
                        >
                         CANCEL
                        </button>

                  

                    </div>

              </div>
            </div>
        </div>
    );
};

export default Edit_Profile;