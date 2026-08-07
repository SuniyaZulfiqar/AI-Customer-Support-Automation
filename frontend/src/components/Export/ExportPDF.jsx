import { useReactToPrint } from "react-to-print";

function ExportPDF({ contentRef }) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Dashboard Report",
  });

  return (
    <button
      onClick={handlePrint}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
    >
      Export PDF
    </button>
  );
}

export default ExportPDF;