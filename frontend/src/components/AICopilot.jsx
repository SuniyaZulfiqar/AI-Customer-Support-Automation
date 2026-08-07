import { useState } from "react";
import axios from "axios";
import { FaRobot, FaPaperPlane, FaUser } from "react-icons/fa";

function AICopilot() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm your AI Manager Copilot. Ask me anything about your customer support data.",
    },
  ]);

  async function askAI() {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://ai-customer-support-automation-production-04e2.up.railway.app/copilot",
        {
          question: userQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.answer,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to connect to AI.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mt-10">

      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-blue-600 text-3xl" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          AI Manager Copilot
        </h2>
      </div>

      <div className="h-96 overflow-y-auto border border-slate-300 dark:border-slate-700 rounded-xl p-5 bg-slate-50 dark:bg-slate-800 space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">

                {msg.sender === "user" ? (
                  <FaUser />
                ) : (
                  <FaRobot />
                )}

                <strong>
                  {msg.sender === "user" ? "You" : "AI"}
                </strong>

              </div>

              {msg.text}

            </div>
          </div>

        ))}

        {loading && (
          <div className="text-slate-500 dark:text-slate-400">
            🤖 AI is thinking...
          </div>
        )}

      </div>

      <div className="flex gap-3 mt-5">

        <input
          className="
          flex-1
          border
          border-slate-300
          dark:border-slate-700
          rounded-xl
          p-4
          outline-none
          bg-white
          dark:bg-slate-800
          text-slate-900
          dark:text-white
          placeholder:text-slate-400
          "

          placeholder="Ask your AI assistant..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askAI();
          }}
        />

        <button
          onClick={askAI}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 rounded-xl flex items-center gap-2"
        >
          <FaPaperPlane />
          Send
        </button>

      </div>

    </div>
  );
}

export default AICopilot;