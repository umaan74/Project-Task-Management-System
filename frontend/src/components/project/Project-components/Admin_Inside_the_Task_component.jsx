const Admin_Inside_Task_component = () => {
    return (
        <>
             <div className="single-project-card rounded-2xl border bg-white border-gray-200 shadow-2xl mx-4">

                <div className="heading flex flex-col lg:flex-row justify-start items-center w-full">
                    <div className="text-panel lg:px-10 px-5">
                        <h1 className="lg:text-4xl text-2xl py-3 px-1 lg:px-6  rounded-2xl my-2  font-bold lg:my-4">Implement User Authentication</h1>
                        <span className="bg-green-100 text-green-500 text-[10px] lg:text-[12px]  font-bold py-2 px-4 rounded-lg">
                            IN PROGRESS
                        </span> <span className="bg-yellow-100 text-yellow-500 text-[10px] lg:text-[12px] font-bold py-2 px-4 rounded-lg">
                            HIGH
                        </span>

                    </div>
                    <div className="button-panel mt-2 lg:w-1/2">
                        <div className="buttons font-semibold lg:flex justify-center lg:flex-row items-center gap-4 my-2 flex-col  ">
                            <button className="  px-4 mx-1 cursor-pointer lg:text-lg rounded-lg my-2 lg:my-6 lg:mx-6 bg-white border-2 border-blue-700 text-[12px]  text-blue-700 py-2">
                                EDIT TASK
                            </button>
                            <button className="  px-4 mx-1 cursor-pointer lg:text-lg rounded-lg lg:my-6 lg:mx-6 bg-white text-gray-600 border-2 border-gray-600 text-[12px] py-2">
                                REASSIGN TASK
                            </button>
                            <button className="  px-4 mx-1 cursor-pointer lg:text-lg rounded-lg lg:my-6 lg:mx-6 bg-red-500 text-white text-[12px] py-2">
                                DELETE TASK
                            </button>
                        </div>

                    </div>
                </div>
                <p className="px-5 lg:px-10 my-2 text-gray-500">Project's Description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit facilis aperiam soluta reiciendis ex laudantium architecto eum aspernatur dolor ducimus hic, odio consequuntur at, nihil repudiandae magni veritatis labore? Rerum?</p>

                <div className=" flex flex-wrap my-4 justify-start items-start gap-3 lg:px-10 m-1 mx-3">
                    <div className="assigned-to border  p-2 border-gray-200 rounded-2xl shadow-xl">
                        <h1 className="font-bold px-1 text-gray-500">ASSIGNED TO</h1>
                        <div className="user px-2 flex gap-3 justify-center items-center flex-wrap">
                            <div className="img w-8 h-8 ">
                                <img className="rounded-full" src="https://plus.unsplash.com/premium_photo-1669349127520-fa1e30b02055?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8MSUyMDF8ZW58MHx8MHx8fDA%3D" alt="" />
                            </div>
                            <div className="usr-info">
                                <h1 className="font-bold text-[18px]">Bilal</h1>
                                <p className="text-gray-600">emailxxxxxxxxx</p>
                            </div>
                        </div>
                    </div>
                    <div className="Created-by border p-2 border-gray-200 rounded-2xl shadow-xl">
                        <h1 className="font-bold px-1 text-gray-500">CREATED BY</h1>
                        <div className="user px-2 flex gap-3 justify-center items-center flex-wrap">
                            <div className="img w-8 h-8 ">
                                <img className="rounded-full" src="https://plus.unsplash.com/premium_photo-1669349127520-fa1e30b02055?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8MSUyMDF8ZW58MHx8MHx8fDA%3D" alt="" />
                            </div>
                            <div className="usr-info">
                                <h1 className="font-bold text-[18px]">Uman</h1>
                                <p className="text-gray-600">emailxxxxxxxxx</p>
                            </div>
                        </div>
                    </div>
                   
                    <div className="Due border px-4 p-2 border-gray-200 rounded-2xl shadow-xl mx-2"> <h1 className="font-semibold text-gray-500">DUE DATE</h1>
                        <h2 className="font-bold">01 Sep 2025</h2></div>

                </div>
            </div>
        </>
    )
}

export default Admin_Inside_Task_component