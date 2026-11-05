import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { createOrganization } from "../services/organizationService";

const Create_Organ = () => {
    const { AccessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [organizationName, setOrganizationName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCreate(e) {
        e.preventDefault();
        setMessage("");

        if (!organizationName.trim()) {
            setMessage("Please enter organization name");
            return;
        }

        try {
            setLoading(true);

            const { response, data } = await createOrganization(
                organizationName,
                AccessToken
            );

            if (response.ok) {
                navigate("/organization-created", {
                    state: { organization: data.NewOrganization },
                });
            } else {
                setMessage(data.message || "Organization creation failed");
            }
        } catch (error) {
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-blue-50 CreateOrganization-Page flex min-h-screen items-center justify-center">
            <div className="CreateOrganization-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/4 p-10 border border-gray-300 rounded-2xl shadow-2xl">
                <div className="header flex flex-col items-center">
                    <div className="logo p-2">
                        <img
                            className="w-20 rounded-lg"
                            src="/logo.png"
                            alt="Uman logo"
                        />
                    </div>
                    <div className="title flex flex-col text-center items-center">
                        <h1 className="font-bold text-2xl">Create Organization</h1>
                        <p className="text-gray-400 text-sm m-2">
                            Set up a central hub for your team
                        </p>
                    </div>
                </div>

                <form onSubmit={handleCreate}>
                    <div className="Organization my-2">
                        <label htmlFor="organization-Name" className="text-[16px] font-semibold">
                            Organization Name
                        </label>
                        <br />
                        <input
                            placeholder="organization-name"
                            type="text"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            className="border placeholder:text-[13px] border-gray-300 my-1 rounded-lg py-1 px-3 outline-0 w-full"
                            id="organization-Name"
                        />
                    </div>

                    {message && (
                        <p className="text-red-500 text-sm">{message}</p>
                    )}

                    <button
                        disabled={loading}
                        className="button cursor-pointer w-full bg-blue-600 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold"
                    >
                        {loading ? "CREATING..." : "CREATE ORGANIZATION"}
                    </button>
                </form>

                <div className="back text-center m-1">
                    <button
                        type="button"
                        onClick={() => navigate("/setup-organization")}
                        className="text-[12px] underline font-bold text-blue-600 cursor-pointer"
                    >
                        Back to options
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Create_Organ;