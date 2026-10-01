
const Admin_Create_Task_component = () => {
    return (<>
        <div className=" mx-4 lg:mx-20 bg-white border border-gray-200 lg:p-8 p-5 rounded-2xl shadow-2xl">
            <div className="Projects-heading mt-5 ">
                <div className="title-text  lg:flex lg:justify-between lg:items-center">
                    <div className="left-panel  ml-4">
                        <h1 className="font-bold text-2xl lg:text-3xl  mb-1 ">
                            Create Task
                        </h1>
                        <p className="text-gray-600 font-semibold">Add a new task to LegalEase project workspace</p>
                    </div>

                </div>
            </div>
            <form className="my-8 lg:mx-20">
                <div className="name">

                    <label htmlFor="task-title" className=" font-bold text-gray-800"> TASK TITLE</label>
                    <br />
                    <input type="text " id="task-title" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" placeholder="e.g. Implement dual-factor authentication" />
                </div>
                <div className="description">

                    <label htmlFor="Task-description" className=" font-bold text-gray-800"> Description</label>
                    <br />
                    <textarea type="text " id="Task-description" className=" w-full min-h-30 border border-gray-200 outline-0 rounded-lg p-3 resize-none" placeholder="Provide a detailed descripition of the deliverables and scope..." />
                </div>

                <div className="drop-down lg:flex lg:justify-evenly my-3 items-center">


                    <div className="Task">
                        <label htmlFor="Project-Task-Assigned" className=" font-bold text-gray-800"> ASSIGNED TO</label>
                        <select name="Task" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" id="Project-Task-Assigned">
                         <option value="">Select a project member</option>
                        </select>
                    </div>
                    <div className="Task">
                        <label htmlFor="Project-Task" className=" font-bold text-gray-800"> PRIORITY</label>
                        <select name="Task" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" id="Project-Task" >
                            <option value="">Select a project member</option>
                          
                        </select>
                    </div>
                </div>
                <div className="Dates w-full flex gap-4 mt-4">

                  


                    <div className="w-full">
                        <label
                            htmlFor="Project-Due-date"
                            className="block mb-2 font-bold text-gray-800"
                        >
                            Due Date
                        </label>

                        <input
                            id="Project-Due-date"
                            type="date"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                </div>

                <div className="buttons font-bold mt-8 flex justify-center lg:flex-row items-center flex-col gap-2  ">
                    <button className="w-1/2 rounded-lg my-2  lg:my-6 mx-6 bg-blue-700 text-white py-2">
                        CREATE TASK
                    </button>
                    <button className="w-1/2 rounded-lg lg:my-6 mx-6 bg-white text-blue-700 border-2 border-b-blue-700 py-2">
                        CANCEL
                    </button>

                </div>
            </form>
        </div>
    </>
    )
}

export default Admin_Create_Task_component