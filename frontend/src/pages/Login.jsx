
import { Link, useNavigate } from "react-router";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { Login: login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    try {
      setLoading(true);

      const isLogin = await login(username, password);

      if (isLogin) {
        form.reset();
        navigate("/dashboard");
      } else {
        setMessage("Invalid Username or Password!");
      }

    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 Login-Page flex min-h-screen items-center justify-center">
      <div className="Login-card bg-white h-1/2 w-3/4 md:w-1/2 lg:w-1/3 p-10 border border-gray-300 rounded-2xl shadow-2xl">

        <div className="header flex flex-col items-center">
          <div className="logo p-2">
            <img
              className="w-20 rounded-lg"
              src="/logo.png"
              alt="Uman logo"
            />
          </div>

          <div className="title flex flex-col items-center">
            <h1 className="font-bold text-3xl">Welcome Back</h1>
            <p className="text-gray-400 text-sm m-2">
              Login to your workspace
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="input-field">

          <div className="username">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="username"
              required
            />
          </div>

          <div className="password my-2">
            <label htmlFor="password-2" className="font-semibold">
              Password
            </label>
            <br />
            <input
              name="password"
              placeholder="Enter your password"
              type="password"
              className="border outline-0 border-gray-300 my-1 rounded-lg p-2 w-full"
              id="password-2"
              required
            />
          </div>

          {message && (
            <p className="text-red-500 text-sm my-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="button cursor-pointer w-full bg-blue-500 text-center py-3 my-4 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center lg-text-lg">
            Don't have an account?
            <Link to="/register" className="text-blue-800 font-semibold">
              Create Account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
