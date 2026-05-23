export function personalizeText(text, contact = {}) {
  const now = new Date();

  return String(text || "")
    .replaceAll("{{name}}", contact.fullName || "there")
    .replaceAll("{{email}}", contact.email || "")
    .replaceAll("{{phone}}", contact.phone || "")
    .replaceAll("{{source}}", contact.source || "")
    .replaceAll("{{date}}", now.toLocaleDateString("en-US"))
    .replaceAll("{{time}}", now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }));
}