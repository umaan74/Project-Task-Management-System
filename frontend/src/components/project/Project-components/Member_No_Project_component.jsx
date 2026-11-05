
import { Folder } from "lucide-react";

const Member_No_Project = ({ organizationName = "your organization" }) => {
  return (
    <div className="No-Projects mt-4 flex w-full flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-8 text-center shadow sm:p-12 lg:p-20">

      <div className="icon lg:p-5">
        <Folder className="h-16 w-16 rounded-full bg-blue-100 p-3 text-blue-500" />
      </div>

      <h1 className="m-2 text-2xl font-bold">
        No Projects Yet
      </h1>

      <p className="font-semibold text-gray-500">
        You haven't been added to any projects yet.
      </p>

      <p className="mt-2 text-sm text-gray-400">
        Projects from {organizationName} will appear here when an admin adds you.
      </p>

    </div>
  );
};

export default Member_No_Project;
