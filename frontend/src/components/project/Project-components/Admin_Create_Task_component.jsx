
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../../../contexts/AuthContext";
import { getProjectMembers } from "../../../services/projectMemberService";
import { createTask } from "../../../services/taskService";

const Admin_Create_Task_component = ({ projectId }) => {
  const navigate = useNavigate();
  const { AccessToken } = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    let mounted = true;

    const loadMembers = async () => {
      try {
        setIsLoadingMembers(true);

        const { response, data } = await getProjectMembers(
          projectId,
          AccessToken
        );

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load project members."
          );
        }

        const list =
          data.Project_Members ||
          data.ProjectMembers ||
          [];

        if (mounted) {
          setMembers(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setIsLoadingMembers(false);
      }
    };

    if (projectId && AccessToken) loadMembers();

    return () => {
      mounted = false;
    };
  }, [projectId, AccessToken]);

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
      member?.name ||
      member?.username ||
      member?.userId?.username ||
      member?.userId?.name ||
      member?.email ||
      member?.userId?.email ||
      `User ${getMemberId(member).slice(-6)}`
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.assignedTo) {
      setError("Please select a project member.");
      return;
    }

    if (!formData.dueDate) {
      setError("Please select a due date.");
      return;
    }

    try {
      setIsSubmitting(true);

      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        assignedTo: formData.assignedTo,
        priority: formData.priority,
        dueDate: formData.dueDate,
      };

      const { response, data } = await createTask(
        projectId,
        taskData,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.messsage ||
          "Unable to create task."
        );
      }

      setSuccess("Task created successfully!");

      setTimeout(() => {
        navigate(`/projects/${projectId}`);
      }, 700);
    } catch (err) {
      console.error("Create task error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 outline-none focus:border-blue-500";

  return (
    <div className="mx-4 my-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl lg:mx-20 lg:p-6">

      <div className="Projects-heading">
        <div className="title-text ml-4">
          <h1 className="mb-1 text-2xl font-bold lg:text-3xl">
            Create Task
          </h1>

          <p className="font-semibold text-gray-600">
            Add a new task to this project workspace.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="my-8 lg:mx-20">

        {/* Title */}
        <div>
          <label
            htmlFor="task-title"
            className="font-bold text-gray-800"
          >
            TASK TITLE *
          </label>

          <input
            type="text"
            id="task-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={150}
            required
            className={`${inputClass} my-2`}
            placeholder="e.g. Implement user authentication"
          />
        </div>

        {/* Description */}
        <div className="mt-3">
          <label
            htmlFor="Task-description"
            className="font-bold text-gray-800"
          >
            DESCRIPTION
          </label>

          <textarea
            id="Task-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            maxLength={2000}
            className={`${inputClass} my-2 resize-none`}
            placeholder="Provide details about the task..."
          />
        </div>

        {/* Assignee and Priority */}
        <div className="my-3 grid grid-cols-1 gap-4 lg:grid-cols-2">

          <div>
            <label
              htmlFor="Project-Task-Assigned"
              className="font-bold text-gray-800"
            >
              ASSIGNED TO *
            </label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              disabled={isLoadingMembers}
              className={`${inputClass} my-2`}
              id="Project-Task-Assigned"
            >
              <option value="">
                {isLoadingMembers
                  ? "Loading members..."
                  : "Select a project member"}
              </option>

              {members.map((member, index) => {
                const userId = getMemberId(member);

                return (
                  <option key={userId || index} value={userId}>
                    {getMemberName(member)}
                  </option>
                );
              })}
            </select>

            {!isLoadingMembers && members.length === 0 && (
              <p className="text-xs text-red-500">
                No project members available. Add a member first.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="Project-Task-Priority"
              className="font-bold text-gray-800"
            >
              PRIORITY *
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`${inputClass} my-2`}
              id="Project-Task-Priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="mt-4">
          <label
            htmlFor="Project-Due-date"
            className="mb-2 block font-bold text-gray-800"
          >
            DUE DATE *
          </label>

          <input
            id="Project-Due-date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Buttons */}
        <div className="buttons mt-8 flex flex-col items-center justify-center gap-2 font-bold lg:flex-row">

          <button
            type="submit"
            disabled={
              isSubmitting ||
              isLoadingMembers ||
              members.length === 0
            }
            className="my-2 w-full rounded-lg bg-blue-700 py-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 lg:my-6 lg:w-1/2"
          >
            {isSubmitting ? "CREATING..." : "CREATE TASK"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}`)}
            disabled={isSubmitting}
            className="w-full rounded-lg border-2 border-blue-700 bg-white py-2 text-blue-700 hover:bg-blue-50 disabled:opacity-50 lg:my-6 lg:w-1/2"
          >
            CANCEL
          </button>

        </div>
      </form>
    </div>
  );
};

export default Admin_Create_Task_component;
