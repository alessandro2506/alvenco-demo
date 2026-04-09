import type { PricingPlan } from "@/components/pricing-cluster";

export const webPlans: [PricingPlan, PricingPlan, PricingPlan] = [
  {
    id: "web-a",
    name: "Plan A",
    price: "€49/mese",
    subtitle: "Ideale per presenza online stabile e sicura.",
    bullets: [
      "Manutenzione core (CMS / stack)",
      "Hosting gestito e certificato SSL",
      "Backup programmati e aggiornamenti di sicurezza",
    ],
  },
  {
    id: "web-b",
    name: "Plan B",
    price: "€149/mese",
    subtitle: "Per chi vuole crescere con dati e priorità.",
    highlight: true,
    bullets: [
      "Tutto del Plan A",
      "Supporto prioritario (SLA dedicato)",
      "Analytics e report mensili sulle conversioni",
      "Ottimizzazioni CRO leggere incluse",
    ],
  },
  {
    id: "web-c",
    name: "Plan C",
    price: "€299/mese",
    subtitle: "Partner tecnico con roadmap condivisa.",
    bullets: [
      "Tutto del Plan B",
      "Sprint mensili di sviluppo (feature / landing)",
      "A/B test e integrazioni marketing",
      "Review architetturale e performance budget",
    ],
  },
];

export const mobilePlans: [PricingPlan, PricingPlan, PricingPlan] = [
  {
    id: "mob-starter",
    name: "MVP App",
    price: "da €4.900",
    subtitle: "React Native o Flutter — time-to-market rapido.",
    bullets: [
      "1 piattaforma (iOS o Android) + design system",
      "Auth, notifiche push, analytics base",
      "Pubblicazione store assistita",
    ],
  },
  {
    id: "mob-growth",
    name: "Cross-Platform",
    price: "da €12.900",
    subtitle: "Stesso codice, massima copertura.",
    highlight: true,
    bullets: [
      "iOS + Android da codebase unica",
      "Integrazioni API / pagamenti / deep link",
      "CI/CD e build firmate",
      "3 mesi di bugfix post-launch",
    ],
  },
  {
    id: "mob-scale",
    name: "Prodotto & Scale",
    price: "Su preventivo",
    subtitle: "Moduli nativi, offline-first, enterprise.",
    bullets: [
      "Architetture modulari e feature flags",
      "Ottimizzazione performance e crash-free sessions",
      "Roadmap trimestrale con KPI prodotto",
    ],
  },
];

export const ecommercePlans: [PricingPlan, PricingPlan, PricingPlan] = [
  {
    id: "eco-starter",
    name: "Store Essentials",
    price: "da €89/mese",
    subtitle: "Custom store + gestione ordini essenziale.",
    bullets: [
      "Tema su misura o headless storefront",
      "Catalogo, varianti, tasse e spedizioni",
      "Pagamenti PSD2-ready (Stripe / provider EU)",
    ],
  },
  {
    id: "eco-inventory",
    name: "Inventory Pro",
    price: "da €199/mese",
    subtitle: "Sync magazzino e canali multipli.",
    highlight: true,
    bullets: [
      "Integrazione ERP / WMS / marketplace",
      "Sincronizzazione stock in near real-time",
      "Automazioni alert e rifornimento",
      "Dashboard operativa per il team",
    ],
  },
  {
    id: "eco-enterprise",
    name: "Commerce Suite",
    price: "Su preventivo",
    subtitle: "E-commerce complesso e internazionale.",
    bullets: [
      "Multi-store, multi-valuta, B2B + B2C",
      "Logistica avanzata e regole commerciali",
      "Osservabilità, A/B test catalogo, SLA dedicato",
    ],
  },
];
