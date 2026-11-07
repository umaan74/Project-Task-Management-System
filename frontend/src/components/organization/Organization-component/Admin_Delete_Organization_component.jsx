import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { deleteOrganization } from "../../../services/organizationService";

const Admin_Delete_Organization_component = ({ onClose }) => {
    const { AccessToken } = useContext(AuthContext);
    const { SelectedOrganization, LoadOrganizations } = useContext(OrganizationContext);
    const navigate = useNavigate();
    const organization = SelectedOrganization?.organizationId;
    const [error, setError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!organization?._id) return;

        setIsDeleting(true);
        setError("");

        try {
            const { response, data } = await deleteOrganization(
                organization._id,
                AccessToken
            );
            if (!response.ok) {
                throw new Error(data.message || "Unable to delete organization.");
            }

            await LoadOrganizations();
            onClose();
            navigate("/organization-selection", { replace: true });
        } catch (deleteError) {
            console.error("Organization deletion failed:", deleteError);
            setError(deleteError.message || "Unable to delete organization.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="w-[95%] max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10">
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

            <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Delete Organization
                </h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    This action is destructive and absolutely irreversible.
                </p>
            </div>

            <div className="mb-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-semibold text-slate-800">
                    Deleting &quot;{organization?.name || "this organization"}&quot; permanently removes:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2"><span className="font-bold text-red-500">•</span>All organization configuration and core data</li>
                    <li className="flex gap-2"><span className="font-bold text-red-500">•</span>All related projects</li>
                    <li className="flex gap-2"><span className="font-bold text-red-500">•</span>All associated project members and team roles</li>
                    <li className="flex gap-2"><span className="font-bold text-red-500">•</span>All task descriptions and deadline history</li>
                </ul>
            </div>

            {error && (
                <p role="alert" className="mb-4 text-sm text-red-600">
                    {error}
                </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full cursor-pointer rounded-lg border-2 border-red-500 bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isDeleting ? "DELETING..." : "DELETE PERMANENTLY"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isDeleting}
                    className="w-full cursor-pointer rounded-lg border-2 border-slate-400 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                    CANCEL
                </button>
            </div>
        </div>
    );
};

export default Admin_Delete_Organization_component;
