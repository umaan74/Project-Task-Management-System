
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import {
  getTask,
  updateTask,
} from "../../../services/taskService";

const Member_Inside_Task_component = ({ projectId, taskId }) => {
  const { AccessToken } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch task details
  useEffect(() => {
    let mounted = true;

    const loadTask = async () => {
      try {
        setIsLoading(true);
        setError("");

        const { response, data } = await getTask(
          taskId,
          AccessToken
        );

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load task details."
          );
        }

        const taskData = data.isTaskExist || data.Task || data.task;

        if (!taskData) {
          throw new Error("Task details not found.");
        }

        // Verify that task belongs to the opened project.
        const actualProjectId =
          typeof taskData.projectId === "object"
            ? taskData.projectId?._id
            : taskData.projectId;

        if (actualProjectId && actualProjectId !== projectId) {
          throw new Error("This task does not belong to this project.");
        }

        if (mounted) {
          setTask(taskData);
          setSelectedStatus(taskData.status || "todo");
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    if (taskId && AccessToken) {
      loadTask();
    }

    return () => {
      mounted = false;
    };
  }, [taskId, projectId, AccessToken]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get user name
  const getPersonName = (person) => {
    if (!person) return "Not available";

    if (typeof person === "string") {
      return `User ${person.slice(-6)}`;
    }

    return (
      person.name ||
      person.email ||
      "User"
    );
  };

  // Update task status
  const handleStatusUpdate = async () => {
    if (selectedStatus === task.status) return;

    try {
      setIsUpdating(true);
      setError("");
      setSuccess("");

      const { response, data } = await updateTask(
        taskId,
        selectedStatus,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update task status."
        );
      }

      const updatedTask = data.UpdatedTask;

      setTask((prev) => ({
        ...prev,
        ...(updatedTask || {}),
        status: selectedStatus,
      }));

      setSuccess("Task status updated successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setSelectedStatus(task.status);
    } finally {
      setIsUpdating(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="mx-4 rounded-2xl bg-white p-8 text-center text-gray-500">
        Loading task details...
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="mx-4 rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="single-project-card mx-4 rounded-2xl border border-gray-200 bg-white shadow-2xl">

      {/* Heading */}
      <div className="heading flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">

        <div className="text-panel px-5 lg:px-10">

          <h1 className="my-2 break-words rounded-2xl px-1 py-3 text-2xl font-bold lg:my-4 lg:px-6 lg:text-4xl">
            {task.title}
          </h1>

          <div className="flex flex-wrap gap-2">

            <span
              className={`rounded-lg px-4 py-2 text-[10px] font-bold lg:text-xs ${
                statusStyles[task.status] ||
                "bg-gray-100 text-gray-600"
              }`}
            >
              {(task.status || "todo").replace("-", " ").toUpperCase()}
            </span>

            <span
              className={`rounded-lg px-4 py-2 text-[10px] font-bold lg:text-xs ${
                priorityStyles[task.priority] ||
                "bg-gray-100 text-gray-600"
              }`}
            >
              {(task.priority || "medium").toUpperCase()}
            </span>

          </div>
        </div>

        {/* Status Selection */}
        <div className="select-panel mx-5 w-full lg:mx-0 lg:mr-8 lg:w-auto">

          <div className="my-2 flex flex-col gap-3 sm:flex-row sm:items-center">

            <div className="rounded-2xl border border-blue-200 p-3 shadow-sm">
              <h2 className="text-xs font-semibold text-gray-600">
                MY TASK STATUS
              </h2>

              <p className="font-bold text-blue-700">
                {(task.status || "todo").replace("-", " ").toUpperCase()}
              </p>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              type="button"
              onClick={handleStatusUpdate}
              disabled={
                isUpdating ||
                selectedStatus === task.status
              }
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "UPDATING..." : "UPDATE"}
            </button>

          </div>
        </div>
      </div>

      {/* Description */}
      <p className="my-2 px-5 text-gray-500 lg:my-4 lg:px-10 lg:py-5">
        {task.description || "No task description provided."}
      </p>

      {/* Task Information */}
      <div className="my-4 flex flex-wrap items-start gap-3 px-5 lg:px-10">

        {/* Assigned To */}
        <div className="assigned-to rounded-2xl border border-gray-200 p-3 shadow-sm">
          <h2 className="px-1 font-bold text-gray-500">
            ASSIGNED TO
          </h2>

          <div className="user flex flex-wrap items-center gap-3 px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {getPersonName(task.assignedTo).charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="font-bold">
                {getPersonName(task.assignedTo)}
              </h3>

              <p className="break-all text-sm text-gray-600">
                {typeof task.assignedTo === "object"
                  ? task.assignedTo?.email || "Email not available"
                  : "Member"}
              </p>
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="Due mx-2 rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
          <h2 className="font-semibold text-gray-500">
            DUE DATE
          </h2>

          <p className="font-bold">
            {formatDate(task.dueDate)}
          </p>
        </div>

        {/* Created By */}
        <div className="rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
          <h2 className="font-semibold text-gray-500">
            CREATED BY
          </h2>

          <p className="font-bold">
            {getPersonName(task.createdBy)}
          </p>
        </div>

      </div>

      {/* API Messages */}
      {error && (
        <div className="mx-5 mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 lg:mx-10">
          {error}
        </div>
      )}

      {success && (
        <div className="mx-5 mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600 lg:mx-10">
          {success}
        </div>
      )}

    </div>
  );
};

export default Member_Inside_Task_component;
