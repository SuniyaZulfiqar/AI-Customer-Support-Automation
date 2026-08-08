import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportProfessionalPDF(reports = [], stats = {}) {
  console.log("PDF reports:", reports);
  console.log("PDF stats:", stats);

  const rows = Array.isArray(reports) ? reports : [];

  const doc = new jsPDF("landscape");

  // =========================
  // TITLE
  // =========================

  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);

  doc.text(
    "AI Customer Support Dashboard",
    14,
    18
  );

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);

  doc.text(
    "Business Intelligence Report",
    14,
    30
  );

  doc.setFontSize(10);
  doc.setTextColor(100);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    38
  );

  // =========================
  // EXECUTIVE SUMMARY
  // =========================

  doc.setFontSize(14);
  doc.setTextColor(0);

  doc.text(
    "Executive Summary",
    14,
    52
  );

  doc.setFontSize(11);

  doc.text(
    "This report summarizes customer support activity and AI insights.",
    14,
    60
  );

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  doc.setFontSize(14);

  doc.text(
    "Dashboard Statistics",
    14,
    76
  );

  doc.setFontSize(11);

  doc.text(
    `Total Tickets: ${stats.total ?? "-"}`,
    14,
    86
  );

  doc.text(
    `Resolved: ${stats.resolved ?? "-"}`,
    14,
    94
  );

  doc.text(
    `Open: ${stats.open ?? "-"}`,
    14,
    102
  );

  doc.text(
    `High Priority: ${stats.high ?? "-"}`,
    14,
    110
  );

  // =========================
  // REPORT TABLE
  // =========================

  const tableRows = rows.map((report) => [
    report.customer_name ?? report.customer ?? "",
    report.category ?? "",
    report.urgency ?? "",
    report.ticket_status ?? report.status ?? "",
  ]);

  autoTable(doc, {
    startY: 125,

    head: [
      [
        "Customer",
        "Category",
        "Priority",
        "Status",
      ],
    ],

    body: tableRows,

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },

    margin: {
      left: 14,
      right: 14,
    },
  });

  // =========================
  // SAVE
  // =========================

  doc.save("AI_Customer_Report.pdf");
}