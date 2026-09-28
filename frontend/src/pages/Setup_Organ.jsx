import { CirclePlus, Users } from "lucide-react";

const Setup_Organ = () => {
  return (
    <div className=" bg-blue-50 Login-Page flex min-h-screen items-center justify-center">
      <div className="Login-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/2 p-10 border border-gray-300 rounded-2xl shadow-2xl ">
        <div className="header flex flex-col items-center">
          <div className="logo p-2">
            <img
              className="w-20 rounded-lg"
              src="../public/logo.png"
              alt="Uman logo"
            />
          </div>
          <div className="title flex flex-col items-center">
            <h1 className="font-bold text-center text-2xl">
              Set Up Your Workspace
            </h1>
            <p className="text-gray-400 text-sm m-1 mb-3">
              Create or join an ogranization
            </p>
          </div>
        </div>

        <div className="organization-cards lg:flex-row flex flex-col gap-4">
          <div className="create lg:w-full border border-gray-300 rounded-2xl shadow-2xl p-5 ">
            <CirclePlus className="text-blue-500 m-2 mt-1 bg-blue-100 p-1 rounded-md " />
            <div className="title">
              <h1 className=" font-bold">Create Organization</h1>
              <p className="text-gray-400 text-sm ">
                Start a fresh space for your company or team members
              </p>
            </div>
            <button className="button cursor-pointer w-full bg-blue-600 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold">
              Create New
            </button>
          </div>

          <div className="join create lg:w-full border border-gray-300 rounded-2xl shadow-2xl p-5 ">
            <Users className="text-green-500 m-2 mt-1 bg-blue-100 p-1 rounded-md " />
            <div className="title">
              <h1 className=" font-bold">Join Organization</h1>
              <p className="text-gray-400 text-sm ">
                Enter an existing invite code shared by your team
              </p>
            </div>
            <button className="button cursor-pointer w-full bg-blue-600 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold">
              Enter Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup_Organ;
