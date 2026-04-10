export type PlanForMessage = {
  id: string;
  name: string;
  price: string;
  subtitle?: string;
};

/** Seconda riga: sottotitolo | prezzo, con a capo se troppo lunga. */
function wrapLine(text: string, maxLen = 58): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  const cut = t.lastIndexOf(" ", maxLen);
  if (cut < 20) {
    return `${t.slice(0, maxLen).trim()}\n${t.slice(maxLen).trim()}`;
  }
  return `${t.slice(0, cut).trim()}\n${t.slice(cut + 1).trim()}`;
}

export function formatPlanMessageBlock(plan: PlanForMessage): string {
  const name = plan.name.trim();
  const price = plan.price.trim();
  const sub = (plan.subtitle ?? "").trim();
  const line2 = sub ? wrapLine(`${sub} | ${price}`) : price;
  return `${name}\n${line2}`;
}
