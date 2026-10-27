
import { useState } from "react";
import { X, CalendarDays } from "lucide-react";
const project = {
    name: "Legal Ease",
    workspace: "Neurox Workspace",
    status: "ACTIVE",
    description: "Project's Description Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    startDate: "2025-09-01",
    dueDate: "2025-09-01",
};

function Admin_Edit_Project_component({
  project = {
    name: "Legal Ease",
    workspace: "Neurox Workspace",
    status: "ACTIVE",
    description: "",
    startDate: "2025-09-01",
    dueDate: "2025-09-01",
  },
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({ ...project });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave(formData);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
      <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Project
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your project details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit project"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          {/* Project Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Project Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name || ""}
              onChange={handleChange}
              required
              maxLength={100}
              className={inputClass}
              placeholder="Enter project name"
            />
          </div>

          {/* Workspace */}
          <div>
            <label
              htmlFor="workspace"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Workspace *
            </label>

            <input
              id="workspace"
              name="workspace"
              type="text"
              value={formData.workspace || ""}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter workspace name"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Project Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status || "ACTIVE"}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
              maxLength={2000}
              className={`${inputClass} resize-y`}
              placeholder="Describe your project..."
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {(formData.description || "").length}/2000
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <CalendarDays size={16} />
                Start Date *
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <CalendarDays size={16} />
                Due Date *
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                min={formData.startDate || undefined}
                value={formData.dueDate || ""}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin_Edit_Project_component;
