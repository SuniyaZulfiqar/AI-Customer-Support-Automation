import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ComplaintTrendChart({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    try {
      const res = await axios.get(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/analytics/complaint-trend",
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
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 10 }}
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="complaints"
          stroke="#2563EB"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ComplaintTrendChart;