const Member_Single_ProjectTasks_Members = () => {
  return (
    <div className="main-container flex lg:flex-row flex-col min-w-0">

      {/* PROJECT MEMBERS */}
      <div className="Project-panel border w-full border-gray-200 rounded-2xl bg-white my-3 mx-2 lg:m-6 lg:w-2/5 min-w-0">

        <div className="head flex justify-start py-3 my-2 lg:my-0 lg:px-10 px-2 items-center">
          <h1 className="font-bold text-[14px] lg:text-xl">
            Project Members
          </h1>
        </div>

        <div className="members my-2 flex justify-between items-center lg:px-6 px-5 min-w-0">

          <div className="user-info flex justify-center gap-2 lg:gap-3 items-center min-w-0">

            <div className="image">
              <img
                className="w-10 h-10 m-1 shrink-0 rounded-full object-cover"
                src="https://www.staples-3p.com/s7/is/image/Staples/F44A5319-B747-4CF3-93E9D9384F16CADB_sc7"
                alt=""
              />
            </div>

            <div className="text min-w-0">
              <h2 className="font-bold">
                Name
              </h2>

              <p className="font-semibold text-gray-600 break-words">
                email
              </p>
            </div>

          </div>

          <div className="role shrink-0 ml-2">
            <span className="bg-green-100 text-green-500 text-[10px] lg:text-sm font-bold py-1 px-4 rounded-xl">
              ADMIN
            </span>
          </div>

        </div>
      </div>


      {/* TASKS */}
      <div className="Tasks-panel border w-full border-gray-200 rounded-2xl bg-white my-3 mx-2 lg:m-6 lg:w-3/5 min-w-0">

        <div className="head flex mx-3 py-3 justify-between my-2 lg:my-0 lg:px-10 px-2 items-center">
          <h1 className="font-bold text-[14px] lg:text-xl">
            Tasks
          </h1>
        </div>

        {/* TASK */}
        <div className="tasks my-2 flex bg-blue-50 rounded-2xl mx-2 py-2 justify-between items-center lg:px-10 px-3 min-w-0">

          <div className="task-info flex min-w-0 gap-2 lg:gap-3 items-center">

            <div className="text min-w-0">
              <h2 className="font-bold lg:text-lg text-[14px] break-words">
                Implement PDF extraction algorithm
              </h2>

              <p className="font-semibold text-[14px] lg:text-md text-gray-600">
                Assigned to Bilal.
              </p>
            </div>

          </div>

          <div className="role shrink-0 ml-2">
            <span className="bg-yellow-100 text-yellow-400 text-[10px] lg:text-sm font-bold py-1 px-4 rounded-xl whitespace-nowrap">
              IN PROGRESS
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Member_Single_ProjectTasks_Members;