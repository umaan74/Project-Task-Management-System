
const Admin_Create_Project_component = () => {
    return (<>
        <div className="Project_form my-8 lg:mx-20 bg-white border border-gray-200 lg:p-8 p-5 rounded-2xl shadow-2xl">
            <form >
                <div className="name">

                    <label htmlFor="Project-name" className=" font-semibold text-gray-800"> Project Name</label>
                    <br />
                    <input type="text " id="Project-name" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" placeholder="Give name to the Project" />
                </div>
                <div className="description">

                    <label htmlFor="Project-description" className=" font-semibold text-gray-800"> Description</label>
                    <br />
                    <textarea type="text " id="Project-description" className=" w-full min-h-[120px] border border-gray-200 outline-0 rounded-lg p-3 resize-none" placeholder="Provide a brief summary of the project goals..." />
                </div>

                <div className="status">
                    <label htmlFor="Project-status" className=" font-semibold text-gray-800"> Status</label>
                    <select name="status" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" id="Project-status">
                        <option value="Planning">Planning</option>
                        <option value="Planning">Active </option>
                        <option value="Planning">Completed</option>
                        <option value="Planning">On hold</option>
                    </select>
                </div>

                <div className="Dates w-full flex gap-4 mt-4">

                    <div className="w-1/2">
                        <label
                            htmlFor="Project-Start-date"
                            className="block mb-2 font-semibold text-gray-800"
                        >
                            Start Date
                        </label>

                        <input
                            id="Project-Start-date"
                            type="date"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>


                    <div className="w-1/2">
                        <label
                            htmlFor="Project-Due-date"
                            className="block mb-2 font-semibold text-gray-800"
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

                <div className="buttons font-bold flex justify-center lg:flex-row items-center my-2 flex-col gap-2  ">
                    <button className="w-1/2 rounded-lg my-2 lg:my-6 mx-6 bg-blue-700 text-white py-2">
                        CREATE PROJECT
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

export default Admin_Create_Project_component