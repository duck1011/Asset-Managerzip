import { useEffect } from "react";
import { useLocation } from "wouter";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Scrolls to top on route change (not on in-page hash-only navigation). */
export function ScrollToTop() {
  const [location] = useLocation();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [location, reduced]);

  return null;
}
