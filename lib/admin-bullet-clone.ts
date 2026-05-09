/**
 * Detects "arrow bullet" rows on Anish's pages and clones them on Enter so
 * users can keep adding bullets visually without writing HTML.
 *
 * A bullet row is any element whose first element child is a span/div whose
 * trimmed textContent is one of the recognized arrow glyphs, AND that element
 * has at least one sibling (the text content). This matches the pattern used
 * across `app/page.tsx`, `app/book/page.tsx`, and `app/coach/page.tsx`.
 */

const ARROW_GLYPHS = new Set([
  "→",
  "⇒",
  "➔",
  "➜",
  "▶",
  "►",
  "»",
]);

function isArrowMarker(el: Element | null): boolean {
  if (!el) return false;
  const text = (el.textContent || "").trim();
  if (!text) return false;
  if (text.length > 2) return false;
  return ARROW_GLYPHS.has(text);
}

export function findBulletRow(
  start: Node | null,
  doc: Document,
): HTMLElement | null {
  if (!start) return null;
  let el: Element | null =
    start.nodeType === Node.TEXT_NODE
      ? (start as Text).parentElement
      : (start as Element);

  while (el && el !== doc.body && el !== doc.documentElement) {
    if (
      el.children.length >= 2 &&
      isArrowMarker(el.firstElementChild)
    ) {
      return el as HTMLElement;
    }
    el = el.parentElement;
  }
  return null;
}

/**
 * Clones the bullet row, blanks the text container in the clone, inserts it
 * directly after the source row, and places the caret inside the new row.
 * Returns the cloned element (or null if anything went wrong).
 */
export function cloneBulletRowAfter(
  doc: Document,
  row: HTMLElement,
): HTMLElement | null {
  const parent = row.parentNode;
  if (!parent) return null;

  const clone = row.cloneNode(true) as HTMLElement;

  /*
   * Strip all text from every non-marker child so the new bullet starts blank
   * but keeps the arrow marker, layout, classes, and any inner structure
   * (links, strong, etc. are removed since we want a clean line to type into).
   */
  const marker = clone.firstElementChild;
  Array.from(clone.children).forEach((child, idx) => {
    if (idx === 0 && child === marker) return;
    if (child instanceof HTMLElement) {
      child.innerHTML = "<br>";
    }
  });

  parent.insertBefore(clone, row.nextSibling);

  /* Place caret in the first non-marker child of the clone */
  const sel = doc.getSelection?.();
  if (sel) {
    const target =
      (clone.children[1] as HTMLElement | undefined) ??
      (clone.lastElementChild as HTMLElement | null);
    const range = doc.createRange();
    if (target) {
      range.setStart(target, 0);
    } else {
      range.selectNodeContents(clone);
    }
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  return clone;
}
