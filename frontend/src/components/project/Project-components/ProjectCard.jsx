import { Calendar } from 'lucide-react'
const ProjectCard = () => {
  return (
    <div className="Cards  flex flex-wrap flex-col  lg:flex-row">

      <div className="card border border-gray-100 lg:w-[30%]  shadow bg-white rounded-2xl mt-5 lg:mx-5 mx-8 p-5 ">

        <div className="panels flex border-b border-b-gray-200 items-center">
          <div className="left-panel lg:mx-0 mx-4 w-[90%]">
            <h1 className="lg:text-xl text-2xl font-bold">Legal Ease</h1>
            <h2 className="text-gray-600 lg:text-md text-sm font-semibold mb-2">
              NeuroX Workspace
            </h2>
            <p className=" font-semibold text-sm flex gap-2 items-center text-gray-400 mb-2 py-2 mt-1"><Calendar /> Due: 15 Oct</p>
          </div>
          <div className="right-panel ">
            <span className="bg-green-100 text-green-500 lg:text-sm font-bold py-1 px-4 rounded-xl">
              ACTIVE
            </span>
          </div>
        </div>
        <div className="view-project m-2 mt-5">
          <button className="border-2 cursor-pointer rounded-lg py-1 w-full font-semibold border-blue-700 text-blue-700">
            View Project
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProjectCard