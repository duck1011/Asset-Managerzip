import { memo, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BarChart3, Globe2, LineChart, TrendingUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function TiltCard({
  className,
  children,
  depth = 8,
}: {
  className?: string;
  children: ReactNode;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [depth, -depth]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), {
    stiffness: 180,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`absolute rounded-2xl border border-white/[0.08] bg-white/[0.06] p-4 shadow-[0_12px_48px_rgba(0,212,255,0.15)] backdrop-blur-xl ${className ?? ""}`}
      data-cursor="card"
      whileHover={{ z: 20 }}
    >
      {children}
    </motion.div>
  );
}

export const HeroDashboard = memo(function HeroDashboard() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-lg sm:h-[480px] lg:mx-0 lg:max-w-none [perspective:1200px]">
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <TiltCard className="left-0 top-8 z-10 w-[58%] -rotate-3" depth={6}>
          <motion.div
            animate={reduced ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
              <BarChart3 className="h-3.5 w-3.5 text-[#00D4FF]" />
              Analytics
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {[40, 65, 45, 80, 55, 90, 70].map((barH, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[#00D4FF]/40 to-[#00D4FF]"
                  initial={{ height: 0 }}
                  animate={{ height: `${barH}%` }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.55, ease: "easeOut" }}
                />
              ))}
            </div>
            <p className="mt-2 text-lg font-semibold text-white">+127%</p>
            <p className="text-xs text-white/50">Traffic growth</p>
          </motion.div>
        </TiltCard>

        <TiltCard className="right-0 top-0 z-20 w-[52%] rotate-2" depth={10}>
          <motion.div
            animate={reduced ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
              <Globe2 className="h-3.5 w-3.5 text-[#8B5CF6]" />
              Website
            </div>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#031B2F]/80 p-2">
              <div className="mb-2 flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="space-y-1.5">
                <motion.div className="h-2 w-full rounded bg-white/10" />
                <motion.div className="h-8 rounded bg-gradient-to-r from-[#00D4FF]/30 to-[#8B5CF6]/30" />
                <motion.div className="h-2 w-2/3 rounded bg-white/10" />
              </div>
            </div>
          </motion.div>
        </TiltCard>

        <TiltCard className="bottom-16 left-[8%] z-30 w-[48%] -rotate-2" depth={7}>
          <motion.div
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-xs text-white/60">
              <LineChart className="h-3.5 w-3.5 text-[#00D4FF]" />
              Performance
            </div>
            <svg viewBox="0 0 120 40" className="mt-2 h-10 w-full">
              <motion.path
                d="M0 35 Q30 10 60 25 T120 5"
                fill="none"
                stroke="url(#heroLineGrad)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </TiltCard>

        <TiltCard className="bottom-4 right-[5%] z-40 w-[44%] rotate-3" depth={9}>
          <motion.div
            animate={reduced ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >
            <div className="flex items-center gap-2 text-xs text-white/60">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              Conversions
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">4.8%</p>
            <p className="text-xs text-emerald-400/90">+45% this month</p>
          </motion.div>
        </TiltCard>
      </motion.div>
    </div>
  );
});
