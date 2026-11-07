
import {
  Folder,
  ListChecks,
  CircleCheckBig,
  UserRoundGroup,
} from "lucide-react";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { AuthContext } from "../contexts/AuthContext";
import { OrganizationContext } from "../contexts/OrganizationContext";

import { getProjects } from "../services/projectService";
import { getProjectTasks } from "../services/taskService";

const Admin_Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { AccessToken, CurrentUser } = useContext(AuthContext);

  const { SelectedOrganization } = useContext(OrganizationContext);

  const navigate = useNavigate();

  const [Projects, setProjects] = useState([]);
  const [ActiveTasks, setActiveTasks] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const organizationId = SelectedOrganization?.organizationId?._id;
  const organizationName = SelectedOrganization?.organizationId?.name;

  // LOAD DASHBOARD DATA
  useEffect(() => {
    let isMounted = true;

    async function LoadDashboard() {
      if (!AccessToken || !organizationId) {
        setProjects([]);
        setActiveTasks(0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        // Fetch organization projects
        const { response, data } = await getProjects(
          organizationId,
          AccessToken
        );

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch projects");
        }

        const projectList =
          data.All_Projects || data.AssignedProjects || [];

        if (!isMounted) return;

        const validProjects = Array.isArray(projectList) ? projectList : [];
        setProjects(validProjects);

        // Fetch tasks from all projects
        const taskResponses = await Promise.all(
          validProjects.map((project) =>
            getProjectTasks(project._id, AccessToken)
          )
        );

        const failedTaskResult = taskResponses.find(
          (result) => !result.response.ok
        );
        if (failedTaskResult) {
          throw new Error(
            failedTaskResult.data.message || "Unable to fetch project tasks"
          );
        }

        if (!isMounted) return;

        const allTasks = taskResponses.flatMap(
          (result) => result.data.All_Tasks || []
        );

        // Count incomplete tasks
        const activeTaskCount = allTasks.filter((task) => {
          if (typeof task === "string") {
            return true;
          }

          return task.status !== "completed";
        }).length;

        setActiveTasks(activeTaskCount);

      } catch (error) {
        console.error("Dashboard Error:", error);

        if (isMounted) {
          setError(error.message || "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    LoadDashboard();

    return () => {
      isMounted = false;
    };
  }, [AccessToken, organizationId, reloadKey]);

  // DASHBOARD CALCULATIONS
  const CompletedProjects = Projects.filter(
    (project) => project.status === "completed"
  ).length;

  const RecentProjects = [...Projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 3);

  function FormatDate(date) {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function GetStatusStyle(status) {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-600";

      case "completed":
        return "bg-blue-100 text-blue-600";

      case "planning":
        return "bg-yellow-100 text-yellow-600";

      case "on-hold":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div className="Admin-Dashboard flex min-h-screen w-full">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* RIGHT PANEL */}
      <div className="right-panel w-full lg:w-[80%] min-w-0 bg-blue-50">

        <Navbar
          Page={"Dashboard"}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* WELCOME PANEL */}
        <div className="Welcome-Back-Panel mt-4 flex justify-between items-center">

          <div className="left-panel w-[60%] ml-4">

            <h1 className="font-bold text-2xl lg:text-4xl lg:mb-2">
              Welcome back, {CurrentUser?.username || "Admin"}
            </h1>

            <p className="text-gray-400">
              Track performances, manage projects and your team here
            </p>

          </div>

          <div className="right-panel relative right-10 lg:text-2xl">

            <span className="font-semibold lg:text-xl text-[14px]">
              {organizationName || "Organization"}
            </span>

            <span className="lg:mr-2 lg:text-2xl text-[14px] bg-blue-700 text-white font-semibold rounded-full px-2 py-1 text-sm">
              Admin
            </span>

          </div>

        </div>


        {/* ERROR MESSAGE */}
        {error && (
          <div className="mx-5 mt-5 p-4 bg-red-100 text-red-600 rounded-lg">
            {error}

            <button
              onClick={() => setReloadKey((key) => key + 1)}
              className="underline ml-2 font-semibold"
            >
              Retry
            </button>
          </div>
        )}


        {/* DASHBOARD CARDS */}
        <div className="Cards flex flex-wrap flex-col lg:flex-row">

          {/* TOTAL PROJECTS */}
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">

            <div className="left-panel w-[90%]">

              <h2 className="text-gray-600 font-semibold mb-4">
                Total Projects
              </h2>

              <h1 className="text-4xl font-bold">
                {isLoading ? "..." : Projects.length}
              </h1>

              <p className="text-blue-700 mt-2">
                Projects in this organization
              </p>

            </div>

            <div className="right-panel">
              <Folder className="bg-blue-100 text-blue-700 p-2 w-12.5 h-12.5 rounded-xl" />
            </div>

          </div>


          {/* ACTIVE TASKS */}
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">

            <div className="left-panel w-[90%]">

              <h2 className="text-gray-600 font-semibold mb-4">
                Active Tasks
              </h2>

              <h1 className="text-4xl font-bold">
                {isLoading ? "..." : ActiveTasks}
              </h1>

              <p className="text-blue-700 mt-2">
                Tasks not yet completed
              </p>

            </div>

            <div className="right-panel">
              <ListChecks className="bg-blue-100 text-blue-700 p-2 w-12.5 h-12.5 rounded-xl" />
            </div>

          </div>


          {/* COMPLETED PROJECTS */}
          <div className="card border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl m-5 p-5 flex items-center">

            <div className="left-panel w-[90%]">

              <h2 className="text-gray-600 font-semibold mb-4">
                Completed Projects
              </h2>

              <h1 className="text-4xl font-bold">
                {isLoading ? "..." : CompletedProjects}
              </h1>

              <p className="text-blue-700 mt-2">
                Successfully completed projects
              </p>

            </div>

            <div className="right-panel">
              <CircleCheckBig className="bg-blue-100 text-blue-700 p-2 w-12.5 h-12.5 rounded-xl" />
            </div>

          </div>

        </div>


        {/* RECENT PROJECTS PANEL */}
        <div className="Projects-Panel mt-4 mx-5 my-2">

          <div className="title-text lg:flex lg:justify-between lg:items-center">

            <div className="left-panel w-[70%] ml-4">

              <h1 className="font-bold text-xl lg:text-2xl text-gray-600 mb-2">
                Recent Projects
              </h1>

            </div>

            <div className="flex gap-2 pl-5 whitespace-nowrap">

              <button
                onClick={() => navigate("/members")}
                className="flex items-center cursor-pointer gap-1.5 px-3 py-2 text-sm bg-blue-700 text-white font-semibold rounded-md"
              >
                <UserRoundGroup className="w-4 h-4 shrink-0" />
                MANAGE MEMBERS
              </button>

              <button
                onClick={() => navigate("/project/create")}
                className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-sm bg-blue-700 text-white font-semibold rounded-md whitespace-nowrap"
              >
                <span className="text-lg leading-none">+</span>
                CREATE PROJECT
              </button>

            </div>

          </div>


          {/* PROJECT CARDS */}
          <div className="Project-cards flex flex-wrap flex-col lg:flex-row">

            {isLoading ? (

              <div className="w-full text-center p-10 text-gray-500">
                Loading projects...
              </div>

            ) : Projects.length === 0 ? (

              <div className="w-full text-center p-10 bg-white rounded-xl mt-5">
                <Folder className="mx-auto text-gray-400 mb-3" size={40} />

                <h2 className="font-semibold text-gray-600">
                  No projects yet
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Create your first project to get started.
                </p>

                <button
                  onClick={() => navigate("/project/create")}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4"
                >
                  Create Project
                </button>
              </div>

            ) : (

              RecentProjects.map((project) => (

                <div
                  key={project._id}
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="card cursor-pointer border lg:w-[30%] border-gray-300 shadow bg-white rounded-2xl mt-5 mx-3 p-5 flex items-center hover:shadow-lg transition"
                >

                  <div className="left-panel w-[90%] min-w-0">

                    <h1 className="lg:text-2xl font-bold truncate">
                      {project.name}
                    </h1>

                    <h2 className="text-gray-600 lg:text-lg text-sm font-semibold mb-4 truncate">
                      {project.description || "No description available"}
                    </h2>

                    <p className="font-bold text-gray-500 mt-2">
                      Due: {FormatDate(project.dueDate)}
                    </p>

                  </div>

                  <div className="right-panel">

                    <span className={`${GetStatusStyle(project.status)} font-bold p-2 px-4 rounded-xl text-xs`}>
                      {project.status?.toUpperCase() || "UNKNOWN"}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Admin_Dashboard;
