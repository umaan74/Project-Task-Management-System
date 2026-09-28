import {LayoutDashboard,FolderKanban,Bell,Search,Users,Settings} from'lucide-react'

const Admin_Dashboard = () => {
  return (
    <div className="Admin-Dashboard flex ">
<div className="left-panel border-r h-screen border-r-gray-300 shadow-2xs bg-blue-50 px-5 w-[20%] ">
    <div className="logo pt-4 mb-5">
        <img src="../logo.png" className="w-20 rounded-md" alt="" />
    </div>

<div className="sections flex flex-col h-[85%] justify-between">


    <div className="sub-sections text-gray-700 pb-4 ml-5 mt-4 flex flex-col gap-4">
        <a className="flex gap-3 font-bold py-1 text-lg" href=""><LayoutDashboard /><span>Dashboard</span></a>
        <a className="flex gap-3 font-bold py-1 text-lg" href=""><FolderKanban /><span>Projects</span></a>
        <a className="flex gap-3 font-bold py-1 text-lg" href=""><Users/> <span>Members</span></a>
        <a className="flex gap-3 font-bold py-1 text-lg" href=""><Settings /><span> Settings</span></a>
    </div>
    <div className="profile border-t border-t-gray-300">
        <div className="company-card flex items-center justify-start gap-2 p-2">
            <div className="company-logo w-10">
                <img className="rounded-lg" src="https://img.magnific.com/premium-psd/number1-yello_535401-809.jpg" alt="" />
            </div>
            <div className="company-info ">
                <h2 className="font-semibold">Neurox</h2>
                <p className="text-[12px] text-gray-500">Active Workshop</p>
            </div>
        </div>
        <div className="company-card flex items-center justify-start gap-2 p-2">
            <div className="company-logo w-10">
                <img className="rounded-lg" src="https://img.magnific.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000" alt="" />
            </div>
            <div className="company-info ">
                <h2 className="font-semibold">Uman Landge</h2>
                <p className="text-[12px] text-gray-500"> Workshop Admin</p>
            </div>
        </div>
    </div>
    </div>
</div>
<div className="right-panel w-[80%] bg-blue-100">
    <div className="Navbar h-15 border-b border-b-gray-300 bg-blue-50 px-8 items-center flex justify-between">
        <div className=" font-bold text-[20px] Dashboard">
            Dashboard
        </div>

    <div className="search flex text-gray-400 items-center justify-between">
        <div className="flex gap-2 rounded-lg  bg-blue-100 py-1 px-3 ">

        <div className="search"><Search className="w-5"/></div>
        <input type="text" className=" placeholder:text-gray-400 outline-0" placeholder="Search anything"/>
        </div>
        <div className="bell ml-2"><Bell/></div>
    </div>
    </div>
</div>
    </div>
  )
}

export default Admin_Dashboard