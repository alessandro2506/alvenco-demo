"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const topics = [
  { value: "", label: "Seleziona un argomento" },
  { value: "web", label: "Sito web professionale" },
  { value: "mobile", label: "App mobile (RN / Flutter)" },
  { value: "ecommerce", label: "E-commerce / inventory" },
  { value: "other", label: "Altro" },
];

type Props = { defaultTopic?: string };

export function ContactForm({ defaultTopic = "" }: Props) {
  const [sent, setSent] = useState(false);

  const initialTopic = useMemo(() => {
    const allowed = topics.map((t) => t.value).filter(Boolean);
    return allowed.includes(defaultTopic) ? defaultTopic : "";
  }, [defaultTopic]);

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Nome e cognome
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-slate-700"
        >
          Argomento
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={initialTopic}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2"
        >
          {topics.map((t) => (
            <option key={t.value || "empty"} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700"
        >
          Messaggio
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2"
          placeholder="Obiettivi, budget indicativo, timeline…"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-105 sm:w-auto sm:px-10"
      >
        Invia richiesta
      </button>
      {sent ? (
        <p className="text-sm font-medium text-cyan-700" role="status">
          Grazie! In produzione collegheremmo questo modulo al vostro endpoint o
          a un provider email — per la demo, la richiesta è stata registrata
          lato client.
        </p>
      ) : null}
    </motion.form>
  );
}
