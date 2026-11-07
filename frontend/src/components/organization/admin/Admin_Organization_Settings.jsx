import { useContext, useState } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import Admin_Delete_Organization_component
    from "../Organization-component/Admin_Delete_Organization_component";
import Admin_Edit_Organization_component
    from "../Organization-component/Admin_Edit_Organization_component";

const Admin_Organization_Settings = () => {
    const { SelectedOrganization } = useContext(OrganizationContext);
    const organization = SelectedOrganization?.organizationId;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [inviteCodeCopied, setInviteCodeCopied] = useState(false);
    const [copyError, setCopyError] = useState("");

    const handleCopyInviteCode = async () => {
        if (!organization?.inviteCode) return;
        try {
            await navigator.clipboard.writeText(organization.inviteCode);
            setInviteCodeCopied(true);
            setCopyError("");
            window.setTimeout(() => setInviteCodeCopied(false), 2000);
        } catch (error) {
            console.error("Invite code could not be copied:", error);
            setCopyError("Unable to copy invite code. Please copy it manually.");
        }
    };

    const createdDate = organization?.createdAt
        ? new Date(organization.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : "—";

    return (
        <div className="Admin-Dashboard flex min-h-screen w-full">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="right-panel w-full min-w-0 bg-blue-50 lg:w-[80%]">
                <Navbar
                    Page={"Organization Settings"}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <div className="Projects-heading mx-5 mt-5">
                    <div className="head-text">
                        <div className="ml-4">
                            <h1 className="mb-1 text-2xl font-bold lg:text-3xl">
                                Organization Settings
                            </h1>
                            <h2 className="text-sm font-semibold">
                                {organization?.name || "Organization"}
                                <span className="ml-2 font-semibold text-gray-600">
                                    Manage and view workspace configurations.
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="General-container m-5 rounded-2xl border border-gray-200 bg-white p-5 lg:m-10 lg:p-10">
                        <div className="title my-5">
                            <h1 className="text-2xl font-bold">
                                General Configuration
                            </h1>
                            <p className="text-gray-600">
                                Primary settings for the current workspace
                            </p>
                        </div>

                        <div className="sub-title mb-5">
                            <h2 className="text-sm font-semibold text-gray-700">
                                ORGANIZATION NAME
                            </h2>
                            <p className="break-words font-semibold">
                                {organization?.name || "—"}
                            </p>
                        </div>

                        <div className="invite-Code mb-5">
                            <h2 className="mb-1 text-sm font-semibold text-gray-700">
                                INVITE CODE
                            </h2>
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-100 bg-blue-50 px-5 py-2">
                                <span className="break-all font-bold text-blue-600">
                                    {organization?.inviteCode || "Not available"}
                                </span>
                                {organization?.inviteCode && (
                                    <button
                                        type="button"
                                        onClick={handleCopyInviteCode}
                                        className="rounded-lg bg-blue-100 px-3 py-1 font-bold text-blue-600 hover:bg-blue-200"
                                    >
                                        {inviteCodeCopied ? "Copied" : "Copy"}
                                    </button>
                                )}
                            </div>
                            {copyError && (
                                <p role="alert" className="mt-1 text-sm text-red-600">
                                    {copyError}
                                </p>
                            )}
                        </div>

                        <div className="create-info mb-5 flex flex-wrap gap-5">
                            <div className="creator text-sm font-semibold text-gray-700">
                                <h2>CREATOR</h2>
                                <p className="p-1 text-black">
                                    {organization?.createdBy?.username ||
                                        organization?.createdBy?.email ||
                                        "Unknown"}
                                </p>
                            </div>
                            <div className="created text-sm font-semibold text-gray-700">
                                <h2>CREATED DATE</h2>
                                <p className="p-1 text-black">{createdDate}</p>
                            </div>
                        </div>

                        <hr className="text-gray-300" />

                        <div className="mb-1 mt-7 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(true)}
                                className="cursor-pointer rounded-lg border-2 border-blue-500 px-5 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                            >
                                EDIT WORKSPACE
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="cursor-pointer rounded-lg border-2 border-red-500 px-5 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50"
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
