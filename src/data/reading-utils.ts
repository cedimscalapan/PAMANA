/** Keep initials such as “M. Adriatico” and “B. del Mundo” inside the same sentence. */
export function readingExcerpt(text: string, sentenceCount = 1): string {
  return text.replace(/\b([A-Z]|Mr|Ms|Dr|St|No)\.(?=\s)/g, '$1\u2024').split(/(?<=\.)\s/).slice(0, sentenceCount).join(' ').replace(/\u2024/g, '.');
}
