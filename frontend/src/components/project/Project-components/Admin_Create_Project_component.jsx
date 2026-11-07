
import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../../../contexts/AuthContext";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { createProject } from "../../../services/projectService";

const Admin_Create_Project_component = () => {
  const navigate = useNavigate();

  const { AccessToken } = useContext(AuthContext);
  const { SelectedOrganization } = useContext(OrganizationContext);

  const organizationId = SelectedOrganization?.organizationId?._id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    startDate: "",
    dueDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    if (!organizationId) {
      setError("Please select an organization first.");
      return;
    }

    if (!AccessToken) {
      setError("Authentication required. Please login again.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter a project name.");
      return;
    }

    if (
      formData.startDate &&
      formData.dueDate &&
      new Date(formData.dueDate) < new Date(formData.startDate)
    ) {
      setError("Due date cannot be earlier than start date.");
      return;
    }

    const projectData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
      startDate: formData.startDate || null,
      dueDate: formData.dueDate || null,
    };

    try {
      setIsSubmitting(true);

      const { response, data } = await createProject(
        organizationId,
        projectData,
        AccessToken
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.Message ||
          "Unable to create project."
        );
      }

      setSuccess("Project created successfully!");

      setFormData({
        name: "",
        description: "",
        status: "planning",
        startDate: "",
        dueDate: "",
      });

      setTimeout(() => {
        navigate("/projects");
      }, 1000);

    } catch (err) {
      console.error("Create project error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="Project_form my-8 lg:mx-20 bg-white border border-gray-200 lg:p-8 p-5 rounded-2xl shadow-2xl">

      <form onSubmit={handleSubmit}>

        {/* Project Name */}
        <div className="name">
          <label
            htmlFor="Project-name"
            className="font-semibold text-gray-800"
          >
            Project Name
          </label>

          <br />

          <input
            type="text"
            id="Project-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            required
            className="w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-2 focus:border-blue-500"
            placeholder="Give name to the Project"
          />
        </div>

        {/* Description */}
        <div className="description mt-3">
          <label
            htmlFor="Project-description"
            className="font-semibold text-gray-800"
          >
            Description
          </label>

          <br />

          <textarea
            id="Project-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={1000}
            className="w-full min-h-[120px] border border-gray-200 outline-0 rounded-lg p-3 resize-none focus:border-blue-500"
            placeholder="Provide a brief summary of the project goals..."
          />
        </div>

        {/* Status */}
        <div className="status mt-3">
          <label
            htmlFor="Project-status"
            className="font-semibold text-gray-800"
          >
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-2 focus:border-blue-500"
            id="Project-status"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        {/* Dates */}
        <div className="Dates w-full flex flex-col sm:flex-row gap-4 mt-4">

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="Project-Start-date"
              className="block mb-2 font-semibold text-gray-800"
            >
              Start Date
            </label>

            <input
              id="Project-Start-date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="Project-Due-date"
              className="block mb-2 font-semibold text-gray-800"
            >
              Due Date
            </label>

            <input
              id="Project-Due-date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              min={formData.startDate || undefined}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* API Messages */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm font-medium">
            {success}
          </div>
        )}

        {/* Buttons */}
        <div className="buttons font-bold flex justify-center lg:flex-row items-center my-2 flex-col gap-2">

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full lg:w-1/2 rounded-lg my-2 lg:my-6 mx-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2 transition-colors"
          >
            {isSubmitting ? "CREATING..." : "CREATE PROJECT"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="w-full lg:w-1/2 rounded-lg lg:my-6 mx-2 bg-white text-blue-700 border-2 border-blue-700 py-2 hover:bg-blue-50 transition-colors"
          >
            CANCEL
          </button>

        </div>

      </form>
    </div>
  );
};

export default Admin_Create_Project_component;
