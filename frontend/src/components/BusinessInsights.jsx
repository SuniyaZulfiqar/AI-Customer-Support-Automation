import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowTrendUp,
  FaTriangleExclamation,
  FaCircleCheck,
  FaRobot,
} from "react-icons/fa6";

function BusinessInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadInsights();
  }, []);

  async function loadInsights() {
    try {
      const res = await axios.get(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/analytics/business-insights"
      );

      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
    }
  }

  const icons = [
    <FaArrowTrendUp />,
    <FaTriangleExclamation />,
    <FaCircleCheck />,
    <FaRobot />,
  ];

  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-red-100 text-red-600",
    "bg-green-100 text-green-600",
    "bg-purple-100 text-purple-600",
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mt-8">

      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-2xl text-purple-600" />

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Business Insights
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5">

        {insights.map((item, index) => (
          <div
            key={index}
            className="
            flex
            items-center
            gap-4
            border
            border-slate-200
            dark:border-slate-700
            bg-slate-50
            dark:bg-slate-800
            rounded-xl
            p-4
            hover:shadow-md
            transition
            " 
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${colors[index % colors.length]}`}
            >
              {icons[index % icons.length]}
            </div>

            <p className="font-medium text-slate-900 dark:text-white">
              {item}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default BusinessInsights;