import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import * as Icons from "lucide-react";
import { format } from "date-fns";
import { services } from "@/data/mock";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateShortId } from "@/lib/id";

interface Booking {
  id: string;
  type: "booking";
  service: (typeof services)[0] & { localizedTitle: string };
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  status: "paid" | "pay_later";
  createdAt: string;
}

const TIME_SLOTS = ["morning", "afternoon", "evening"] as const;

export default function Booking() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<(typeof services)[0] & { localizedTitle: string } | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const localizedServices = services.map((s, i) => ({
    ...s,
    localizedTitle: t.serviceData[i]?.title ?? s.title,
    localizedDescription: t.serviceData[i]?.description ?? s.description,
  }));

  useEffect(() => {
    const stored = localStorage.getItem("selectedService");
    if (stored) {
      const svc = JSON.parse(stored);
      const matched = localizedServices.find((s) => s.id === svc.id);
      if (matched) {
        setSelectedService(matched);
        setStep(2);
      }
      localStorage.removeItem("selectedService");
    }
  }, []);

  const timeLabel = (slot: string) => {
    if (slot === "morning") return t.booking.morning;
    if (slot === "afternoon") return t.booking.afternoon;
    return t.booking.evening;
  };

  const handleConfirm = (status: "paid" | "pay_later") => {
    setLoading(true);
    setTimeout(() => {
      const booking: Booking = {
        id: generateShortId(),
        type: "booking",
        service: selectedService!,
        date,
        timeSlot,
        name,
        email,
        phone,
        status,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("userBookings") || "[]");
      localStorage.setItem("userBookings", JSON.stringify([booking, ...existing]));
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: booking.id,
          service: booking.service,
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          date: booking.date,
          timeSlot: booking.timeSlot,
          status,
        }),
      });
      toast.success(status === "paid" ? t.booking.toastSuccess : t.booking.toastPayLater);
      setLocation("/dashboard");
    }, 1200);
  };

  const stepTitles = [t.booking.step1Title, t.booking.step2Title, t.booking.step3Title];
  const stepDescs = [t.booking.step1Desc, t.booking.step2Desc, t.booking.step3Desc];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.booking.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">{t.booking.pageDesc}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
                data-testid={`step-indicator-${s}`}
              >
                {step > s ? <Icons.Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 md:w-24 h-1 mx-1 rounded transition-all duration-300 ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Label */}
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground mb-1">{t.booking.step} {step} {t.booking.of} 3</p>
          <h2 className="text-2xl font-bold">{stepTitles[step - 1]}</h2>
          <p className="text-muted-foreground mt-1">{stepDescs[step - 1]}</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localizedServices.map((service) => {
                  const Icon = (Icons as any)[service.icon] || Icons.HelpCircle;
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service); setStep(2); }}
                      className={`text-left p-6 rounded-xl border-2 transition-all duration-200 hover:border-primary/60 hover:shadow-md ${
                        isSelected ? "border-primary bg-primary/5" : "border-border bg-card"
                      }`}
                      data-testid={`button-book-service-${service.id}`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{service.localizedTitle}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{service.localizedDescription}</p>
                      <span className="text-primary font-bold text-lg">{service.price}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Schedule & Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="max-w-xl mx-auto space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="date">{t.booking.labelDate}</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  data-testid="input-booking-date"
                />
              </div>

              <div className="space-y-2">
                <Label>{t.booking.labelTime}</Label>
                <div className="grid grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        timeSlot === slot
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                      data-testid={`button-timeslot-${slot}`}
                    >
                      {timeLabel(slot)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">{t.booking.labelName}</Label>
                <Input
                  id="name"
                  placeholder={t.booking.placeholderName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-booking-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.booking.labelEmail}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.booking.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-booking-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.booking.labelPhone}</Label>
                <Input
                  id="phone"
                  placeholder={t.booking.placeholderPhone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-booking-phone"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)} data-testid="button-step-back">
                  {t.booking.back}
                </Button>
                <Button
                  className="flex-1"
                  disabled={!date || !timeSlot || !name || !email}
                  onClick={() => setStep(3)}
                  data-testid="button-step-next"
                >
                  {t.booking.next}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-card border rounded-xl p-8 space-y-5 mb-6">
                {[
                  { label: t.booking.summaryService, value: selectedService?.localizedTitle },
                  { label: t.booking.summaryDate, value: date ? format(new Date(date + "T00:00:00"), "MMMM d, yyyy") : "" },
                  { label: t.booking.summaryTime, value: timeLabel(timeSlot) },
                  { label: t.booking.summaryName, value: name },
                  { label: t.booking.summaryEmail, value: email },
                  { label: t.booking.summaryPhone, value: phone },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b last:border-0">
                    <span className="text-muted-foreground text-sm">{label}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg">{t.booking.summaryPrice}</span>
                  <span className="font-bold text-2xl text-primary">{selectedService?.price}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="sm:flex-none" onClick={() => setStep(2)} disabled={loading} data-testid="button-confirm-back">
                  {t.booking.back}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                  onClick={() => handleConfirm("pay_later")}
                  disabled={loading}
                  data-testid="button-pay-later"
                >
                  {t.booking.payLater}
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleConfirm("paid")}
                  disabled={loading}
                  data-testid="button-confirm-pay"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Icons.Loader2 className="w-4 h-4 animate-spin" />
                      {t.booking.processing}
                    </span>
                  ) : (
                    t.booking.payNow
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
