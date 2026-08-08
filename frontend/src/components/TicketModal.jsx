import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaRobot,
  FaClipboard,
  FaPaperPlane,
  FaTimes,
  FaComments,
} from "react-icons/fa";

function TicketModal({ ticket, onClose }) {
  const [status, setStatus] = useState(ticket?.status || "Open");

  // Keep the status synchronized whenever a different ticket is opened
  useEffect(() => {
    setStatus(ticket?.status || "Open");
  }, [ticket]);

  if (!ticket) return null;

  const aiReply = `Hello ${ticket.customer},

Thank you for contacting CustomerIQ Support.

We have received your ${(
    ticket.category || "support"
  ).toLowerCase()} request and our support team is currently reviewing it.

We appreciate your patience and will provide an update shortly.

Best Regards,
CustomerIQ Support Team`;

  function copyReply() {
    navigator.clipboard
      .writeText(aiReply)
      .then(() => {
        alert("AI Reply copied!");
      })
      .catch(() => {
        alert("Unable to copy the AI reply.");
      });
  }

  return (
    <>
      {/* =====================================================
          MODAL OVERLAY
      ===================================================== */}
      <div
        className="
          fixed inset-0 z-[100]
          flex items-center justify-center
          bg-black/70
          backdrop-blur-sm
          p-3 sm:p-5 lg:p-8
        "
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* =====================================================
            MODAL
        ===================================================== */}
        <div
          className="
            relative
            w-full
            max-w-6xl
            max-h-[94vh]
            overflow-hidden
            rounded-2xl sm:rounded-3xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-950
            text-slate-900 dark:text-white
            shadow-2xl
            flex flex-col
          "
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* ===================================================
              HEADER
          =================================================== */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              px-5 py-4
              sm:px-6 sm:py-5
              border-b
              border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-950
              shrink-0
            "
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  hidden sm:flex
                  items-center justify-center
                  w-11 h-11
                  rounded-xl
                  bg-blue-600
                  text-white
                  shrink-0
                "
              >
                <FaTicketAltIcon />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    text-xl sm:text-2xl lg:text-3xl
                    font-bold
                    text-slate-900 dark:text-white
                    truncate
                  "
                >
                  Ticket Details
                </h2>

                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                  Customer Support Case
                </p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close ticket details"
              className="
                shrink-0
                flex items-center justify-center
                w-10 h-10
                sm:w-11 sm:h-11
                rounded-xl
                border
                border-slate-300 dark:border-slate-600
                bg-slate-100 dark:bg-slate-800
                text-slate-700 dark:text-slate-200
                hover:bg-red-500
                hover:border-red-500
                hover:text-white
                transition-all duration-200
              "
            >
              <FaTimes className="text-lg sm:text-xl" />
            </button>
          </div>

          {/* ===================================================
              MAIN MODAL CONTENT
          =================================================== */}
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
            "
          >
            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-[280px_minmax(0,1fr)]
              "
            >
              {/* =================================================
                  LEFT CUSTOMER PANEL
              ================================================= */}
              <div
                className="
                  p-5 sm:p-6
                  lg:p-7
                  border-b
                  lg:border-b-0
                  lg:border-r
                  border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-900
                "
              >
                {/* Customer */}
                <div className="flex flex-col items-center text-center">
                  <FaUserCircle
                    className="
                      text-7xl sm:text-8xl
                      text-blue-600
                    "
                  />

                  <h3
                    className="
                      text-xl sm:text-2xl
                      font-bold
                      mt-3
                      text-slate-900 dark:text-white
                      break-words
                    "
                  >
                    {ticket.customer}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                    Premium Customer
                  </p>
                </div>

                {/* Ticket Information */}
                <div className="mt-7 space-y-5">
                  {/* Category */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Category
                    </p>

                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {ticket.category}
                    </p>
                  </div>

                  {/* Priority */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Priority
                    </p>

                    <p
                      className={`
                        mt-1 font-semibold
                        ${
                          ticket.urgency === "High"
                            ? "text-red-500"
                            : ticket.urgency === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }
                      `}
                    >
                      {ticket.urgency}
                    </p>
                  </div>

                  {/* Sentiment */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Sentiment
                    </p>

                    <p
                      className={`
                        mt-1 font-semibold
                        ${
                          ticket.sentiment === "Negative"
                            ? "text-red-500"
                            : ticket.sentiment === "Positive"
                            ? "text-green-500"
                            : "text-slate-900 dark:text-white"
                        }
                      `}
                    >
                      {ticket.sentiment}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      Ticket Status
                    </p>

                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="
                        w-full
                        border
                        border-slate-300 dark:border-slate-600
                        rounded-xl
                        p-3
                        bg-white dark:bg-slate-800
                        text-slate-900 dark:text-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Resolved">
                        Resolved
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT CONTENT PANEL
              ================================================= */}
              <div
                className="
                  p-5 sm:p-6 lg:p-8
                  min-w-0
                  bg-white dark:bg-slate-950
                "
              >
                {/* AI SUGGESTED REPLY */}
                <div>
                  <h3
                    className="
                      text-xl sm:text-2xl
                      font-bold
                      mb-4
                      flex items-center gap-3
                      text-slate-900 dark:text-white
                    "
                  >
                    <FaRobot className="text-blue-500" />

                    <span>AI Suggested Reply</span>
                  </h3>

                  <div
                    className="
                      bg-slate-100 dark:bg-slate-800
                      border
                      border-slate-200 dark:border-slate-700
                      rounded-2xl
                      p-5 sm:p-6
                      whitespace-pre-wrap
                      leading-7
                      text-sm sm:text-base
                      text-slate-800 dark:text-slate-200
                      break-words
                    "
                  >
                    {aiReply}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <button
                      type="button"
                      onClick={copyReply}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-5 py-3
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      <FaClipboard />

                      Copy Reply
                    </button>

                    <button
                      type="button"
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-5 py-3
                        rounded-xl
                        font-semibold
                        transition
                      "
                    >
                      <FaPaperPlane />

                      Send Reply
                    </button>
                  </div>
                </div>

                {/* =================================================
                    CONVERSATION HISTORY
                ================================================= */}
                <div className="mt-8 sm:mt-10">
                  <h3
                    className="
                      text-xl sm:text-2xl
                      font-bold
                      mb-5
                      flex items-center gap-3
                      text-slate-900 dark:text-white
                    "
                  >
                    <FaComments className="text-blue-500" />

                    Conversation History
                  </h3>

                  <div className="space-y-4">
                    {/* CUSTOMER MESSAGE */}
                    <div
                      className="
                        bg-slate-100 dark:bg-slate-800
                        border
                        border-slate-200 dark:border-slate-700
                        rounded-2xl
                        p-4 sm:p-5
                      "
                    >
                      <strong className="text-slate-900 dark:text-white">
                        {ticket.customer}
                      </strong>

                      <p className="mt-2 text-slate-700 dark:text-slate-300 leading-6">
                        I need help regarding my{" "}
                        {(ticket.category || "support").toLowerCase()}.
                      </p>
                    </div>

                    {/* SUPPORT AGENT MESSAGE */}
                    <div
                      className="
                        bg-blue-100 dark:bg-blue-900/60
                        border
                        border-blue-200 dark:border-blue-800
                        rounded-2xl
                        p-4 sm:p-5
                      "
                    >
                      <strong className="text-slate-900 dark:text-white">
                        Support Agent
                      </strong>

                      <p className="mt-2 text-slate-800 dark:text-blue-100 leading-6">
                        Thank you. We are investigating your request.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom spacing */}
                <div className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*
  Small helper component so the header icon doesn't require
  another icon import name that could conflict with existing code.
*/
function FaTicketAltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M4 5a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2H4Zm0 2h16v2.2a3 3 0 0 0 0 5.6V17H4v-2.2a3 3 0 0 0 0-5.6V7Zm4 1h8v2H8V8Zm0 4h8v2H8v-2Z" />
    </svg>
  );
}

export default TicketModal;