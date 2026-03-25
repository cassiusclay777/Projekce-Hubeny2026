import { NextResponse } from "next/server";
import { z } from "zod";
import { getDeepseekConfig } from "@/lib/server-env";
import { deepseekAssistantReply } from "@/lib/deepseek-chat";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(12_000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).max(24),
});

export async function POST(req: Request) {
  if (!getDeepseekConfig()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Asistent není na serveru aktivní (chybí DEEPSEEK_API_KEY). Kontaktujte nás prosím přes formulář níže.",
      },
      { status: 503 }
    );
  }

  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Neplatná data požadavku" },
        { status: 400 }
      );
    }

    const { messages } = parsed.data;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "user") {
      return NextResponse.json(
        { ok: false, error: "Poslední zpráva musí být od uživatele" },
        { status: 400 }
      );
    }

    const history = messages.slice(-16);
    const reply = await deepseekAssistantReply(history);

    return NextResponse.json({ ok: true, message: reply });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "DEEPSEEK_NOT_CONFIGURED") {
      return NextResponse.json(
        { ok: false, error: "Chybí konfigurace DeepSeek" },
        { status: 503 }
      );
    }
    console.error("chat:", e);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Odpověď asistenta se nepodařila vygenerovat. Zkuste to znovu nebo použijte kontakt.",
      },
      { status: 502 }
    );
  }
}
