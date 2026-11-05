
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { API_URL } from "../../../services/api";
import Admin_Edit_Project_component from "./Admin_Edit_Project_component";

const Admin_Single_Project_component = ({ projectId }) => {
  const navigate = useNavigate();
  const { AccessToken } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const getProject = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.Message || "Unable to load project.");
      }

      const projectData =
        data.Project || data.project || data.Single_Project || data;

      setProject(projectData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId && AccessToken) {
      getProject();
    }
  }, [projectId, AccessToken]);

  const handleUpdate = async (updatedData) => {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AccessToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.Message || "Project update failed.");
    }

    const updatedProject =
      data.Project || data.project || data.Updated_Project || data;

    setProject(updatedProject);
    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError("");

      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.Message || "Project deletion failed.");
      }

      navigate("/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusStyles = {
    active: "bg-green-100 text-green-600",
    planning: "bg-blue-100 text-blue-600",
    completed: "bg-purple-100 text-purple-600",
    "on-hold": "bg-yellow-100 text-yellow-600",
  };

  if (isLoading) {
    return (
      <div className="mx-4 my-6 rounded-2xl bg-white p-8 text-center text-gray-500">
        Loading project details...
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="mx-4 my-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error}
        <button onClick={getProject} className="ml-3 font-bold underline">
          Retry
        </button>
      </div>
    );
  }

  if (!project) return null;

  return (
    <>
      <div className="single-project-card mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="heading flex flex-col justify-between gap-4 p-5 lg:flex-row lg:items-center lg:px-10">
          <div className="text-panel min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold lg:text-4xl">
                {project.name}
              </h1>

              <span
                className={`rounded-xl px-4 py-1 text-[10px] font-bold lg:text-sm ${
                  statusStyles[project.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {(project.status || "planning").replace("-", " ").toUpperCase()}
              </span>
            </div>

            <p className="m-2 text-sm font-semibold text-gray-600 lg:text-lg">
              Project Workspace
            </p>
          </div>

          <div className="button-panel">
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => setIsEditOpen(true)}
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-bold text-white hover:bg-blue-600 lg:text-base"
              >
                EDIT PROJECT
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50 lg:text-base"
              >
                {isDeleting ? "DELETING..." : "DELETE PROJECT"}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="mx-5 rounded-lg bg-red-50 p-3 text-sm text-red-600 lg:mx-10">
            {error}
          </p>
        )}

        <p className="my-4 px-5 text-gray-500 lg:px-10">
          {project.description || "No project description provided."}
        </p>

        <div className="Dates m-5 flex flex-wrap gap-8 px-5 pb-5 lg:px-10">
          <div>
            <h2 className="font-semibold text-gray-500">START DATE</h2>
            <p className="font-bold">{formatDate(project.startDate)}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-500">DUE DATE</h2>
            <p className="font-bold">{formatDate(project.dueDate)}</p>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <Admin_Edit_Project_component
          project={project}
          onClose={() => setIsEditOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
};

export default Admin_Single_Project_component;
