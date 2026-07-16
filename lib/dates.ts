const frenchDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

export function parseSafeDate(date: string | null): Date | null {
  if (!date) return null;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatFrenchDate(date: string | null): string | null {
  const parsed = parseSafeDate(date);
  return parsed ? frenchDateFormatter.format(parsed) : null;
}
