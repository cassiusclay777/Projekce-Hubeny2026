"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Building2, Users } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let start: number | null = null;
    const dur = 1200;
    let frame = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(eased * value));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduce]);

  const shown = reduce ? value : n;

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

const stats: Array<{
  icon: typeof Building2;
  value: number;
  suffix: string;
  label: string;
  display?: string;
}> = [
  {
    icon: Building2,
    value: 10,
    suffix: "+",
    label: "let praxe",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "realizovaných projektů",
  },
  {
    icon: Award,
    value: 0,
    suffix: "",
    label: "Členství",
    display: "ČKAIT",
  },
];

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="o-mne"
      className="bg-[var(--section-warm)] py-20 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            id="about-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
          >
            O mně
          </h2>
          <p className="mt-3 max-w-2xl text-lg font-medium text-[var(--accent)]">
            „V projektování je pro mě každá stavba originál.“
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal delay={0.05}>
            <div className="space-y-5 text-[var(--muted-foreground)] leading-relaxed">
              <p>
                Jsem autorizovaný inženýr v oboru pozemní stavby s více než
                desetiletou praxí. Specializuji se na rodinnou a bytovou
                výstavbu, zdravotnická a školská zařízení, výrobní haly a další
                typy staveb.
              </p>
              <p>
                Nabízím komplexní služby od návrhu přes povolení až po
                realizační dokumentaci. Na projektech spolupracuji s architekty a
                specialisty, kteří mají dlouholetou praxi ve svém oboru.
              </p>
              <p>
                Mým cílem je vytvářet funkční a esteticky hodnotné stavby, které
                odpovídají potřebám klientů a respektují okolní prostředí.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-[var(--border)] bg-white/60 p-4 shadow-sm backdrop-blur"
                >
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                    <s.icon className="size-4 text-[var(--accent)]" aria-hidden />
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-serif text-2xl font-semibold text-[var(--foreground)]">
                    {s.display ? (
                      <span>{s.display}</span>
                    ) : (
                      <AnimatedNumber value={s.value} suffix={s.suffix} />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={ABOUT_IMAGE}
                alt="Architektonická vizualizace interiéru – ilustrační foto"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
