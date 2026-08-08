import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ contentRef }) {
  const handleExportPDF = async () => {
    try {
      /*
       * =====================================================
       * 1. GET DASHBOARD DATA
       * =====================================================
       *
       * We intentionally fetch the data directly instead of
       * taking a screenshot of the webpage.
       *
       * This makes the PDF independent from:
       * - Tailwind CSS
       * - dark mode
       * - OKLCH
       * - browser dimensions
       * - html2canvas
       */

      const API_URL =
        "https://ai-customer-support-automation-production-04e2.up.railway.app";

      let dashboard = {
        total_tickets: 0,
        complaints: 0,
        open_tickets: 0,
        closed_tickets: 0,
        high_priority: 0,
      };

      let tickets = [];

      let reports = [];

      /*
       * Dashboard
       */
      try {
        const dashboardResponse =
          await fetch(`${API_URL}/dashboard`);

        if (dashboardResponse.ok) {
          const dashboardData =
            await dashboardResponse.json();

          dashboard = {
            total_tickets:
              dashboardData.total_tickets ?? 0,

            complaints:
              dashboardData.complaints ?? 0,

            open_tickets:
              dashboardData.open_tickets ?? 0,

            closed_tickets:
              dashboardData.closed_tickets ?? 0,

            high_priority:
              dashboardData.high_priority ?? 0,
          };
        }
      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );
      }

      /*
       * Recent tickets
       */
      try {
        const ticketsResponse =
          await fetch(
            `${API_URL}/analytics/recent-tickets`
          );

        if (ticketsResponse.ok) {
          const ticketData =
            await ticketsResponse.json();

          tickets =
            Array.isArray(ticketData.tickets)
              ? ticketData.tickets
              : [];
        }
      } catch (error) {
        console.error(
          "Ticket data error:",
          error
        );
      }

      /*
       * Report history
       */
      try {
        const reportsResponse =
          await fetch(
            `${API_URL}/reports/history`
          );

        if (reportsResponse.ok) {
          const reportData =
            await reportsResponse.json();

          reports =
            Array.isArray(reportData.reports)
              ? reportData.reports
              : [];
        }
      } catch (error) {
        console.error(
          "Report history error:",
          error
        );
      }

      /*
       * If recent tickets are empty, use report history.
       */
      if (!tickets.length && reports.length) {
        tickets = reports;
      }

      /*
       * =====================================================
       * 2. CREATE PDF
       * =====================================================
       */

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        doc.internal.pageSize.getWidth();

      const pageHeight =
        doc.internal.pageSize.getHeight();

      const margin = 14;

      /*
       * =====================================================
       * COLORS
       * =====================================================
       */

      const COLORS = {
        navy: [15, 23, 42],
        blue: [37, 99, 235],
        blueDark: [30, 64, 175],
        lightBlue: [239, 246, 255],

        green: [22, 163, 74],
        lightGreen: [240, 253, 244],

        red: [220, 38, 38],
        lightRed: [254, 242, 242],

        orange: [234, 88, 12],
        lightOrange: [255, 247, 237],

        purple: [124, 58, 237],
        lightPurple: [245, 243, 255],

        slate: [71, 85, 105],
        lightSlate: [241, 245, 249],

        border: [226, 232, 240],

        white: [255, 255, 255],
      };

      /*
       * =====================================================
       * HELPER FUNCTIONS
       * =====================================================
       */

      const setTextColor = (color) => {
        doc.setTextColor(
          color[0],
          color[1],
          color[2]
        );
      };

      const setFillColor = (color) => {
        doc.setFillColor(
          color[0],
          color[1],
          color[2]
        );
      };

      const setDrawColor = (color) => {
        doc.setDrawColor(
          color[0],
          color[1],
          color[2]
        );
      };

      const safeString = (value) => {
        if (
          value === null ||
          value === undefined
        ) {
          return "";
        }

        return String(value);
      };

      const addFooter = () => {
        const pageNumber =
          doc.internal.getNumberOfPages();

        doc.setFontSize(8);

        setTextColor(COLORS.slate);

        doc.text(
          "CustomerIQ • AI Customer Support Intelligence",
          margin,
          pageHeight - 7
        );

        doc.text(
          `Page ${pageNumber}`,
          pageWidth - margin,
          pageHeight - 7,
          {
            align: "right",
          }
        );
      };

      const addSectionTitle = (
        title,
        subtitle = ""
      ) => {
        setTextColor(COLORS.navy);

        doc.setFontSize(17);

        doc.setFont("helvetica", "bold");

        doc.text(
          title,
          margin,
          20
        );

        if (subtitle) {
          doc.setFontSize(9);

          doc.setFont(
            "helvetica",
            "normal"
          );

          setTextColor(COLORS.slate);

          doc.text(
            subtitle,
            margin,
            27
          );
        }
      };

      /*
       * =====================================================
       * 3. COVER / EXECUTIVE HEADER
       * =====================================================
       */

      setFillColor(COLORS.navy);

      doc.rect(
        0,
        0,
        pageWidth,
        42,
        "F"
      );

      setTextColor(COLORS.white);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(27);

      doc.text(
        "CustomerIQ",
        margin,
        18
      );

      doc.setFontSize(11);

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
        "AI Customer Support Intelligence",
        margin,
        26
      );

      doc.setFontSize(9);

      doc.text(
        `Generated ${new Date().toLocaleString()}`,
        pageWidth - margin,
        18,
        {
          align: "right",
        }
      );

      doc.text(
        "Executive Dashboard Report",
        pageWidth - margin,
        26,
        {
          align: "right",
        }
      );

      /*
       * =====================================================
       * 4. KPI CARDS
       * =====================================================
       */

      const cardTop = 52;

      const cardGap = 5;

      const cardWidth =
        (pageWidth -
          margin * 2 -
          cardGap * 4) /
        5;

      const cardHeight = 32;

      const cards = [
        {
          title: "Total Tickets",
          value: dashboard.total_tickets,
          color: COLORS.blue,
          background: COLORS.lightBlue,
        },

        {
          title: "Complaints",
          value: dashboard.complaints,
          color: COLORS.red,
          background: COLORS.lightRed,
        },

        {
          title: "Open Tickets",
          value: dashboard.open_tickets,
          color: COLORS.orange,
          background: COLORS.lightOrange,
        },

        {
          title: "Closed Tickets",
          value: dashboard.closed_tickets,
          color: COLORS.green,
          background: COLORS.lightGreen,
        },

        {
          title: "High Priority",
          value: dashboard.high_priority,
          color: COLORS.purple,
          background: COLORS.lightPurple,
        },
      ];

      cards.forEach((card, index) => {
        const x =
          margin +
          index *
            (cardWidth + cardGap);

        setFillColor(card.background);

        setDrawColor(COLORS.border);

        doc.roundedRect(
          x,
          cardTop,
          cardWidth,
          cardHeight,
          3,
          3,
          "FD"
        );

        /*
         * Accent line
         */
        setFillColor(card.color);

        doc.roundedRect(
          x,
          cardTop,
          3,
          cardHeight,
          1.5,
          1.5,
          "F"
        );

        setTextColor(COLORS.slate);

        doc.setFontSize(8);

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          card.title,
          x + 8,
          cardTop + 10
        );

        setTextColor(card.color);

        doc.setFontSize(20);

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(
          safeString(card.value),
          x + 8,
          cardTop + 25
        );
      });

      /*
       * =====================================================
       * 5. EXECUTIVE SUMMARY
       * =====================================================
       */

      const summaryTop = 94;

      setFillColor(COLORS.lightSlate);

      setDrawColor(COLORS.border);

      doc.roundedRect(
        margin,
        summaryTop,
        pageWidth - margin * 2,
        48,
        4,
        4,
        "FD"
      );

      setTextColor(COLORS.navy);

      doc.setFontSize(14);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Executive Summary",
        margin + 8,
        summaryTop + 11
      );

      const total =
        Number(
          dashboard.total_tickets
        ) || 0;

      const complaints =
        Number(
          dashboard.complaints
        ) || 0;

      const open =
        Number(
          dashboard.open_tickets
        ) || 0;

      const closed =
        Number(
          dashboard.closed_tickets
        ) || 0;

      const high =
        Number(
          dashboard.high_priority
        ) || 0;

      const resolutionRate =
        total > 0
          ? Math.round(
              (closed / total) * 100
            )
          : 0;

      const complaintRate =
        total > 0
          ? Math.round(
              (complaints / total) * 100
            )
          : 0;

      const summaryText =
        `CustomerIQ currently records ${total} total support tickets. ` +
        `${closed} tickets are resolved and ${open} remain open, ` +
        `resulting in a ${resolutionRate}% resolution rate. ` +
        `${complaints} tickets are classified as complaints ` +
        `(${complaintRate}% of total tickets), while ${high} tickets ` +
        `are marked as high priority.`;

      setTextColor(COLORS.slate);

      doc.setFontSize(10);

      doc.setFont(
        "helvetica",
        "normal"
      );

      const summaryLines =
        doc.splitTextToSize(
          summaryText,
          pageWidth -
            margin * 2 -
            16
        );

      doc.text(
        summaryLines,
        margin + 8,
        summaryTop + 21
      );

      /*
       * =====================================================
       * 6. TICKET STATUS SUMMARY
       * =====================================================
       */

      const statusTop = 151;

      setTextColor(COLORS.navy);

      doc.setFontSize(14);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.text(
        "Ticket Status Overview",
        margin,
        statusTop
      );

      const statusData = [
        [
          "Metric",
          "Count",
          "Share",
        ],

        [
          "Total Tickets",
          safeString(total),
          "100%",
        ],

        [
          "Resolved",
          safeString(closed),
          `${resolutionRate}%`,
        ],

        [
          "Open",
          safeString(open),
          `${total > 0
            ? Math.round(
                (open / total) * 100
              )
            : 0}%`,
        ],

        [
          "Complaints",
          safeString(complaints),
          `${complaintRate}%`,
        ],

        [
          "High Priority",
          safeString(high),
          `${total > 0
            ? Math.round(
                (high / total) * 100
              )
            : 0}%`,
        ],
      ];

      autoTable(doc, {
        startY: statusTop + 6,

        head: [statusData[0]],

        body: statusData.slice(1),

        theme: "grid",

        margin: {
          left: margin,
          right: margin,
        },

        styles: {
          fontSize: 9,
          cellPadding: 4,
          textColor: COLORS.navy,
          lineColor: COLORS.border,
          lineWidth: 0.2,
        },

        headStyles: {
          fillColor: COLORS.navy,
          textColor: COLORS.white,
          fontStyle: "bold",
        },

        alternateRowStyles: {
          fillColor: [
            248,
            250,
            252,
          ],
        },

        columnStyles: {
          0: {
            cellWidth: 80,
          },

          1: {
            cellWidth: 35,
            halign: "center",
          },

          2: {
            cellWidth: 35,
            halign: "center",
          },
        },
      });

      /*
       * =====================================================
       * 7. TICKET DETAILS PAGE
       * =====================================================
       */

      doc.addPage();

      addSectionTitle(
        "Customer Support Tickets",
        "Detailed ticket-level information"
      );

      /*
       * Prepare ticket rows
       */

      const ticketRows =
        tickets.map((ticket) => [
          safeString(
            ticket.customer
          ),

          safeString(
            ticket.category
          ),

          safeString(
            ticket.sentiment
          ),

          safeString(
            ticket.urgency
          ),

          safeString(
            ticket.status
          ),

          safeString(
            ticket.message ||
              ticket.customer_message ||
              ""
          ),
        ]);

      if (ticketRows.length) {
        autoTable(doc, {
          startY: 34,

          head: [
            [
              "Customer",
              "Category",
              "Sentiment",
              "Priority",
              "Status",
              "Customer Message",
            ],
          ],

          body: ticketRows,

          theme: "striped",

          margin: {
            left: margin,
            right: margin,
            bottom: 15,
          },

          styles: {
            fontSize: 7.5,
            cellPadding: 3,
            overflow: "linebreak",
            valign: "middle",
            textColor: COLORS.navy,
            lineColor: COLORS.border,
          },

          headStyles: {
            fillColor: COLORS.blueDark,
            textColor: COLORS.white,
            fontStyle: "bold",
            fontSize: 8,
          },

          alternateRowStyles: {
            fillColor: [
              248,
              250,
              252,
            ],
          },

          columnStyles: {
            0: {
              cellWidth: 32,
            },

            1: {
              cellWidth: 28,
            },

            2: {
              cellWidth: 27,
            },

            3: {
              cellWidth: 25,
            },

            4: {
              cellWidth: 27,
            },

            5: {
              cellWidth: "auto",
            },
          },

          didDrawPage: () => {
            addFooter();
          },
        });
      } else {
        setTextColor(COLORS.slate);

        doc.setFontSize(11);

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          "No ticket data was available.",
          margin,
          40
        );
      }

      /*
       * =====================================================
       * 8. REPORT HISTORY
       * =====================================================
       */

      if (reports.length) {
        doc.addPage();

        addSectionTitle(
          "Report History",
          "Previously generated customer support reports"
        );

        const reportColumns = [
          "Customer",
          "Category",
          "Sentiment",
          "Priority",
          "Status",
        ];

        const reportRows =
          reports.map((report) => [
            safeString(
              report.customer
            ),

            safeString(
              report.category
            ),

            safeString(
              report.sentiment
            ),

            safeString(
              report.urgency
            ),

            safeString(
              report.status
            ),
          ]);

        autoTable(doc, {
          startY: 34,

          head: [reportColumns],

          body: reportRows,

          theme: "striped",

          margin: {
            left: margin,
            right: margin,
            bottom: 15,
          },

          styles: {
            fontSize: 8,
            cellPadding: 4,
            textColor: COLORS.navy,
            lineColor: COLORS.border,
          },

          headStyles: {
            fillColor: COLORS.navy,
            textColor: COLORS.white,
            fontStyle: "bold",
          },

          alternateRowStyles: {
            fillColor: [
              248,
              250,
              252,
            ],
          },

          didDrawPage: () => {
            addFooter();
          },
        });
      }

      /*
       * =====================================================
       * 9. FOOTERS ON ALL PAGES
       * =====================================================
       */

      const totalPages =
        doc.internal.getNumberOfPages();

      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        doc.setPage(i);

        /*
         * Don't put footer over the dark header
         * on page 1.
         */

        addFooter();
      }

      /*
       * =====================================================
       * 10. SAVE
       * =====================================================
       */

      doc.save(
        "CustomerIQ_Executive_Report.pdf"
      );

    } catch (error) {
      console.error(
        "Professional PDF generation failed:",
        error
      );

      alert(
        "Unable to generate the PDF report. Please check the browser console for details."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleExportPDF}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition shadow-md"
    >
      Export PDF
    </button>
  );
}

export default ExportPDF;