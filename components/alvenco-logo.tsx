"use client";

import Link from "next/link";
import { useId } from "react";

type AlvencoLogoProps = {
  variant?: "hero" | "header";
  linkToHome?: boolean;
  className?: string;
};

/**
 * Logo vettoriale (mark + testo): sfondo trasparente, centro del simbolo forato via mask.
 */
export function AlvencoLogo({
  variant = "hero",
  linkToHome = false,
  className = "",
}: AlvencoLogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `alvenco-grad-${uid}`;
  const maskId = `alvenco-mask-${uid}`;

  const isHero = variant === "hero";
  const markSize = isHero
    ? "h-[4.5rem] w-[4.5rem] sm:h-[5.25rem] sm:w-[5.25rem]"
    : "h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem]";
  const wordmark = isHero
    ? "text-[2.05rem] leading-none tracking-tight sm:text-[2.45rem]"
    : "text-[1.2rem] leading-none tracking-tight sm:text-[1.55rem]";

  const inner = (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3.5 ${className}`}
    >
      <svg
        className={`shrink-0 ${markSize}`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="8"
            y1="6"
            x2="56"
            y2="58"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1d4ed8" />
            <stop offset="0.45" stopColor="#2563eb" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="64"
            height="64"
          >
            <rect width="64" height="64" fill="white" />
            <path
              d="M32 25.2 38.4 32 32 38.8 25.6 32 32 25.2Z"
              fill="black"
            />
          </mask>
        </defs>
        <g fill={`url(#${gradId})`} mask={`url(#${maskId})`}>
          <path d="M32 32c0-9.2 4.5-17.4 11.5-22.2l7.2 12.4c-4 2.7-6.6 7.3-6.6 12.4 0 1.8.4 3.5.9 5.1L32 32Z" />
          <path d="M32 32c9.2 0 17.4-4.5 22.2-11.5l-12.4-7.2c-2.7 4-7.3 6.6-12.4 6.6-1.8 0-3.5-.4-5.1-.9L32 32Z" />
          <path d="M32 32c0 9.2-4.5 17.4-11.5 22.2l-7.2-12.4c4-2.7 6.6-7.3 6.6-12.4 0-1.8-.4-3.5-.9-5.1L32 32Z" />
          <path d="M32 32c-9.2 0-17.4 4.5-22.2 11.5l12.4 7.2c2.7-4 7.3-6.6 12.4-6.6 1.8 0 3.5.4 5.1.9L32 32Z" />
        </g>
      </svg>
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
