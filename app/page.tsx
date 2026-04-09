import Link from "next/link";
import { HeroHome } from "@/components/hero-home";
import { PricingCluster } from "@/components/pricing-cluster";
import {
  ecommercePlans,
  mobilePlans,
  webPlans,
} from "@/lib/pricing-data";
import { BarChart3, Globe2, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroHome />

      <section className="border-y border-slate-100 bg-slate-50/60 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: Globe2,
              t: "Web & landing ad alta conversione",
              d: "Core Web Vitals, SEO tecnico e messaggi chiari per mercati UK/IT.",
            },
            {
              icon: Smartphone,
              t: "App native-quality, un solo team",
              d: "React Native e Flutter con release pipeline e store readiness.",
            },
            {
              icon: BarChart3,
              t: "Dati che guidano il budget",
              d: "Event tracking, funnel e report leggibili per decisioni commerciali.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20">
                <item.icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{item.t}</h2>
                <p className="mt-1 text-sm text-slate-600">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="prezzi"
        className="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
            Investimento chiaro
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Piani pensati per monetizzare e scalare
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Tre linee di prodotto distinte: sito, app mobile ed e-commerce. Ogni
            blocco ha tre tab animate al scroll per confrontare rapidamente il
            ROI.
          </p>
        </div>

        <PricingCluster
          eyebrow="Sito web professionale"
          title="Presenza digitale e crescita misurabile"
          description="Manutenzione, hosting e ottimizzazioni continue: meno rischio operativo, più lead qualificati."
          plans={webPlans}
          ctaLabel="Richiedi preventivo — Sito web"
          contactTopic="web"
        />

        <PricingCluster
          eyebrow="Mobile app"
          title="React Native & Flutter"
          description="Dal MVP al prodotto in produzione: unificazione iOS/Android, integrazioni e metriche di adozione."
          plans={mobilePlans}
          ctaLabel="Inizia ora — App mobile"
          contactTopic="mobile"
        />

        <PricingCluster
          eyebrow="E-commerce"
          title="Custom store & inventory"
          description="Negozi su misura con focus su magazzino, integrazioni e conversione checkout."
          plans={ecommercePlans}
          ctaLabel="Richiedi preventivo — E-commerce"
          contactTopic="ecommerce"
        />

        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600/5 via-white to-cyan-500/10 p-8 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Vuoi un piano su misura o un audit gratuito?
          </p>
          <p className="mt-2 text-slate-600">
            Raccontaci obiettivi e timeline: rispondiamo entro un giorno lavorativo.
          </p>
          <Link
            href="/contatti"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-105"
          >
            Parla con noi
          </Link>
        </div>
      </section>
    </>
  );
}
