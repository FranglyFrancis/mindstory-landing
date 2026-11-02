import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to an element, and whether it has scrolled into view.
 * It flips to true once and stays true, so the animation plays a single time.
 */
export function useRevealOnScroll<T extends Element = HTMLDivElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}