import Link from "next/link";
import { siteConfig, navItems } from "@/app.config";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-lg font-bold text-slate-900">{siteConfig.shortName}</p>
          <p className="mt-2 max-w-sm text-sm text-slate-600">
            {siteConfig.description}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 sm:items-end">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. Demo marketing.
      </div>
    </footer>
  );
}
