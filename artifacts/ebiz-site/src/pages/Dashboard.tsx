import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Printer, CalendarDays, Clock, Tag, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  service: { title: string; localizedTitle: string; price: string; icon: string };
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function Dashboard() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setBookings(stored);
  }, []);

  const timeLabel = (slot: string) => {
    if (slot === "morning") return t.booking.morning;
    if (slot === "afternoon") return t.booking.afternoon;
    return t.booking.evening;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return format(d, "MMMM d, yyyy");
  };

  return (
    <div className="min-h-screen bg-background py-16 print:py-4">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 print:mb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 print:text-2xl">
            {t.dashboard.pageTitle}
          </h1>
          <p className="text-muted-foreground text-xl print:hidden">{t.dashboard.pageDesc}</p>
        </div>

        {/* Summary Stats */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-10 print:hidden">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">{bookings.length}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.dashboard.totalBookings}</div>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">
                {bookings.length > 0 ? bookings[0].service.price : "-"}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{t.dashboard.totalSpend}</div>
            </div>
          </div>
        )}

        {/* No Bookings State */}
        {bookings.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{t.dashboard.noBookings}</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">{t.dashboard.noBookingsDesc}</p>
            <Link href="/services">
              <Button data-testid="button-browse-services">{t.dashboard.browseServices}</Button>
            </Link>
          </div>
        )}

        {/* Booking Receipt Cards */}
        {bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="bg-card border rounded-xl overflow-hidden print:border print:shadow-none print:mb-8 print:break-inside-avoid"
                data-testid={`receipt-card-${booking.id}`}
              >
                {/* Card Header */}
                <div className="bg-primary/5 border-b px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t.dashboard.receiptId}</p>
                    <p className="font-mono font-bold text-sm">{booking.id}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    {t.dashboard.statusPaid}
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <Tag className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptService}</p>
                      <p className="font-semibold">{booking.service.localizedTitle || booking.service.title}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptDate}</p>
                      <p className="font-semibold">{formatDate(booking.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptTime}</p>
                      <p className="font-semibold">{timeLabel(booking.timeSlot)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptPrice}</p>
                      <p className="font-bold text-lg text-primary">{booking.service.price}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5 print:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="gap-2"
                    data-testid={`button-print-${booking.id}`}
                  >
                    <Printer className="w-4 h-4" />
                    {t.dashboard.printReceipt}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
