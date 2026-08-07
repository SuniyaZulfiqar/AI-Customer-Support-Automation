import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaLightbulb,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

function PredictiveAI() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadInsights();
  }, []);

  async function loadInsights() {
    try {
      const res = await axios.get(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/analytics/predictive-ai"
      );

      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl shadow-2xl p-8 text-white">

      <div className="flex items-center gap-4 mb-8">
        <FaRobot className="text-5xl" />

        <div>
          <h2 className="text-3xl font-bold">
            AI Predictive Analytics
          </h2>

          <p className="opacity-80">
            AI-generated operational insights
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {insights.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 items-start bg-white/10 rounded-xl p-4"
          >
            {index === 0 && (
              <FaChartLine className="text-2xl mt-1" />
            )}

            {index === 1 && (
              <FaExclamationTriangle className="text-2xl mt-1" />
            )}

            {index >= 2 && (
              <FaLightbulb className="text-2xl mt-1" />
            )}

            <p className="text-lg leading-relaxed">
              {item}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PredictiveAI;