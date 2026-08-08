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

const API_URL =
  "https://ai-customer-support-automation-production-04e2.up.railway.app";


function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    open: 0,
    high: 0,
  });


  // =========================
  // LOAD REPORTS + STATS
  // =========================

  useEffect(() => {
    loadReports();
  }, []);


  async function loadReports() {
    setLoading(true);

    // -------------------------
    // Load report history
    // -------------------------

    try {
      const reportsResponse = await axios.get(
        `${API_URL}/reports/history`
      );

      console.log(
        "Reports API:",
        reportsResponse.data
      );

      setReports(
        reportsResponse.data.reports || []
      );

    } catch (error) {
      console.error(
        "Failed to load report history:",
        error
      );

      setReports([]);
    }


    // -------------------------
    // Load dashboard statistics
    // -------------------------

    try {
      const dashboardResponse = await axios.get(
        `${API_URL}/dashboard`
      );

      console.log(
        "Dashboard API:",
        dashboardResponse.data
      );

      setStats({
        total:
          dashboardResponse.data.total_tickets ?? 0,

        resolved:
          dashboardResponse.data.closed_tickets ?? 0,

        open:
          dashboardResponse.data.open_tickets ?? 0,

        high:
          dashboardResponse.data.high_priority ?? 0,
      });

    } catch (error) {
      console.error(
        "Failed to load dashboard statistics:",
        error
      );
    }

    setLoading(false);
  }


  // =========================
  // PDF EXPORT
  // =========================

  async function handlePDFExport() {
    try {
      let reportData = reports;

      // If history is empty, get the complete report data
      if (!reportData.length) {
        const response = await axios.get(
          `${API_URL}/reports/test`
        );

        reportData =
          response.data.reports || [];
      }


      // Get fresh dashboard statistics
      let reportStats = stats;

      try {
        const dashboardResponse =
          await axios.get(
            `${API_URL}/dashboard`
          );

        reportStats = {
          total:
            dashboardResponse.data.total_tickets ?? 0,

          resolved:
            dashboardResponse.data.closed_tickets ?? 0,

          open:
            dashboardResponse.data.open_tickets ?? 0,

          high:
            dashboardResponse.data.high_priority ?? 0,
        };

      } catch (error) {
        console.error(
          "Could not refresh dashboard statistics:",
          error
        );
      }


      console.log(
        "Generating PDF with:",
        reportData.length,
        "reports"
      );

      console.log(
        "PDF statistics:",
        reportStats
      );


      ExportProfessionalPDF(
        reportData,
        reportStats
      );

    } catch (error) {
      console.error(
        "PDF export failed:",
        error
      );

      alert(
        "Unable to generate the PDF report."
      );
    }
  }


  // =========================
  // EXCEL EXPORT
  // =========================

  function handleExcelExport() {
    window.open(
      `${API_URL}/reports/export/excel`,
      "_blank"
    );
  }


  // =========================
  // CSV EXPORT
  // =========================

  function handleCSVExport() {
    window.open(
      `${API_URL}/reports/export/csv`,
      "_blank"
    );
  }


  return (
    <div className="flex min-h-screen">

      <Sidebar />


      <div className="flex-1 p-4 md:p-6 lg:p-10">

        <Navbar showTitle={false} />


        {/* =========================
            HEADER
        ========================= */}

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


        {/* =========================
            EXPORT CARDS
        ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


          {/* PDF */}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition">

            <FaFilePdf className="text-5xl text-red-600 mb-5" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              PDF Report
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">
              Download executive PDF reports.
            </p>

            <button
              type="button"
              onClick={handlePDFExport}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Export PDF
            </button>

          </div>


          {/* EXCEL */}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition">

            <FaFileExcel className="text-5xl text-green-600 mb-5" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Excel Report
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">
              Export data into Excel spreadsheets.
            </p>

            <button
              type="button"
              onClick={handleExcelExport}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Export Excel
            </button>

          </div>


          {/* CSV */}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition">

            <FaDownload className="text-5xl text-blue-600 mb-5" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              CSV Export
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">
              Download raw customer ticket data.
            </p>

            <button
              type="button"
              onClick={handleCSVExport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Download CSV
            </button>

          </div>

        </div>


        {/* =========================
            STATISTICS
        ========================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <StatCard
            title="Total Tickets"
            value={stats.total}
          />

          <StatCard
            title="Resolved"
            value={stats.resolved}
          />

          <StatCard
            title="Open"
            value={stats.open}
          />

          <StatCard
            title="High Priority"
            value={stats.high}
          />

        </div>


        {/* =========================
            REPORT HISTORY
        ========================= */}

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


// =========================
// STAT CARD
// =========================

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