/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

  // physical damping parameter
  // lower values make motion heavier, slower, and more weighted
  private damping: number = 0.08;

  constructor(
    video: HTMLVideoElement,
    elements?: {
      videoContainer?: HTMLElement | null;
      overlayElement?: HTMLElement | null;
      gridElement?: HTMLElement | null;
    },
    scrollContainer?: HTMLElement,
    customDamping?: number
  ) {
    this.video = video;
    if (elements) {
      if (elements.videoContainer) this.videoContainer = elements.videoContainer;
      if (elements.overlayElement) this.overlayElement = elements.overlayElement;
      if (elements.gridElement) this.gridElement = elements.gridElement;
    }
    if (scrollContainer) this.scrollContainer = scrollContainer;
    if (customDamping !== undefined) this.damping = customDamping;

    this.onScroll = this.onScroll.bind(this);
    this.update = this.update.bind(this);

    // Initial binding
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });

    // Initialize position
    this.onScroll();

    // Start rendering frame loop
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
    
    // Normalize target progress 0.0 to 1.0 within the bounds of the entire page
    this.targetProgress = Math.max(0, Math.min(1, scrollY / scrollBounds));
  }

  private update() {
    if (this.isDestroyed) return;

    // Apply linear interpolation for physical weight / momentum
    const diff = this.targetProgress - this.currentProgress;
    
    // If the difference is extremely micro, clamp it to stop operations
    if (Math.abs(diff) < 0.0001) {
      this.currentProgress = this.targetProgress;
    } else {
      this.currentProgress += diff * this.damping;
    }

    // Apply synchronized target time directly to HTML5 video reference.
    // Guard with readyState >= 2 (HAVE_CURRENT_DATA) to ensure the browser
    // has enough data to seek — avoids silent no-ops on cold load.
    if (this.video && this.video.duration && this.video.readyState >= 2) {
      const targetTime = this.currentProgress * this.video.duration;
      
      // Only set currentTime if there is a distinct difference to avoid browser overhead
      if (Math.abs(this.video.currentTime - targetTime) > 0.01) {
        this.video.currentTime = Math.max(0, Math.min(this.video.duration - 0.01, targetTime));
      }
    }

    // Direct background grid parallax layer translation
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
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    if (this.rafid) {
      cancelAnimationFrame(this.rafid);
    }
  }
}
