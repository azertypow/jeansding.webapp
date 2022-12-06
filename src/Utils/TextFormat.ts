export function italicMarkdown(textToFormat: string): string {
    return textToFormat.replace(/(\*)(\s*\b)([^\*]*)(\b\s*)(\*)/, '<i>$3</i>')
}