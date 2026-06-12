import {
  ForwardedRef,
  forwardRef,
  SyntheticEvent,
  useState,
  useEffect,
  useRef,
} from "react";

interface CinematicVideoProps {
  videoUrl: string;
  onLoadedMetadata: (e: SyntheticEvent<HTMLVideoElement>) => void;
  onError: (error: string) => void;
}

/**
 * Figure frame — the video is developed as a cyanotype: grayscale
 * footage blended into the blueprint ground via luminosity, framed
 * with a chalk hairline and corner ticks. Fills its parent.
 */
const CinematicVideo = forwardRef(
  (
    { videoUrl, onLoadedMetadata, onError }: CinematicVideoProps,
    ref: ForwardedRef<HTMLVideoElement>,
  ) => {
    const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
    const [preloadPercent, setPreloadPercent] = useState<number>(0);
    const [preloadError, setPreloadError] = useState<boolean>(false);
    const [isMetadataLoaded, setIsMetadataLoaded] = useState<boolean>(false);
    const [isFading, setIsFading] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const setRefs = (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleEnded = () => {
      setIsFading(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current
            .play()
            .catch((err) => console.warn("Video replay error:", err));
        }
        setTimeout(() => {
          setIsFading(false);
        }, 100);
      }, 900);
    };

    useEffect(() => {
      let active = true;
      const downloadBinaryTimeline = async () => {
        try {
          let response = await fetch(videoUrl);
          if (!response.ok) throw new Error("Network error");

          const contentLength = response.headers.get("content-length");
          if (!contentLength) {
            const blob = await response.blob();
            if (active) {
              setLocalBlobUrl(URL.createObjectURL(blob));
              setPreloadPercent(100);
            }
            return;
          }

          const totalBytes = parseInt(contentLength, 10);
          const reader = response.body?.getReader();
          if (!reader) throw new Error("Readable stream not supported");

          let loadedBytes = 0;
          const chunks: Uint8Array[] = [];

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              chunks.push(value);
              loadedBytes += value.length;
              if (active)
                setPreloadPercent(Math.round((loadedBytes / totalBytes) * 100));
            }
          }

          if (!active) return;
          const mergedBlob = new Blob(chunks as BlobPart[], {
            type: "video/mp4",
          });
          setLocalBlobUrl(URL.createObjectURL(mergedBlob));
        } catch (err) {
          if (active) {
            setPreloadError(true);
          }
        }
      };

      downloadBinaryTimeline();
      return () => {
        active = false;
      };
    }, [videoUrl]);

    const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement>) => {
      setIsMetadataLoaded(true);
      onLoadedMetadata(e);
    };

    const activeSrc = localBlobUrl || videoUrl;

    return (
      <div
        id="cinematic-stage"
        className="relative w-full h-full overflow-hidden bg-print"
      >
        {/* Footage — grayscaled, then taking the blueprint's hue via luminosity */}
        <video
          id="hero-cinematic-track"
          ref={setRefs}
          src={activeSrc}
          muted
          playsInline
          autoPlay
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => onError("Video calibration failed.")}
          onEnded={handleEnded}
          className={`w-full h-full object-cover object-center grayscale contrast-110 mix-blend-luminosity transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            !isMetadataLoaded || isFading ? "opacity-0" : "opacity-90"
          }`}
          style={{ transform: "translate3d(0, 0, 0)" }}
        />

        {/* Deepen the print so the figure sits back into the sheet */}
        <div className="absolute inset-0 bg-print-deep/35 mix-blend-multiply pointer-events-none" />

        {/* Chalk hairline frame + corner ticks */}
        <div className="absolute inset-0 border border-chalk/40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-chalk/80 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-chalk/80 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-chalk/80 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-chalk/80 pointer-events-none" />

        {/* Developing state */}
        {!isMetadataLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-print font-mono text-chalk-soft space-y-4 px-6 text-center">
            <div className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase animate-pulse">
              {preloadError
                ? "DEVELOPING FIG. 00 — DIRECT FEED"
                : "EXPOSING FIG. 00"}
            </div>
            {!preloadError && (
              <div className="w-full max-w-[200px] flex flex-col items-center space-y-2">
                <div className="w-full h-px bg-chalk/20 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-safety transition-all duration-300"
                    style={{ width: `${preloadPercent}%` }}
                  />
                </div>
                <div className="text-[8px] tracking-[0.3em] uppercase text-chalk-faint tabular-nums">
                  EXPOSURE {preloadPercent}%
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

CinematicVideo.displayName = "CinematicVideo";
export default CinematicVideo;
