"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80";

export function HeroSection() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const x = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [12, -12]);
  const y = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [8, -8]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section
      id="uvod"
      className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24"
      aria-label="Úvod"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ x, y }}>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="scale-110 object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/30"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Každá stavba je originál
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Ing. Radim Hubený | Autorizovaný projektant pozemních staveb s 10+
            lety zkušeností
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-lg"
            >
              <Link href="#sluzby">Prohlédnout služby</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/40 bg-white/10 px-8 text-white backdrop-blur hover:bg-white/20"
            >
              <Link href="#kontakt">Kontaktovat</Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.a
          href="#o-mne"
          className="mt-16 inline-flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest text-white/70"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 0.85, duration: 0.5 },
            y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          }}
          aria-label="Posunout dolů k sekci O mně"
        >
          <span>Scroll</span>
          <ChevronDown className="size-5" aria-hidden />
        </motion.a>
      </div>
    </section>
  );
}
