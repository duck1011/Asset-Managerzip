import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import { MessageCircle, X, Send } from "lucide-react";
import { services } from "@/data/mock";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  quickReplies?: string[];
}

let msgId = 0;
const mkMsg = (from: Message["from"], text: string, quickReplies?: string[]): Message => ({
  id: msgId++,
  from,
  text,
  quickReplies,
});

const INITIAL: Message[] = [
  mkMsg("bot", "Hi! I'm NorthSouth AI. Want to book a service, schedule a consultation, or ask a question?", [
    "Book a Service",
    "Free Consultation",
    "Ask a Question",
  ]),
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const serviceNames = services.map((s) => s.title);

  const addMsg = (msg: Message) => setMessages((prev) => [...prev, msg]);

  const handleQuickReply = (reply: string) => {
    addMsg(mkMsg("user", reply));

    if (reply === "Book a Service") {
      setTimeout(() => {
        addMsg(mkMsg("bot", "Great! Which service are you interested in?", serviceNames));
      }, 400);
      return;
    }

    if (reply === "Free Consultation") {
      addMsg(mkMsg("bot", "Perfect! Let me take you to our free consultation page."));
      setTimeout(() => {
        setLocation("/consultation");
        setOpen(false);
      }, 800);
      return;
    }

    if (reply === "Ask a Question") {
      setTimeout(() => {
        addMsg(mkMsg("bot", "Sure! Type your question below and I'll do my best to help."));
      }, 400);
      return;
    }

    if (serviceNames.includes(reply)) {
      const svc = services.find((s) => s.title === reply);
      if (svc) {
        localStorage.setItem("selectedService", JSON.stringify({ ...svc, localizedTitle: svc.title }));
        addMsg(mkMsg("bot", `Great choice! Taking you to book "${svc.title}" now...`));
        setTimeout(() => {
          setLocation("/booking");
          setOpen(false);
        }, 800);
      }
      return;
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addMsg(mkMsg("user", text));
    setTimeout(() => {
      const lower = text.toLowerCase();
      if (lower.includes("book") || lower.includes("service")) {
        addMsg(mkMsg("bot", "I can help you book a service! Which one interests you?", serviceNames));
      } else if (lower.includes("consult") || lower.includes("free") || lower.includes("advice")) {
        addMsg(mkMsg("bot", "Our free 30-minute consultation is a great starting point!", ["Free Consultation"]));
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
        addMsg(mkMsg("bot", "Our services range from $300/mo to $3,500. Want to see all services?", ["Book a Service"]));
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone")) {
        addMsg(mkMsg("bot", "You can reach us at hello@northsouth.agency or +1 (555) 123-4567."));
      } else {
        addMsg(mkMsg("bot", "Good question! Our team is ready to help. Want to schedule a free consultation?", ["Free Consultation", "Book a Service"]));
      }
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500 text-slate-900 shadow-lg hover:bg-cyan-400 transition-colors flex items-center justify-center"
        aria-label="Open chat"
        data-testid="button-chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "70vh" }}
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className="bg-slate-900 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-slate-900" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">NorthSouth AI</p>
                <p className="text-slate-400 text-xs">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                      msg.from === "user"
                        ? "bg-cyan-500 text-slate-900 rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.quickReplies.map((r) => (
                        <button
                          key={r}
                          onClick={() => handleQuickReply(r)}
                          className="text-xs px-3 py-1.5 rounded-full border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-slate-900 transition-colors"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t px-3 py-3 flex gap-2 bg-card">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500/50"
                data-testid="input-chatbot-message"
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center hover:bg-cyan-400 transition-colors shrink-0"
                data-testid="button-chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
