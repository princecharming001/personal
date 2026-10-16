"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { extractSnapshotBody } from "@/lib/extract-snapshot-body";

type OptionId = "30" | "60";
type Slot = { start: string; end: string };

const DISPLAY_TZ = "America/Los_Angeles";

function getDayKey(iso: string) {
  const d = new Date(iso);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: DISPLAY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA yields YYYY-MM-DD
  return formatter.format(d);
}

function formatDayLabel(dayKey: string) {
  const anchor = `${dayKey}T12:00:00`;
  return new Date(anchor).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: DISPLAY_TZ,
  });
}

function formatTimeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: DISPLAY_TZ,
  });
}

function BookPageInner() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<"choose" | "checkout">("choose");
  const [optionId, setOptionId] = useState<OptionId | null>(null);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotStartIso, setSlotStartIso] = useState<string>("");
  const [selectedDayKey, setSelectedDayKey] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");
  const [htmlOverride, setHtmlOverride] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content?path=/book")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (typeof data.html === "string" && data.html.trim()) {
          setHtmlOverride(data.html);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (step !== "checkout" || !optionId) return;

    let isMounted = true;

    fetch(`/api/book/availability?duration=${optionId}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const detail =
            typeof data.details === "string" ? data.details : undefined;
          throw new Error(detail || data.error || "Failed to load slots.");
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const nextSlots = (data.slots || []) as Slot[];
        setSlots(nextSlots);
        const firstDay = nextSlots[0] ? getDayKey(nextSlots[0].start) : "";
        setSelectedDayKey(firstDay);
        setSlotStartIso(nextSlots[0]?.start || "");
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load slots.");
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [step, optionId]);

  const selectedPrice = optionId === "60" ? "$300" : optionId === "30" ? "$150" : "";
  const selectedDuration = optionId === "60" ? "60 minutes" : optionId === "30" ? "30 minutes" : "";

  const selectedSlotLabel = useMemo(() => {
    if (!slotStartIso) return "";
    return new Date(slotStartIso).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: DISPLAY_TZ,
    });
  }, [slotStartIso]);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const key = getDayKey(slot.start);
      const existing = map.get(key);
      if (existing) existing.push(slot);
      else map.set(key, [slot]);
    }
    return map;
  }, [slots]);

  const dayKeys = useMemo(() => {
    return Array.from(slotsByDay.keys()).sort();
  }, [slotsByDay]);

  const slotsForSelectedDay = useMemo(() => {
    if (!selectedDayKey) return [];
    return slotsByDay.get(selectedDayKey) || [];
  }, [slotsByDay, selectedDayKey]);

  async function handleCheckoutStart() {
    if (!optionId) return;
    setError("");
    if (!slotStartIso) {
      setError("Please choose a time slot.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    const res = await fetch("/api/book/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        optionId,
        slotStartIso,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: notes.trim(),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Unable to start checkout.");
      return;
    }
    if (!data.url) {
      setError("Checkout URL not returned.");
      return;
    }
    window.location.assign(data.url);
  }

  if (htmlOverride) {
    return (
      <div
        data-admin-override-root=""
        dangerouslySetInnerHTML={{ __html: extractSnapshotBody(htmlOverride) }}
      />
    );
  }

  const OPTIONS: { id: OptionId; minutes: string; title: string; body: string; price: string }[] = [
    {
      id: "30",
      minutes: "30 min",
      title: "Strategy call",
      body: "A focused 1:1 to find your biggest product or growth bottleneck and leave with next steps.",
      price: "$150",
    },
    {
      id: "60",
      minutes: "60 min",
      title: "Deep dive",
      body: "A longer session to pressure-test your strategy, roadmap or launch and build the plan together.",
      price: "$300",
    },
  ];

  const field =
    "w-full rounded-xl border border-black/[0.1] bg-white px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-black/35 focus:border-[#7C3AED]";

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <header className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-[15px] font-medium tracking-[-0.01em]">
          Anish Polakala
        </Link>
        <Link href="/" className="text-[14px] text-black/50 transition-colors hover:text-black">
          ← Back home
        </Link>
      </header>

      <main className="mx-auto max-w-[760px] px-5 pb-28 pt-14 sm:px-8 sm:pt-20">
        <h1 className="text-[40px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[52px]">Book a call</h1>
        <p className="mt-5 max-w-[540px] text-[17px] leading-[1.6] text-black/50">
          One-on-one time with me on product, growth, or whatever you&apos;re building. I&apos;ve taken companies to
          acquisition and lead product at Palo today.
        </p>

        {step === "choose" ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setError("");
                  setSlots([]);
                  setSlotStartIso("");
                  setLoadingSlots(true);
                  setOptionId(o.id);
                  setStep("checkout");
                }}
                className="group flex flex-col rounded-2xl border border-black/[0.08] p-7 text-left transition-colors hover:border-[#7C3AED]"
              >
                <span className="font-mono text-[12.5px] text-black/40">{o.minutes}</span>
                <span className="mt-4 text-[20px] font-medium tracking-[-0.02em]">{o.title}</span>
                <span className="mt-2 text-[15px] leading-relaxed text-black/55">{o.body}</span>
                <span className="mt-8 flex items-center justify-between">
                  <span className="text-[28px] font-medium tracking-[-0.03em]">{o.price}</span>
                  <span className="inline-flex h-10 items-center rounded-full bg-[#0A0A0A] px-5 text-[14px] font-medium text-white transition-colors group-hover:bg-[#7C3AED]">
                    Choose a time →
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-12 space-y-10">
            <div className="flex items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
              <button
                type="button"
                onClick={() => {
                  setStep("choose");
                  setOptionId(null);
                  setSlots([]);
                  setSlotStartIso("");
                  setError("");
                }}
                className="text-[14px] text-black/50 transition-colors hover:text-black"
              >
                ← Change option
              </button>
              <p className="font-mono text-[12.5px] text-black/45">
                {selectedDuration} · {selectedPrice}
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[17px] font-medium">Choose a time</h2>
                <p className="text-[13px] text-black/40">{DISPLAY_TZ.replace(/_/g, " ")}</p>
              </div>
              {loadingSlots ? (
                <p className="mt-5 text-[15px] text-black/50">Loading open times…</p>
              ) : slots.length === 0 ? (
                <p className="mt-5 text-[15px] text-black/50">No open times in the next two weeks. Check back soon.</p>
              ) : (
                <div className="mt-5 space-y-5">
                  <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
                    {dayKeys.map((key) => {
                      const count = slotsByDay.get(key)?.length || 0;
                      const active = key === selectedDayKey;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedDayKey(key);
                            const first = slotsByDay.get(key)?.[0]?.start || "";
                            setSlotStartIso(first);
                          }}
                          className={`shrink-0 rounded-xl border px-4 py-2.5 text-left transition-colors ${
                            active ? "border-[#7C3AED] bg-[#7C3AED]/[0.06]" : "border-black/[0.08] hover:border-black/20"
                          }`}
                        >
                          <span className="block text-[14px] font-medium">{formatDayLabel(key)}</span>
                          <span className="mt-0.5 block text-[12.5px] text-black/45">{count} open</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slotsForSelectedDay.map((slot) => {
                      const active = slot.start === slotStartIso;
                      return (
                        <button
                          key={slot.start}
                          type="button"
                          onClick={() => setSlotStartIso(slot.start)}
                          className={`rounded-xl border px-3 py-2.5 text-[14px] tabular-nums transition-colors ${
                            active ? "border-[#7C3AED] bg-[#7C3AED] text-white" : "border-black/[0.08] hover:border-black/20"
                          }`}
                        >
                          {formatTimeLabel(slot.start)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {selectedSlotLabel && <p className="mt-4 text-[13px] text-black/45">Selected: {selectedSlotLabel}</p>}
            </div>

            <div>
              <h2 className="text-[17px] font-medium">Your details</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={field} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className={field} />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className={`${field} sm:col-span-2`} />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What should we focus on? (optional)"
                  rows={4}
                  className={`${field} resize-none sm:col-span-2`}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleCheckoutStart}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#0A0A0A] text-[15px] font-medium text-white transition-colors hover:bg-[#7C3AED]"
              >
                Continue to payment
              </button>
              <p className="mt-3 text-center text-[13px] text-black/40">Secure checkout with Stripe.</p>
              {error && <p className="mt-4 text-[14px] text-red-600">{error}</p>}
            </div>
          </div>
        )}

        {searchParams.get("session_id") && (
          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-[15px] text-emerald-900">
              Payment received. Your calendar invite is created automatically once Stripe confirms the payment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookPageInner />
    </Suspense>
  );
}
