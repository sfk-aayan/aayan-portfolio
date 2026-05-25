export class ScrollVideoSynchronizer {
  private video: HTMLVideoElement;
  private videoContainer: HTMLElement | null = null;
  private overlayElement: HTMLElement | null = null;
  private gridElement: HTMLElement | null = null;
  private targetProgress: number = 0;
  private currentProgress: number = 0;
  private rafid: number | null = null;
  private isDestroyed: boolean = false;
  private scrollContainer: HTMLElement | null = null;
  private lastKnownTime: number = 0;

  // Physical damping parameter
  // Lower values make motion heavier, slower, and more weighted
  private damping: number = 0.08;

  constructor(
    video: HTMLVideoElement,
    elements?: {
      videoContainer?: HTMLElement | null;
      overlayElement?: HTMLElement | null;
      gridElement?: HTMLElement | null;
    },
    scrollContainer?: HTMLElement,
    customDamping?: number,
  ) {
    this.video = video;

    if (elements) {
      if (elements.videoContainer)
        this.videoContainer = elements.videoContainer;
      if (elements.overlayElement)
        this.overlayElement = elements.overlayElement;
      if (elements.gridElement) this.gridElement = elements.gridElement;
    }

    if (scrollContainer) this.scrollContainer = scrollContainer;
    if (customDamping !== undefined) this.damping = customDamping;

    this.onScroll = this.onScroll.bind(this);
    this.update = this.update.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);

    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onScroll, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibilityChange);

    // Initialise position
    this.onScroll();

    // Start render loop
    this.rafid = requestAnimationFrame(this.update);
  }

  private onScroll() {
    if (this.isDestroyed) return;

    const winHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const scrollBounds = docHeight - winHeight;

    if (scrollBounds <= 0) {
      this.targetProgress = 0;
      return;
    }

    // Normalise target progress 0.0 → 1.0 across the full page
    this.targetProgress = Math.max(0, Math.min(1, scrollY / scrollBounds));
  }

  private onVisibilityChange() {
    if (this.isDestroyed) return;

    if (!document.hidden && this.video) {
      // Tab refocused — browser may have evicted the video buffer
      // Re-initialise and seek back to last known position
      this.video.load();
      this.video.currentTime = this.lastKnownTime;
    }
  }

  private update() {
    if (this.isDestroyed) return;

    // Apply lerp for physical weight / momentum
    const diff = this.targetProgress - this.currentProgress;

    if (Math.abs(diff) < 0.0001) {
      this.currentProgress = this.targetProgress;
    } else {
      this.currentProgress += diff * this.damping;
    }

    // Guard with readyState >= 2 (HAVE_CURRENT_DATA) — ensures browser has
    // enough data to seek without silent no-ops on cold load or after suspension
    if (this.video && this.video.duration && this.video.readyState >= 2) {
      const targetTime = this.currentProgress * this.video.duration;

      if (Math.abs(this.video.currentTime - targetTime) > 0.01) {
        const clamped = Math.max(
          0,
          Math.min(this.video.duration - 0.01, targetTime),
        );
        this.video.currentTime = clamped;
        this.lastKnownTime = clamped; // track last successful seek for restore
      }
    }

    // Direct grid parallax layer translation
    if (this.gridElement) {
      const translateY = this.currentProgress * 80;
      this.gridElement.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }

    this.rafid = requestAnimationFrame(this.update);
  }

  public setDamping(value: number) {
    this.damping = value;
  }

  public destroy() {
    this.isDestroyed = true;
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onScroll);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    if (this.rafid) cancelAnimationFrame(this.rafid);
  }
}
