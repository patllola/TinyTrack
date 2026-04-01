import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(iso: string): string {
  return format(new Date(iso), "h:mm a");
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isToday(d)) return "Today";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "MMM d, yyyy");
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), "h:mm a, MMM d");
}

export function timeAgo(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
}

export function formatMl(ml: number): string {
  return `${ml % 1 === 0 ? ml : ml.toFixed(1)} ml`;
}

export function wastePercent(prepared: number, fed: number): string {
  if (prepared === 0) return "0%";
  return `${(((prepared - fed) / prepared) * 100).toFixed(0)}%`;
}
