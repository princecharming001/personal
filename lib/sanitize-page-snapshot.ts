import sanitizeHtml from "sanitize-html";

/**
 * Sanitize full-document HTML snapshots before persisting.
 *
 * sanitize-html is a pure-Node sanitizer (no jsdom), which is required
 * because Vercel's Node runtime can't load `jsdom`'s ESM dependencies.
 *
 * Strategy: keep all common layout/content tags + their classes/style
 * attributes (to preserve Tailwind output), but drop scripts, iframes,
 * inline event handlers, and `javascript:` URLs.
 */
export function sanitizePageSnapshotHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "html",
      "head",
      "body",
      "title",
      "meta",
      "link",
      "style",
      "div",
      "span",
      "section",
      "article",
      "header",
      "footer",
      "main",
      "nav",
      "aside",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "br",
      "hr",
      "img",
      "picture",
      "source",
      "figure",
      "figcaption",
      "blockquote",
      "code",
      "pre",
      "small",
      "sub",
      "sup",
      "mark",
      "details",
      "summary",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "td",
      "th",
      "caption",
      "colgroup",
      "col",
      "svg",
      "path",
      "g",
      "circle",
      "rect",
      "line",
      "polyline",
      "polygon",
      "ellipse",
      "defs",
      "use",
      "symbol",
      "title",
      "text",
      /*
       * Intentionally NOT including <link>, <script>, <meta>, <style>:
       * The page renders saved overrides INLINE inside the live React tree,
       * so it must inherit the live deployment's CSS rather than reference
       * environment-specific Turbopack/Next chunks that change between dev
       * and prod and break iframe rendering.
       */
    ],
    allowedAttributes: {
      "*": ["class", "id", "style", "lang", "dir", "title", "data-admin-editable-target"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "alt", "width", "height", "loading", "decoding"],
      source: ["src", "srcset", "type", "media", "sizes"],
      svg: ["viewBox", "xmlns", "fill", "stroke", "width", "height", "preserveAspectRatio"],
      path: ["d", "fill", "stroke", "stroke-width", "fill-rule", "clip-rule"],
      g: ["fill", "stroke", "transform"],
      circle: ["cx", "cy", "r", "fill", "stroke"],
      rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel", "data"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"],
    },
    allowProtocolRelative: true,
    parseStyleAttributes: false /* keep raw style strings as-is */,
    disallowedTagsMode: "discard",
    transformTags: {
      script: () => ({ tagName: "div", attribs: {}, text: "" }),
      iframe: () => ({ tagName: "div", attribs: {}, text: "" }),
      object: () => ({ tagName: "div", attribs: {}, text: "" }),
      embed: () => ({ tagName: "div", attribs: {}, text: "" }),
      base: () => ({ tagName: "div", attribs: {}, text: "" }),
      link: () => ({ tagName: "div", attribs: {}, text: "" }),
      meta: () => ({ tagName: "div", attribs: {}, text: "" }),
      style: () => ({ tagName: "div", attribs: {}, text: "" }),
    },
  });
}
