import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildOrderRequestPdfBuffer } from "@/lib/order-request-pdf";
import { getContactMailConfig } from "@/lib/server-env";
import { sendContactNotification } from "@/lib/send-contact-email";

export const runtime = "nodejs";

type ContactResponse =
  | { ok: true; requestId: string }
  | { ok: false; error: string };

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().min(1),
  message: z.string().min(10),
  gdpr: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Neplatná data formuláře" },
        { status: 400 }
      );
    }

    const mailCfg = getContactMailConfig();
    if (!mailCfg) {
      console.error("contact: missing RESEND_API_KEY, RESEND_FROM_EMAIL or ORDER_NOTIFY_EMAIL");
      return NextResponse.json(
        {
          ok: false,
          error:
            "Odesílání e-mailu není na serveru nakonfigurováno. Zkuste prosím zavolat nebo napsat přímo.",
        },
        { status: 503 }
      );
    }

    let pdfBuffer: Buffer | undefined;
    try {
      pdfBuffer = await buildOrderRequestPdfBuffer(parsed.data);
    } catch (e) {
      console.error("contact: PDF", e);
    }

    try {
      await sendContactNotification(mailCfg, parsed.data, {
        pdfBuffer,
      });
    } catch (e) {
      console.error("contact: Resend", e);
      return NextResponse.json(
        {
          ok: false,
          error:
            "E-mail se nepodařilo odeslat. Zkuste to prosím znovu později nebo volejte přímo.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json<ContactResponse>({
      ok: true,
      requestId: randomUUID(),
      ...(pdfBuffer?.length
        ? { pdfBase64: pdfBuffer.toString("base64") }
        : {}),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
