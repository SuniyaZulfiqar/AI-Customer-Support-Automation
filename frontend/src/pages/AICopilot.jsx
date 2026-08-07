import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AICopilot from "../components/AICopilot";
import { FaRobot } from "react-icons/fa";

function AICopilotPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 lg:p-10">
        <Navbar showTitle={false} />


        <AICopilot />
      </div>
    </div>
  );
}

export default AICopilotPage;