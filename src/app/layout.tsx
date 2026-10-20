import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteProvider from "@/components/providers/SiteProvider";
import ScrollReveals from "@/components/layout/ScrollReveals";
import { getLocale } from "@/lib/locale";
import { messages } from "@/lib/i18n";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
});
export const metadata: Metadata = {
  title: "IEEE BUC Student Branch",
  description: "IEEE Student Branch at Buraimi University College, Oman",
  icons: { icon: "/images/logo.svg", apple: "/images/logo.png" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#18232e" },
  ],
};
const themeScript = `(()=>{const q=matchMedia('(prefers-color-scheme: dark)');function apply(){let t='auto';try{t=localStorage.getItem('ieee-theme')||'auto'}catch{}document.documentElement.dataset.theme=t==='dark'||(t!=='light'&&q.matches)?'dark':'light'}apply();q.addEventListener('change',apply);addEventListener('storage',apply)})()`;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const nonce = (await headers()).get("x-nonce") || undefined;
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body id="top">
        <SiteProvider locale={locale}>
          <a className="skip-link" href="#main-content">
            {messages[locale].skip}
          </a>
          <Navbar />
          <ScrollReveals />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
