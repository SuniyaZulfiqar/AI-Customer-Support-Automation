import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function UrgencyChart({ filters = {} }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    try {
      const res = await axios.get(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/analytics/urgency",
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
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default UrgencyChart;