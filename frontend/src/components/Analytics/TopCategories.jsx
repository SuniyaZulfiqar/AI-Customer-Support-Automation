import { useEffect, useState } from "react";
import axios from "axios";

function TopCategories({ filters }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    try {
      const res = await axios.get(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/analytics/top-categories",
        {
          params: filters,
        }
      );

      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function getRank(index) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        🏆 Top Complaint Categories
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b dark:border-slate-700">

            <th className="text-left p-4">Rank</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Tickets</th>
            <th className="text-left p-4">% of Total</th>

          </tr>

        </thead>

        <tbody>

          {categories.map((item, index) => (

            <tr
              key={item.category}
              className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >

              <td className="p-4 text-xl">
                {getRank(index)}
              </td>

              <td className="p-4 font-semibold dark:text-white">
                {item.category}
              </td>

              <td className="p-4">
                {item.count}
              </td>

              <td className="p-4">
                {item.percentage}%
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TopCategories;