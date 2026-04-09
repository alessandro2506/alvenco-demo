import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/app.config";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Richiedi un preventivo o una call conoscitiva con Alvenco Ltd.",
};

type PageProps = {
  searchParams: Promise<{ topic?: string; plan?: string; section?: string }>;
};

export default async function ContattiPage({ searchParams }: PageProps) {
  const { topic, plan, section } = await searchParams;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-5 sm:px-6">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
            Contatti
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Parliamo del vostro prossimo rilascio
          </h1>
          <p className="mt-4 text-slate-600">
            Rispondiamo dal Regno Unito e dall&apos;Italia. Indicate stack,
            mercato di riferimento e urgenza: prepareremo una proposta chiara.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-slate-700">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-700">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="font-medium hover:text-blue-600"
              >
                {siteConfig.links.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-700">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <a
                href={`tel:${siteConfig.links.phone.replace(/\s/g, "")}`}
                className="font-medium hover:text-cyan-700"
              >
                {siteConfig.links.phone}
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Modulo richiesta
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Le richieste sono inviate in modo sicuro al nostro team via email
            (Resend).
          </p>
          <div className="mt-6">
            <ContactForm
              key={`${topic ?? ""}-${plan ?? ""}-${section ?? ""}`}
              defaultTopic={topic ?? ""}
              defaultPlan={plan ?? ""}
              defaultSection={section ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
