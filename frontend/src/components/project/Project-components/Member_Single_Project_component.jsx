const Member_Single_Project_component = () => {
  return (
    <>
      <div className="single-project-card rounded-2xl border bg-white border-gray-200 shadow-2xl mx-4">

        {/* HEADING */}
        <div className="heading flex justify-start items-center w-full">
          <div className="text-panel w-1/2 lg:px-10 px-5">
            
            <h1 className="lg:text-4xl text-2xl font-bold lg:mt-4">
              Legal Ease

              <span className="bg-green-100 text-green-500 text-[10px] lg:text-sm font-bold py-1 px-4 rounded-xl ml-2">
                ACTIVE
              </span>
            </h1>

            <p className="text-gray-600 lg:text-lg text-[12px] font-semibold m-2">
              Neurox Workspace
            </p>

          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="px-5 lg:px-10 my-4 text-gray-500 break-words">
          Project's Description Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Velit facilis aperiam soluta reiciendis ex
          laudantium architecto eum aspernatur dolor ducimus hic, odio
          consequuntur at, nihil repudiandae magni veritatis labore? Rerum?
        </p>

        {/* DATES */}
        <div className="Dates flex gap-8 px-5 lg:px-10 m-5">
          
          <div className="start">
            <h1 className="font-semibold text-gray-500">
              START DATE
            </h1>

            <h2 className="font-bold">
              01 Sep 2025
            </h2>
          </div>

          <div className="Due">
            <h1 className="font-semibold text-gray-500">
              DUE DATE
            </h1>

            <h2 className="font-bold">
              01 Sep 2025
            </h2>
          </div>

        </div>
      </div>
    </>
  );
};

export default Member_Single_Project_component;