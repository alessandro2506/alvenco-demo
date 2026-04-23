"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

const FULL_LOGO = "/logo-full.svg";

type AlvencoLogoProps = {
  variant?: "hero" | "header";
  linkToHome?: boolean;
  className?: string;
};

export function AlvencoLogo({
  variant = "hero",
  linkToHome = false,
  className = "",
}: AlvencoLogoProps) {
  const isHero = variant === "hero";
  const logoBox = isHero
    ? "h-[4.75rem] w-[13.2rem] sm:h-[5.4rem] sm:w-[15rem]"
    : "h-10 w-[9.8rem] sm:h-12 sm:w-[11.8rem]";

  const inner = (
    <span className={`inline-flex items-center ${className}`}>
      <span className={`relative block shrink-0 ${logoBox}`}>
        <Image
          src={FULL_LOGO}
          alt="Alvenco Ltd"
          fill
          className="object-contain object-left"
          sizes={isHero ? "240px" : "190px"}
          priority={isHero}
        />
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
