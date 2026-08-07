import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TicketModal from "../components/TicketModal";

import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadTickets();
  }, [page]);

  async function loadTickets() {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/analytics/recent-tickets",
      {
        params: {
          page,
          limit,
        },
      }
    );

    setTickets(res.data.tickets || []);
    setTotal(res.data.total || 0);
  } catch (err) {
    console.log(err);
  }
}

const filtered = tickets.filter((ticket) =>
  (ticket.customer || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">

      <Sidebar />

      <div className="flex-1 p-4 md:p-6 lg:p-10">

       <Navbar showTitle={false} />

       <div className="flex items-center gap-3 mb-8">
        <FaTicketAlt className="text-4xl text-blue-600" />

         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Ticket Management
         </h1>
      </div>
         
         

        <input
          className="
          w-full
          lg:w-96
          p-4
          rounded-xl
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          text-slate-900
          dark:text-white
          placeholder:text-slate-400
          focus:outline-none
          focus:border-blue-500
          mb-8
          "

          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* KPI Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <Card
            title="Total Tickets"
            value={total}
            icon={<FaTicketAlt className="text-blue-600" />}
          />

          <Card
            title="Open"
            value={tickets.filter((t) => t.status === "Open").length}
            icon={<FaClock className="text-red-500" />}
          />

          <Card
            title="Resolved"
            value={tickets.filter((t) => t.status === "Resolved").length}
            icon={<FaCheckCircle className="text-green-500" />}
          />

          <Card
            title="High Priority"
            value={tickets.filter((t) => t.urgency === "High").length}
            icon={<FaExclamationTriangle className="text-orange-500" />}
          />

        </div>

        {/* Table */}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-x-auto">

          <table className="w-full text-slate-900 dark:text-white">

            <thead className="bg-slate-100 dark:bg-slate-800">

              <tr>
                <th className="p-5 text-left text-slate-900 dark:text-white font-semibold">Customer</th>
                <th className="p-5 text-left text-slate-900 dark:text-white font-semibold">Category</th>
                <th className="p-5 text-left text-slate-900 dark:text-white font-semibold">Sentiment</th>
                <th className="p-5 text-left text-slate-900 dark:text-white font-semibold">Priority</th>
                <th className="p-5 text-left text-slate-900 dark:text-white font-semibold">Status</th>
                <th className="p-5 text-center text-slate-900 dark:text-white font-semibold">Action</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map((ticket, index) => (

                <tr
                  key={index}
                  className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >

                  <td className="p-5 text-slate-900 dark:text-slate-200">
                    {ticket.customer}
                  </td>

                  <td className="p-5 text-slate-900 dark:text-slate-200">
                    {ticket.category}
                  </td>

                  <td className="p-5 text-slate-900 dark:text-slate-200">
                    {ticket.sentiment}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                      ${
                        ticket.urgency === "High"
                          ? "bg-red-500"
                          : ticket.urgency === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {ticket.urgency}
                    </span>

                  </td>

                  <td className="p-5">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                      ${
                        ticket.status === "Resolved"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-700 disabled:text-slate-400 flex items-center gap-2 transition"
          >
            <FaChevronLeft />
            Previous
          </button>

          <p className="dark:text-white">
            Page {page} of {totalPages || 1}
          </p>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-700 disabled:text-slate-400 flex items-center gap-2 transition"
          >
            Next
            <FaChevronRight />
          </button>

        </div>

        <p className="mt-4 text-slate-400">
          Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total} Tickets
        </p>

        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />

      </div>

    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-600 dark:text-slate-400">{title}</p>

          <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
            {value}
          </h2>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default Tickets;