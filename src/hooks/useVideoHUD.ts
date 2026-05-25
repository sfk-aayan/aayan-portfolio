import { useState, useEffect } from "react";

interface VideoHUD {
  currentTimeText: string;
  progressPercent: string;
}

export function useVideoHUD(videoElement: HTMLVideoElement | null): VideoHUD {
  const [currentTimeText, setCurrentTimeText] = useState("0.00s");
  const [progressPercent, setProgressPercent] = useState("0%");

  useEffect(() => {
    if (!videoElement) return;

    const update = () => {
      const current = videoElement.currentTime || 0;
      const duration = videoElement.duration || 1;
      setCurrentTimeText(`${current.toFixed(2)}s`);
      setProgressPercent(`${Math.round((current / duration) * 100)}%`);
    };

    videoElement.addEventListener("timeupdate", update);
    return () => videoElement.removeEventListener("timeupdate", update);
  }, [videoElement]);

  return { currentTimeText, progressPercent };
}
