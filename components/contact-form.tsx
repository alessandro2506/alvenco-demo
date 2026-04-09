"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CONTACT_TOPIC_LABELS,
  CONTACT_TOPICS,
  type ContactTopic,
  isContactTopic,
} from "@/lib/contact";

const topicOptions: { value: ContactTopic | ""; label: string }[] = [
  { value: "", label: "Seleziona un argomento" },
  ...CONTACT_TOPICS.map((value) => ({
    value,
    label: CONTACT_TOPIC_LABELS[value],
  })),
];

type Props = {
  defaultTopic?: string;
  defaultPlan?: string;
  defaultSection?: string;
};

export function ContactForm({
  defaultTopic = "",
  defaultPlan = "",
  defaultSection = "",
}: Props) {
  const [topic, setTopic] = useState<ContactTopic | "">(() =>
    isContactTopic(defaultTopic) ? defaultTopic : "",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const planLabel = useMemo(() => defaultPlan.trim(), [defaultPlan]);
  const sectionLabel = useMemo(() => defaultSection.trim(), [defaultSection]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic || !isContactTopic(topic)) {
      setErrorMessage("Seleziona un argomento.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          plan: planLabel,
          section: sectionLabel,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setErrorMessage(data.error ?? "Invio non riuscito.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTopic(isContactTopic(defaultTopic) ? defaultTopic : "");
    } catch {
      setErrorMessage("Errore di rete. Riprova.");
      setStatus("error");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
      onSubmit={onSubmit}
    >
      {planLabel || sectionLabel ? (
        <div
          className="rounded-xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50/80 to-white px-4 py-3 text-sm text-slate-700"
          role="status"
        >
          <span className="font-semibold text-slate-900">
            Preventivo richiesto per:
          </span>{" "}
          {planLabel ? (
            <>
              piano <strong>{planLabel}</strong>
              {sectionLabel ? " · " : ""}
            </>
          ) : null}
          {sectionLabel ? (
            <>
              sezione <strong>{sectionLabel}</strong>
            </>
          ) : null}
        </div>
      ) : null}

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2 disabled:opacity-60"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2 disabled:opacity-60"
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
          required
          value={topic}
          onChange={(e) =>
            setTopic(
              e.target.value === ""
                ? ""
                : isContactTopic(e.target.value)
                  ? e.target.value
                  : "",
            )
          }
          disabled={status === "loading"}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2 disabled:opacity-60"
        >
          {topicOptions.map((t) => (
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-cyan-500/40 transition focus:border-cyan-400 focus:ring-2 disabled:opacity-60"
          placeholder="Obiettivi, budget indicativo, timeline…"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-105 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? "Invio in corso…" : "Invia richiesta"}
      </button>

      {status === "success" ? (
        <p className="text-sm font-medium text-cyan-700" role="status">
          Messaggio inviato. Ti risponderemo al più presto.
        </p>
      ) : null}
      {status === "error" && errorMessage ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </motion.form>
  );
}
