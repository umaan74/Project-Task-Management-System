
import React from "react";

const Admin_Delete_Organization_component = ({ onClose }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        console.log("Delete organization confirmed");
    };

    return (
        <div className="w-[95%] max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10">

            {/* WARNING ICON */}
            <div className="mb-4 flex justify-center">
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-red-50 p-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-7 w-7 text-red-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m0 3h.008M10.3 3.86 1.82 18.5A1.5 1.5 0 0 0 3.12 20.75h17.76a1.5 1.5 0 0 0 1.3-2.25L13.7 3.86a1.96 1.96 0 0 0-3.4 0Z"
                        />
                    </svg>
                </div>
            </div>

            {/* HEADING */}
            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Delete Organization
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    This action is destructive and absolutely irreversible.
                </p>
            </div>

            {/* WARNING DETAILS */}
            <div className="mb-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-semibold text-slate-800">
                    Deleting "NeuroX" permanently removes:
                </p>

                <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                        <span className="font-bold text-red-500">•</span>
                        All organization configuration and core data
                    </li>

                    <li className="flex gap-2">
                        <span className="font-bold text-red-500">•</span>
                        All related active and archived projects
                    </li>

                    <li className="flex gap-2">
                        <span className="font-bold text-red-500">•</span>
                        All associated project members and team roles
                    </li>

                    <li className="flex gap-2">
                        <span className="font-bold text-red-500">•</span>
                        All task logs, descriptions, and deadline history
                    </li>
                </ul>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full cursor-pointer rounded-lg border-2 border-red-500 bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
                >
                    DELETE PERMANENTLY
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full cursor-pointer rounded-lg border-2 border-slate-400 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                    CANCEL
                </button>
            </div>
        </div>
    );
};

export default Admin_Delete_Organization_component;
