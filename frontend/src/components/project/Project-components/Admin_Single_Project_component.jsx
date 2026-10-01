const Admin_Single_Project_component = () => {
    return (
        <>
          
             <div className="single-project-card rounded-2xl border bg-white border-gray-200 shadow-2xl mx-4">

                <div className="heading flex justify-center items-center w-full">
                    <div className="text-panel w-1/2 lg:px-10 px-5">
                        <h1 className="lg:text-4xl text-2xl font-bold lg:mt-4">Legal Ease  <span className="bg-green-100 text-green-500 text-[10px] lg:text-sm font-bold py-1 px-4 rounded-xl">
                            ACTIVE
                        </span></h1>

                        <p className="text-gray-600 lg:text-lg text-[12px] font-semibold m-2">Neurox Workspace</p>
                    </div>
                    <div className="button-panel w-1/2">
                        <div className="buttons font-bold flex justify-center lg:flex-row items-center my-2 flex-col gap-2  ">
                            <button className="w-1/2 px-2 cursor-pointer lg:text-lg rounded-lg my-2 lg:my-6 mx-6 bg-white border-2 border-blue-700 text-[12px]  text-blue-700 py-2">
                                EDIT PROJECT
                            </button>
                            <button className="w-1/2 px-2 cursor-pointer lg:text-lg rounded-lg lg:my-6 mx-6 bg-red-500 text-white text-[12px] py-2">
                                DELETE PROJECT
                            </button>
                        </div>

                    </div>
                </div>
                <p className="px-5 lg:px-10 my-4 text-gray-500">Project's Description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit facilis aperiam soluta reiciendis ex laudantium architecto eum aspernatur dolor ducimus hic, odio consequuntur at, nihil repudiandae magni veritatis labore? Rerum?</p>

                <div className="Dates flex gap-8 px-5 lg:px-10 m-5">
                    <div className="start"> <h1 className="font-semibold text-gray-500">START DATE</h1>
                        <h2 className="font-bold">01 Sep 2025</h2></div>
                    <div className="Due"> <h1 className="font-semibold text-gray-500">DUE DATE</h1>
                        <h2 className="font-bold">01 Sep 2025</h2></div>

                </div>
            </div>
        </>
    )
}

export default Admin_Single_Project_component