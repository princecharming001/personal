export const ADMIN_VISUAL_EDITING_EVENT = "admin:visual-editing";

export type AdminVisualEditingDetail = { active: boolean };

export function broadcastAdminVisualEditing(active: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<AdminVisualEditingDetail>(ADMIN_VISUAL_EDITING_EVENT, {
      detail: { active },
    }),
  );
}

export function subscribeAdminVisualEditing(
  handler: (active: boolean) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const listener = (e: Event) => {
    const ce = e as CustomEvent<AdminVisualEditingDetail>;
    handler(!!ce.detail?.active);
  };
  window.addEventListener(ADMIN_VISUAL_EDITING_EVENT, listener);
  return () => window.removeEventListener(ADMIN_VISUAL_EDITING_EVENT, listener);
}
