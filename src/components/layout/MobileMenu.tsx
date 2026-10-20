"use client";
import { useEffect, useRef } from "react";
import { containDialogTab } from "@/lib/dialog-focus";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { useSite } from "../providers/SiteProvider";
import { localHref } from "@/lib/i18n";
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
  const pathname = usePathname();
  const { locale, t } = useSite();
  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      id="mobile-navigation"
      aria-labelledby="menu-title"
      className="mobile-dialog"
      onCancel={onClose}
      onKeyDown={containDialogTab}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.target === e.currentTarget &&
          (e.clientX < r.left || e.clientX > r.right)
        )
          onClose();
      }}
    >
      <div className="flex items-center justify-between border-b border-line pb-5">
        <p id="menu-title" className="font-semibold">
          {t.branch}
        </p>
        <button
          type="button"
          onClick={onClose}
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
      <Link
        href={localHref("/contact#join", locale)}
        onClick={onClose}
        className="button-primary w-full"
      >
        {t.join}
      </Link>
      <div className="mt-6 border-t border-line pt-5">
        <Preferences />
      </div>
    </dialog>
  );
}
