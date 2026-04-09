"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CONTACT_TOPICS, type ContactTopic, isContactTopic } from "@/lib/contact";

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
  const t = useTranslations("contactForm");
  const locale = useLocale();
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

  const topicOptions = useMemo(
    () => [
      { value: "" as const, label: t("topicPlaceholder") },
      ...CONTACT_TOPICS.map((value) => ({
        value,
        label: t(
          value === "web"
            ? "topicWeb"
            : value === "mobile"
              ? "topicMobile"
              : value === "ecommerce"
                ? "topicEcommerce"
                : "topicOther",
        ),
      })),
    ],
    [t],
  );

  const planLabel = useMemo(() => defaultPlan.trim(), [defaultPlan]);
  const sectionLabel = useMemo(() => defaultSection.trim(), [defaultSection]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic || !isContactTopic(topic)) {
      setErrorMessage(t("errorTopic"));
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
          locale,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setErrorMessage(data.error ?? t("errorGeneric"));
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTopic(isContactTopic(defaultTopic) ? defaultTopic : "");
    } catch {
      setErrorMessage(t("errorNetwork"));
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
          <span className="font-semibold text-slate-900">{t("quoteBanner")}</span>{" "}
          {planLabel ? (
            <>
              {t("planWord")} <strong>{planLabel}</strong>
              {sectionLabel ? " · " : ""}
            </>
          ) : null}
          {sectionLabel ? (
            <>
              {t("sectionWord")} <strong>{sectionLabel}</strong>
            </>
          ) : null}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          {t("name")}
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
          {t("email")}
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
          {t("topic")}
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
          {topicOptions.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700"
        >
          {t("message")}
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
          placeholder={t("messagePlaceholder")}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-105 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? t("submitting") : t("submit")}
      </button>

      {status === "success" ? (
        <p className="text-sm font-medium text-cyan-700" role="status">
          {t("success")}
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
