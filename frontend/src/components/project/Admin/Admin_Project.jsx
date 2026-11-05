
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";

import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import ProjectCard from "../Project-components/ProjectCard";

import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { getProjects } from "../../../services/projectService";

const Admin_Project = () => {
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
    let isMounted = true;

    async function LoadProjects() {
      if (isOrgLoading) return;

      if (!AccessToken || !organizationId) {
        setProjects([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const { response, data } = await getProjects(
          organizationId,
          AccessToken
        );

        if (!response.ok) {
          throw new Error(
            data.message || data.Message || "Failed to load projects."
          );
        }

        // Supports both Admin and Member response keys.
        const projectList =
          data.All_Projects ||
          data.AssignedProjects ||
          data.Projects ||
          [];

        if (isMounted) {
          setProjects(Array.isArray(projectList) ? projectList : []);
        }
      } catch (err) {
        console.error("Projects loading error:", err);

        if (isMounted) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    LoadProjects();

    return () => {
      isMounted = false;
    };
  }, [AccessToken, organizationId, isOrgLoading]);

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full lg:w-[80%] min-w-0 bg-blue-50">
        <Navbar Page={"Projects"} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Page Heading */}
        <div className="Projects-heading mt-5 mx-5">
          <div className="title-text lg:flex lg:justify-between lg:items-center">
            <div className="left-panel w-[70%] ml-4">
              <h1 className="font-bold text-2xl lg:text-3xl text-gray-600 mb-1">
                Projects
              </h1>

              <p className="text-gray-500 font-semibold">
                {organizationName} Projects
              </p>
            </div>

            <div className="flex gap-2 pl-5 whitespace-nowrap">
              <Link
                to="/project/create"
                className="flex mt-4 cursor-pointer items-center gap-1.5 px-3 py-2 text-sm bg-blue-700 text-white font-semibold rounded-md whitespace-nowrap"
              >
                <span className="text-lg leading-none">+</span>
                CREATE PROJECT
              </Link>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="Projects-list mt-5 pb-10">
          {isLoading || isOrgLoading ? (
            <div className="mx-8 mt-8 text-center text-gray-500 font-semibold">
              Loading projects...
            </div>
          ) : error ? (
            <div className="mx-8 mt-8 p-5 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 font-semibold">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="mx-8 mt-8 p-8 bg-white rounded-2xl text-center shadow-sm">
              <h2 className="text-xl font-bold text-gray-700">
                No Projects Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first project to get started.
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

export default Admin_Project;
