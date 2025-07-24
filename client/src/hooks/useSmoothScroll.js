import Lenis from "lenis";
import { useEffect, useRef } from "react";

const useSmoothScroll = (selector = ".js-native-scroll") => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const lenis = new Lenis({
      wrapper: el, // <--- attach to the inner div
      content: el.firstElementChild || el,
      duration: 1.2,
      smooth: true,
      gestureOrientation: "vertical",
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [selector]);

  return lenisRef;
};
export default useSmoothScroll;
