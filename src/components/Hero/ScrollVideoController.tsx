/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { ScrollVideoSynchronizer } from '../../lib/scrollVideoSync';

interface ScrollVideoControllerProps {
  videoElement: HTMLVideoElement | null;
  videoContainer?: HTMLElement | null;
  overlayElement?: HTMLElement | null;
  gridElement?: HTMLElement | null;
  damping?: number;
}

export default function ScrollVideoController({
  videoElement,
  videoContainer,
  overlayElement,
  gridElement,
  damping = 0.08,
}: ScrollVideoControllerProps) {
  const syncRef = useRef<ScrollVideoSynchronizer | null>(null);

  useEffect(() => {
    if (!videoElement) return;

    // Instantiate our custom, physically-lerped scroll synchronizer
    syncRef.current = new ScrollVideoSynchronizer(
      videoElement,
      { videoContainer, overlayElement, gridElement },
      undefined,
      damping
    );

    const handleResize = () => {
      // Re-trigger scroll positions on layout changes to prevent timeline desync
      if (syncRef.current) {
        // Trigger resize sync of target scroll percentage
        window.dispatchEvent(new Event('scroll'));
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (syncRef.current) {
        syncRef.current.destroy();
        syncRef.current = null;
      }
    };
  }, [videoElement, videoContainer, overlayElement, gridElement, damping]);

  return null; // Logic-only component, render nothing
}
