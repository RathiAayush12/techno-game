import { useEffect, useRef, useState } from "react";

/** A precise-ish countdown that keeps going even if tab throttles slightly */
export default function useCountdown(seconds, running, onComplete) {
  const [left, setLeft] = useState(seconds);
  const startRef = useRef(null);
  const reqRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = (now - startRef.current) / 1000;
      const remain = Math.max(0, seconds - elapsed);
      setLeft(remain);
      if (remain <= 0) onComplete?.();
      else reqRef.current = requestAnimationFrame(tick);
    };
    reqRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqRef.current);
  }, [running, seconds, onComplete]);

  useEffect(() => setLeft(seconds), [seconds]);

  return left;
}
