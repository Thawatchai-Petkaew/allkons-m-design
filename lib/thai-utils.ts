/**
 * Extracts a fallback character for Thai organization names.
 * - Removes "บริษัท " (or "บริษัท") prefix if it exists.
 * - Skips leading vowels (เ, แ, โ, ใ, ไ) to find the first consonant.
 * - Supports English characters as fallback if no Thai consonant is found.
 * 
 * @param name The organization name
 * @returns A single character string for the avatar fallback
 */
export function getThaiOrgFallback(name: string): string {
    if (!name) return "?";

    // 1. Remove "บริษัท" and leading whitespace
    let processed = name.replace(/^บริษัท\s*/, "").trim();
    if (!processed) return "?";

    // 2. Define Thai vowels that typically come before a consonant
    // เ (U+0E40), แ (U+0E41), โ (U+0E42), ใ (U+0E43), ไ (U+0E44)
    const leadingVowels = /^[เแโใไ]/;

    // 3. Skip the specific leading vowels to find the "base" consonant
    // If the first character is a leading vowel, we take the second character
    if (leadingVowels.test(processed) && processed.length > 1) {
        return processed.charAt(1);
    }

    // 4. Otherwise, just return the first character
    return processed.charAt(0);
}
