/**
 * Converts a string to title case.
 *
 * @param str - The string to convert
 * @returns The title-cased string, or '' if empty
 */
export function toTitleCase(str: string): string {
  if (!str) return '';

  return str
    .toLowerCase()
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}