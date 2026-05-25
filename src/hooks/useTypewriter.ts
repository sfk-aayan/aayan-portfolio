import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  speed?: number; // ms per character
  startDelay?: number; // ms before typing begins
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {},
): { displayed: string; isDone: boolean; ref: React.RefObject<HTMLElement> } {
  const { speed = 18, startDelay = 120 } = options;

  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Trigger when element enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run typewriter once visible
  useEffect(() => {
    if (!isVisible) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isVisible, text, speed, startDelay]);

  return { displayed, isDone, ref };
}
