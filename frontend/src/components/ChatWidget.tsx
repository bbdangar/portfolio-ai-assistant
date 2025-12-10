"use client";

import { useState } from "react";
import { MessageCircle, X, SendHorizonal } from "lucide-react";
import { sendChat } from "@/services/chatService";


type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi, I’m Bhagirath’s AI assistant. Ask me anything about his skills, experience, or projects.",
    },
  ]);
  const [loading, setLoading] = useState(false);

async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const replyText = await sendChat(trimmed);

      const botReply: Message = {
        from: "bot",
        text: replyText || "I didn’t get a proper reply from the backend.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Sorry, I couldn’t reach the server (API). Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }


  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">
          {isOpen ? "Close chat" : "Chat"}
        </span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 flex h-[420px] w-[320px] flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[360px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Bhagirath’s AI Assistant
              </p>
              <p className="text-[11px] text-gray-500">
                Ask about skills, experience, certifications, projects…
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2 overflow-y-auto px-3 py-2 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.from === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <p className="mt-1 text-[11px] italic text-gray-400">
                Thinking…
              </p>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 px-2 py-2">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Bhagirath…"
                className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
