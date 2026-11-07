
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

import { AuthContext } from "./AuthContext";
import { getOrganizations } from "../services/organizationService";

export const OrganizationContext = createContext();

export function OrganizationProvider({ children }) {
  const { AccessToken, isLoading: isAuthLoading } = useContext(AuthContext);

  const [Organizations, setOrganizations] = useState([]);
  const [SelectedOrganization, setSelectedOrganization] = useState(null);
  const [isOrgLoading, setIsOrgLoading] = useState(true);
  const [organizationError, setOrganizationError] = useState("");

  const LoadOrganizations = useCallback(
    async (preferredOrganizationId = null) => {
      if (!AccessToken) {
        if (isAuthLoading) {
          return false;
        }

        setOrganizations([]);
        setSelectedOrganization(null);
        setOrganizationError("");
        localStorage.removeItem("selectedOrganizationId");
        setIsOrgLoading(false);
        return false;
      }

      setIsOrgLoading(true);
      setOrganizationError("");

      try {
        const { response, data } = await getOrganizations(AccessToken);

        if (!response.ok) {
          setOrganizationError(data.message || "Unable to load organizations.");
          return false;
        }

        const organizationList = (data.No_of_Organizations || []).filter(
          (item) => item?.organizationId?._id
        );

        setOrganizations(organizationList);

        const preferredId = preferredOrganizationId
          ? String(preferredOrganizationId?._id || preferredOrganizationId)
          : null;

        const savedId = localStorage.getItem("selectedOrganizationId");

        // First priority: newly joined organization
        const preferredOrganization = preferredId
          ? organizationList.find(
              (item) =>
                String(item.organizationId?._id) === preferredId
            )
          : null;

        // Second priority: previously selected organization
        const savedOrganization = organizationList.find(
          (item) => String(item.organizationId?._id) === savedId
        );

        // Third priority: automatically select if only one organization
        const organizationToSelect =
          preferredOrganization ||
          savedOrganization ||
          (organizationList.length === 1 ? organizationList[0] : null);

        if (organizationToSelect) {
          setSelectedOrganization(organizationToSelect);

          localStorage.setItem(
            "selectedOrganizationId",
            organizationToSelect.organizationId._id
          );
        } else {
          setSelectedOrganization(null);
          localStorage.removeItem("selectedOrganizationId");
        }

        return true;
      } catch (error) {
        console.error("Organizations could not be loaded", error);
        setOrganizationError(error.message || "Unable to load organizations.");
        return false;
      } finally {
        setIsOrgLoading(false);
      }
    },
    [AccessToken, isAuthLoading]
  );

  function SelectOrganization(organization) {
    setSelectedOrganization(organization);

    localStorage.setItem(
      "selectedOrganizationId",
      organization.organizationId._id
    );
  }

  useEffect(() => {
    LoadOrganizations();
  }, [LoadOrganizations]);

  return (
    <OrganizationContext.Provider
      value={{
        Organizations,
        SelectedOrganization,
        LoadOrganizations,
        SelectOrganization,
        isOrgLoading,
        organizationError,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
