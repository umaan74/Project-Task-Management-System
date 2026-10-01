import { Bell, Search, Menu } from "lucide-react";
const Navbar = ({ Page, setIsSidebarOpen }) => {
  return (
    <>
      <div className="h-15 border-b border-gray-300 bg-white px-4 lg:px-8 flex items-center justify-between">
        {/* HAMBURGER */}

        <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
          <Menu />
        </button>

        {/* PAGE TITLE */}

        <div className="font-bold text-lg lg:text-[24px]">{Page}</div>

        {/* SEARCH */}

        <div className="flex items-center">
          <div className="flex w-[180px] lg:w-[232px] gap-2 rounded-lg bg-blue-50 py-1 px-2">
            <Search className="w-5" />

            <input
              type="text"
              className="outline-0 w-full"
              placeholder="Search anything"
            />
          </div>

          <Bell className="ml-2" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
