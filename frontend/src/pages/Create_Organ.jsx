const Create_Organ = () => {
  return (
    <div className=" bg-blue-50 CreateOrganization-Page flex min-h-screen items-center justify-center">
      <div className="CreateOrganization-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/4 p-10 border border-gray-300 rounded-2xl shadow-2xl ">
        <div className="header flex flex-col items-center">
          <div className="logo p-2">
            <img
              className="w-20 rounded-lg"
              src="../public/logo.png"
              alt="Uman logo"
            />
          </div>
          <div className="title flex flex-col text-center items-center">
            <h1 className="font-bold text-2xl">Create Organization</h1>
            <p className="text-gray-400 text-sm m-2">Set up a central hub for your team</p>
          </div>
        </div>

 <div className="Organization my-2">
            <label htmlFor="organization-Name" className="text-[16px] font-semibold">
              Organization Name
            </label>
            <br />
            <input
              placeholder="organization-name"
              type="text"
              className="border placeholder:text-[13px] border-gray-300 my-1 rounded-lg py-1 px-3 outline-0 w-full"
              id="organization-Name"
            />
          </div>
         <button className="button cursor-pointer w-full bg-blue-600 text-center text-[14px] py-2 mt-4 text-white rounded-md font-semibold">
              CREATE ORGANIZATION
            </button>
    <div className="back text-center m-1">

            <a className="text-[12px] underline font-bold text-blue-600" href="">Back to options</a>
    </div>
      </div>
    </div>
  )
}

export default Create_Organ