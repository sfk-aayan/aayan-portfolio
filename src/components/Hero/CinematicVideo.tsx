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

    // Progressive fetch loading system for buttery-smooth scrubbing
    useEffect(() => {
      let active = true;
      setPreloadError(false);
      setIsPreloadComplete(false);
      setPreloadPercent(0);

      const downloadBinaryTimeline = async () => {
        try {
          let targetUrl = videoUrl;
          let response = await fetch(targetUrl);
          if (!response.ok) {
            throw new Error("Network error");
          }

          const contentLength = response.headers.get("content-length");
          if (!contentLength) {
            const blob = await response.blob();
            if (active) {
              const bUrl = URL.createObjectURL(blob);
              setLocalBlobUrl(bUrl);
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
              if (active) {
                setPreloadPercent(Math.round((loadedBytes / totalBytes) * 100));
              }
            }
          }

          if (!active) return;

          const mergedBlob = new Blob(
            chunks.map(
              ({ buffer, byteOffset, byteLength }) =>
                new Uint8Array(buffer, byteOffset, byteLength).slice().buffer,
            ),
            { type: "video/mp4" },
          );
          const bUrl = URL.createObjectURL(mergedBlob);
          setLocalBlobUrl(bUrl);
          setIsPreloadComplete(true);
        } catch (err) {
          console.warn(
            "CORS or Network issue preloading video. Falling back to native stream.",
            err,
          );
          if (active) {
            setPreloadError(true);
            setIsPreloadComplete(true);
          }
        }
      };

      downloadBinaryTimeline();

      return () => {
        active = false;
        if (localBlobUrl) {
          URL.revokeObjectURL(localBlobUrl);
        }
      };
    }, [videoUrl]);

    const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement>) => {
      setIsMetadataLoaded(true);
      onLoadedMetadata(e);
    };

    const handleVideoError = () => {
      onError(
        "Unable to process timeline format. Please calibrate direct MP4 source.",
      );
    };

    const activeSrc = localBlobUrl || videoUrl;

    return (
      <div
        id="cinematic-stage"
        className="relative w-[85vw] h-[85vh] overflow-hidden bg-[#0A0A0A] rounded-sm"
      >
        {/* Cinematic gradient overlay layer to integrate video into the physical slate background */}
        <div className="absolute inset-0 z-10 pointer-events-none product-lighting" />

        {/* Subtle radial light simulating laptop glow inside the physical operator environment */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-amber-500/2 opacity-[0.03] blur-[120px] pointer-events-none z-10" />

        {/* Ambient background noise/grain overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none filter brightness-[0.97] opacity-[0.02] mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4=')]" />

        {/* Telemetry preloader HUD overlay */}
        {!isMetadataLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0A0A]/95 font-mono text-xs text-zinc-500 space-y-4">
            <div className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase animate-pulse">
              {preloadError
                ? "INITIALIZING ANALOG STREAM PLAYBACK..."
                : "PREBUFFERING CINEMATIC CORE TRANSITIONS..."}
            </div>
            {!preloadError && (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-48 h-1 bg-zinc-900 overflow-hidden relative border border-zinc-800">
                  <div
                    className="h-full bg-amber-500/80 transition-all duration-300"
                    style={{ width: `${preloadPercent}%` }}
                  />
                </div>
                <div className="text-[9px] tracking-widest text-zinc-600 uppercase">
                  BINARY STREAM LOADED: {preloadPercent}%
                </div>
              </div>
            )}
          </div>
        )}

        {/* Core video player */}
        <video
          id="hero-cinematic-track"
          ref={setRefs}
          src={activeSrc}
          muted
          playsInline
          autoPlay
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          onEnded={handleEnded}
          className={`object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            !isMetadataLoaded || isFading ? "opacity-0" : "opacity-85"
          }`}
          style={{
            transform: "translate3d(0, 0, 0)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>
    );
  },
);

CinematicVideo.displayName = "CinematicVideo";

export default CinematicVideo;
