import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as HotToaster } from "react-hot-toast";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Services from "@/pages/Services";
import Media from "@/pages/Media";
import Booking from "@/pages/Booking";
import Consultation from "@/pages/Consultation";
import ConsultationReceipt from "@/pages/ConsultationReceipt";
import Dashboard from "@/pages/Dashboard";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/Chatbot";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/services" component={Services} />
          <Route path="/media" component={Media} />
          <Route path="/booking" component={Booking} />
          <Route path="/consultation/receipt" component={ConsultationReceipt} />
          <Route path="/consultation" component={Consultation} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <HotToaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "8px",
                fontWeight: 500,
              },
            }}
          />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
