import type { ReactNode } from "react";

/** Layout radice: html/body vivono in app/[locale]/layout.tsx (next-intl). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
