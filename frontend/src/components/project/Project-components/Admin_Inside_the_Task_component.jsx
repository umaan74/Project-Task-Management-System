
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";

import { getTask, updateTask, assignTask, deleteTask } from "../../../services/taskService";
import { getProjectMembers } from "../../../services/projectMemberService";

const Admin_Inside_Task_component = ({ projectId, taskId }) => {
  const navigate = useNavigate();
  const { AccessToken } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [members, setMembers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadTask = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [taskResult, memberResult] = await Promise.all([
          getTask(taskId, AccessToken),
          getProjectMembers(projectId, AccessToken),
        ]);

        if (!taskResult.response.ok) {
          throw new Error(
            taskResult.data.message || "Unable to load task."
          );
        }

        if (!memberResult.response.ok) {
          throw new Error(
            memberResult.data.message || "Unable to load project members."
          );
        }

        const taskData =
          taskResult.data.isTaskExist ||
          taskResult.data.Task ||
          taskResult.data.task;

        const memberList =
          memberResult.data.Project_Members ||
          memberResult.data.ProjectMembers ||
          [];

        if (mounted) {
          setTask(taskData);
          setSelectedStatus(taskData.status || "todo");
          setSelectedAssignee(
            typeof taskData.assignedTo === "object"
              ? taskData.assignedTo?._id
              : taskData.assignedTo || ""
          );
          setMembers(Array.isArray(memberList) ? memberList : []);
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    if (taskId && projectId && AccessToken) loadTask();

    return () => {
      mounted = false;
    };
  }, [taskId, projectId, AccessToken]);

  const getMemberId = (member) => {
    if (typeof member === "string") return member;
    return member?._id || member?.userId?._id || member?.userId || "";
  };

  const getMemberName = (member) => {
    if (typeof member === "string") return `User ${member.slice(-6)}`;

    return (
      member?.name ||
      member?.username ||
      member?.userId?.username ||
      member?.userId?.name ||
      member?.email ||
      member?.userId?.email ||
      `User ${getMemberId(member).slice(-6)}`
    );
  };

  const getPersonName = (person) => {
    if (!person) return "Not available";
    if (typeof person === "string") return `User ${person.slice(-6)}`;

    return person.username || person.name || person.email || "User";
  };

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusUpdate = async () => {
    try {
      setIsSaving(true);
      setError("");

      const { response, data } = await updateTask(
        taskId,
        selectedStatus,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(data.message || "Status update failed.");
      }

      setTask((prev) => ({
        ...prev,
        ...(data.UpdatedTask || {}),
        status: selectedStatus,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReassign = async () => {
    if (!selectedAssignee) {
      setError("Please select a member.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const { response, data } = await assignTask(
        taskId,
        selectedAssignee,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(data.message || "Task reassignment failed.");
      }

      const updatedTask = data.UpdatedAssignedTask;

      setTask((prev) => ({
        ...prev,
        ...(updatedTask || {}),
        assignedTo: updatedTask?.assignedTo || selectedAssignee,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const { response, data } = await deleteTask(taskId, AccessToken);

      if (!response.ok) {
        throw new Error(data.message || "Task deletion failed.");
      }

      navigate(`/projects/${projectId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-4 rounded-2xl bg-white p-8 text-center text-gray-500">
        Loading task details...
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="mx-4 rounded-xl bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!task) return null;

  const statusStyles = {
    todo: "bg-gray-100 text-gray-600",
    "in-progress": "bg-green-100 text-green-600",
    completed: "bg-blue-100 text-blue-600",
  };

  const priorityStyles = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-yellow-100 text-yellow-600",
    urgent: "bg-red-100 text-red-600",
  };

  return (
    <div className="single-project-card mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl">

      {/* Heading */}
      <div className="heading flex flex-col items-start justify-between gap-4 p-5 lg:flex-row lg:items-center lg:px-10">

        <div className="text-panel min-w-0">
          <h1 className="my-2 break-words rounded-2xl px-1 py-3 text-2xl font-bold lg:px-6 lg:text-4xl">
            {task.title}
          </h1>

          <div className="flex flex-wrap gap-2 px-1 lg:px-6">
            <span className={`rounded-lg px-4 py-2 text-xs font-bold ${statusStyles[task.status] || "bg-gray-100 text-gray-600"}`}>
              {(task.status || "todo").replace("-", " ").toUpperCase()}
            </span>

            <span className={`rounded-lg px-4 py-2 text-xs font-bold ${priorityStyles[task.priority] || "bg-gray-100 text-gray-600"}`}>
              {(task.priority || "medium").toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={isSaving}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
        >
          DELETE TASK
        </button>
      </div>

      {/* Description */}
      <p className="my-2 px-5 text-gray-500 lg:px-10">
        {task.description || "No task description provided."}
      </p>

      {/* Task Details */}
      <div className="my-4 flex flex-wrap items-start gap-3 px-5 lg:px-10">

        <div className="rounded-2xl border border-gray-200 p-3 shadow-sm">
          <h2 className="px-1 font-bold text-gray-500">ASSIGNED TO</h2>
          <p className="mt-2 font-bold">
            {getPersonName(task.assignedTo)}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-3 shadow-sm">
          <h2 className="px-1 font-bold text-gray-500">CREATED BY</h2>
          <p className="mt-2 font-bold">
            {getPersonName(task.createdBy)}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-3 shadow-sm">
          <h2 className="font-semibold text-gray-500">DUE DATE</h2>
          <p className="mt-2 font-bold">
            {formatDate(task.dueDate)}
          </p>
        </div>
      </div>

      {/* Status Update */}
      <div className="mx-5 my-5 rounded-xl bg-blue-50 p-4 lg:mx-10">
        <h2 className="mb-3 font-bold text-gray-700">
          UPDATE TASK STATUS
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 sm:w-1/2"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={handleStatusUpdate}
            disabled={isSaving || selectedStatus === task.status}
            className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {isSaving ? "SAVING..." : "UPDATE STATUS"}
          </button>
        </div>
      </div>

      {/* Reassign Task */}
      <div className="mx-5 my-5 rounded-xl border border-gray-200 p-4 lg:mx-10">
        <h2 className="mb-3 font-bold text-gray-700">
          REASSIGN TASK
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 sm:w-1/2"
          >
            {members.map((member, index) => {
              const userId = getMemberId(member);

              return (
                <option key={userId || index} value={userId}>
                  {getMemberName(member)}
                </option>
              );
            })}
          </select>

          <button
            onClick={handleReassign}
            disabled={isSaving || !selectedAssignee}
            className="rounded-lg border-2 border-blue-700 px-5 py-2 font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
          >
            REASSIGN TASK
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-5 mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600 lg:mx-10">
          {error}
        </div>
      )}
    </div>
  );
};

export default Admin_Inside_Task_component;
