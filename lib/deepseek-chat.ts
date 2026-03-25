import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/assistant-system-prompt";
import type { ChatMessage } from "@/lib/chat-types";
import { getDeepseekConfig } from "@/lib/server-env";

export async function deepseekAssistantReply(
  history: ChatMessage[]
): Promise<string> {
  const cfg = getDeepseekConfig();
  if (!cfg) {
    throw new Error("DEEPSEEK_NOT_CONFIGURED");
  }

  const messages = [
    { role: "system" as const, content: ASSISTANT_SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch(`${cfg.baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      max_tokens: 2048,
      temperature: 0.65,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DeepSeek HTTP ${res.status}: ${body.slice(0, 500)}`);
  }

  const data: unknown = await res.json();
  const content = extractAssistantContent(data);
  if (!content) {
    throw new Error("DeepSeek_INVALID_RESPONSE");
  }
  return content;
}

function extractAssistantContent(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length < 1) return null;
  const first = choices[0];
  if (!first || typeof first !== "object") return null;
  const message = (first as { message?: unknown }).message;
  if (!message || typeof message !== "object") return null;
  const content = (message as { content?: unknown }).content;
  return typeof content === "string" ? content : null;
}
