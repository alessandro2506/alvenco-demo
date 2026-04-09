import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  apiContactStrings,
  apiErrors,
  contactTopicLabel,
} from "@/lib/contact-labels";
import { isContactTopic, sanitizeText } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!key || !to || !from) {
    return NextResponse.json(
      { error: apiErrors("it").config },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: apiErrors("it").json }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: apiErrors("it").body }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const uiLocale = sanitizeText(o.locale, 5) === "en" ? "en" : "it";
  const errors = apiErrors(uiLocale);
  const L = apiContactStrings(uiLocale);

  const name = sanitizeText(o.name, 200);
  const email = sanitizeText(o.email, 254);
  const message = sanitizeText(o.message, 8000);
  const topicRaw = sanitizeText(o.topic, 32);
  const plan = sanitizeText(o.plan, 120) ?? "";
  const section = sanitizeText(o.section, 200) ?? "";

  if (!name || !email || !message || !topicRaw || !isContactTopic(topicRaw)) {
    return NextResponse.json({ error: errors.fields }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: errors.emailInvalid }, { status: 400 });
  }

  const topicLabel = contactTopicLabel(uiLocale, topicRaw);
  const subjectParts = [L.emailSubjectPrefix, topicLabel];
  if (plan) subjectParts.push(`— ${plan}`);

  const html = `
    <h2>${escapeHtml(L.emailHeading)}</h2>
    <p><strong>${escapeHtml(L.emailTopic)}:</strong> ${escapeHtml(topicLabel)}</p>
    ${plan ? `<p><strong>${escapeHtml(L.emailPlan)}:</strong> ${escapeHtml(plan)}</p>` : ""}
    ${section ? `<p><strong>${escapeHtml(L.emailSection)}:</strong> ${escapeHtml(section)}</p>` : ""}
    <p><strong>${escapeHtml(L.emailName)}:</strong> ${escapeHtml(name)}</p>
    <p><strong>${escapeHtml(L.emailEmail)}:</strong> ${escapeHtml(email)}</p>
    <hr />
    <p><strong>${escapeHtml(L.emailMessage)}</strong></p>
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
    return NextResponse.json({ error: errors.sendFailed }, { status: 502 });
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
