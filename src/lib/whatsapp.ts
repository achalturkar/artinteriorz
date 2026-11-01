const WHATSAPP_PHONE_NUMBER = "919545002017";

export function createWhatsAppSubmissionUrl(
  title: string,
  fields: Record<string, string>,
) {
  const message = [
    title,
    ...Object.entries(fields)
      .filter(([, value]) => value.trim().length > 0)
      .map(([label, value]) => `${label}: ${value.trim()}`),
  ].join("\n");

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
