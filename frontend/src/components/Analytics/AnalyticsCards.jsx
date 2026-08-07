import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTicketAlt,
  FaExclamationTriangle,
  FaFolderOpen,
  FaCheckCircle,
} from "react-icons/fa";

function AnalyticsCards({ filters }) {
  const [stats, setStats] = useState({
    total_tickets: 0,
    complaints: 0,
    open_tickets: 0,
    closed_tickets: 0,
  });

  useEffect(() => {
    loadStats();
  }, [filters]);

  async function loadStats() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/dashboard",
        {
          params: filters,
        }
      );

      setStats(res.data);
    } catch (err) {
      console.error("Analytics Cards Error:", err);
    }
  }

  const cards = [
    {
      title: "Total Tickets",
      value: stats.total_tickets,
      icon: <FaTicketAlt />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Complaints",
      value: stats.complaints,
      icon: <FaExclamationTriangle />,
      color: "from-red-500 to-red-700",
    },
    {
      title: "Open Tickets",
      value: stats.open_tickets,
      icon: <FaFolderOpen />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Closed Tickets",
      value: stats.closed_tickets,
      icon: <FaCheckCircle />,
      color: "from-green-500 to-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/80 text-sm uppercase tracking-wide">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {card.value}
              </h2>
            </div>

            <div className="text-5xl text-white/90">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;