
import {Check,Copy} from 'lucide-react'
const Organi_Created = () => {
  return (
     <div className=" bg-blue-50 Organization-Created-Page flex min-h-screen items-center justify-center">
      <div className="Organization-Created-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/3 p-10 border border-gray-300 rounded-2xl shadow-2xl ">
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
            <h1 className="font-bold text-xl lg:text-2xl"> Organization Created!</h1>
            <p className="text-green-600 font-bold text-md m-2">XXX Company</p>
          </div>
        </div>

 <div className="Organization my-2">
            <label htmlFor="invite-code" className="text-[16px] font-semibold">
              Invite Code Generated
            </label>
            <br />
           <p className="border placeholder:text-[13px] flex justify-between border-gray-300 my-1 rounded-lg py-2 px-4 outline-0 w-full font-bold bg-blue-50"><span>
             DFGH-HXC-DFGH
            </span>
            <span>
                <Copy className="text-gray-400 cursor-pointer"/>

            </span>
             </p>
          </div>
          <p className="text-gray-400 text-[12px] lg:text-sm m-2 text-center">Share this code with your team members so they can join your organization</p>
         <button className="button cursor-pointer w-full bg-blue-700 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold">
              GO TO DASHBOARD
            </button>
    
      </div>
    </div>
  )
}

export default Organi_Created