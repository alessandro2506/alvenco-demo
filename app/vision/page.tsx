import type { Metadata } from "next";
import { Cpu, Layers, Rocket, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Scalabilità tecnologica, architetture evolutive e roadmap prodotto per Alvenco.",
};

const pillars = [
  {
    icon: Layers,
    title: "Architetture modulari",
    body: "Bounded context, API versionate e feature flags: evolvete il prodotto senza bloccare il traffico o il team commerciale.",
  },
  {
    icon: Cpu,
    title: "Scalabilità orizzontale",
    body: "Stateless services, cache intelligenti e code asincrone per picchi di domanda e campagne seasonal.",
  },
  {
    icon: Rocket,
    title: "Time-to-learning",
    body: "Telemetria prodotto, experiment platform e cicli di release brevi: decisioni basate su dati, non su opinioni.",
  },
  {
    icon: Sparkles,
    title: "AI-ready stack",
    body: "Pipeline dati pulite, embedding store e guardrail: pronti per assistenti, search semantica e automazioni sicure.",
  },
];

export default function VisionPage() {
  return (
    <div className="relative pb-24 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-diamond-pattern"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
          Vision
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Costruiamo prodotti che reggono il domani del vostro mercato
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          La nostra visione è semplice: ogni riga di codice deve supportare la
          crescita del fatturato, la resilienza operativa e la fiducia degli
          utenti — con footprint UK e Italia e mindset internazionale.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-sm backdrop-blur-sm"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rotate-45 border border-cyan-400/20 bg-gradient-to-br from-blue-600/5 to-cyan-500/10"
                aria-hidden
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700">
                <p.icon className="h-6 w-6" aria-hidden />
              </div>
              <h2 className="mt-5 text-lg font-bold text-slate-900">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
