"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Enhance below-fold content only; SSR, keyboard access and reduced motion stay visible. */
export default function ScrollReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.querySelector("main");
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!main || preference.matches || !("IntersectionObserver" in window))
      return;
    const tracked = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealState = "shown";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" },
    );
    function register() {
      main!
        .querySelectorAll<HTMLElement>("article, h2, [data-reveal], figure, dl")
        .forEach((element) => {
          if (
            tracked.has(element) ||
            element.parentElement?.closest("[data-reveal-state], article")
          )
            return;
          tracked.add(element);
          // Do not hide content already on screen or restored by back navigation.
          if (element.getBoundingClientRect().top < innerHeight) return;
          element.dataset.revealState = "pending";
          observer.observe(element);
        });
    }
    register();
    // Next can stream content after the layout effect has mounted.
    const mutations = new MutationObserver(register);
    mutations.observe(main, { childList: true, subtree: true });
    const showFocused = (event: FocusEvent) => {
      (event.target as HTMLElement)
        .closest<HTMLElement>("[data-reveal-state]")
        ?.setAttribute("data-reveal-state", "shown");
    };
    main.addEventListener("focusin", showFocused);
    const stop = () => {
      observer.disconnect();
      mutations.disconnect();
      tracked.forEach((element) =>
        element.removeAttribute("data-reveal-state"),
      );
    };
    preference.addEventListener("change", stop);
    return () => {
      stop();
      main.removeEventListener("focusin", showFocused);
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);
  return null;
}
