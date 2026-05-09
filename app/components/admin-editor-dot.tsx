"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export default function AdminEditorDot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const currentPath = useMemo(() => pathname || "/", [pathname]);

  async function unlock() {
    setLoading(true);
    setStatus("");
    const res = await fetch("/api/admin/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setStatus(data.error || "Unlock failed.");
      return;
    }

    setUnlocked(true);
    setStatus("Unlocked. Loading HTML...");
    await loadHtml();
  }

  async function loadHtml() {
    const res = await fetch(
      `/api/admin/content?path=${encodeURIComponent(currentPath)}`,
    );
    const data = await res.json().catch(() => ({}));
    if (typeof data.html === "string" && data.html.trim()) {
      setHtml(data.html);
      setStatus("Loaded saved HTML override.");
      return;
    }

    setHtml(document.documentElement.outerHTML);
    setStatus("Loaded current page HTML.");
  }

  async function saveHtml() {
    setLoading(true);
    setStatus("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: currentPath, html }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setStatus(data.error || "Save failed.");
      return;
    }
    setStatus("Saved. Refresh to preview.");
  }

  async function publish() {
    setLoading(true);
    setStatus("");
    const res = await fetch("/api/admin/publish", {
      method: "POST",
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok || !data.ok) {
      setStatus(data.error || "Publish failed.");
      return;
    }
    setStatus("Publish command executed.");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[200]">
      {!open ? (
        <button
          type="button"
          aria-label="Open admin editor"
          onClick={() => setOpen(true)}
          className="h-3 w-3 rounded-full bg-gray-700 opacity-60 hover:opacity-100 transition-opacity"
        />
      ) : (
        <div className="w-[min(92vw,560px)] rounded-xl border border-gray-300 bg-white shadow-2xl p-3 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Admin HTML Editor
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>

          {!unlocked ? (
            <div className="space-y-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={unlock}
                disabled={loading}
                className="rounded bg-[#7C3AED] text-white px-3 py-1.5 text-xs font-semibold"
              >
                Unlock Editor
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-gray-500">Editing: {currentPath}</p>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="h-48 w-full rounded border border-gray-300 px-2 py-1.5 text-xs font-mono"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveHtml}
                  disabled={loading}
                  className="rounded bg-[#7C3AED] text-white px-3 py-1.5 text-xs font-semibold"
                >
                  Save HTML
                </button>
                <button
                  type="button"
                  onClick={publish}
                  disabled={loading}
                  className="rounded bg-black text-white px-3 py-1.5 text-xs font-semibold"
                >
                  Publish
                </button>
              </div>
            </div>
          )}

          {status && <p className="text-xs text-gray-600">{status}</p>}
        </div>
      )}
    </div>
  );
}
