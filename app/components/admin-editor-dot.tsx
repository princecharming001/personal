"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminVisualToolbar from "@/app/components/admin-visual-toolbar";
import {
  ADMIN_PANEL_ID,
  getTargetDocument,
  injectVisualEditChrome,
  removeVisualEditChrome,
  stripAdminPanelFromHtml,
} from "@/lib/admin-page-target";
import { broadcastAdminVisualEditing } from "@/lib/admin-visual-editing-events";
import { cloneBulletRowAfter, findBulletRow } from "@/lib/admin-bullet-clone";

export default function AdminEditorDot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [visualEditing, setVisualEditing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [, setToolbarBump] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [publishSteps, setPublishSteps] = useState<
    | Array<{
        name: string;
        ok: boolean;
        skipped?: boolean;
        stdout?: string;
        stderr?: string;
        error?: string;
      }>
    | null
  >(null);

  const currentPath = useMemo(() => pathname || "/", [pathname]);

  const bumpToolbar = useCallback(() => {
    setToolbarBump((n) => n + 1);
  }, []);

  const disableAllDesignModes = useCallback(() => {
    broadcastAdminVisualEditing(false);
    document.designMode = "off";
    try {
      removeVisualEditChrome(document);
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe[data-admin-editable-target]",
      );
      if (iframe?.contentDocument) {
        iframe.contentDocument.designMode = "off";
        removeVisualEditChrome(iframe.contentDocument);
      }
    } catch {
      /* ignore */
    }
    setVisualEditing(false);
  }, []);

  const stopVisualEditWithConfirm = useCallback(() => {
    if (dirty) {
      const ok = window.confirm(
        "Exit visual editing? Unsaved changes will be lost on this session (reload restores last saved).",
      );
      if (!ok) return false;
    }
    disableAllDesignModes();
    setDirty(false);
    setStatus("Visual editing off.");
    return true;
  }, [dirty, disableAllDesignModes]);

  /* Route change → always exit safely */
  useEffect(() => {
    disableAllDesignModes();
    setDirty(false);
  }, [pathname, disableAllDesignModes]);

  useEffect(() => () => disableAllDesignModes(), [disableAllDesignModes]);

  /* Dirty tracking while designMode on */
  useEffect(() => {
    if (!visualEditing) return;
    const doc = getTargetDocument();
    if (!doc) return;

    const markDirty = () => setDirty(true);

    doc.addEventListener("input", markDirty);
    doc.addEventListener("selectionchange", bumpToolbar);
    doc.addEventListener("keyup", bumpToolbar);
    doc.addEventListener("mouseup", bumpToolbar);

    const poll = window.setInterval(bumpToolbar, 450);

    return () => {
      clearInterval(poll);
      doc.removeEventListener("input", markDirty);
      doc.removeEventListener("selectionchange", bumpToolbar);
      doc.removeEventListener("keyup", bumpToolbar);
      doc.removeEventListener("mouseup", bumpToolbar);
    };
  }, [visualEditing, bumpToolbar]);

  const saveVisualVersion = useCallback(async () => {
    const doc = getTargetDocument();
    if (!doc?.documentElement) {
      setStatus("Nothing to save.");
      return;
    }

    doc.designMode = "off";
    removeVisualEditChrome(doc);
    setVisualEditing(false);
    broadcastAdminVisualEditing(false);

    setLoading(true);
    setStatus("");
    const rawHtml = doc.documentElement.outerHTML;
    const html = stripAdminPanelFromHtml(rawHtml);

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: currentPath, html }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setStatus(data.error || "Save failed.");
      const revertDoc = getTargetDocument();
      if (revertDoc?.documentElement) {
        revertDoc.designMode = "on";
        injectVisualEditChrome(revertDoc);
        setVisualEditing(true);
        broadcastAdminVisualEditing(true);
      }
      return;
    }

    setDirty(false);
    setStatus("Saved. Reloading…");
    window.location.reload();
  }, [currentPath]);

  /* ⌘/Ctrl+S save, Esc stop; format shortcuts when focus is in the page */
  useEffect(() => {
    if (!visualEditing) return;

    const adminPanel = () => document.getElementById(ADMIN_PANEL_ID);

    const onKey = (e: KeyboardEvent) => {
      const panel = adminPanel();
      if (panel?.contains(e.target as Node)) {
        if (e.key === "Escape") {
          e.preventDefault();
          stopVisualEditWithConfirm();
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        stopVisualEditWithConfirm();
        return;
      }

      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void saveVisualVersion();
        return;
      }

      const doc = getTargetDocument();
      if (!doc) return;

      /* Enter inside an arrow bullet row → clone the row */
      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        !mod &&
        !e.altKey
      ) {
        const sel = doc.getSelection?.();
        if (sel && sel.rangeCount > 0) {
          const start = sel.getRangeAt(0).startContainer;
          const row = findBulletRow(start, doc);
          if (row) {
            e.preventDefault();
            cloneBulletRowAfter(doc, row);
            setDirty(true);
            bumpToolbar();
            return;
          }
        }
      }

      if (!mod) return;

      const k = e.key.toLowerCase();
      try {
        if (k === "b") {
          e.preventDefault();
          doc.execCommand("bold", false);
        } else if (k === "i") {
          e.preventDefault();
          doc.execCommand("italic", false);
        } else if (k === "u") {
          e.preventDefault();
          doc.execCommand("underline", false);
        } else if (k === "z" && e.shiftKey) {
          e.preventDefault();
          doc.execCommand("redo", false);
        } else if (k === "z") {
          e.preventDefault();
          doc.execCommand("undo", false);
        }
      } catch {
        /* ignore */
      }
      bumpToolbar();
    };

    /* Bind on parent window AND on the override-iframe contentWindow so the
     * handler fires no matter which document the caret is in. */
    window.addEventListener("keydown", onKey, true);
    let iframeWin: Window | null = null;
    try {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe[data-admin-editable-target]",
      );
      iframeWin = iframe?.contentWindow ?? null;
      iframeWin?.addEventListener("keydown", onKey as EventListener, true);
    } catch {
      /* same-origin srcDoc should be fine; ignore otherwise */
    }

    return () => {
      window.removeEventListener("keydown", onKey, true);
      try {
        iframeWin?.removeEventListener("keydown", onKey as EventListener, true);
      } catch {
        /* ignore */
      }
    };
  }, [visualEditing, bumpToolbar, saveVisualVersion, stopVisualEditWithConfirm]);

  useEffect(() => {
    if (!visualEditing || !dirty) return;
    const onBefore = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBefore);
    return () => window.removeEventListener("beforeunload", onBefore);
  }, [visualEditing, dirty]);

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
    setStatus(
      "Start editing, change text on the page, use the top toolbar for styles, then Save.",
    );
  }

  function toggleVisualEdit() {
    if (visualEditing) {
      stopVisualEditWithConfirm();
      return;
    }

    const doc = getTargetDocument();
    if (!doc?.documentElement) {
      setStatus("Could not find page to edit.");
      return;
    }

    doc.designMode = "on";
    injectVisualEditChrome(doc);
    setVisualEditing(true);
    setDirty(false);
    broadcastAdminVisualEditing(true);
    setStatus("Editing: select text, or use the toolbar. ⌘S save · Esc exit.");
    bumpToolbar();
  }

  async function publish() {
    setLoading(true);
    setStatus("Publishing…");
    setPublishSteps(null);
    const res = await fetch("/api/admin/publish", {
      method: "POST",
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (Array.isArray(data.steps)) setPublishSteps(data.steps);
    if (!res.ok || !data.ok) {
      const failing = Array.isArray(data.steps)
        ? data.steps.find((s: { ok: boolean }) => !s.ok)?.name
        : undefined;
      setStatus(
        data.error
          ? `Publish failed: ${data.error}`
          : failing
            ? `Publish failed at step: ${failing}`
            : "Publish failed.",
      );
      return;
    }
    setStatus(
      data.hasChanges
        ? "Published. New snapshot committed and deploy triggered."
        : "No content changes; deploy triggered if configured.",
    );
  }

  return (
    <>
      <AdminVisualToolbar active={visualEditing} />

      {visualEditing && (
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-[208] flex justify-center px-3 pt-3"
          aria-live="polite"
        >
          <div className="pointer-events-auto max-w-[min(96vw,520px)] rounded-full border border-[#7C3AED]/30 bg-white/95 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[#5B21B6] shadow-md backdrop-blur-sm">
            Visual edit mode ·{" "}
            <span className="font-normal normal-case text-gray-600">
              ⌘S save · Esc exit · toolbar for bold, links, lists
            </span>
          </div>
        </div>
      )}

      <div
        id={ADMIN_PANEL_ID}
        contentEditable={false}
        suppressContentEditableWarning
        className="fixed bottom-5 right-5 z-[200]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {!open ? (
          <button
            type="button"
            aria-label="Open site editor"
            onClick={() => setOpen(true)}
            className="h-3 w-3 rounded-full bg-gray-700 opacity-60 transition-opacity hover:opacity-100"
          />
        ) : (
          <div className="w-[min(92vw,420px)] space-y-3 rounded-xl border border-gray-300 bg-white p-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Site editor
              </p>
              <button
                type="button"
                onClick={() => {
                  void stopVisualEditWithConfirm();
                  setOpen(false);
                }}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void unlock();
                  }}
                />
                <button
                  type="button"
                  onClick={() => void unlock()}
                  disabled={loading}
                  className="rounded bg-[#7C3AED] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Unlock
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] text-gray-500">Page: {currentPath}</p>
                <button
                  type="button"
                  onClick={toggleVisualEdit}
                  disabled={loading}
                  className={`w-full rounded px-3 py-1.5 text-xs font-semibold ${
                    visualEditing
                      ? "border-2 border-amber-500 bg-amber-50 text-amber-900"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  {visualEditing ? "Stop editing" : "Start editing"}
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void saveVisualVersion()}
                    disabled={loading}
                    className="flex-1 rounded bg-[#7C3AED] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Save version
                  </button>
                  <button
                    type="button"
                    onClick={() => void publish()}
                    disabled={loading}
                    className="flex-1 rounded bg-black px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Publish
                  </button>
                </div>
                <p className="text-[10px] leading-snug text-gray-400">
                  Saves are sanitized on the server (no script tags). Publish needs{" "}
                  <code className="text-[9px]">ADMIN_PUBLISH_WEBHOOK_URL</code> (Vercel) or{" "}
                  <code className="text-[9px]">ADMIN_PUBLISH_COMMAND</code> (CLI).
                </p>
              </div>
            )}

            {status && <p className="text-xs text-gray-600">{status}</p>}

            {publishSteps && publishSteps.length > 0 && (
              <details className="mt-1 rounded border border-gray-200 bg-gray-50 p-2">
                <summary className="cursor-pointer text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Publish log
                </summary>
                <ol className="mt-2 space-y-1.5">
                  {publishSteps.map((s, i) => (
                    <li key={`${s.name}-${i}`} className="text-[10px] text-gray-700">
                      <span
                        className={`mr-1 inline-block rounded px-1 py-px text-[9px] font-bold uppercase ${
                          s.skipped
                            ? "bg-gray-200 text-gray-700"
                            : s.ok
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {s.skipped ? "skip" : s.ok ? "ok" : "fail"}
                      </span>
                      <span className="font-mono">{s.name}</span>
                      {(s.stdout || s.stderr || s.error) && (
                        <pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap break-words rounded bg-white p-1 text-[10px] text-gray-600">
                          {[s.error, s.stdout, s.stderr].filter(Boolean).join("\n")}
                        </pre>
                      )}
                    </li>
                  ))}
                </ol>
              </details>
            )}
          </div>
        )}
      </div>
    </>
  );
}
