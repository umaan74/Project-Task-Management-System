import { Folder } from 'lucide-react'
const Admin_No_Project_component = () => {
    return (
        <>

            <div className="No-Projects text-center  w-full border flex flex-col justify-center items-center border-gray-300 shadow bg-white p-20 rounded-4xl mt-4">

                <div className="icon lg:p-5 ">
                    <Folder className="bg-blue-100 text-blue-400 p-2 w-18 h-15 rounded-full" />
                </div>

                <h1 className="font-bold lg:text-2xl text-xl m-2"> No Projects Yet</h1>
                <p className="text-gray-500 pb-20 font-semibold"> Create your first Project to start managing your team.</p>
               
            </div>
        </>
    )
}

export default Admin_No_Project_component