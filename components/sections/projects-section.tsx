"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Project = {
  title: string;
  category: string;
  year: string;
  location: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Rodinný dům u lesa",
    category: "Rodinné domy",
    year: "2024",
    location: "Jižní Morava",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    title: "Bytový dům – rekonstrukce",
    category: "Bytové stavby",
    year: "2023",
    location: "Brno",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    title: "Ordinace – přístavba",
    category: "Zdravotnická zařízení",
    year: "2022",
    location: "Moravský Krumlov",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    title: "Základní škola – pavilon",
    category: "Školská zařízení",
    year: "2021",
    location: "Znojmo",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    title: "Výrobní hala",
    category: "Výrobní haly",
    year: "2020",
    location: "Vyškov",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    title: "Rodinný dům s ateliérem",
    category: "Rodinné domy",
    year: "2024",
    location: "Ivančice",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];

export function ProjectsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="projekty"
      className="bg-[var(--background)] py-20 sm:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            id="projects-heading"
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Reference / Projekty
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Ukázky typů staveb – ilustrační fotografie. Obsah lze doplnit
            reálnými realizacemi.
          </p>
        </ScrollReveal>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title + p.year} delay={(i % 3) * 0.06}>
              <motion.article
                className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-[var(--card)] shadow-md"
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium backdrop-blur">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-semibold">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {p.year} · {p.location}
                    </p>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
