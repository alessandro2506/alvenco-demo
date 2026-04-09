import type { Metadata } from "next";
import {
  Cloud,
  Code2,
  Search,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Siti web, app mobile, cloud e SEO orientati al ROI per clienti UK e Italia.",
};

const services = [
  {
    title: "Siti web",
    icon: Code2,
    points: [
      "Landing e corporate site con performance e accessibilità.",
      "Stack moderno (Next.js, headless CMS) per velocità e SEO.",
      "Integrazione analytics, form e automazioni CRM.",
    ],
  },
  {
    title: "Mobile applications",
    icon: Smartphone,
    points: [
      "React Native e Flutter: un codebase, store iOS e Android.",
      "UX nativa, deep link, push e monetizzazione in-app.",
      "Release train e monitoraggio crash / ANR.",
    ],
  },
  {
    title: "Cloud solutions",
    icon: Cloud,
    points: [
      "Infra su AWS / GCP / Vercel con costi prevedibili.",
      "CI/CD, ambienti staging, backup e disaster recovery.",
      "Osservabilità: log, metriche, alerting.",
    ],
  },
  {
    title: "SEO & marketing",
    icon: Search,
    points: [
      "SEO tecnico, structured data e content velocity.",
      "Campagne misurabili: eventi, conversioni, attribution.",
      "Report mensili con insight azionabili sul funnel.",
    ],
  },
];

export default function ServiziPage() {
  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
          Servizi
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ROI-first: tecnologia al servizio del business
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Ogni offerta è strutturata per ridurre rischio, accelerare time-to-value
          e collegare investimenti marketing a risultati misurabili.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-cyan-400/40 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                <s.icon className="h-7 w-7" aria-hidden />
              </div>
              <h2 className="mt-6 text-xl font-bold text-slate-900">
                {s.title}
              </h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-relaxed">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
