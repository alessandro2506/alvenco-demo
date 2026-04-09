"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

const SYMBOL = "/simbolo-alvenco_ltd.png";

type AlvencoLogoProps = {
  variant?: "hero" | "header";
  linkToHome?: boolean;
  className?: string;
};

/**
 * Simbolo ufficiale (PNG) + wordmark. Il file deve avere canale alpha per evitare il “box” bianco.
 */
export function AlvencoLogo({
  variant = "hero",
  linkToHome = false,
  className = "",
}: AlvencoLogoProps) {
  const isHero = variant === "hero";
  const markBox = isHero
    ? "h-[4.5rem] w-[4.5rem] sm:h-[5.25rem] sm:w-[5.25rem]"
    : "h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem]";
  const wordmark = isHero
    ? "text-[2.05rem] leading-none tracking-tight sm:text-[2.45rem]"
    : "text-[1.2rem] leading-none tracking-tight sm:text-[1.55rem]";

  const mark = (
    <div className={`relative shrink-0 ${markBox}`}>
      <Image
        src={SYMBOL}
        alt=""
        fill
        className="object-contain object-left"
        sizes={isHero ? "84px" : "52px"}
        priority={isHero}
      />
    </div>
  );

  const inner = (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3.5 ${className}`}
    >
      {mark}
      <span className={`font-bold text-slate-900 ${wordmark}`}>
        Alvenco
        <span
          className={
            isHero
              ? "ml-1 align-top text-[0.45em] font-semibold text-slate-600"
              : "ml-0.5 align-top text-[0.48em] font-semibold text-slate-600"
          }
        >
          Ltd
        </span>
      </span>
    </span>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex" aria-label="Alvenco Ltd — Home">
        {inner}
      </Link>
    );
  }

  return inner;
}
