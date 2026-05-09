/**
 * Extract the inner HTML of a saved page snapshot's <body> tag so we can
 * render it inline inside the live React tree. Falls back to the original
 * string if no <body> is present (e.g., already a fragment).
 */
export function extractSnapshotBody(html: string): string {
  if (!html) return "";
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1]?.trim() ?? html;
}
