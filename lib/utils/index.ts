import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showCustomErrorMessage(title: string, message: string) {
  return toast.error(title, {
    position: "top-right",
    description: message,
  });
}

export function showSuccessMessage(title: string, message: string) {
  return toast.success(title, {
    position: "top-right",
    description: message,
  });
}

export function showInfoMessage(title: string, message: string) {
  return toast.info(title, {
    position: "top-right",
    description: message,
  });
}

export function showDestructiveMessage(title: string, message: string) {
  return toast.warning(title, {
    position: "top-right",
    description: message,
  });
}

export function formatPrice(value: number) {
    return new Intl.NumberFormat('en-us', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }