import { useCallback, useEffect, useRef } from "react";

const MAX_FRAME_SECONDS = 0.1; // stops a big jump after the tab was in the background

/**
 * Scrolls a row of cards sideways forever. The row must contain two identical halves, so the jump
 * back to the start is invisible. Driven by JavaScript, so no CSS animation or OS setting switches it off.
 * Pass anything that changes when the cards change as restartKey.
 */
export function useMarquee<T extends HTMLElement>(pixelsPerSecond: number, restartKey: unknown) {
  const trackRef = useRef<T>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let last = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const seconds = Math.min((now - last) / 1000, MAX_FRAME_SECONDS);
      last = now;

      if (!pausedRef.current) {
        offset += pixelsPerSecond * seconds;
        const half = track.scrollWidth / 2; // width of one full set of cards
        if (half > 0 && offset >= half) offset -= half;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [pixelsPerSecond, restartKey]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return { trackRef, pause, resume };
}