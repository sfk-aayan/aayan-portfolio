import { useState, useEffect } from "react";

export function useLiveUTC(intervalMs = 500): string {
  const [utc, setUtc] = useState(() => new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(
      () => setUtc(new Date().toISOString()),
      intervalMs,
    );
    return () => clearInterval(timer);
  }, [intervalMs]);

  return utc;
}
