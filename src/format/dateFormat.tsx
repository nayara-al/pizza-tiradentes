import { format, utcToZonedTime } from "date-fns-tz";
export function formatBrazilianDate(dateString: string): string {
  const date = utcToZonedTime(new Date(dateString), "America/Sao_Paulo");
  return format(date, "dd/MM/yyyy HH:mm:ss", { timeZone: "America/Sao_Paulo" });
}
