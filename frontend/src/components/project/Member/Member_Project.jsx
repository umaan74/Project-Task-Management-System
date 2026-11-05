
import { useState, useEffect, useContext } from "react";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import ProjectCard from "../Project-components/ProjectCard";

import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { getProjects } from "../../../services/projectService";

const Member_Project = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { AccessToken } = useContext(AuthContext);
  const { SelectedOrganization, isOrgLoading } =
    useContext(OrganizationContext);

  const organizationId = SelectedOrganization?.organizationId?._id;
  const organizationName =
    SelectedOrganization?.organizationId?.name || "Your Organization";

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      if (isOrgLoading) return;

      if (!AccessToken || !organizationId) {
        setProjects([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const { response, data } = await getProjects(
          organizationId,
          AccessToken
        );

        if (!response.ok) {
          throw new Error(
            data.message || data.Message || "Unable to load projects."
          );
        }

        const projectList =
          data.AssignedProjects ||
          data.All_Projects ||
          data.Projects ||
          [];

        if (mounted) {
          setProjects(Array.isArray(projectList) ? projectList : []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadProjects();

    return () => {
      mounted = false;
    };
  }, [AccessToken, organizationId, isOrgLoading]);

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full min-w-0 bg-blue-50 lg:w-[80%]">
        <Navbar
          Page={"My Projects"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="Projects-heading mx-5 mt-5">
          <div className="title-text lg:flex lg:items-center lg:justify-between">
            <div className="left-panel ml-4 w-[70%]">
              <h1 className="mb-1 text-2xl font-bold text-gray-600 lg:text-3xl">
                My Projects
              </h1>

              <p className="font-semibold text-gray-500">
                {organizationName}
              </p>
            </div>
          </div>
        </div>

        <div className="Projects-list pb-10">
          {isLoading || isOrgLoading ? (
            <div className="mx-8 mt-8 text-center font-semibold text-gray-500">
              Loading your projects...
            </div>
          ) : error ? (
            <div className="mx-8 mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-red-600">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-3 rounded-lg bg-blue-700 px-4 py-2 text-white"
              >
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="mx-8 mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-bold text-gray-700">
                No Projects Assigned
              </h2>

              <p className="mt-2 text-gray-500">
                You haven't been assigned to any projects yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Member_Project;
