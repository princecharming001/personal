"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

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

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotStartIso, setSlotStartIso] = useState<string>("");
  const [selectedDayKey, setSelectedDayKey] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="fixed top-8 left-8 z-50">
          <Link
            href="/"
            className="text-gray-500 hover:text-[#7C3AED] transition-colors text-xs uppercase tracking-[0.15em] font-bold"
          >
            ← Back
          </Link>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20">
          <div className="mb-4">
            <h1 className="text-5xl font-bold mb-6 tracking-tight font-[family-name:var(--font-inter)]">
              BOOK A CALL
            </h1>
            <p className="text-lg text-gray-700 mb-2 font-light leading-relaxed max-w-2xl whitespace-pre-line">
              {"no generic fluff.\n\nweird ideas. real attention. fast."}
            </p>
          </div>

          <div className="w-12 h-0.5 bg-[#7C3AED]/30 mb-12" />

          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              qualifications
            </p>
            <div className="space-y-3">
              {[
                "scaled lemonhat to 100K+ users in under a year",
                "1M+ users across projects (organic growth)",
                "led growth at 6 startups (2 acquisitions)",
                "generated 200M+ views",
                "7.5K Linkedin followers in < 2 months",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="text-[#7C3AED] mt-0 font-bold leading-[1.7]">→</span>
                  <p className="text-gray-700 font-light text-[15px] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {step === "choose" ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div
                onMouseEnter={() => setHoveredCard("30")}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                <div
                  className={`
                    bg-white/60 backdrop-blur-sm border-2 rounded-2xl p-8
                    transition-all duration-500 ease-out
                    ${
                      hoveredCard === "30"
                        ? "border-[#7C3AED] shadow-[0_8px_40px_-12px_rgba(124,58,237,0.25)] -translate-y-1"
                        : "border-gray-200 shadow-sm"
                    }
                  `}
                >
                  <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 mb-6">
                    <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full" />
                    <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-600">
                      30 minutes
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Growth Strategy Call</h2>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
                    a focused 1:1 to pinpoint your biggest growth bottleneck and set next steps.
                  </p>

                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-900">$150</p>
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setSlots([]);
                        setSlotStartIso("");
                        setLoadingSlots(true);
                        setOptionId("30");
                        setStep("checkout");
                      }}
                      className={`
                        inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold uppercase text-[11px] tracking-wider
                        transition-all duration-300
                        ${
                          hoveredCard === "30"
                            ? "bg-[#7C3AED] text-white shadow-md"
                            : "bg-white border-2 border-[#7C3AED] text-[#7C3AED]"
                        }
                      `}
                    >
                      book a 1:1 with me
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                onMouseEnter={() => setHoveredCard("60")}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                <div
                  className={`
                    backdrop-blur-sm border-2 rounded-2xl p-8
                    transition-all duration-500 ease-out
                    ${
                      hoveredCard === "60"
                        ? "bg-gradient-to-br from-[#7C3AED]/10 to-white border-[#7C3AED] shadow-[0_8px_40px_-12px_rgba(124,58,237,0.3)] -translate-y-1"
                        : "bg-gradient-to-br from-[#7C3AED]/5 to-white/60 border-[#7C3AED]/40 shadow-sm"
                    }
                  `}
                >
                  <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 rounded-full px-3 py-1 mb-6">
                    <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-pulse" />
                    <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7C3AED]">
                      60 minutes
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Deep Dive Session</h2>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
                    a deeper 1:1 to pressure-test your strategy and build an execution plan.
                  </p>

                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-900">$300</p>
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setSlots([]);
                        setSlotStartIso("");
                        setLoadingSlots(true);
                        setOptionId("60");
                        setStep("checkout");
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold uppercase text-[11px] tracking-wider bg-[#7C3AED] text-white shadow-md hover:bg-[#6D28D9] transition-all duration-300"
                    >
                      book a 1:1 with me
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep("choose");
                    setOptionId(null);
                    setSlots([]);
                    setSlotStartIso("");
                    setError("");
                  }}
                  className="text-xs uppercase tracking-[0.15em] font-bold text-gray-500 hover:text-[#7C3AED] transition-colors"
                >
                  ← change option
                </button>
                <p className="text-xs uppercase tracking-[0.15em] font-bold text-gray-500">
                  {selectedDuration} • {selectedPrice}
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 font-bold">
                  choose time
                </p>
                <p className="text-[11px] text-gray-500 font-light mb-6">
                  shown in {DISPLAY_TZ.replace(/_/g, " ")}
                </p>
                {loadingSlots ? (
                  <p className="text-sm text-gray-500">Loading available slots...</p>
                ) : slots.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No open slots in the next two weeks. Check back soon.
                  </p>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
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
                            className={`
                              shrink-0 rounded-full border px-4 py-2 text-left transition-all
                              ${active
                                ? "border-[#7C3AED] bg-[#7C3AED]/10"
                                : "border-gray-200 bg-white hover:border-gray-300"
                              }
                            `}
                          >
                            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500">
                              {formatDayLabel(key)}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {count} open
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {slotsForSelectedDay.map((slot) => {
                        const active = slot.start === slotStartIso;
                        return (
                          <button
                            key={slot.start}
                            type="button"
                            onClick={() => setSlotStartIso(slot.start)}
                            className={`
                              rounded-xl border px-3 py-2 text-sm transition-all
                              ${active
                                ? "border-[#7C3AED] bg-white shadow-[0_8px_30px_-18px_rgba(124,58,237,0.35)]"
                                : "border-gray-200 bg-white/70 hover:border-gray-300"
                              }
                            `}
                          >
                            <span className="font-semibold text-gray-900">
                              {formatTimeLabel(slot.start)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedSlotLabel && (
                  <p className="mt-3 text-xs text-gray-500">selected: {selectedSlotLabel}</p>
                )}
              </div>

              <div className="bg-white/60 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 font-bold">
                  your details
                </p>
                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    type="email"
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone (optional)"
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What should we focus on? (optional)"
                    rows={4}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8">
                <button
                  type="button"
                  onClick={handleCheckoutStart}
                  className="w-full px-5 py-3 rounded-lg font-bold uppercase text-[11px] tracking-wider bg-[#7C3AED] text-white shadow-md hover:bg-[#6D28D9] transition-all duration-300"
                >
                  continue to stripe checkout
                </button>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              </div>
            </div>
          )}

          {searchParams.get("session_id") && (
            <div className="mt-10 border-2 border-green-200 bg-green-50 rounded-2xl p-6">
              <p className="text-sm text-green-900 font-medium">
                Payment received. If Google Calendar is configured, your invite will be created automatically after Stripe confirms the payment.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-gray-800" />}>
      <BookPageInner />
    </Suspense>
  );
}
