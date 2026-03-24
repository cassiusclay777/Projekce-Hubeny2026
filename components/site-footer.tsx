import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quick = [
  { href: "#uvod", label: "Úvod" },
  { href: "#o-mne", label: "O mně" },
  { href: "#sluzby", label: "Služby" },
  { href: "#projekty", label: "Projekty" },
  { href: "#kontakt", label: "Kontakt" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--footer-bg)] text-[var(--footer-fg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-xl font-semibold tracking-tight">
            Ing. Radim Hubený
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--footer-muted)]">
            Autorizovaný projektant pozemních staveb. Rodinné a bytové stavby,
            zdravotnická a školská zařízení, výrobní haly a další typy staveb.
          </p>
          <p className="mt-4 text-xs text-[var(--footer-muted)]">
            Člen ČKAIT
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Rychlé odkazy
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {quick.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--footer-muted)] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Kontakt
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-[var(--footer-muted)]">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" aria-hidden />
              <span>
                Nerudova 803
                <br />
                672 01 Moravský Krumlov
              </span>
            </li>
            <li>
              <a
                href="tel:+420737424288"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-[var(--accent)]" aria-hidden />
                +420 737 424 288
              </a>
            </li>
            <li>
              <a
                href="mailto:info@projekce-hubeny.cz"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-[var(--accent)]" aria-hidden />
                info@projekce-hubeny.cz
              </a>
            </li>
            <li className="pt-1 text-xs">IČO: 04671961</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-[var(--footer-muted)]">
        © {new Date().getFullYear()} Ing. Radim Hubený. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}
