"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  Coins,
  Home,
  Ruler,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const services = [
  {
    num: "01",
    title: "Projekční a inženýrská činnost",
    icon: Ruler,
    items: [
      "Architektonická studie",
      "Projekční činnost",
      "Inženýrská činnost",
    ],
  },
  {
    num: "02",
    title: "Kontrolní a poradenská činnost",
    icon: ClipboardCheck,
    items: [
      "Autorské dozory staveb",
      "Technické a stavební dozory",
      "Poradenská činnost, posudky",
    ],
  },
  {
    num: "03",
    title: "Vyřízení dotací NZÚ",
    icon: Coins,
    items: [
      "Zpracování dokumentace a posudku",
      "Zpracování žádosti",
      "Technický dozor při realizaci",
    ],
  },
  {
    num: "04",
    title: "Prověření nemovitostí před koupí",
    icon: Home,
    items: [
      "Prověření technického stavu",
      "Právní prověření nemovitosti",
    ],
  },
];

export function ServicesSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="sluzby"
      className="bg-[var(--background)] py-20 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            id="services-heading"
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Služby
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Od koncepce a dokumentace přes dozory až po dotace a due diligence u
            koupě nemovitosti.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.06}>
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm text-[var(--accent)]">
                    {s.num}
                  </span>
                  <motion.div
                    className="flex size-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]"
                    whileHover={reduce ? undefined : { rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    <s.icon className="size-6" aria-hidden />
                  </motion.div>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-[var(--muted-foreground)]">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#kontakt"
                  className="mt-6 inline-flex text-sm font-medium text-[var(--accent)] underline-offset-4 transition-all hover:underline"
                >
                  Více informací →
                </Link>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
