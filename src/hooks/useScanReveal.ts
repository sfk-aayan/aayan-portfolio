import { useState, useEffect, useRef } from "react";

interface UseScanRevealOptions {
  threshold?: number; // how much of element must be visible to trigger
  delay?: number; // ms before scan begins
}

export function useScanReveal(options: UseScanRevealOptions = {}) {
  const { threshold = 0.2, delay = 0 } = options;
  const [hasRevealed, setHasRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setHasRevealed(true), delay);
          } else {
            setHasRevealed(true);
          }
          observer.disconnect(); // fire once only
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return { ref, hasRevealed };
}
