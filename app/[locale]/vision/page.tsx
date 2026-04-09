import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Cpu, Layers, Rocket, Sparkles } from "lucide-react";

const iconMap = {
  layers: Layers,
  cpu: Cpu,
  rocket: Rocket,
  sparkles: Sparkles,
} as const;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("visionTitle"),
    description: t("visionDescription"),
  };
}

export default async function VisionPage() {
  const t = await getTranslations("visionPage");
  const pillars = t.raw("pillars") as {
    icon: keyof typeof iconMap;
    title: string;
    body: string;
  }[];

  return (
    <div className="relative pb-24 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-diamond-pattern"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
          {t("eyebrow")}
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">{t("intro")}</p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => {
            const Icon = iconMap[p.icon];
            return (
              <div
                key={p.title}
                className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-sm backdrop-blur-sm"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rotate-45 border border-cyan-400/20 bg-gradient-to-br from-blue-600/5 to-cyan-500/10"
                  aria-hidden
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
