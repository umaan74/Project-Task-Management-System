
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { getSingleProject } from "../../../services/projectService";

const Member_Single_Project_component = ({ projectId }) => {
  const { AccessToken } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError("");

        const { response, data } = await getSingleProject(
          projectId,
          AccessToken
        );

        if (!response.ok) {
          throw new Error(
            data.message || data.Message || "Unable to load project."
          );
        }

        const projectData =
          data.Project ||
          data.project ||
          data.Single_Project ||
          data;

        if (mounted) setProject(projectData);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    if (projectId && AccessToken) loadProject();

    return () => {
      mounted = false;
    };
  }, [projectId, AccessToken]);

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusStyles = {
    active: "bg-green-100 text-green-500",
    planning: "bg-blue-100 text-blue-500",
    completed: "bg-purple-100 text-purple-500",
    "on-hold": "bg-yellow-100 text-yellow-500",
  };

  if (isLoading) {
    return (
      <div className="mx-4 rounded-2xl bg-white p-8 text-center text-gray-500">
        Loading project details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 rounded-xl bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="single-project-card mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl">

      {/* Heading */}
      <div className="heading flex w-full items-center justify-start p-5 lg:px-10">
        <div className="text-panel w-full min-w-0">

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="break-words text-2xl font-bold lg:text-4xl">
              {project.name}
            </h1>

            <span
              className={`rounded-xl px-4 py-1 text-[10px] font-bold lg:text-sm ${
                statusStyles[project.status] ||
                "bg-gray-100 text-gray-500"
              }`}
            >
              {(project.status || "planning").replace("-", " ").toUpperCase()}
            </span>
          </div>

          <p className="m-2 text-xs font-semibold text-gray-600 lg:text-lg">
            Project Workspace
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="my-4 break-words px-5 text-gray-500 lg:px-10">
        {project.description || "No project description provided."}
      </p>

      {/* Dates */}
      <div className="Dates m-5 flex flex-wrap gap-8 px-5 pb-5 lg:px-10">

        <div className="start">
          <h1 className="font-semibold text-gray-500">
            START DATE
          </h1>

          <h2 className="font-bold">
            {formatDate(project.startDate)}
          </h2>
        </div>

        <div className="Due">
          <h1 className="font-semibold text-gray-500">
            DUE DATE
          </h1>

          <h2 className="font-bold">
            {formatDate(project.dueDate)}
          </h2>
        </div>

      </div>
    </div>
  );
};

export default Member_Single_Project_component;
