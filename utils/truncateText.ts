export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const truncatedText = text.slice(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return `${truncatedText}...`;
  }

  return `${truncatedText.slice(0, lastSpaceIndex)}...`;
}
