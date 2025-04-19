import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine multiple class names with clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Truncate text to a specified length
export function truncateText(text: string | null, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

// Get placeholder image if no image URL is provided
export function getImageUrl(imageUrl: string | null): string {
  return imageUrl || '/images/placeholder.jpg';
}

// Convert category to title case format
export function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Get a list of all available categories
export function getCategories() {
  return [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
}

// Check if the current page is active
export function isActivePage(currentPath: string, linkPath: string): boolean {
  if (linkPath === '/') {
    return currentPath === linkPath;
  }
  return currentPath.startsWith(linkPath);
}

// Get available languages for filtering
export function getAvailableLanguages() {
  return [
    { code: 'ar', name: 'Arabic' },
    { code: 'de', name: 'German' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'he', name: 'Hebrew' },
    { code: 'it', name: 'Italian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ud', name: 'Urdu' },
    { code: 'zh', name: 'Chinese' }
  ];
}