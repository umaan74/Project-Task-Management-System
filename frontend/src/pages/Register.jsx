import { useState } from 'react';
import { Link, useNavigate } from "react-router";
const Register = () => {
const navigate = useNavigate();
// Isse navigate() function milta hai, jisse hum doosre page par ja sakte hain.
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setmessage("");

    const form = e.target;
    const username = form.username.value
    const password = form.password_1.value
    const confirm_password = form.password_2.value
    const email = form.email.value

    if (password !== confirm_password) {
      setmessage("The passwords is not matched");
      return
    }
    console.log("Email field:", JSON.stringify(form.email.value));
    try {
      setloading(true);
      console.log({ username, email });
      const response = await fetch("http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      )
      const data = await response.json();
console.log("Status:", response.status);
console.log("Response:", data);
      if (!response.ok) {
        setmessage(data.message || "Registration failed!");
        return;
      }

      setmessage(data.message || "Account created Successfully !");
      form.reset();
      console.log("Register form submitted");
      navigate("/login");
      alert("Account created successfully")
    } catch (error) {
      setmessage("Can't connect to the server !");
    } finally {
      setloading(false);
    }
  }
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

        <form onSubmit={handleRegister} className="input-field">
          <div className="username">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <br />
            <input
              type="text"
              name="username"
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
  type="email"
  name="email"
  placeholder="Enter your email"
  required
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
              name="password_1"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="password"
            />
          </div>
          <div className="confirm-password my-2">
            <label htmlFor="confirm-password" className="font-semibold">
              Confirm Password
            </label>
            <br />
            <input
              name="password_2"
              placeholder="confirm password"
              type="password"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="confirm-password"
            />
          </div>


          <button className="button cursor-pointer w-full bg-blue-500 text-center py-3 my-4 mt-8 text-white rounded-xl font-semibold">
            CREATE ACCOUNT
          </button>
          <p className="text-sm text-center lg-text-lg">
            Already have an account?
            <Link className="text-blue-800 font-semibold" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
