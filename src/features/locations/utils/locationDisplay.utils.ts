const LOWERCASE_WORDS = new Set(["de", "del", "la", "las", "los", "y"]);

const isAllUpperCaseText = (value: string) => {
  const letters = value.replace(/[^\p{L}]/gu, "");
  return letters.length > 0 && value === value.toLocaleUpperCase("es-MX");
};

export function formatLocationDisplayText(value?: string | null) {
  if (!value) return "";

  const cleanValue = value.trim();

  if (!isAllUpperCaseText(cleanValue)) {
    return cleanValue;
  }

  return cleanValue
    .toLocaleLowerCase("es-MX")
    .replace(/\p{L}+/gu, (word, index) => {
      if (index > 0 && LOWERCASE_WORDS.has(word)) {
        return word;
      }

      return word.charAt(0).toLocaleUpperCase("es-MX") + word.slice(1);
    });
}