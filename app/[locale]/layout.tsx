import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SchemaOrg } from "@/components/schema-org";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const localePath = locale === "it" ? "/it" : "/en";
  const altLocalePath = locale === "it" ? "/en" : "/it";

  return {
    metadataBase: new URL("https://www.alvencoltd.co.uk"),
    title: {
      default: t("title"),
      template: "%s | Alvenco Ltd",
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Alvenco Ltd", url: "https://www.alvencoltd.co.uk" }],
    creator: "Alvenco Ltd",
    publisher: "Alvenco Ltd",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_GB",
      alternateLocale: locale === "it" ? "en_GB" : "it_IT",
      url: `https://www.alvencoltd.co.uk${localePath}`,
      siteName: "Alvenco Ltd",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Alvenco Ltd — The UK–Italy Digital Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `https://www.alvencoltd.co.uk${localePath}`,
      languages: {
        it: "https://www.alvencoltd.co.uk/it",
        en: "https://www.alvencoltd.co.uk/en",
        "x-default": "https://www.alvencoltd.co.uk/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "it" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <SchemaOrg locale={locale} />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
