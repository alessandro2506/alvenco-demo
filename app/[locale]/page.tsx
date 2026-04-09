import { getTranslations } from "next-intl/server";
import { BarChart3, Globe2, Smartphone } from "lucide-react";
import { HeroHome } from "@/components/hero-home";
import { PricingCluster } from "@/components/pricing-cluster";
import type { PricingPlan } from "@/components/pricing-cluster";
import { Link } from "@/i18n/routing";

const icons = [Globe2, Smartphone, BarChart3] as const;

function asTuple(
  raw: unknown,
): [PricingPlan, PricingPlan, PricingPlan] {
  const a = raw as PricingPlan[];
  return [a[0], a[1], a[2]];
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const tWeb = await getTranslations("pricingWeb");
  const tMob = await getTranslations("pricingMobile");
  const tEco = await getTranslations("pricingEcommerce");

  const valueCards = t.raw("valueCards") as { title: string; body: string }[];

  return (
    <>
      <HeroHome />

      <section className="border-y border-slate-100 bg-slate-50/60 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6">
          {valueCards.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="prezzi"
        className="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
            {t("pricingIntroEyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("pricingIntroTitle")}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{t("pricingIntroBody")}</p>
        </div>

        <PricingCluster
          eyebrow={tWeb("eyebrow")}
          title={tWeb("title")}
          description={tWeb("description")}
          plans={asTuple(tWeb.raw("plans"))}
          ctaLabel={tWeb("cta")}
          contactTopic="web"
        />

        <PricingCluster
          eyebrow={tMob("eyebrow")}
          title={tMob("title")}
          description={tMob("description")}
          plans={asTuple(tMob.raw("plans"))}
          ctaLabel={tMob("cta")}
          contactTopic="mobile"
        />

        <PricingCluster
          eyebrow={tEco("eyebrow")}
          title={tEco("title")}
          description={tEco("description")}
          plans={asTuple(tEco.raw("plans"))}
          ctaLabel={tEco("cta")}
          contactTopic="ecommerce"
        />

        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600/5 via-white to-cyan-500/10 p-8 text-center">
          <p className="text-lg font-semibold text-slate-900">
            {t("ctaBandTitle")}
          </p>
          <p className="mt-2 text-slate-600">{t("ctaBandBody")}</p>
          <Link
            href="/contatti"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-105"
          >
            {t("ctaBandButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
