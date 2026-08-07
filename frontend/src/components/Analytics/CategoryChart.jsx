import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#8B5CF6",
  "#06B6D4",
];

function CategoryChart({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, [filters]);

  async function loadChart() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/analytics/category",
        {
          params: filters,
        }
      );

      setData(res.data);
    } catch (err) {
      console.error("Category Chart Error:", err);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        📊 Ticket Categories
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default CategoryChart;