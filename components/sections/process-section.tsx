"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  DraftingCompass,
  FileStack,
  HardHat,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const steps = [
  {
    title: "Konzultace a analýza",
    desc: "Seznámení s vašimi potřebami a představami, analýza pozemku a možností",
    icon: ClipboardList,
  },
  {
    title: "Architektonická studie",
    desc: "Vytvoření koncepčního návrhu a vizualizací stavby",
    icon: DraftingCompass,
  },
  {
    title: "Projektová dokumentace",
    desc: "Zpracování dokumentace pro územní řízení a stavební povolení",
    icon: FileStack,
  },
  {
    title: "Realizace a dozor",
    desc: "Autorský dozor během výstavby, kolaudace a předání stavby",
    icon: HardHat,
  },
];

export function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="proces"
      className="border-y border-[var(--border)] bg-[var(--section-warm)] py-20 sm:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            id="process-heading"
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Proces spolupráce
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Přehledný postup od první schůzky až po předání díla.
          </p>
        </ScrollReveal>

        <div className="mt-14 md:mt-16">
          <div className="hidden md:grid md:grid-cols-4 md:gap-4">
            <motion.div
              className="col-span-4 mb-8 flex items-center justify-between px-[12.5%]"
              aria-hidden
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
            >
              <div className="h-0.5 w-full bg-[var(--accent)]/40" />
            </motion.div>
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative z-10 -mt-[2.125rem] flex size-14 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--background)] font-serif text-2xl font-semibold text-[var(--accent)]"
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                  >
                    {i + 1}
                  </motion.div>
                  <div className="mt-6 inline-flex rounded-lg bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                    <step.icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ol className="relative space-y-0 md:hidden">
            <div
              className="absolute left-[1.125rem] top-2 bottom-2 w-px bg-[var(--border)]"
              aria-hidden
            />
            <motion.div
              className="absolute left-[1.125rem] top-2 w-px bg-[var(--accent)]"
              initial={reduce ? false : { height: 0 }}
              whileInView={{ height: "calc(100% - 1rem)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-12 last:pb-0">
                <motion.div
                  className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--background)] font-serif text-base font-semibold text-[var(--accent)]"
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {i + 1}
                </motion.div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="inline-flex rounded-lg bg-[var(--accent)]/10 p-2 text-[var(--accent)]">
                    <step.icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
