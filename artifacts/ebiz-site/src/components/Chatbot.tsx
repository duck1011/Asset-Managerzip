import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import { MessageCircle, X, Send } from "lucide-react";
import { services } from "@/data/mock";

type ChatLang = "en" | "id";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  quickReplies?: string[];
}

const BOT = {
  en: {
    greeting: "Hi! I'm NorthSouth AI. Want to book a service, schedule a consultation, or ask a question?",
    greetingReplies: ["Book a Service", "Free Consultation", "Ask a Question"],
    pickService: "Great! Which service are you interested in?",
    routingConsultation: "Perfect! Taking you to our free consultation page...",
    typeQuestion: "Sure! Type your question below and I'll help.",
    bookingService: (t: string) => `Great choice! Taking you to book "${t}" now...`,
    serviceReply: "I can help you book a service! Which one interests you?",
    consultReply: "Our free 30-minute consultation is a great starting point!",
    consultReplies: ["Free Consultation"],
    priceReply: "Our services range from $300/mo to $3,500. Want to see them?",
    priceReplies: ["Book a Service"],
    contactReply: "Reach us at hello@northsouth.agency or +1 (555) 123-4567.",
    defaultReply: "Good question! Want to schedule a free consultation?",
    defaultReplies: ["Free Consultation", "Book a Service"],
    placeholder: "Type a message...",
  },
  id: {
    greeting: "Hai! Saya NorthSouth AI. Ingin memesan layanan, konsultasi gratis, atau punya pertanyaan?",
    greetingReplies: ["Pesan Layanan", "Konsultasi Gratis", "Ajukan Pertanyaan"],
    pickService: "Bagus! Layanan apa yang Anda minati?",
    routingConsultation: "Sempurna! Membawa Anda ke halaman konsultasi gratis...",
    typeQuestion: "Tentu! Ketik pertanyaan Anda di bawah dan saya akan membantu.",
    bookingService: (t: string) => `Pilihan bagus! Membawa Anda untuk memesan "${t}"...`,
    serviceReply: "Saya bisa membantu memesan layanan! Mana yang menarik minat Anda?",
    consultReply: "Konsultasi gratis 30 menit kami adalah titik awal yang sempurna!",
    consultReplies: ["Konsultasi Gratis"],
    priceReply: "Layanan kami berkisar dari $300/bln hingga $3.500. Ingin melihatnya?",
    priceReplies: ["Pesan Layanan"],
    contactReply: "Hubungi kami di hello@northsouth.agency atau +1 (555) 123-4567.",
    defaultReply: "Pertanyaan bagus! Ingin menjadwalkan konsultasi gratis?",
    defaultReplies: ["Konsultasi Gratis", "Pesan Layanan"],
    placeholder: "Ketik pesan...",
  },
};

let msgId = 0;
const mkMsg = (from: Message["from"], text: string, quickReplies?: string[]): Message => ({
  id: msgId++,
  from,
  text,
  quickReplies,
});

const makeInitial = (lang: ChatLang): Message[] => [
  mkMsg("bot", BOT[lang].greeting, BOT[lang].greetingReplies),
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [chatLang, setChatLang] = useState<ChatLang>("en");
  const [messages, setMessages] = useState<Message[]>(makeInitial("en"));
  const [input, setInput] = useState("");
  const [, setLocation] = useLocation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const b = BOT[chatLang];
  const serviceNames = services.map((s) => s.title);
  const addMsg = (msg: Message) => setMessages((prev) => [...prev, msg]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setMessages(makeInitial("en"));
      setChatLang("en");
      setInput("");
    }, 300);
  };

  const handleLangSwitch = (lang: ChatLang) => {
    setChatLang(lang);
    setMessages(makeInitial(lang));
    setInput("");
  };

  const handleQuickReply = (reply: string) => {
    addMsg(mkMsg("user", reply));

    const bookTriggers = [BOT.en.greetingReplies[0], BOT.id.greetingReplies[0]];
    const consultTriggers = [BOT.en.greetingReplies[1], BOT.id.greetingReplies[1]];
    const questionTriggers = [BOT.en.greetingReplies[2], BOT.id.greetingReplies[2]];

    if (bookTriggers.includes(reply)) {
      setTimeout(() => addMsg(mkMsg("bot", b.pickService, serviceNames)), 400);
      return;
    }
    if (consultTriggers.includes(reply)) {
      addMsg(mkMsg("bot", b.routingConsultation));
      setTimeout(() => { setLocation("/consultation"); setOpen(false); }, 900);
      return;
    }
    if (questionTriggers.includes(reply)) {
      setTimeout(() => addMsg(mkMsg("bot", b.typeQuestion)), 400);
      return;
    }
    if (serviceNames.includes(reply)) {
      const svc = services.find((s) => s.title === reply);
      if (svc) {
        localStorage.setItem("selectedService", JSON.stringify({ ...svc, localizedTitle: svc.title }));
        addMsg(mkMsg("bot", b.bookingService(svc.title)));
        setTimeout(() => { setLocation("/booking"); setOpen(false); }, 900);
      }
      return;
    }
    if ([...BOT.en.consultReplies, ...BOT.id.consultReplies].includes(reply)) {
      addMsg(mkMsg("bot", b.routingConsultation));
      setTimeout(() => { setLocation("/consultation"); setOpen(false); }, 900);
      return;
    }
    if ([...BOT.en.priceReplies, ...BOT.id.priceReplies].includes(reply)) {
      setTimeout(() => addMsg(mkMsg("bot", b.pickService, serviceNames)), 400);
      return;
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addMsg(mkMsg("user", text));
    const lower = text.toLowerCase();
    setTimeout(() => {
      if (lower.includes("book") || lower.includes("service") || lower.includes("pesan") || lower.includes("layanan")) {
        addMsg(mkMsg("bot", b.serviceReply, serviceNames));
      } else if (lower.includes("consult") || lower.includes("free") || lower.includes("konsultasi") || lower.includes("gratis")) {
        addMsg(mkMsg("bot", b.consultReply, b.consultReplies));
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("harga") || lower.includes("biaya")) {
        addMsg(mkMsg("bot", b.priceReply, b.priceReplies));
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("kontak")) {
        addMsg(mkMsg("bot", b.contactReply));
      } else {
        addMsg(mkMsg("bot", b.defaultReply, b.defaultReplies));
      }
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500 text-slate-900 shadow-lg hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center hover:shadow-xl hover:scale-105"
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
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">NorthSouth AI</p>
                <p className="text-slate-400 text-xs">Always here to help</p>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
                <button
                  onClick={() => handleLangSwitch("en")}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${chatLang === "en" ? "bg-cyan-500 text-slate-900" : "text-slate-400 hover:text-white"}`}
                  title="English"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLangSwitch("id")}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${chatLang === "id" ? "bg-cyan-500 text-slate-900" : "text-slate-400 hover:text-white"}`}
                  title="Bahasa Indonesia"
                >
                  ID
                </button>
              </div>

              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white transition-colors ml-1"
                data-testid="button-chatbot-close"
              >
                <X className="w-4 h-4" />
              </button>
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
                          className="text-xs px-3 py-1.5 rounded-full border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-slate-900 transition-all duration-200"
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
                placeholder={b.placeholder}
                className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-200"
                data-testid="input-chatbot-message"
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center hover:bg-cyan-400 transition-all duration-200 shrink-0"
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
