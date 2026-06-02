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

const CinematicVideo = forwardRef(
  (
    { videoUrl, onLoadedMetadata, onError }: CinematicVideoProps,
    ref: ForwardedRef<HTMLVideoElement>,
  ) => {
    const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
    const [preloadPercent, setPreloadPercent] = useState<number>(0);
    const [isPreloadComplete, setIsPreloadComplete] = useState<boolean>(false);
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
              setIsPreloadComplete(true);
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
          setIsPreloadComplete(true);
        } catch (err) {
          if (active) {
            setPreloadError(true);
            setIsPreloadComplete(true);
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
        className={`
          relative overflow-hidden bg-[#0A0A0A] rounded-sm transition-all duration-700
          /* MOBILE: Occupy more width, less relative height to stay square-ish */
          w-[92vw] h-[50vh] 
          /* TABLET/DESKTOP: Revert to your original cinematic sizing */
          md:w-[85vw] md:h-[85vh]
        `}
      >
        <div className="absolute inset-0 z-10 pointer-events-none product-lighting" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] md:w-[70vw] md:h-[70vh] rounded-full bg-amber-500/2 opacity-[0.03] blur-[80px] md:blur-[120px] pointer-events-none z-10" />

        <div className="absolute inset-0 z-10 pointer-events-none filter brightness-[0.97] opacity-[0.02] mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4=')]" />

        {!isMetadataLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0A0A]/95 font-mono text-xs text-zinc-500 space-y-4 px-6 text-center">
            <div className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] text-zinc-400 uppercase animate-pulse">
              {preloadError
                ? "INITIALIZING ANALOG STREAM..."
                : "PREBUFFERING CINEMATIC CORE..."}
            </div>
            {!preloadError && (
              <div className="w-full max-w-[200px] md:max-w-xs flex flex-col items-center space-y-2">
                <div className="w-full h-[2px] bg-zinc-900 overflow-hidden relative border border-zinc-800">
                  <div
                    className="h-full bg-amber-500/80 transition-all duration-300"
                    style={{ width: `${preloadPercent}%` }}
                  />
                </div>
                <div className="text-[8px] md:text-[9px] tracking-widest text-zinc-600 uppercase">
                  LOAD_STATUS: {preloadPercent}%
                </div>
              </div>
            )}
          </div>
        )}

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
          className={`
            w-full h-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
            /* On mobile, center the crop more aggressively */
            object-center
            ${!isMetadataLoaded || isFading ? "opacity-0" : "opacity-85"}
          `}
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </div>
    );
  },
);

CinematicVideo.displayName = "CinematicVideo";
export default CinematicVideo;
