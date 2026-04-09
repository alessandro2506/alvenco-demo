/**
 * Alvenco demo — config non testuale (URL, contatti).
 * Le stringhe UI vivono in messages/{locale}.json.
 */
export const siteConfig = {
  name: "Alvenco Ltd",
  shortName: "Alvenco",
  url: "https://alvenco-demo.vercel.app",
  localeIt: "it_IT",
  localeEn: "en_GB",
  links: {
    email: "hello@alvenco.example",
    phone: "+44 20 0000 0000",
  },
} as const;

/** Path senza prefisso locale (next-intl aggiunge /en se serve). */
export const navRoutes = [
  { href: "/", key: "home" as const },
  { href: "/servizi", key: "services" as const },
  { href: "/vision", key: "vision" as const },
  { href: "/contatti", key: "contacts" as const },
];
