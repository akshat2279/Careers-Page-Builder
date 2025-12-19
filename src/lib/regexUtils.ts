/**
 * Escapes special regex characters to prevent ReDoS attacks
 * @param str - The string to escape
 * @returns Escaped string safe for use in RegExp
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Validates input length to prevent ReDoS attacks
 * @param input - The input string to validate
 * @param maxLength - Maximum allowed length (default: 100)
 * @returns True if valid, false otherwise
 */
export function validateInputLength(input: string, maxLength: number = 100): boolean {
  return input.length <= maxLength;
}
