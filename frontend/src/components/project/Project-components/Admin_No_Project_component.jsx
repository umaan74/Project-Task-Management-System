
import { FolderPlus } from "lucide-react";
import { Link } from "react-router";

const Admin_No_Project = ({ organizationName = "your organization" }) => {
  return (
    <div className="No-Projects mt-4 flex w-full flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-8 text-center shadow sm:p-12 lg:p-20">

      <div className="icon lg:p-5">
        <FolderPlus className="h-16 w-16 rounded-full bg-blue-100 p-3 text-blue-500" />
      </div>

      <h1 className="m-2 text-xl font-bold lg:text-2xl">
        No Projects Yet
      </h1>

      <p className="max-w-md font-semibold text-gray-500">
        Create your first project in {organizationName} to start managing your team.
      </p>

      <Link
        to="/project/create"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        <span className="text-xl">+</span>
        Create Your First Project
      </Link>

    </div>
  );
};

export default Admin_No_Project;
