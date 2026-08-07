import { useEffect, useRef, useState } from "react";

import axios from "axios";

import {
  FaTicketAlt,
  FaExclamationTriangle,
  FaFolderOpen,
  FaCheckCircle,
  FaFire,
  FaChartLine,
  FaChartPie,
  FaClipboardList,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import Filters from "../components/Filters";

import ExecutiveSummary from "../components/ExecutiveSummary";
import BusinessInsights from "../components/BusinessInsights";

import ComplaintTrendChart from "../components/Charts/ComplaintTrendChart";
import CategoryPieChart from "../components/Charts/CategoryPieChart";

import RecentTickets from "../components/RecentTickets";

import AICopilot from "../components/AICopilot";
import ExportPDF from "../components/Export/ExportPDF";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    urgency: "",
    status: "",
  });

  const [dashboard, setDashboard] = useState({
    total_tickets: 0,
    complaints: 0,
    open_tickets: 0,
    closed_tickets: 0,
    high_priority: 0,
  });

  const dashboardRef = useRef(null);

  useEffect(() => {
    loadDashboard(filters);
  }, [filters]);

  async function loadDashboard(currentFilters) {
    setLoading(true);

    try {
      const res = await axios.get(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/dashboard",
        {
          params: currentFilters,
        }
      );


      setDashboard(res.data);

    } catch (err) {
      console.error(err);


    } finally {
        setLoading(false);
        
    } 
}

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">

      <Sidebar />

      <div
        ref={dashboardRef}
        id="dashboard-report"
        className="flex-1 p-4 md:p-6 lg:p-10"       
      >

        <Navbar showTitle={true} />

        <div className="flex justify-end mb-6">
          <ExportPDF contentRef={dashboardRef} />
        </div>

        <ExecutiveSummary filters={filters} />

        <Filters
          onApply={(newFilters) => {
            setFilters(newFilters);
          }}
        />

        {loading ? (

          <div className="animate-pulse space-y-8">

             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                 {[1,2,3,4,5].map((i) => (
                     <div
                      key={i}
                      className="h-36 rounded-2xl bg-slate-200 dark:bg-slate-800"
                       />
                       ))}
                       </div>

             <div className="grid xl:grid-cols-2 gap-8">
                <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                 <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                </div>
            
            <div className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>    

            

        ) : (

          <>
            {/* KPI Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">

              <DashboardCard
                title="Total Tickets"
                value={dashboard.total_tickets}
                icon={<FaTicketAlt />}
                color="bg-gradient-to-r from-blue-500 to-blue-700"
              />

              <DashboardCard
                title="Complaints"
                value={dashboard.complaints}
                icon={<FaExclamationTriangle />}
                color="bg-gradient-to-r from-red-500 to-red-700"
              />

              <DashboardCard
                title="Open Tickets"
                value={dashboard.open_tickets}
                icon={<FaFolderOpen />}
                color="bg-gradient-to-r from-yellow-500 to-orange-500"
              />

              <DashboardCard
                title="Closed Tickets"
                value={dashboard.closed_tickets}
                icon={<FaCheckCircle />}
                color="bg-gradient-to-r from-green-500 to-green-700"
              />

              <DashboardCard
                title="High Priority"
                value={dashboard.high_priority}
                icon={<FaFire />}
                color="bg-gradient-to-r from-purple-500 to-indigo-700"
              />

            </div>

            {/* AI Insights */}

            <div className="mt-10">
              <BusinessInsights filters={filters} />
            </div>

            {/* Charts */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">

                
                  <div className="flex items-center gap-2 mb-6">
                    <FaChartLine className="text-blue-600" />

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Complaint Trend
                    </h2>
                  </div>
            

                <ComplaintTrendChart filters={filters} />

              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">

                
                  <div className="flex items-center gap-2 mb-6">
                    <FaChartPie className="text-green-600" />

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Category Distribution
                    </h2>
                  </div>
                

                <CategoryPieChart filters={filters} />

              </div>

            </div>

            {/* AI Copilot */}

            <div className="mt-10">
              <AICopilot />
            </div>

            {/* Recent Tickets */}

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mt-10">

              
                <div className="flex items-center gap-2 mb-6">
                    <FaClipboardList className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Recent Tickets
                    </h2>
                </div>
              

              <RecentTickets filters={filters} />

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Dashboard;   