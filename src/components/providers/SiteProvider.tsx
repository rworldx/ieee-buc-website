"use client";
import { createContext, useContext } from "react";
import { messages, type Locale } from "@/lib/i18n";
const SiteContext = createContext<Locale>("en");
export default function SiteProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={locale}>{children}</SiteContext.Provider>;
}
export function useSite() {
  const locale = useContext(SiteContext);
  return { locale, t: messages[locale] };
}
