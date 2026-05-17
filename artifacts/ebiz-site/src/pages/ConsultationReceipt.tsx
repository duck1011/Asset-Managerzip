import { useEffect, useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Consultation {
  id: string;
  name: string;
  email: string;
  need: string;
  date: string;
  createdAt: string;
}

export default function ConsultationReceipt() {
  const [consultation, setConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("consultations") || "[]");
    if (stored.length > 0) setConsultation(stored[0]);
  }, []);

  if (!consultation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No consultation receipt found.</p>
          <Link href="/consultation">
            <Button>Book a Consultation</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return format(d, "MMMM d, yyyy");
  };

  const formatCreatedAt = (iso: string) => {
    return format(new Date(iso), "MMMM d, yyyy 'at' h:mm a");
  };

  const handlePrint = () => {
    const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Receipt ${consultation.id} \u2014 NorthSouth</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Space Grotesk', sans-serif; background: #fff; color: #0f172a; }
      @page { size: A4; margin: 12mm; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
  </head>
  <body>
    <div style="max-width:580px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:16px;">

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:20px;border-bottom:2px solid #e2e8f0;">
        <div>
          <p style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 4px;">Receipt</p>
          <p style="font-family:monospace;font-weight:700;font-size:17px;color:#0f172a;margin:0;">${consultation.id}</p>
        </div>
        <div style="font-size:26px;font-weight:700;letter-spacing:-0.04em;">
          <span style="color:#0f172a;">North</span><span style="color:#06b6d4;">South</span>
        </div>
      </div>

      <div style="background:#f8fafc;border-radius:10px;padding:12px 16px;margin-bottom:24px;">
        <p style="font-size:12px;color:#64748b;margin:0 0 4px;">Scheduled for</p>
        <p style="font-size:18px;font-weight:700;color:#0f172a;margin:0;">${formatDate(consultation.date)}</p>
      </div>

      <h2 style="font-size:15px;font-weight:700;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:12px;margin-bottom:0;">Consultation Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:11px 0;color:#64748b;font-size:13px;width:42%;">Name</td>
          <td style="padding:11px 0;font-weight:600;color:#0f172a;text-align:right;font-size:14px;">${consultation.name}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:11px 0;color:#64748b;font-size:13px;">Email</td>
          <td style="padding:11px 0;font-weight:600;color:#0f172a;text-align:right;font-size:14px;">${consultation.email}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:11px 0;color:#64748b;font-size:13px;">Preferred Date</td>
          <td style="padding:11px 0;font-weight:600;color:#0f172a;text-align:right;font-size:14px;">${formatDate(consultation.date)}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:11px 0;color:#64748b;font-size:13px;">Booked On</td>
          <td style="padding:11px 0;font-weight:600;color:#0f172a;text-align:right;font-size:14px;">${formatCreatedAt(consultation.createdAt)}</td>
        </tr>
      </table>

      <div style="margin-top:14px;padding:12px 16px;background:#f8fafc;border-radius:8px;">
        <p style="color:#64748b;font-size:12px;margin:0 0 5px;">What you need help with:</p>
        <p style="color:#334155;font-size:13px;line-height:1.6;margin:0;">${consultation.need}</p>
      </div>

      <div style="margin-top:14px;padding:14px 20px;background:#ecfeff;border:1px solid #cffafe;border-radius:10px;text-align:center;">
        <p style="color:#0e7490;font-weight:600;font-size:14px;margin:0;">Free Consultation \u2014 No Charge</p>
        <p style="color:#0891b2;font-size:12px;margin:5px 0 0;">We\u2019ll reach out within 24 hours to confirm your session.</p>
      </div>

      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e2e8f0;text-align:center;color:#94a3b8;font-size:11px;">
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

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Receipt card */}
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

          {/* Receipt header */}
          <div className="bg-slate-900 px-8 py-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Receipt</p>
                <p className="font-mono font-bold text-lg">{consultation.id}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-white">North</span>
                  <span className="text-cyan-400">South</span>
                </span>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4">
              <p className="text-slate-300 text-sm mb-1">Scheduled for</p>
              <p className="text-xl font-bold">{formatDate(consultation.date)}</p>
            </div>
          </div>

          {/* Receipt body */}
          <div className="px-8 py-8 bg-white space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b pb-4">Consultation Details</h2>

            {[
              { label: "Name", value: consultation.name },
              { label: "Email", value: consultation.email },
              { label: "Preferred Date", value: formatDate(consultation.date) },
              { label: "Booked On", value: formatCreatedAt(consultation.createdAt) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start py-2 border-b last:border-0">
                <span className="text-slate-500 text-sm">{label}</span>
                <span className="font-medium text-slate-900 text-right max-w-[60%]">{value}</span>
              </div>
            ))}

            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-500 text-sm mb-2">What you need help with:</p>
              <p className="text-slate-800 text-sm leading-relaxed">{consultation.need}</p>
            </div>

            <div className="mt-4 p-4 bg-cyan-50 border border-cyan-100 rounded-xl text-center">
              <p className="text-cyan-800 font-semibold text-sm">Free Consultation — No Charge</p>
              <p className="text-cyan-600 text-xs mt-1">We'll reach out within 24 hours to confirm your session.</p>
            </div>
          </div>

          {/* Receipt footer */}
          <div className="px-8 pb-8 bg-white">
            <Button
              onClick={handlePrint}
              className="w-full gap-2"
              variant="outline"
            >
              <Printer className="w-4 h-4" />
              Download Receipt
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
