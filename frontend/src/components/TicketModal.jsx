import { useState } from "react";
import {
  FaUserCircle,
  FaRobot,
  FaClipboard,
  FaPaperPlane,
} from "react-icons/fa";

function TicketModal({ ticket, onClose }) {
  const [status, setStatus] = useState(ticket?.status || "Open");

  if (!ticket) return null;

  const aiReply = `Hello ${ticket.customer},

Thank you for contacting CustomerIQ Support.

We have received your ${ticket.category.toLowerCase()} request and our support team is currently reviewing it.

We appreciate your patience and will provide an update shortly.

Best Regards,
CustomerIQ Support Team`;

  function copyReply() {
    navigator.clipboard.writeText(aiReply);
    alert("AI Reply copied!");
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-900 w-[950px] max-w-[95%] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-slate-700">

          <div>

            <h2 className="text-3xl font-bold dark:text-white">
              🎫 Ticket Details
            </h2>

            <p className="text-gray-500">
              Customer Support Case
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-3">

          {/* Left Panel */}
          <div className="border-r dark:border-slate-700 p-6">

            <div className="flex flex-col items-center">

              <FaUserCircle className="text-8xl text-blue-600" />

              <h3 className="text-2xl font-bold mt-4 dark:text-white">
                {ticket.customer}
              </h3>

              <p className="text-gray-500">
                Premium Customer
              </p>

            </div>

            <div className="mt-8 space-y-4">

              <div>
                <p className="text-gray-500 text-sm">Category</p>
                <h3 className="font-semibold dark:text-white">
                  {ticket.category}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Priority</p>
                <h3 className="font-semibold text-red-500">
                  {ticket.urgency}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Sentiment</p>
                <h3 className="font-semibold">
                  {ticket.sentiment}
                </h3>
              </div>

              <div>

                <p className="text-gray-500 text-sm mb-2">
                  Ticket Status
                </p>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-xl p-3 dark:bg-slate-800 dark:text-white"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

              </div>

            </div>

          </div>

          {/* Right Panel */}
          <div className="col-span-2 p-6">

            <h3 className="text-2xl font-bold mb-5 flex items-center gap-2 dark:text-white">

              <FaRobot />

              AI Suggested Reply

            </h3>

            <div className="bg-blue-50 dark:bg-slate-800 rounded-2xl p-6 whitespace-pre-wrap">

              {aiReply}

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={copyReply}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
              >

                <FaClipboard />

                Copy Reply

              </button>

              <button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
              >

                <FaPaperPlane />

                Send Reply

              </button>

            </div>

            {/* Conversation */}
            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5 dark:text-white">
                Conversation History
              </h3>

              <div className="space-y-4">

                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">

                  <strong>{ticket.customer}</strong>

                  <p className="mt-2">
                    I need help regarding my {ticket.category.toLowerCase()}.
                  </p>

                </div>

                <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4">

                  <strong>Support Agent</strong>

                  <p className="mt-2">
                    Thank you. We are investigating your request.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TicketModal;