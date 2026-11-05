
import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../contexts/AuthContext";
import { OrganizationContext } from "../contexts/OrganizationContext";

import { joinOrganization } from "../services/organizationMemberService";

const Join_Organ = () => {
  const { AccessToken } = useContext(AuthContext);

  const { LoadOrganizations } = useContext(OrganizationContext);

  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleJoin(e) {
    e.preventDefault();
    setMessage("");

    if (!inviteCode.trim()) {
      setMessage("Please enter invite code");
      return;
    }

    try {
      setLoading(true);

      const { response, data } = await joinOrganization(
        inviteCode.trim(),
        AccessToken
      );

      if (response.status === 409) {
        navigate("/already-joined");
        return;
      }

      if (response.ok && data.NewMember) {
        // Get the newly joined organization ID
        const joinedOrganizationId = data.NewMember.organizationId;

        // Refresh organization list and select newly joined organization
        const isLoaded = await LoadOrganizations(joinedOrganizationId);

        if (!isLoaded) {
          setMessage(
            "You joined successfully, but organizations could not be refreshed. Please try again."
          );
          return;
        }

        navigate("/organization-joined", {
          state: {
            organizationName: data.OrganizationName,
          },
        });

      } else {
        setMessage(data.message || "Invalid invite code");
      }

    } catch (error) {
      console.log("Join Organization Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-blue-50 Join-Organization-Page flex min-h-screen items-center justify-center">
      <div className="Join-Organization-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/4 p-10 border border-gray-300 rounded-2xl shadow-2xl">

        <div className="header flex flex-col items-center">
          <div className="logo p-2">
            <img
              className="w-20 rounded-lg"
              src="/logo.png"
              alt="Uman logo"
            />
          </div>

          <div className="title flex flex-col text-center items-center">
            <h1 className="font-bold text-2xl">
              Join Organization
            </h1>

            <p className="text-gray-400 text-sm m-2">
              Enter the invite code from your team administrator
            </p>
          </div>
        </div>

        <form onSubmit={handleJoin}>
          <div className="Organization my-2">
            <label
              htmlFor="invite-code"
              className="text-[16px] font-semibold"
            >
              Invite Code
            </label>

            <br />

            <input
              placeholder="UMAN-XXXX-XXXX"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="border placeholder:text-[13px] border-gray-300 my-1 rounded-lg py-1 px-3 outline-0 w-full"
              id="invite-code"
            />
          </div>

          {message && (
            <p className="text-red-500 text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="button cursor-pointer w-full bg-blue-600 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold"
          >
            {loading ? "JOINING..." : "JOIN ORGANIZATION"}
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

export default Join_Organ;
