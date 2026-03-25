export type ContactMailConfig = {
  resendKey: string;
  from: string;
  notifyTo: string;
};

export function getContactMailConfig(): ContactMailConfig | null {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const notifyTo = process.env.ORDER_NOTIFY_EMAIL?.trim();
  if (!resendKey || !from || !notifyTo) return null;
  return { resendKey, from, notifyTo };
}

export function getDeepseekConfig(): {
  apiKey: string;
  baseUrl: string;
  model: string;
} | null {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
  if (!apiKey) return null;
  const baseUrl = (
    process.env.DEEPSEEK_API_BASE_URL ?? "https://api.deepseek.com"
  ).replace(/\/$/, "");
  const model = process.env.DEEPSEEK_MODEL?.trim() || "deepseek-chat";
  return { apiKey, baseUrl, model };
}
