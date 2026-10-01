
const Admin_Add_Project_Member_component = () => {
    return (<>
        <div className="Project_form my-8 lg:w-1/2 mx-8 px-8 lg:mx-20 bg-white border border-gray-200 lg:p-8 py-10 rounded-2xl shadow-2xl">
            <form className="lg:mx-8 mx-4" >
               
                <div className="Project-role">
                    <label htmlFor="Project-Project-role" className=" font-semibold text-gray-800">Choose Member</label>
                    <select name="Project-role" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" id="Project-Project-role">
                        <option value="">Bilal (email)</option>
                        <option value="">Uman (email)</option>
                        <option value="">Asjad (email)</option>
                       
                    </select>
                </div>
                <div className="Project-role">
                    <label htmlFor="Project-Project-role" className=" font-semibold text-gray-800">Project Role</label>
                    <select name="Project-role" className=" w-full border outline-0 border-gray-200 my-2 rounded-lg px-2 py-1" id="Project-Project-role">
                        <option value="">Member</option>
                        <option value="">Admin</option>
                        
                       
                    </select>
                </div>

              

                <div className="buttons font-bold flex justify-center lg:flex-row items-center my-2 flex-col gap-2  ">
                    <button className="w-1/2 cursor-pointer rounded-lg my-2 lg:my-6 mx-6 bg-blue-700 text-white py-2">
                        ADD MEMBER
                    </button>
                    <button className="w-1/2 cursor-pointer rounded-lg lg:my-6 mx-6 bg-white text-blue-700 border-2 border-b-blue-700 py-2">
                        CANCEL
                    </button>

                </div>
            </form>
        </div>
    </>
    )
}

export default Admin_Add_Project_Member_component