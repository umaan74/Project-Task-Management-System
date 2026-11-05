
import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router";

import { AuthContext } from "../../../contexts/AuthContext";
import { getProjectMembers } from "../../../services/projectMemberService";
import { getProjectTasks } from "../../../services/taskService";

const Admin_Single_ProjectTasks_Members = ({ projectId }) => {
  const { AccessToken } = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjectData = useCallback(async () => {
    if (!projectId || !AccessToken) return;

    try {
      setIsLoading(true);
      setError("");

      const [memberResult, taskResult] = await Promise.all([
        getProjectMembers(projectId, AccessToken),
        getProjectTasks(projectId, AccessToken),
      ]);

      if (!memberResult.response.ok) {
        throw new Error(
          memberResult.data.message || "Unable to load project members."
        );
      }

      if (!taskResult.response.ok) {
        throw new Error(
          taskResult.data.message || "Unable to load project tasks."
        );
      }

      const memberList =
        memberResult.data.Project_Members ||
        memberResult.data.ProjectMembers ||
        [];

      const taskList =
        taskResult.data.All_Tasks ||
        taskResult.data.Tasks ||
        taskResult.data.Project_Tasks ||
        [];

      setMembers(Array.isArray(memberList) ? memberList : []);
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (err) {
      console.error("Project members/tasks error:", err);
      setError(err.message || "Unable to load project data.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, AccessToken]);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  const getUserId = (member) => {
    if (typeof member === "string") return member;
    return member?._id || member?.userId?._id || member?.userId || "";
  };

  const getUserName = (member) => {
    if (typeof member === "string") return `User ${member.slice(-6)}`;
    return (
      member?.name ||
      member?.userId?.name ||
      member?.email ||
      member?.userId?.email ||
      `User ${getUserId(member).slice(-6)}`
    );
  };

  const getAssigneeName = (task) => {
    if (!task || typeof task === "string") return "Assignee not available";

    const assignedTo = task.assignedTo;

    if (!assignedTo) return "Unassigned";
    if (typeof assignedTo === "string") {
      return `User ${assignedTo.slice(-6)}`;
    }

    return (
      assignedTo.name ||
      assignedTo.email ||
      `User ${(assignedTo._id || "").slice(-6)}`
    );
  };

  const statusStyles = {
    todo: "bg-gray-100 text-gray-600",
    "in-progress": "bg-yellow-100 text-yellow-600",
    completed: "bg-green-100 text-green-600",
  };

  return (
    <div className="main-container flex flex-col lg:flex-row">

      {/* Project Members */}
      <div className="Project-panel m-4 w-auto rounded-2xl border border-gray-200 bg-white lg:m-6 lg:w-2/5">

        <div className="head my-3 flex items-center justify-between px-4 lg:px-6">
          <h1 className="text-sm font-bold lg:text-xl">
            Project Members ({members.length})
          </h1>

          <Link
            to={`/projects/${projectId}/add-members`}
            className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 lg:text-sm"
          >
            + ADD MEMBER
          </Link>
        </div>

        {isLoading ? (
          <p className="p-5 text-center text-sm text-gray-500">
            Loading members...
          </p>
        ) : members.length === 0 ? (
          <p className="p-5 text-center text-sm text-gray-500">
            No members assigned to this project yet.
          </p>
        ) : (
         
<div className="members px-5 pb-5">

  {members.length === 0 ? (
    <p className="py-8 text-center text-gray-500">
      No members assigned to this project yet.
    </p>
  ) : (
    members.map((member) => {
      const user = member.userId;

      return (
        <div
          key={member._id}
          className="my-3 flex items-center justify-between border-b pb-3"
        >
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="font-semibold text-gray-800">
  {user?.username || "Unknown User"}
</h2>

              <p className="text-sm text-gray-500">
                {user?.email || "No email"}
              </p>
            </div>

          </div>

          <span className="rounded-xl bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            MEMBER
          </span>

        </div>
      );
    })
  )}

</div>

        )}
      </div>

      {/* Project Tasks */}
      <div className="Tasks-panel m-4 w-auto rounded-2xl border border-gray-200 bg-white lg:m-6 lg:w-3/5">

        <div className="head my-3 flex items-center justify-between px-4 lg:px-6">
          <h1 className="text-sm font-bold lg:text-xl">
            Tasks ({tasks.length})
          </h1>

          <Link
            to={`/projects/${projectId}/create-task`}
            className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 lg:text-sm"
          >
            + CREATE TASK
          </Link>
        </div>

        {isLoading ? (
          <p className="p-5 text-center text-sm text-gray-500">
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <p className="p-5 text-center text-sm text-gray-500">
            No tasks created for this project yet.
          </p>
        ) : (
          <div className="tasks max-h-96 overflow-y-auto px-2 pb-3">
            {tasks.map((task, index) => {
              const taskId =
                typeof task === "object"
                  ? task._id || task.id
                  : null;

              const title =
                typeof task === "string"
                  ? task
                  : task.title || "Untitled Task";

              const status =
                typeof task === "object"
                  ? task.status || "todo"
                  : "todo";

              return (
                <div
                  key={taskId || index}
                  className="task my-2 flex flex-col justify-between gap-3 rounded-2xl bg-blue-50 px-4 py-3 sm:flex-row sm:items-center"
                >
                  <div className="task-info min-w-0">
                    {taskId ? (
                      <Link
                        to={`/projects/${projectId}/tasks/${taskId}`}
                        className="font-bold text-gray-800 hover:text-blue-700"
                      >
                        {title}
                      </Link>
                    ) : (
                      <h2 className="font-bold text-gray-800">{title}</h2>
                    )}

                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      Assigned to: {getAssigneeName(task)}
                    </p>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-xl px-3 py-1 text-[10px] font-bold lg:text-xs ${
                      statusStyles[status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {status.replace("-", " ").toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <div className="m-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
            <button
              onClick={loadProjectData}
              className="ml-2 font-bold underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_Single_ProjectTasks_Members;
