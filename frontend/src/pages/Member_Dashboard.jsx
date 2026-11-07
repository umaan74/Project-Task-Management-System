import {
  CircleCheckBig,
  Folder,
  ListChecks,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/project/Project-components/ProjectCard";
import { AuthContext } from "../contexts/AuthContext";
import { OrganizationContext } from "../contexts/OrganizationContext";
import { getProjects } from "../services/projectService";
import { getProjectTasks } from "../services/taskService";

const Member_Dashboard = () => {
  const { AccessToken, CurrentUser } = useContext(AuthContext);
  const { SelectedOrganization } = useContext(OrganizationContext);
  const organizationId = SelectedOrganization?.organizationId?._id;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const loadDashboard = useCallback(async () => {
    if (!organizationId || !AccessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const { response, data } = await getProjects(organizationId, AccessToken);
      if (!response.ok) {
        throw new Error(data.message || "Unable to load your projects.");
      }

      const projectList = data.AssignedProjects || data.All_Projects || [];
      if (!Array.isArray(projectList)) {
        throw new Error("The project response was invalid.");
      }

      const taskResults = await Promise.all(
        projectList.map((project) => getProjectTasks(project._id, AccessToken))
      );
      const failedTaskResult = taskResults.find((result) => !result.response.ok);
      if (failedTaskResult) {
        throw new Error(
          failedTaskResult.data.message || "Unable to load project tasks."
        );
      }

      const userId = String(CurrentUser?._id || "");
      const assignedTasks = taskResults
        .flatMap((result) => result.data.All_Tasks || [])
        .filter((task) => String(task.assignedTo?._id || task.assignedTo || "") === userId);

      setProjects(projectList);
      setMyTasks(assignedTasks);
    } catch (loadError) {
      console.error("Member dashboard could not be loaded:", loadError);
      setError(loadError.message || "Unable to load your dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, AccessToken, CurrentUser]);

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
  }, [loadDashboard, reloadKey]);

  const completedTasks = myTasks.filter((task) => task.status === "completed");
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  const dueThisWeek = myTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      task.status !== "completed" &&
      !Number.isNaN(dueDate.getTime()) &&
      dueDate >= startOfWeek &&
      dueDate < endOfWeek
    );
  }).length;

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="right-panel w-full min-w-0 bg-blue-50 lg:w-[80%]">
        <Navbar Page={"Dashboard"} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="Welcome-Back-Panel mt-4 flex flex-wrap items-center justify-between gap-3 px-4">
          <div className="left-panel">
            <h1 className="font-bold text-2xl lg:mt-4 lg:mb-2 lg:text-4xl">
              Welcome back, {CurrentUser?.username || "Member"}
            </h1>
            <p className="text-gray-500">
              Review your project board and active task checklists.
            </p>
          </div>
          <div className="right-panel flex items-center gap-2">
            <span className="font-semibold text-sm lg:text-xl">
              {SelectedOrganization?.organizationId?.name || "Organization"}
            </span>
            <span className="rounded-full bg-gray-700 px-3 py-1 text-sm font-semibold text-white">
              Member
            </span>
          </div>
        </div>

        {error && (
          <div className="mx-5 mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="mt-3 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white"
            >
              Retry
            </button>
          </div>
        )}

        <div className="Cards flex flex-col flex-wrap lg:flex-row">
          {[
            {
              title: "My Projects",
              count: projects.length,
              description: "Projects you are assigned to",
              Icon: Folder,
            },
            {
              title: "My Tasks",
              count: myTasks.length,
              description: `${dueThisWeek} due this week`,
              Icon: ListChecks,
            },
            {
              title: "Completed Tasks",
              count: completedTasks.length,
              description: "Tasks marked complete",
              Icon: CircleCheckBig,
            },
          ].map(({ title, count, description, Icon }) => (
            <div
              key={title}
              className="card m-5 flex items-center rounded-2xl border border-gray-300 bg-white p-5 shadow lg:w-[30%]"
            >
              <div className="left-panel w-[90%]">
                <h2 className="mb-4 font-semibold text-gray-600">{title}</h2>
                <h1 className="text-4xl font-bold">
                  {isLoading ? "..." : count}
                </h1>
                <p className="mt-2 text-blue-700">{description}</p>
              </div>
              <div className="right-panel">
                <Icon className="h-12.5 w-12.5 rounded-xl bg-blue-100 p-2 text-blue-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="Projects-Panel my-2 mt-4 lg:mx-5">
          <div className="title-text px-4">
            <h1 className="mb-2 text-xl font-bold text-gray-600 lg:text-2xl">
              Recent Projects
            </h1>
          </div>

          {isLoading ? (
            <p className="p-8 text-center text-gray-500">Loading projects...</p>
          ) : !error && projects.length === 0 ? (
            <p className="mx-4 rounded-xl bg-white p-8 text-center text-gray-500">
              You have not been assigned to any projects yet.
            </p>
          ) : (
            <div className="Project-cards flex flex-wrap">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

          <div className="px-4 pb-6">
            <Link
              to="/projects"
              className="inline-block rounded-lg border-2 border-blue-700 px-4 py-2 font-semibold text-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
            >
              View all projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member_Dashboard;
