import { useEffect, useState } from "react";
import axios from "axios";

function RecentTickets({ filters }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, [filters]);

  async function loadTickets() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/analytics/recent-tickets",
        {
          params: {
            category: filters?.category || "",
            urgency: filters?.urgency || "",
            status: filters?.status || "",
          },
        }
      );

      setTickets(res.data.tickets);
    } catch (err) {
      console.error(err);
    }
  }

  const sentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-100 text-green-700";
      case "Negative":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const urgencyColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full">
        <thead className="bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
          <tr>
             <th className="px-6 py-5 text-left text-slate-900 dark:text-white text-lg font-semibold">
                Customer
             </th>
             <th className="px-6 py-5 text-left text-slate-900 dark:text-white text-lg font-semibold">
                Category
             </th>
              <th className="px-6 py-5 text-left text-slate-900 dark:text-white text-lg font-semibold">
                Sentiment
              </th>
              <th className="px-6 py-5 text-left text-slate-900 dark:text-white text-lg font-semibold">
                Priority
              </th>
              <th className="px-6 py-5 text-left text-slate-900 dark:text-white text-lg font-semibold">
                Status
              </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={index}
              className="border-b border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <td className="px-6 py-5 font-medium text-slate-900 dark:text-white">{ticket.customer}</td>

              <td className="px-6 py-5 text-slate-700 dark:text-slate-300">{ticket.category}</td>

              <td className="px-6 py-5">
                <span
                 className={`px-4 py-1 rounded-full text-sm font-semibold ${sentimentColor(ticket.sentiment)}`}
                >
                    {ticket.sentiment}
                    </span>
              </td>

              <td className="px-6 py-5">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${urgencyColor(
                    ticket.urgency
                  )}`}
                >
                  {ticket.urgency}
                </span>
              </td>

              <td className="px-6 py-5">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTickets;