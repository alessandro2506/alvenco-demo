"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/app.config";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const showBar = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          showBar
            ? "border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-end px-4 sm:h-[4.25rem] sm:px-6">
          {showBar ? (
            <div className="absolute left-4 top-1/2 flex -translate-y-1/2 sm:left-6">
              <Link
                href="/"
                className="flex items-center gap-2"
                aria-label="Alvenco Ltd — Home"
              >
                <Image
                  src="/logo-full.png"
                  alt=""
                  width={140}
                  height={40}
                  className="h-8 w-auto sm:h-9"
                  priority
                />
              </Link>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
              showBar
                ? "text-slate-800 hover:bg-slate-100"
                : "bg-white/90 text-slate-800 shadow-md ring-1 ring-slate-200/80 hover:bg-white"
            }`}
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            aria-label="Apri menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
              aria-label="Chiudi menu"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.nav
              id="site-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigazione"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100vw-3rem,20rem)] flex-col border-l border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                <span className="text-sm font-semibold text-slate-900">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 p-4">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          active
                            ? "bg-gradient-to-r from-blue-600/10 to-cyan-500/10 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-slate-100 p-4">
                <Link
                  href="/contatti"
                  onClick={() => setDrawerOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-105"
                >
                  Richiedi preventivo
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
