import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize full-document HTML snapshots before persisting.
 * Strips scripts / event handlers / dangerous URLs while keeping normal layout tags.
 */
export function sanitizePageSnapshotHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    WHOLE_DOCUMENT: true,
    ADD_TAGS: ["style", "picture", "source"],
    ADD_ATTR: ["style", "class", "id", "href", "src", "alt", "title", "target", "rel", "crossorigin", "media", "type", "name", "content", "charset", "lang", "data-admin-editable-target"],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "iframe", "object", "embed", "base"],
  });
}
