"use client";
import { useEffect, useRef } from "react";
import { containDialogTab } from "@/lib/dialog-focus";
import { finishDialogExit } from "@/lib/dialog-exit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { useSite } from "../providers/SiteProvider";
import site from "@/content/site.json";
import Preferences from "./Preferences";
export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const exitAnimation = useRef<Animation | null>(null);
  const pathname = usePathname();
  const { locale, t } = useSite();
  const closing = useRef(false);
  function dismiss() {
    const dialog = ref.current;
    if (!dialog || closing.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    closing.current = true;
    const currentStyle = getComputedStyle(dialog);
    const animation = dialog.animate(
      [
        { opacity: currentStyle.opacity, transform: currentStyle.transform },
        {
          opacity: 0,
          transform: `translateX(${locale === "ar" ? "-" : ""}100%)`,
        },
      ],
      { duration: 200, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" },
    );
    exitAnimation.current = animation;
    animation.onfinish = () => {
      finishDialogExit(dialog, animation, onClose);
    };
  }
  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const rootOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    dialog.showModal();
    // Start at the menu heading, not a selected-looking close control.
    titleRef.current?.focus({ preventScroll: true });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      if (exitAnimation.current) {
        exitAnimation.current.onfinish = null;
        exitAnimation.current.cancel();
        exitAnimation.current = null;
      }
      closing.current = false;
      document.documentElement.style.overflow = rootOverflow;
      document.body.style.overflow = bodyOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      id="mobile-navigation"
      aria-labelledby="menu-title"
      className="mobile-dialog"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClose={onClose}
      onKeyDown={containDialogTab}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.target === e.currentTarget &&
          (e.clientX < r.left || e.clientX > r.right)
        )
          dismiss();
      }}
    >
      <div className="flex items-center justify-between border-b border-line pb-5">
        <p
          ref={titleRef}
          id="menu-title"
          tabIndex={-1}
          className="font-semibold outline-none"
        >
          {t.branch}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.menuClose}
          className="icon-button"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label={t.nav}>
        <ul className="my-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                onClick={onClose}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex min-h-14 items-center justify-between rounded-xl px-3 text-xl font-medium hover:bg-surface-soft aria-[current=page]:bg-surface-soft aria-[current=page]:text-link"
              >
                {link.label}
                <ArrowUpRight
                  size={18}
                  className="directional"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href={`mailto:${site.email}`}
        onClick={onClose}
        className="button-primary w-full"
      >
        {t.emailBranch}
      </a>
      <div className="mt-6 border-t border-line pt-5">
        <Preferences />
      </div>
    </dialog>
  );
}
