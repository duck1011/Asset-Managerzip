import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CheckCircle, Printer, CalendarDays, Clock, Tag, CreditCard, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

interface BookingItem {
  id: string;
  type?: "booking";
  service: { title: string; localizedTitle: string; price: string; icon: string };
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  status?: "paid" | "pay_later";
  createdAt: string;
}

interface ConsultationItem {
  id: string;
  type: "consultation";
  name: string;
  email: string;
  need: string;
  date: string;
  createdAt: string;
}

type DashboardItem =
  | (BookingItem & { _kind: "booking" })
  | (ConsultationItem & { _kind: "consultation" });

export default function Dashboard() {
  const { t } = useLanguage();
  const [items, setItems] = useState<DashboardItem[]>([]);

  const loadItems = () => {
    const bookings: BookingItem[] = JSON.parse(localStorage.getItem("userBookings") || "[]");
    const consultations: ConsultationItem[] = JSON.parse(localStorage.getItem("consultations") || "[]");
    const combined: DashboardItem[] = [
      ...bookings.map((b) => ({ ...b, _kind: "booking" as const })),
      ...consultations.map((c) => ({ ...c, _kind: "consultation" as const })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setItems(combined);
  };

  useEffect(() => { loadItems(); }, []);

  const timeLabel = (slot: string) => {
    if (slot === "morning") return t.booking.morning;
    if (slot === "afternoon") return t.booking.afternoon;
    return t.booking.evening;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return format(d, "MMMM d, yyyy");
  };

  const handlePayNow = (id: string) => {
    const bookings: BookingItem[] = JSON.parse(localStorage.getItem("userBookings") || "[]");
    localStorage.setItem("userBookings", JSON.stringify(bookings.map((b) => b.id === id ? { ...b, status: "paid" } : b)));
    toast.success("Payment confirmed!");
    loadItems();
  };

  const handleCancel = (item: DashboardItem) => {
    if (item._kind === "booking") {
      const bookings: BookingItem[] = JSON.parse(localStorage.getItem("userBookings") || "[]");
      localStorage.setItem("userBookings", JSON.stringify(bookings.filter((b) => b.id !== item.id)));
    } else {
      const consultations: ConsultationItem[] = JSON.parse(localStorage.getItem("consultations") || "[]");
      localStorage.setItem("consultations", JSON.stringify(consultations.filter((c) => c.id !== item.id)));
    }
    toast.success(item._kind === "booking" ? t.dashboard.cancelToast : "Consultation cancelled.");
    loadItems();
  };

  const handlePrint = (item: DashboardItem) => {
    const isBooking = item._kind === "booking";
    const b = isBooking ? (item as BookingItem & { _kind: "booking" }) : null;
    const c = !isBooking ? (item as ConsultationItem & { _kind: "consultation" }) : null;

    const bodyHtml = isBooking && b ? `
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;width:40%;">Service</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${b.service.localizedTitle || b.service.title}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Date</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${formatDate(b.date)}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Time</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${timeLabel(b.timeSlot)}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Name</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${b.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Email</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${b.email}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Phone</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${b.phone}</td>
        </tr>
        <tr>
          <td style="padding:20px 0;font-size:18px;font-weight:700;color:#0f172a;">Total</td>
          <td style="padding:20px 0;font-size:28px;font-weight:700;color:#06b6d4;text-align:right;">${b.service.price}</td>
        </tr>
      </table>
      <div style="margin-top:16px;padding:14px 20px;background:#ecfdf5;border-radius:10px;display:flex;align-items:center;gap:10px;">
        <span style="color:#16a34a;font-size:20px;">&#10003;</span>
        <span style="color:#15803d;font-weight:600;font-size:14px;">Payment ${b.status === "pay_later" ? "Pending" : "Confirmed"}</span>
      </div>
    ` : `
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;width:40%;">Name</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${c!.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Email</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${c!.email}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:14px 0;color:#64748b;font-size:14px;">Preferred Date</td>
          <td style="padding:14px 0;font-weight:600;color:#0f172a;text-align:right;">${formatDate(c!.date)}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:14px 0;color:#64748b;font-size:14px;">What you need help with</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:4px 0 20px;color:#334155;font-size:14px;line-height:1.6;">${c!.need}</td>
        </tr>
      </table>
      <div style="margin-top:16px;padding:14px 20px;background:#eff6ff;border-radius:10px;">
        <p style="color:#1d4ed8;font-weight:600;font-size:14px;margin:0;">Free Consultation &mdash; No Charge</p>
        <p style="color:#3b82f6;font-size:13px;margin:6px 0 0;">We&rsquo;ll reach out within 24 hours to confirm your session.</p>
      </div>
    `;

    const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Receipt ${item.id} — NorthSouth</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Space Grotesk', sans-serif; background: #fff; color: #0f172a; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
  </head>
  <body>
    <div style="max-width:600px;margin:40px auto;padding:40px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #e2e8f0;">
        <div>
          <p style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 4px;">Receipt</p>
          <p style="font-family:monospace;font-weight:700;font-size:18px;color:#0f172a;margin:0;">${item.id}</p>
        </div>
        <div style="font-size:28px;font-weight:700;letter-spacing:-0.04em;">
          <span style="color:#0f172a;">North</span><span style="color:#06b6d4;">South</span>
        </div>
      </div>
      ${bodyHtml}
      <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e2e8f0;text-align:center;color:#94a3b8;font-size:12px;">
        NorthSouth &bull; hello@northsouth.agency &bull; +1 (555) 123-4567
      </div>
    </div>
    <script>
      window.onload = function() { window.print(); window.close(); };
    </script>
  </body>
</html>`;

    const printWindow = window.open("", "_blank", "width=700,height=900");
    if (!printWindow) {
      toast.error("Please allow pop-ups to print receipts.");
      return;
    }
    printWindow.document.write(fullHtml);
    printWindow.document.close();
  };

  const bookings = items.filter((i) => i._kind === "booking") as (BookingItem & { _kind: "booking" })[];

  const borderColor = (item: DashboardItem) => {
    if (item._kind === "consultation") return "border-l-blue-500";
    const b = item as BookingItem & { _kind: "booking" };
    return b.status === "pay_later" ? "border-l-yellow-400" : "border-l-cyan-500";
  };

  return (
    <div className="min-h-screen bg-background py-16">

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

        {/* Empty State */}
        {items.length === 0 && (
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

        {/* Cards */}
        {items.length > 0 && (
          <div className="space-y-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={`bg-card border border-l-4 ${borderColor(item)} rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 print:border print:shadow-none print:mb-8 print:break-inside-avoid`}
                data-testid={`receipt-card-${item.id}`}
              >
                {/* Card Header */}
                <div className="bg-primary/5 border-b px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t.dashboard.receiptId}</p>
                    <p className="font-mono font-bold text-sm">{item.id}</p>
                  </div>

                  {item._kind === "booking" ? (
                    (item.status === "pay_later") ? (
                      <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1.5 rounded-full text-sm font-semibold">
                        <Clock className="w-4 h-4" />
                        {t.dashboard.statusPayLater}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        {t.dashboard.statusPaid}
                      </span>
                    )
                  ) : (
                    <span className="flex items-center gap-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm font-semibold">
                      <MessageSquare className="w-4 h-4" />
                      {t.dashboard.badgeConsultation}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {item._kind === "booking" ? (
                    <>
                      <div className="flex items-start gap-3">
                        <Tag className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptService}</p>
                          <p className="font-semibold">{item.service.localizedTitle || item.service.title}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CalendarDays className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptDate}</p>
                          <p className="font-semibold">{formatDate(item.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptTime}</p>
                          <p className="font-semibold">{timeLabel(item.timeSlot)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">{t.dashboard.receiptPrice}</p>
                          <p className="font-bold text-lg text-primary">{item.service.price}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <CalendarDays className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Preferred Date</p>
                          <p className="font-semibold">{formatDate(item.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Tag className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Contact</p>
                          <p className="font-semibold">{item.email}</p>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">What you need help with</p>
                          <p className="font-medium text-sm text-muted-foreground line-clamp-2">{item.need}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5 flex flex-wrap items-center gap-3 print:hidden">
                  {item._kind === "booking" && item.status === "pay_later" && (
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => handlePayNow(item.id)}
                      data-testid={`button-pay-now-${item.id}`}
                    >
                      <CreditCard className="w-4 h-4" />
                      {t.dashboard.payNow}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePrint(item)}
                    className="gap-2"
                    data-testid={`button-print-${item.id}`}
                  >
                    <Printer className="w-4 h-4" />
                    {t.dashboard.printReceipt}
                  </Button>
                  {item._kind === "consultation" && (
                    <Link href="/consultation/receipt">
                      <Button variant="outline" size="sm" className="gap-2">
                        View Receipt
                      </Button>
                    </Link>
                  )}
                  <button
                    onClick={() => handleCancel(item)}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors ml-auto"
                    data-testid={`button-cancel-${item.id}`}
                  >
                    {t.dashboard.cancelBooking}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
