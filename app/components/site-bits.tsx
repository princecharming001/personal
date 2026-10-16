"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { logos } from "@/lib/resume";

/** Brand mark in a quiet hairline tile; falls back to a monogram. */
export function Logo({ org, size = 36 }: { org: string; size?: number }) {
  const src = logos[org];
  return (
    <span
      className="inline-grid shrink-0 place-items-center overflow-hidden rounded-[22%] border border-black/[0.08] bg-white"
      style={{ width: size, height: size }}
      title={org}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={`${org} logo`} className="size-[78%] object-contain" />
      ) : (
        <span className="text-[13px] font-medium text-black/50">{org[0]}</span>
      )}
    </span>
  );
}

/** Fades content up once it scrolls into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Local time in Berkeley, ticking each minute. */
export function BerkeleyTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "—"}</span>;
}
