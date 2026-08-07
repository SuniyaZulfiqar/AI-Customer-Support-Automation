import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaCog,
  FaUserShield,
  FaBell,
  FaRobot,
  FaServer,
} from "react-icons/fa";

function Settings() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 lg:p-10">
        <Navbar showTitle={false} />

        <div className="flex items-center gap-3 mb-8">
            <FaCog className="text-4xl text-blue-600" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                Settings
            </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Profile */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

            <div className="flex items-center gap-2 mb-6">
                 <FaUserShield className="text-blue-600 text-xl" />

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Administrator
                  </h2>
            </div>

            <div className="space-y-5">

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Name
                </label>

                <input
                  className="mt-2 w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  defaultValue="Administrator"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  className="mt-2 w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  defaultValue="admin@customeriq.com"
                />
              </div>

            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

            <div className="flex items-center gap-2 mb-6">
                <FaBell className="text-yellow-500 text-xl" />

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                     Notifications
                </h2>
            </div>

            <div className="space-y-4">

              <label className="flex justify-between items-center text-slate-900 dark:text-white">
                Email Alerts
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between items-center text-slate-900 dark:text-white">
                High Priority Alerts
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between items-center text-slate-900 dark:text-white">
                AI Recommendations
                <input type="checkbox" defaultChecked />
              </label>

            </div>

          </div>

          {/* AI */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

            <div className="flex items-center gap-2 mb-6">
                <FaRobot className="text-purple-600 text-xl" />

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    AI Configuration
                </h2>
            </div>

            <div className="space-y-4 text-slate-900 dark:text-white">

              <p>
                AI Model:
                <strong className="ml-2">Llama 3</strong>
              </p>

              <p>
                Database:
                <strong className="ml-2">PostgreSQL</strong>
              </p>

              <p>
                Status:
                <span className="ml-2 text-green-500 font-bold">
                  Connected
                </span>
              </p>

            </div>

          </div>

          {/* System */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

            <div className="flex items-center gap-2 mb-6">
                <FaServer className="text-green-600 text-xl" />

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    System Health
                </h2>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="dark:text-white">
                  Backend API
                </span>

                <span className="text-green-500 font-bold">
                  Online
                </span>
              </div>

              <div className="flex justify-between">
                <span className="dark:text-white">
                  Database
                </span>

                <span className="text-green-500 font-bold">
                  Connected
                </span>
              </div>

              <div className="flex justify-between">
                <span className="dark:text-white">
                  AI Service
                </span>

                <span className="text-green-500 font-bold">
                  Running
                </span>
              </div>

            </div>

          </div>

        </div>

        <button className="mt-10 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default Settings;