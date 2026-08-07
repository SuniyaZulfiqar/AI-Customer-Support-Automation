import {
  FaChartPie,
  FaTicketAlt,
  FaRobot,
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      icon: <FaChartPie />,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FaTicketAlt />,
      text: "Tickets",
      path: "/tickets",
    },
    {
      icon: <FaRobot />,
      text: "AI Copilot",
      path: "/ai-copilot",
    },
    {
      icon: <FaChartLine />,
      text: "Analytics",
      path: "/analytics",
    },
    {
      icon: <FaFileAlt />,
      text: "Reports",
      path: "/reports",
    },
    {
      icon: <FaCog />,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="
           hidden
           lg:flex
           lg:w-72
           min-h-screen
           dark:bg-slate-900
           border-r
           border-slate-200
           dark:border-slate-800
           flex-col
           shadow-xl
           "
    >



      {/* Logo */}
      <div className="px-8 py-8 border-b border-slate-200 dark:border-slate-800">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          CustomerIQ
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          AI Support Intelligence
        </p>

      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">

        {menu.map((item) => (

          <NavLink
            key={item.text}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 p-4 rounded-2xl mb-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1"
              }`
            }
          >
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>

            <span className="font-semibold text-lg">
              {item.text}
            </span>

          </NavLink>

        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-6">

        <div className="flex items-center gap-4">

          <FaUserCircle className="text-5xl text-blue-600" />

          <div>

            <p className="font-bold text-slate-900 dark:text-white">
              Administrator
            </p>

            <p className="text-sm text-green-500">
              ● Online
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;