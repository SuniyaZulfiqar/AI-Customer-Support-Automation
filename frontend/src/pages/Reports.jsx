import { useEffect, useState } from "react";
import axios from "axios";
import ExportProfessionalPDF from "../components/Export/ExportProfessionalPDF";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaFilePdf,
  FaFileExcel,
  FaDownload,
  FaChartBar,
} from "react-icons/fa";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/reports/history"
      );

      console.log("API RESPONSE:", res.data);

      setReports(res.data.reports || []);

      console.log("Reports after set:", res.data.reports);

      const dashboard = await axios.get(
        "http://127.0.0.1:8000/dashboard"
        );

        console.log("Dashboard:", dashboard.data);

        setStats({
            total: dashboard.data.total_tickets,
            resolved: dashboard.data.closed_tickets,
            open: dashboard.data.open_tickets,
            high: dashboard.data.high_priority,
        });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  console.log("Reports:", reports);
  console.log("Stats:", stats);


  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 lg:p-10">
        <Navbar showTitle={false} />

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaChartBar className="text-4xl text-blue-600" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              Reports Center
            </h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400">
            Generate business intelligence reports
          </p>
        </div>

        {/* Export Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition">
            <FaFilePdf className="text-5xl text-red-600 mb-5" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              PDF Report
            </h2>

            <p className="text-slate-500 mt-2 mb-6">
              Download executive PDF reports.
            </p>


            <button
            onClick={() => {
               alert(
                JSON.stringify({
                    reportsCount: reports.length,
                    stats,
                   })
                  );

                  ExportProfessionalPDF(reports, stats);
                }}
                
                
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Export PDF
            </button>   
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition">
            <FaFileExcel className="text-5xl text-green-600 mb-5" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Excel Report
            </h2>

            <p className="text-slate-500 mt-2 mb-6">
              Export data into Excel spreadsheets.
            </p>

            <button
            onClick={() =>
                window.open(
                    "http://127.0.0.1:8000/reports/export/excel",
                    "_blank"
                )
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Export Excel
            </button>           
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition">
            <FaDownload className="text-5xl text-blue-600 mb-5" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              CSV Export
            </h2>

            <p className="text-slate-500 mt-2 mb-6">
              Download raw customer ticket data.
            </p>

            <button
              onClick={() =>
                window.open(
                  "http://127.0.0.1:8000/reports/export/csv",
                  "_blank"
                )
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Download CSV
            </button>
          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <StatCard title="Generated Today" value="12" />
          <StatCard title="This Week" value="53" />
          <StatCard title="This Month" value="187" />
          <StatCard title="Storage Used" value="1.8 GB" />
        </div>

        {/* Report History */}

        <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

          <div className="flex items-center gap-3 mb-6">
            <FaFilePdf className="text-red-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Report History
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100 dark:bg-slate-800">

                <tr>

                  <th className="px-6 py-5 text-left font-semibold text-slate-900 dark:text-white">
                    Customer
                  </th>

                  <th className="px-6 py-5 text-left font-semibold text-slate-900 dark:text-white">
                    Category
                  </th>

                  <th className="px-6 py-5 text-left font-semibold text-slate-900 dark:text-white">
                    Priority
                  </th>

                  <th className="px-6 py-5 text-left font-semibold text-slate-900 dark:text-white">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                    >
                      Loading reports...
                    </td>
                  </tr>

                ) : reports.length === 0 ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                    >
                      No reports found.
                    </td>
                  </tr>

                ) : (

                  reports.map((report) => (

                    <tr
                      key={report.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >

                      <td className="px-6 py-5 font-medium text-slate-900 dark:text-white">
                        {report.customer_name}
                      </td>

                      <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                        {report.category}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                          {report.urgency}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                          {report.status}
                        </span>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">

      <p className="text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3 text-slate-900 dark:text-white">
        {value}
      </h2>

    </div>
  );
}

export default Reports;