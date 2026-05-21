import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: number,
  duration = 1600,
  enabled = true,
  decimals = 0,
) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setValue(end);
      return;
    }
    if (started.current) return;
    started.current = true;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Number((end * eased).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, enabled, decimals]);

  return value;
}
