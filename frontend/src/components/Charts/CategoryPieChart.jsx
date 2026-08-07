import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

function CategoryPieChart({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/analytics/category",
        {
          params: filters,
        }
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          outerRadius={110}
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
  );
}

export default CategoryPieChart;