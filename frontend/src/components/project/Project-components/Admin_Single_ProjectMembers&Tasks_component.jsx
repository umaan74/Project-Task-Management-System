const Admin_Single_ProjectTasks_Members = () => {
  return (
    <div className="main-container flex lg:flex-row  flex-col">
      <div className="Project-panel border w-full border-gray-200 rounded-2xl bg-white m-6 lg:w-2/5">
        <div className="head flex justify-evenly my-2 lg:my-0 lg:px-10 px-2 items-center">
          <h1 className="font-bold text-[14px] lg:text-xl">Project Members</h1>
          <button className=" px-5 cursor-pointer lg:text-[14px] font-semibold rounded-lg lg:my-6 mx-6 bg-blue-700 text-white text-[10px] py-1 m-1">
            + ADD MEMBER
          </button>
        </div>
        <div className="members my-2 flex justify-between items-center lg:px-6  px-5">
          <div className="user-info flex justify-center gap-2 lg:gap-3 items-center">
            <div className="image">
              <img className="w-10 h-10 m-1" src="https://www.staples-3p.com/s7/is/image/Staples/F44A5319-B747-4CF3-93E9D9384F16CADB_sc7" alt="" />
            </div>
            <div className="text">
              <h2 className="font-bold">Name</h2>
              <p className="font-semibold text-gray-600">email</p>
            </div>
          </div>
          <div className="role">
            <span className="bg-green-100 text-green-500 text-[10px] lg:text-sm font-bold py-1 px-4 rounded-xl">
              ADMIN
            </span>
          </div>
        </div>
      </div>
      <div className="Tasks-panel border w-full border-gray-200 rounded-2xl bg-white m-6 lg:w-3/5">
         <div className="head flex mx-3 justify-between my-2 lg:my-0 lg:px-10 px-2 items-center">
          <h1 className="font-bold text-[14px] lg:text-xl">Tasks</h1>
          <button className=" px-5 cursor-pointer lg:text-[14px] font-semibold rounded-lg lg:my-6 mx-6 bg-blue-700 text-white text-[10px] py-1 m-1">
            + CREATE TASK
          </button>
        </div>
        <div className="tasks my-2 flex bg-blue-50 rounded-2xl mx-2 py-1 justify-between items-center lg:px-10  px-5">
          <div className="task-info flex justify-center gap-2 lg:gap-3 items-center">
            <div className="text">
              <h2 className="font-bold lg:text-lg text-[14px]">Implement PDF extraction algorithm</h2>
              <p className="font-semibold text-[14px] lg:text-md text-gray-600">Assigned to Bilal.</p>
            </div>
          </div>
          <div className="role">
            <span className="bg-yellow-100 text-yellow-400 text-[10px] lg:text-sm font-bold py-1 px-4 rounded-xl">
              IN PROGRESS
            </span>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Admin_Single_ProjectTasks_Members