
import {Check} from 'lucide-react'
const Organi_Joined = () => {
  return (
     <div className=" bg-blue-50 Organization-Joined-Page flex min-h-screen items-center justify-center">
      <div className="Organization-Joined-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/3 p-10 border border-gray-300 rounded-2xl shadow-2xl ">
        <div className="header flex flex-col items-center">
          <div className="logo p-2">
            <img
              className="w-20 rounded-lg"
              src="../public/logo.png"
              alt="Uman logo"
            />
          </div>
          <div className="title flex flex-col text-center items-center">
        <div className="tick">
             <Check className="text-green-600 bg-green-200 rounded-full w-12.5 h-12.5 p-3"/>
            </div>
            <h1 className="font-bold text-xl lg:text-2xl mt-2"> Welcome!</h1>
            <p className="text-green-600 font-bold text-md m-2">You have joined XXXX-Company</p>
          </div>
        </div>

         <button className="button cursor-pointer w-full bg-blue-700 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold">
              GO TO DASHBOARD
            </button>
    
      </div>
    </div>
  )
}

export default Organi_Joined