import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardCheck } from "react-icons/fa";

function ExecutiveSummary({ filters }) {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    loadSummary();
  }, [filters]);

  async function loadSummary() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/executive-summary",
        {
          params: filters,
        }
      );

      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
    }
  }

return (
  <div
    className="
      bg-white
      dark:bg-slate-900
      text-slate-900
      dark:text-white
      rounded-2xl
      shadow-lg
      border
      border-slate-200
      dark:border-slate-800
      p-6
      mb-2
    "
  >
    <div className="flex items-center gap-3 mb-6">
      <FaClipboardCheck className="text-blue-600 text-2xl" />

      <h2 className="text-2xl font-bold">
        Executive Summary
      </h2>
    </div>

    <ul className="space-y-3">
      {summary.map((item, index) => (
        <li
          key={index}
          className="text-slate-700 dark:text-slate-300"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);
}

export default ExecutiveSummary;