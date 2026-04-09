/**
 * Alvenco demo — central site configuration (metadata, nav, CTAs).
 * Import from server or client components as needed.
 */
export const siteConfig = {
  name: "Alvenco Ltd",
  shortName: "Alvenco",
  description:
    "Sviluppo web, e-commerce e app mobile (React Native / Flutter) per aziende UK e Italia. ROI, performance e scalabilità.",
  url: "https://alvenco-demo.vercel.app",
  locale: "it_IT",
  links: {
    email: "hello@alvenco.example",
    phone: "+44 20 0000 0000",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/vision", label: "Vision" },
  { href: "/contatti", label: "Contatti" },
] as const;
