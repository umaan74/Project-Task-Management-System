
import { useState, useEffect, useContext } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { getOrganizationMembers } from "../../../services/organizationMemberService";

const Member_Organization_Members = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const { AccessToken } = useContext(AuthContext);
    const { SelectedOrganization } = useContext(OrganizationContext);
    const organization = SelectedOrganization?.organizationId;
    const organizationId = organization?._id;

    useEffect(() => {
        let mounted = true;

        async function loadMembers() {
            if (!organizationId || !AccessToken) {
                setMembers([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const { response, data } = await getOrganizationMembers(
                    organizationId,
                    AccessToken
                );

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load organization members.");
                }

                if (mounted) {
                    setMembers(
                        (data.AllMember_of_Organization || []).filter(
                            (member) => member?.userId?._id
                        )
                    );
                }
            } catch (loadError) {
                if (mounted) {
                    setError(loadError.message || "Unable to load organization members.");
                }
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        loadMembers();
        return () => {
            mounted = false;
        };
    }, [organizationId, AccessToken, reloadKey]);

    const formatDate = (date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

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
                                {organization?.name || "Organization"}
                                <span className="text-gray-600 font-semibold">
                                    {" "}· {members.length} Members
                                </span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* MEMBERS TABLE */}
                <div className="mx-3 lg:mx-5 mt-6 mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {isLoading ? (
                        <p className="p-8 text-center text-gray-500">Loading organization members...</p>
                    ) : error ? (
                        <div className="p-8 text-center">
                            <p className="mb-3 text-red-600">{error}</p>
                            <button
                                type="button"
                                onClick={() => setReloadKey((key) => key + 1)}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                            >
                                Retry
                            </button>
                        </div>
                    ) : members.length === 0 ? (
                        <p className="p-8 text-center text-gray-500">No organization members found.</p>
                    ) : (
                    <table className="w-full min-w-212.5 border-collapse text-left">
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
                                    key={member._id}
                                    className="border-b border-slate-200 last:border-b-0"
                                >
                                    {/* MEMBER */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                {member.userId.username?.charAt(0)?.toUpperCase() || "U"}
                                            </div>

                                            <span className="whitespace-nowrap text-sm font-semibold text-slate-900">
                                                {member.userId.username}
                                            </span>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {member.userId.email}
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${member.role === "admin"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-slate-200 text-slate-600"
                                                }`}
                                        >
                                            {member.role.toUpperCase()}
                                        </span>
                                    </td>

                                    {/* JOINED DATE */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {formatDate(member.createdAt)}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                         

                                           <p className="text-gray-500 italic">No actions available</p>
                                            
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Member_Organization_Members;
