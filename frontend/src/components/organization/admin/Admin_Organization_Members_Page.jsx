
import { useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

const members = [
    {
        id: 1,
        initial: "U",
        name: "Uman K.",
        email: "uman@example.com",
        role: "ADMIN",
        joinedDate: "01 Sep 2025",
    },
    {
        id: 2,
        initial: "B",
        name: "Bilal A.",
        email: "bilal@example.com",
        role: "MEMBER",
        joinedDate: "05 Sep 2025",
    },
    {
        id: 3,
        initial: "A",
        name: "Asjad N.",
        email: "asjad@example.com",
        role: "MEMBER",
        joinedDate: "10 Sep 2025",
    },
];

const Admin_Organization_Members = () => {
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
                <Navbar
                    Page={"Organization Members"}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* PAGE HEADING */}
                <div className="Projects-heading mt-5 mx-5">
                    <div className="title-text">
                        <div className="ml-4">
                            <h1 className="font-bold text-2xl lg:text-3xl mb-1">
                                Organization Members
                            </h1>

                            <h2 className="text-sm text-gray-700">
                                NeuroX
                                <span className="text-gray-600 font-semibold">
                                    {" "}· 3 Members
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* MEMBERS TABLE */}
                <div className="mx-3 lg:mx-5 mt-6 mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full min-w-[850px] border-collapse text-left">
                        <thead className="bg-slate-50">
                            <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-600">
                                <th className="px-6 py-4">Member</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {members.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b border-slate-200 last:border-b-0"
                                >
                                    {/* MEMBER */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                {member.initial}
                                            </div>

                                            <span className="whitespace-nowrap text-sm font-semibold text-slate-900">
                                                {member.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {member.email}
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${member.role === "ADMIN"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-slate-200 text-slate-600"
                                                }`}
                                        >
                                            {member.role}
                                        </span>
                                    </td>

                                    {/* JOINED DATE */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {member.joinedDate}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    console.log("Change role:", member.id)
                                                }
                                                className="rounded-md cursor-pointer border border-blue-500 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                                            >
                                                CHANGE ROLE
                                            </button>

                                            {member.role !== "ADMIN" && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        console.log("Remove member:", member.id)
                                                    }
                                                    className="rounded-md cursor-pointer border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                                                >
                                                    REMOVE
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin_Organization_Members;
