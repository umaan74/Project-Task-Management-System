import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  X,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`
        fixed lg:static
        top-0 left-0
        z-50
        h-screen
        w-[60%] lg:w-[20%]
        border-r border-gray-300
        shadow-2xs
        px-5
        bg-white
        transform
        transition-transform
        duration-300
        ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >

      {/* LOGO */}
      <div className="pt-4 lg:ml-15 ml-5 mb-5 flex justify-between">
        <img
          src="../logo.png"
          className="w-20 rounded-md"
          alt="UMAN"
        />

        {/* Mobile Close */}
        <button
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X />
        </button>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-col h-[85%] justify-between">

        <div className="text-gray-700 pb-4 ml-5 mt-4 flex flex-col gap-4">

          <a className="flex gap-3 font-bold py-1 text-lg" href="">
            <LayoutDashboard />
            <span>Dashboard</span>
          </a>

          <a className="flex gap-3 font-bold py-1 text-lg" href="">
            <FolderKanban />
            <span>Projects</span>
          </a>

          <a className="flex gap-3 font-bold py-1 text-lg" href="">
            <Users />
            <span>Members</span>
          </a>

          <a className="flex gap-3 font-bold py-1 text-lg" href="">
            <Settings />
            <span>Settings</span>
          </a>

        </div>

        {/* PROFILE */}
        <div className="border-t border-gray-300">

          <div className="flex items-center gap-2 p-2">
            <img
              className="rounded-lg w-10"
              src="https://img.magnific.com/premium-psd/number1-yello_535401-809.jpg"
              alt=""
            />

            <div>
              <h2 className="font-semibold">Neurox</h2>
              <p className="text-[12px] text-gray-500">
                Active Workshop
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2">

            <img
              className="rounded-lg w-10"
              src="https://img.magnific.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000"
              alt=""
            />

            <div>
              <h2 className="font-semibold">
                Uman Landge
              </h2>

              <p className="text-[12px] text-gray-500">
                Workshop Admin
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Sidebar;