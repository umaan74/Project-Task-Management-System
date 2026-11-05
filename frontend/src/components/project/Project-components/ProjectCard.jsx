
import { Calendar } from "lucide-react";
import { Link } from "react-router";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const projectName = project.name || "Untitled Project";

  const projectStatus = project.status || "planning";

  const statusStyles = {
    active: "bg-green-100 text-green-600",
    planning: "bg-blue-100 text-blue-600",
    completed: "bg-purple-100 text-purple-600",
    "on-hold": "bg-yellow-100 text-yellow-600",
  };

  const formattedStatus = projectStatus
    .replace("-", " ")
    .toUpperCase();

  const formattedDueDate = project.dueDate
    ? new Date(project.dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not set";

  return (
    <div className="card border border-gray-100 lg:w-[30%] shadow bg-white rounded-2xl mt-5 lg:mx-5 mx-8 p-5">

      {/* Project Information */}
      <div className="panels flex border-b border-b-gray-200 items-center">

        <div className="left-panel lg:mx-0 mx-4 w-[90%] min-w-0">

          <h1 className="lg:text-xl text-2xl font-bold break-words">
            {projectName}
          </h1>

          <h2 className="text-gray-600 lg:text-md text-sm font-semibold mb-2">
            Project Workspace
          </h2>

          <p className="font-semibold text-sm flex gap-2 items-center text-gray-400 mb-2 py-2 mt-1">
            <Calendar size={18} />
            Due: {formattedDueDate}
          </p>

        </div>

        {/* Project Status */}
        <div className="right-panel shrink-0">

          <span
            className={`lg:text-sm text-xs font-bold py-1 px-3 rounded-xl whitespace-nowrap ${
              statusStyles[projectStatus] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {formattedStatus}
          </span>

        </div>

      </div>

      {/* View Project */}
      <div className="view-project m-2 mt-5">

        <Link
          to={`/projects/${project._id}`}
          className="inline-block border-2 px-3 cursor-pointer rounded-lg py-2 w-full text-center font-semibold border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
        >
          View Project
        </Link>

      </div>

    </div>
  );
};

export default ProjectCard;
