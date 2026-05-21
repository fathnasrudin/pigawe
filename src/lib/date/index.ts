import { format } from "date-fns";

export function getIsOverdue(date: Date) {
  return new Date(date) <= new Date();
}

export function getDisplayDate(date: Date) {
  let formatStr = "d MMM yyyy";

  const isCurrentYear =
    new Date(date).getFullYear() === new Date().getFullYear();
  if (isCurrentYear) formatStr = "d MMM";

  return format(date, formatStr);
}
