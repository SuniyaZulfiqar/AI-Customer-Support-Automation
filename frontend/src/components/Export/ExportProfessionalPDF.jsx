import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportProfessionalPDF(
  reports,
  stats = {}
) {
  console.log("PDF reports:", reports);  
  console.log("PDF stats:", stats);
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("AI Customer Support Dashboard", 14, 18);

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Business Intelligence Report", 14, 30);

  doc.setFontSize(10);
  doc.setTextColor(100);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    38
  );

  // Executive Summary
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Executive Summary", 14, 52);

  doc.setFontSize(11);

  doc.text(
    "This report summarizes customer support activity and AI insights.",
    14,
    60
  );

  // Dashboard Statistics
  doc.setFontSize(14);
  doc.text("Dashboard Statistics", 14, 76);

  doc.setFontSize(11);

  doc.text(`Total Tickets: ${stats.total || "-"}`, 14, 86);
  doc.text(`Resolved: ${stats.resolved || "-"}`, 14, 94);
  doc.text(`Open: ${stats.open || "-"}`, 14, 102);
  doc.text(`High Priority: ${stats.high || "-"}`, 14, 110);

  // Table
  autoTable(doc, {
    startY: 125,

    head: [[
      "Customer",
      "Category",
      "Priority",
      "Status"
    ]],

    body: reports.map((r) => [
      r.customer_name,
      r.category,
      r.urgency,
      r.status,
    ]),

    styles: {
      fontSize: 10,
    },

    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save("AI_Customer_Report.pdf");
}