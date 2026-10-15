
import React, { useState } from "react";

const Admin_Change_Role_component = () => {
    const [role, setRole] = useState("MEMBER");
  

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected role:", role);
    };

    return (
    <div className="relative z-50 w-[90%] max-w-lg rounded-3xl border border-gray-300 bg-white p-6 shadow-xl sm:p-8">
            <div className="head m-2">
                <h1 className="font-bold lg:text-3xl">Change Role</h1>
                <p className="text-gray-600">Select a new role for Bilal A.</p>
            </div>

            <div className="choose-role">
                <form onSubmit={handleSubmit}>


                    <div className="admin flex gap-4  items-center border px-4  py-4 rounded-2xl shadow border-gray-300 my-2">
                        <div>
                            <input
                                type="radio"
                                id="admin"
                                name="role"
                                value="ADMIN"
                                checked={role === "ADMIN"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <label htmlFor="admin" className="font-bold text-xl">Admin
                            <p className="text-gray-400 text-sm font-semibold">Full Access to manage members and workspace settings.</p>
                        </label>

                    </div>
                    <div className="member flex gap-4  items-center border px-4  py-4 rounded-2xl shadow-2xl border-gray-300 my-2">
                        <div>
                            <input
                                type="radio"
                                id="member"
                                name="role"
                                value="MEMBER"
                                checked={role === "MEMBER"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                        <label htmlFor="member" className="font-bold text-xl">Member
                            <p className="text-gray-400 text-sm font-semibold">Standard Access to projects,tasks,and members directories.</p>
                        </label>

                    </div>


                    <div className="buttons flex flex-col items-center ">

                        <button type="submit" className="border cursor-pointer py-2 px-8 rounded-lg my-1 bg-blue-700 text-white font-semibold">UPDATE ROLE</button>
                        <button className="border-2 cursor-pointer py-2 px-8 rounded-lg my-1 text-gray-600 border-gray-400  font-semibold">CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin_Change_Role_component;
