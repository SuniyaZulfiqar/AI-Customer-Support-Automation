import {
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar({ showTitle = true }) {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useTheme();

  function logout() {
    localStorage.removeItem("loggedIn");
    navigate("/");
  }

  return (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

    {/* Left Side */}
    <div>
      {showTitle && (
        <>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            AI Customer Support Dashboard
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            AI-powered Customer Analytics Platform
          </p>
        </>
      )}
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-5">

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:scale-105 transition flex items-center justify-center"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 text-xl" />
        ) : (
          <FaMoon className="text-slate-700 text-xl" />
        )}
      </button>

      {/* User */}
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-5xl text-blue-600" />

        <div>
          <p className="font-bold text-slate-900 dark:text-white">
            Administrator
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            admin@company.com
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>

  </div>
);
}

export default Navbar;