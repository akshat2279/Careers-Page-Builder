/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug (lowercase, alphanumeric with hyphens)
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
