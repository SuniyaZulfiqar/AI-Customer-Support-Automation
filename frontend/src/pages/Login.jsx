import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaRobot } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Demo credentials
    if (
      email === "admin@company.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 text-white p-5 rounded-full text-3xl shadow-lg">
            <FaRobot />
          </div>

          <h1 className="text-3xl font-bold mt-4">
            AI Customer Support
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Login
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo Credentials</p>
          <p className="font-medium">admin@company.com</p>
          <p className="font-medium">admin123</p>
        </div>

      </div>

    </div>
  );
}

export default Login;