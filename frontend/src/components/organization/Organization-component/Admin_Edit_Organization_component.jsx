import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { updateOrganization } from "../../../services/organizationService";

const Admin_Edit_Organization_component = ({ onClose }) => {
    const { AccessToken } = useContext(AuthContext);
    const { SelectedOrganization, LoadOrganizations } = useContext(OrganizationContext);
    const organization = SelectedOrganization?.organizationId;
    const [organizationName, setOrganizationName] = useState(organization?.name || "");
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newName = organizationName.trim();
        if (!newName || !organization?._id) return;

        setIsSaving(true);
        setError("");

        try {
            const { response, data } = await updateOrganization(
                organization._id,
                newName,
                AccessToken
            );
            if (!response.ok) {
                throw new Error(data.message || "Unable to update organization.");
            }

            await LoadOrganizations(organization._id);
            onClose();
        } catch (saveError) {
            console.error("Organization update failed:", saveError);
            setError(saveError.message || "Unable to update organization.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-slate-900">
                    Edit Organization
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Modify the settings of your active team workspace
                </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        Update Workspace Name
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Ensure this matches your registered entity or team name
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-7">
                        <label
                            htmlFor="organizationName"
                            className="mb-2 block text-xs font-bold text-slate-600"
                        >
                            ORGANIZATION NAME
                        </label>

                        <input
                            id="organizationName"
                            type="text"
                            value={organizationName}
                            onChange={(event) => setOrganizationName(event.target.value)}
                            required
                            maxLength={100}
                            className="w-full rounded-lg border-2 border-blue-500 px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="mb-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="cursor-pointer rounded-lg border-2 border-blue-600 bg-blue-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? "SAVING..." : "SAVE CHANGES"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="cursor-pointer rounded-lg border-2 border-slate-400 px-5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admin_Edit_Organization_component;
