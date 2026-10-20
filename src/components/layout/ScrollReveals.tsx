"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content stays visible before JS and without motion. */
export default function ScrollReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 560, easing: "cubic-bezier(.23,1,.32,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );
    // Observe independent content blocks, never both a card and its section.
    document
      .querySelectorAll("main section, main article")
      .forEach((element) => {
        if (element.parentElement?.closest("main section, main article"))
          return;
        if (element.getBoundingClientRect().top < innerHeight) return;
        observer.observe(element);
      });
    const stop = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      stop();
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);
  return null;
}
