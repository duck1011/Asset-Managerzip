import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateShortId } from "@/lib/id";

export default function Consultation() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const consultation = {
        id: generateShortId(),
        type: "consultation",
        name,
        email,
        need,
        date,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("consultations") || "[]");
      localStorage.setItem("consultations", JSON.stringify([consultation, ...existing]));
      fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: consultation.id,
          name: consultation.name,
          email: consultation.email,
          need: consultation.need,
          date: consultation.date,
        }),
      });
      toast.success("Confirmation sent to your phone!");
      setLocation("/consultation/receipt");
    }, 1000);
  };

  const whyItems = [
    t.consultation.why1,
    t.consultation.why2,
    t.consultation.why3,
    t.consultation.why4,
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t.consultation.pageTitle}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.consultation.pageDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Why Section */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-bold">{t.consultation.whyTitle}</h2>
            <ul className="space-y-4">
              {whyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-xl">
              <p className="font-semibold text-foreground mb-1">hello@northsouth.agency</p>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cons-name">{t.consultation.labelName}</Label>
                  <Input
                    id="cons-name"
                    placeholder={t.consultation.placeholderName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-testid="input-consultation-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cons-email">{t.consultation.labelEmail}</Label>
                  <Input
                    id="cons-email"
                    type="email"
                    placeholder={t.consultation.placeholderEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="input-consultation-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cons-need">{t.consultation.labelNeed}</Label>
                <Textarea
                  id="cons-need"
                  placeholder={t.consultation.placeholderNeed}
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  rows={5}
                  required
                  data-testid="input-consultation-need"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cons-date">{t.consultation.labelDate}</Label>
                <Input
                  id="cons-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  data-testid="input-consultation-date"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading} data-testid="button-consultation-submit">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.consultation.submitting}
                  </span>
                ) : (
                  t.consultation.submit
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
