
import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router";

import { AuthContext } from "../../../contexts/AuthContext";

import { getProjectMembers } from "../../../services/projectMemberService";
import { getProjectTasks } from "../../../services/taskService";

const Member_Single_ProjectTasks_Members = ({ projectId }) => {
  const { AccessToken } = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
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
          memberResult.data.message || "Unable to load members."
        );
      }

      if (!taskResult.response.ok) {
        throw new Error(
          taskResult.data.message || "Unable to load tasks."
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
      setError(err.message || "Unable to load project information.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, AccessToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getMemberId = (member) => {
    if (typeof member === "string") return member;

    return (
      member?._id ||
      member?.userId?._id ||
      member?.userId ||
      ""
    );
  };

  const getMemberName = (member) => {
    if (typeof member === "string") {
      return `User ${member.slice(-6)}`;
    }

    return (
      member?.userId?.username ||
      member?.username ||
      member?.name ||
      member?.userId?.name ||
      member?.email ||
      member?.userId?.email ||
      `User ${getMemberId(member).slice(-6)}`
    );
  };

  const getAssignee = (task) => {
    if (!task || typeof task === "string") return "Not available";

    const assignedTo = task.assignedTo;

    if (!assignedTo) return "Unassigned";

    if (typeof assignedTo === "string") {
      return `User ${assignedTo.slice(-6)}`;
    }

    return (
      assignedTo.username ||
      assignedTo.name ||
      assignedTo.email ||
      "Assigned member"
    );
  };

  const statusStyles = {
    todo: "bg-gray-100 text-gray-600",
    "in-progress": "bg-yellow-100 text-yellow-500",
    completed: "bg-green-100 text-green-500",
  };

  return (
    <div className="main-container flex min-w-0 flex-col lg:flex-row">

      {/* PROJECT MEMBERS */}
      <div className="Project-panel my-3 mx-2 w-full min-w-0 rounded-2xl border border-gray-200 bg-white lg:m-6 lg:w-2/5">

        <div className="head flex items-center justify-between px-4 py-3 lg:px-6">
          <h1 className="text-sm font-bold lg:text-xl">
            Project Members ({members.length})
          </h1>
        </div>

        {isLoading ? (
          <p className="p-5 text-center text-gray-500">
            Loading members...
          </p>
        ) : members.length === 0 ? (
          <p className="p-5 text-center text-gray-500">
            No project members found.
          </p>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {members.map((member, index) => (
              <div
                key={getMemberId(member) || index}
                className="members my-2 flex min-w-0 items-center gap-3 px-5 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                  {getMemberName(member).charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate font-bold">
                    {getMemberName(member)}
                  </h2>

                  <p className="break-all text-sm font-semibold text-gray-600">
                    {typeof member === "string"
                      ? getMemberId(member)
                      : member?.email ||
                        member?.userId?.email ||
                        getMemberId(member)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TASKS */}
      <div className="Tasks-panel my-3 mx-2 w-full min-w-0 rounded-2xl border border-gray-200 bg-white lg:m-6 lg:w-3/5">

        <div className="head mx-3 my-2 flex items-center justify-between px-2 py-3 lg:px-6">
          <h1 className="text-sm font-bold lg:text-xl">
            Project Tasks ({tasks.length})
          </h1>
        </div>

        {isLoading ? (
          <p className="p-5 text-center text-gray-500">
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <p className="p-5 text-center text-gray-500">
            No tasks available in this project.
          </p>
        ) : (
          <div className="tasks max-h-96 overflow-y-auto">
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
                  className="task mx-2 my-2 flex flex-col justify-between gap-3 rounded-2xl bg-blue-50 px-5 py-3 sm:flex-row sm:items-center"
                >
                  <div className="task-info min-w-0">
                    {taskId ? (
                      <Link
                        to={`/projects/${projectId}/tasks/${taskId}`}
                        className="font-bold hover:text-blue-700 lg:text-lg"
                      >
                        {title}
                      </Link>
                    ) : (
                      <h2 className="font-bold lg:text-lg">{title}</h2>
                    )}

                    <p className="text-sm font-semibold text-gray-600">
                      Assigned to: {getAssignee(task)}
                    </p>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-xl px-4 py-1 text-[10px] font-bold lg:text-sm ${
                      statusStyles[status] ||
                      "bg-gray-100 text-gray-600"
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
              onClick={loadData}
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

export default Member_Single_ProjectTasks_Members;
