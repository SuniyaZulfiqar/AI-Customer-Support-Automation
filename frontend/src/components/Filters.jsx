import { useState } from "react";
import { FaFilter } from "react-icons/fa";

function Filters({ onApply }) {
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [status, setStatus] = useState("");

  function applyFilters() {
    onApply({
      category,
      urgency,
      status,
    });
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

      <div className="flex items-center gap-2 mb-5">
        <FaFilter className="text-blue-600" />

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Dashboard Filters
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          rounded-xl
          p-3
         "
        >
          <option value="">All Categories</option>
          <option>Complaint</option>
          <option>Refund</option>
          <option>Sales</option>
          <option>Billing</option>
          <option>Technical Support</option>
          <option>General Inquiry</option>
          <option>Order</option>
        </select>

        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          rounded-xl
          p-3
          "
        >
          <option value="">All Urgency</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          rounded-xl
          p-3
          "
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>Resolved</option>
          <option>In Progress</option>
        </select>

        <button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 font-semibold transition"
        >
          Apply Filters
        </button>

      </div>

    </div>
  );
}

export default Filters;