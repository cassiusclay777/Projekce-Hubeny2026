"use client";

import { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMessage } from "@/lib/chat-types";
import Link from "next/link";

export function AssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement>(null);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });
      const data: unknown = await res.json().catch(() => ({}));
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
          ? (data as { message: string }).message
          : null;
      const err =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : null;

      if (!res.ok || !message) {
        setMessages(messages);
        setInput(text);
        setError(err ?? "Nepodařilo se získat odpověď.");
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: message }]);
    } catch {
      setMessages(messages);
      setInput(text);
      setError("Chyba sítě. Zkuste to znovu.");
    } finally {
      setLoading(false);
      queueMicrotask(() =>
        listEndRef.current?.scrollIntoView({ behavior: "smooth" })
      );
    }
  }

  return (
    <section
      id="asistent"
      className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-28"
      aria-labelledby="assistant-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            id="assistant-heading"
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Dotazy k projektování
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Zeptejte se na obecné informace ke stavební projekci a spolupráci s
            projektantem. Odpovědi jsou informativní — závazná nabídka vždy po
            domluvě s Ing. Hubeným v sekci{" "}
            <Link href="#kontakt" className="font-medium text-[var(--accent)] underline-offset-2 hover:underline">
              Kontakt
            </Link>
            .
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06} className="mt-10">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <div
              className="max-h-[min(420px,55vh)] space-y-4 overflow-y-auto p-5 sm:p-6"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.length === 0 && (
                <p className="text-sm text-[var(--muted-foreground)]">
                  Např.: „Jak probíhá projekt rodinného domu od záměru po stavební
                  povolení?“ nebo „Co obnáší autorský dozor?“
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.role}-${m.content.slice(0, 24)}`}
                  className={
                    m.role === "user"
                      ? "ml-8 rounded-xl bg-[var(--section-warm)] px-4 py-3 text-sm"
                      : "mr-8 rounded-xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm leading-relaxed text-[var(--foreground)]"
                  }
                >
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                    {m.role === "user" ? "Vy" : "Asistent"}
                  </span>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Odpovídám…
                </div>
              )}
              <div ref={listEndRef} />
            </div>

            <div className="border-t border-[var(--border)] p-4 sm:p-5">
              {error && (
                <p className="mb-3 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="min-w-0 flex-1">
                  <label htmlFor="assistant-input" className="sr-only">
                    Vaše zpráva
                  </label>
                  <Textarea
                    id="assistant-input"
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Napište dotaz…"
                    disabled={loading}
                    className="min-h-[88px] resize-y"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        void send();
                      }
                    }}
                  />
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Odeslání: Ctrl+Enter
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => void send()}
                  disabled={loading || !input.trim()}
                  className="shrink-0 gap-2 rounded-full sm:mb-1"
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="size-4" aria-hidden />
                  )}
                  Odeslat
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
