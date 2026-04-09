import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTACT_TOPIC_LABELS,
  isContactTopic,
  sanitizeText,
} from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!key || !to || !from) {
    return NextResponse.json(
      {
        error:
          "Configurazione email incompleta. Imposta RESEND_API_KEY, CONTACT_TO_EMAIL e RESEND_FROM_EMAIL.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON non valido" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;

  const name = sanitizeText(o.name, 200);
  const email = sanitizeText(o.email, 254);
  const message = sanitizeText(o.message, 8000);
  const topicRaw = sanitizeText(o.topic, 32);
  const plan = sanitizeText(o.plan, 120) ?? "";
  const section = sanitizeText(o.section, 200) ?? "";

  if (!name || !email || !message || !topicRaw || !isContactTopic(topicRaw)) {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti o non validi." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  const topicLabel = CONTACT_TOPIC_LABELS[topicRaw];
  const subjectParts = ["[Alvenco]", topicLabel];
  if (plan) subjectParts.push(`— ${plan}`);

  const html = `
    <h2>Nuova richiesta dal sito</h2>
    <p><strong>Argomento:</strong> ${escapeHtml(topicLabel)}</p>
    ${plan ? `<p><strong>Piano / tab selezionato:</strong> ${escapeHtml(plan)}</p>` : ""}
    ${section ? `<p><strong>Sezione:</strong> ${escapeHtml(section)}</p>` : ""}
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <hr />
    <p><strong>Messaggio</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(message)}</pre>
  `;

  const resend = new Resend(key);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: subjectParts.join(" "),
    html,
  });

  if (error) {
    console.error("[contact] Resend:", error);
    return NextResponse.json(
      { error: "Invio non riuscito. Riprova più tardi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
