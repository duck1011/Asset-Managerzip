import { useEffect, useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-background py-16 print:py-4 print:bg-white">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Back link — hidden on print */}
        <div className="mb-8 print:hidden">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Receipt card */}
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm print:shadow-none print:border">

          {/* Receipt header */}
          <div className="bg-slate-900 px-8 py-8 text-white print:bg-slate-900">
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

          {/* Receipt footer — hidden on print */}
          <div className="px-8 pb-8 bg-white print:hidden">
            <Button
              onClick={() => window.print()}
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
