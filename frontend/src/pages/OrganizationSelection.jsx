
import { useContext } from "react";
import { useNavigate } from "react-router";
import { OrganizationContext } from "../contexts/OrganizationContext";

function OrganizationSelection() {
  const {
    Organizations,
    SelectOrganization,
    isOrgLoading,
  } = useContext(OrganizationContext);

  const navigate = useNavigate();

  function handleSelect(organization) {
    SelectOrganization(organization);
    navigate("/dashboard");
  }

  if (isOrgLoading) {
    return <h2>Loading Organizations...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Select Organization
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Choose an organization to continue
        </p>

        <div className="space-y-4">
          {Organizations.map((item) => (
            <button
              key={item.organizationId._id}
              onClick={() => handleSelect(item)}
              className="w-full border rounded-lg p-5 text-left hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <h2 className="text-lg font-semibold">
                {item.organizationId.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Role: {item.role}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrganizationSelection;
