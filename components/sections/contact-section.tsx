"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  name: z.string().min(2, "Vyplňte jméno"),
  email: z.string().email("Neplatný e-mail"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Vyberte typ projektu"),
  message: z.string().min(10, "Zpráva je příliš krátká"),
  gdpr: z.boolean().refine((v) => v === true, {
    message: "Potvrďte souhlas se zpracováním údajů",
  }),
});

type FormValues = z.infer<typeof schema>;

const projectTypes = [
  "Rodinný dům",
  "Bytová výstavba",
  "Zdravotnické zařízení",
  "Školské zařízení",
  "Výrobní hala",
  "Jiné",
];

const MAP_EMBED =
  "https://maps.google.com/maps?q=Nerudova+803,+672+01+Moravsk%C3%BD+Krumlov&t=&z=15&ie=UTF8&iwloc=&output=embed";

export function ContactSection() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: "",
      gdpr: false,
    },
  });

  const gdpr = useWatch({ control, name: "gdpr", defaultValue: false });

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const payload: unknown = await res.json().catch(() => ({}));
    const errMsg =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error: unknown }).error === "string"
        ? (payload as { error: string }).error
        : null;

    const pdfBase64 =
      typeof payload === "object" &&
      payload !== null &&
      "pdfBase64" in payload &&
      typeof (payload as { pdfBase64: unknown }).pdfBase64 === "string"
        ? (payload as { pdfBase64: string }).pdfBase64
        : null;

    if (res.ok) {
      if (pdfBase64) {
        try {
          const bytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));
          const blob = new Blob([bytes], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `poptavka-projekce-hubeny-${new Date().toISOString().slice(0, 10)}.pdf`;
          a.rel = "noopener";
          a.click();
          URL.revokeObjectURL(url);
        } catch {
          /* stažení PDF je doplňkové */
        }
      }
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
      return;
    }

    setSubmitError(
      errMsg ??
        (res.status >= 500
          ? "Server je dočasně nedostupný. Zkuste to prosím znovu nebo zavolejte."
          : "Odeslání se nezdařilo. Zkontrolujte údaje nebo nás kontaktujte jinak.")
    );
  }

  return (
    <section
      id="kontakt"
      className="bg-[var(--section-warm)] py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            id="contact-heading"
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Kontakt
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Napište mi poptávku nebo volejte – ozvu se co nejdříve.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal delay={0.05}>
            <div className="space-y-6 rounded-2xl border border-[var(--border)] bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8">
              <div>
                <h3 className="font-serif text-xl font-semibold">
                  Ing. Radim Hubený
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Autorizovaný inženýr v oboru pozemní stavby
                </p>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  <span>
                    Nerudova 803
                    <br />
                    672 01 Moravský Krumlov
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+420737424288"
                    className="inline-flex items-center gap-2 font-medium hover:text-[var(--accent)]"
                  >
                    <Phone className="size-5 text-[var(--accent)]" aria-hidden />
                    +420 737 424 288
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@projekce-hubeny.cz"
                    className="inline-flex items-center gap-2 font-medium hover:text-[var(--accent)]"
                  >
                    <Mail className="size-5 text-[var(--accent)]" aria-hidden />
                    info@projekce-hubeny.cz
                  </a>
                </li>
                <li className="text-[var(--muted-foreground)]">
                  IČO: 04671961
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8"
              noValidate
            >
              <div className="grid gap-2">
                <Label htmlFor="name">Jméno a příjmení *</Label>
                <Input id="name" {...register("name")} autoComplete="name" />
                {errors.name && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  autoComplete="tel"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectType">Typ projektu *</Label>
                <select
                  id="projectType"
                  className="flex h-11 w-full rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  {...register("projectType")}
                >
                  <option value="">Vyberte…</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.projectType.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Zpráva *</Label>
                <Textarea id="message" rows={4} {...register("message")} />
                {errors.message && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="gdpr"
                  checked={gdpr === true}
                  onCheckedChange={(c) =>
                    setValue("gdpr", c === true, { shouldValidate: true })
                  }
                  aria-invalid={!!errors.gdpr}
                />
                <Label htmlFor="gdpr" className="cursor-pointer font-normal leading-snug">
                  Souhlasím se zpracováním osobních údajů za účelem odpovědi na
                  poptávku (GDPR). *
                </Label>
              </div>
              {errors.gdpr && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.gdpr.message}
                </p>
              )}

              {submitError && (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              )}

              <AnimatePresence mode="wait">
                {submitted && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                    role="status"
                  >
                    <CheckCircle2 className="size-5 shrink-0" aria-hidden />
                    Děkujeme, zpráva byla odeslána. Brzy se ozvu. Pokud váš
                    prohlížeč neblokuje stahování, měl by se uložit i soubor PDF
                    s kopií poptávky.
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full rounded-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Odesílám…" : "Odeslat poptávku"}
              </Button>
            </form>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.12} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-md">
            <iframe
              title="Mapa – Moravský Krumlov, Nerudova 803"
              src={MAP_EMBED}
              className="aspect-[16/9] min-h-[280px] w-full border-0 grayscale-[30%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
