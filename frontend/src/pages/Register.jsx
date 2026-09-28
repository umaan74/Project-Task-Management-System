const Register = () => {
  return (
    <div className=" bg-blue-50 Register-Page flex min-h-screen items-center justify-center">
      <div className="Register-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/3 p-10 border border-gray-300 rounded-2xl shadow-2xl ">
        <div className="header flex flex-col items-center">
          <div className="logo p-2">
            <img
              className="w-20 rounded-lg"
              src="../public/logo.png"
              alt="Uman logo"
            />
          </div>
          <div className="title flex flex-col items-center">
            <h1 className="font-bold text-3xl">Create Account</h1>
            <p className="text-gray-400 text-sm m-2">Create your workspace account</p>
          </div>
        </div>

        <form className="input-field">
          <div className="username">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <br />
            <input
              type="text"
              placeholder="username"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="username"
            />
          </div>
          <div className="email">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter your email"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="email"
            />
          </div>
          <div className="password my-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <br />
            <input
              placeholder="create password"
              type="password"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="email"
            />
          </div>
          <div className="confirm-password my-2">
            <label htmlFor="confirm-password" className="font-semibold">
             Confirm Password
            </label>
            <br />
            <input
              placeholder="confirm password"
              type="password"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="email"
            />
          </div>
        

          <button className="button cursor-pointer w-full bg-blue-500 text-center py-3 my-4 mt-8 text-white rounded-xl font-semibold">
            CREATE ACCOUNT
          </button>
          <p className="text-sm text-center lg-text-lg">
            Already have an account?  
             <a className="text-blue-800 font-semibold" href="/Register.jsx">
               Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
