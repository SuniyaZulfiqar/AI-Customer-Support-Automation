import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaSmile,
  FaExclamationTriangle,
  FaClipboardCheck,
} from "react-icons/fa";

import ComplaintTrendChart from "../components/Charts/ComplaintTrendChart";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import SentimentChart from "../components/Charts/SentimentChart";
import UrgencyChart from "../components/Charts/UrgencyChart";
import StatusChart from "../components/Charts/StatusChart";

import BusinessInsights from "../components/BusinessInsights";

function Analytics() {
  const [filters, setFilters] = useState({
    category: "",
    urgency: "",
    status: "",
  });

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">

      <Sidebar />

      <div className="flex-1 p-4 md:p-6 lg:p-10">

        <Navbar showTitle={false} />

        <div className="flex items-center gap-3 mb-8">
            <FaChartLine className="text-4xl text-blue-600" />

             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
             </h1>
        </div>

        <Filters
          onApply={(newFilters) => setFilters(newFilters)}
        />

        {/* Top Row */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-2 mb-5">
                <FaChartLine className="text-blue-600" />
                 <h2 className="text-2xl font-bold dark:text-white">
                    Complaint Trend
                 </h2>
            </div>

            <ComplaintTrendChart filters={filters} />

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-2 mb-5">
                <FaChartPie className="text-green-600" />
                <h2 className="text-2xl font-bold dark:text-white">
                    Category Distribution
                </h2>
            </div>

            <CategoryPieChart filters={filters} />

          </div>

        </div>

        {/* Second Row */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-2 mb-4">
                 <FaSmile className="text-yellow-500" />
                 <h2 className="text-xl font-bold dark:text-white">
                    Sentiment
                 </h2>
            </div>

            <SentimentChart filters={filters} />

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-2 mb-4">
                <FaExclamationTriangle className="text-red-500" />
                <h2 className="text-xl font-bold dark:text-white">
                     Urgency
                </h2>
            </div>

            <UrgencyChart filters={filters} />

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-2 mb-4">
                <FaClipboardCheck className="text-green-600" />
                <h2 className="text-xl font-bold dark:text-white">
                    Ticket Status
                </h2>
            </div>

            <StatusChart filters={filters} />

          </div>

        </div>

        <div className="mt-10">

          <BusinessInsights filters={filters} />

        </div>

      </div>

    </div>
  );
}

export default Analytics;