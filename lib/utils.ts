import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  format,
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
} from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(postDate: Date) {
  const now = new Date()
  const minutesDifference = differenceInMinutes(now, postDate)
  if (minutesDifference < 60) {
    return `${minutesDifference}m`
  }
  // Check if the post is within the last 24 hours
  const hoursDifference = differenceInHours(now, postDate)
  if (hoursDifference < 24) {
    return `${hoursDifference} h`
  }

  const daysDifference = differenceInDays(now, postDate)
  if (daysDifference < 7) {
    return `${daysDifference}d`
  }

  return format(postDate, "MM/dd/yyyy")
}
