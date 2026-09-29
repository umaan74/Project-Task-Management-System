import {Folder} from 'lucide-react'
const No_Project = () => {
  return (
    <>
    
<div className="No-Projects text-center w-full border flex flex-col justify-center items-center border-gray-300 shadow bg-white p-20 rounded-4xl mt-4">

    <div className="icon lg:p-5 ">
         <Folder className="bg-blue-100 text-blue-400 p-2 w-18 h-15 rounded-full" />
        </div>

        <h1 className="font-bold text-2xl m-2"> No Projects Yet</h1>
        <p className="text-gray-500 font-semibold"> You haven't created any projects yet.</p>
        <p className="text-gray-400">Projects will appear here when admin adds you to one </p>
</div>
</>
  )
}

export default No_Project