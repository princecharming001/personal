export const ADMIN_PANEL_ID = "admin-editor-root";
export const ADMIN_INJECTED_STYLE_ID = "admin-visual-edit-style";

export function getTargetDocument(): Document | null {
  if (typeof document === "undefined") return null;

  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe[data-admin-editable-target]",
  );
  try {
    if (iframe?.contentDocument?.documentElement) {
      return iframe.contentDocument;
    }
  } catch {
    return document;
  }
  return document;
}

export function stripAdminPanelFromHtml(htmlString: string): string {
  if (typeof window === "undefined") return htmlString;
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlString, "text/html");
  parsed.getElementById(ADMIN_PANEL_ID)?.remove();
  return parsed.documentElement.outerHTML;
}

/** Subtle affordance while designMode is on — removed before Save. */
export function injectVisualEditChrome(doc: Document) {
  if (doc.getElementById(ADMIN_INJECTED_STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = ADMIN_INJECTED_STYLE_ID;
  style.textContent = `
    .admin-visual-edit-active {
      box-shadow: inset 0 0 0 2px rgba(124,58,237,0.35) !important;
      outline: 2px solid rgba(124,58,237,0.15);
      outline-offset: -2px;
    }
    .admin-visual-edit-active :focus-visible {
      outline: 2px solid #7c3aed;
      outline-offset: 2px;
    }
  `;
  doc.head?.appendChild(style);
  doc.body?.classList.add("admin-visual-edit-active");
}

export function removeVisualEditChrome(doc: Document) {
  doc.getElementById(ADMIN_INJECTED_STYLE_ID)?.remove();
  doc.body?.classList.remove("admin-visual-edit-active");
}
