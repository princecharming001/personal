"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, ChevronDown, MessageCircle } from "lucide-react";
import { extractSnapshotBody } from "@/lib/extract-snapshot-body";
import { stats } from "@/lib/resume";
import HalftoneFace from "./components/halftone-face";
import PortfolioApp from "./components/portfolio-app";

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Coaching", href: "/coach" },
  { label: "Book", href: "/book" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anishpolakala/", out: true },
];

const PREVIOUSLY = [
  { name: "Palo", mark: "P", bg: "#7C3AED", fg: "#fff" },
  { name: "Lemonhat", mark: "L", bg: "#F5B70A", fg: "#3B2F00" },
  { name: "Prosimo", mark: "P", bg: "#111", fg: "#fff" },
];

export default function Home() {
  const [htmlOverride, setHtmlOverride] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content?path=/")
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

  if (htmlOverride) {
    return (
      <div
        data-admin-override-root=""
        dangerouslySetInnerHTML={{ __html: extractSnapshotBody(htmlOverride) }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* nav */}
      <header className="relative z-20 mx-auto flex max-w-[1240px] items-center justify-between px-4 py-5 sm:px-8 lg:px-[86px]">
        <Link href="/" className="font-serif text-[24px] tracking-[-0.02em] sm:text-[28px]">
          Anish Polakala
        </Link>
        <nav className="hidden items-center gap-8 text-[16px] text-black/75 lg:flex">
          {NAV.map((n) =>
            n.out ? (
              <a key={n.label} href={n.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-black">
                {n.label}
              </a>
            ) : (
              <Link key={n.label} href={n.href} className="transition-colors hover:text-black">
                {n.label}
              </Link>
            ),
          )}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAboutOpen((o) => !o)}
              className="flex items-center gap-1 transition-colors hover:text-black"
              aria-expanded={aboutOpen}
            >
              More <ChevronDown size={14} className="text-black/40" />
            </button>
            {aboutOpen && (
              <div className="absolute left-1/2 top-9 w-48 -translate-x-1/2 rounded-xl border border-black/[0.08] bg-white p-1.5 text-[15px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)]">
                <a href="https://www.instagram.com/anishtweaksout/" target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 hover:bg-black/[0.04]">
                  Instagram
                </a>
                <a href="https://www.lemonhat.io/" target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 hover:bg-black/[0.04]">
                  Lemonhat
                </a>
                <a href="https://www.palo.ai/" target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 hover:bg-black/[0.04]">
                  Palo
                </a>
              </div>
            )}
          </div>
        </nav>
        <a
          href="mailto:anish.polakala@gmail.com"
          className="rounded-[10px] border border-black/[0.09] bg-white px-5 py-2.5 text-[15px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-black/[0.02]"
        >
          Contact
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 pb-14 pt-10 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:px-[86px] lg:pt-[110px]">
        <div className="order-2 lg:order-1">
          <a
            href="https://www.palo.ai/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[15px] text-black/50 transition-colors hover:text-black/70"
          >
            <span className="grid size-[22px] place-items-center rounded-[5px] bg-[#7C3AED] text-[12px] font-semibold text-white">P</span>
            CPO at <span className="font-medium text-black">Palo</span>
          </a>
          <h1 className="mt-5 font-serif text-[52px] leading-[1.02] tracking-[-0.035em] sm:text-[68px] lg:text-[76px]">
            I build <span className="text-[#7C3AED]">products</span>
            <br />
            from zero to exit
          </h1>
          <p className="mt-7 max-w-[500px] text-[19px] leading-[1.6] text-black/50 sm:text-[21px]">
            Two-time acquired product lead and Berkeley data science student, turning customer insight into products that
            scale.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="mailto:anish.polakala@gmail.com"
              className="rounded-[12px] bg-gradient-to-b from-[#8B4BEA] to-[#6D28D9] px-10 py-3.5 text-[17px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_-6px_rgba(109,40,217,0.6)] transition-transform hover:-translate-y-px"
            >
              Get in touch
            </a>
            <Link
              href="/book"
              className="flex items-center gap-2.5 rounded-[12px] border border-black/[0.09] bg-white px-10 py-3.5 text-[17px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-black/[0.02]"
            >
              <CalendarDays size={18} strokeWidth={1.8} /> Book a call
            </Link>
          </div>

          <p className="mt-16 text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">Built products at</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3 text-[17px]">
            {PREVIOUSLY.map((c) => (
              <span key={c.name} className="flex items-center gap-2.5">
                <span
                  className="grid size-[22px] place-items-center rounded-[6px] text-[11px] font-bold"
                  style={{ background: c.bg, color: c.fg }}
                >
                  {c.mark}
                </span>
                {c.name}
              </span>
            ))}
            <a href="#work" className="flex items-center gap-1.5 text-black/45 transition-colors hover:text-black/70">
              More <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HalftoneFace
            src="/face/anish-turn.mp4"
            poster="/face/anish-bust.jpg"
            className="aspect-square w-full max-w-[320px] sm:max-w-[460px] lg:max-w-[580px]"
          />
        </div>
      </section>

      {/* the "app" */}
      <section id="work" className="mx-auto max-w-[1420px] scroll-mt-6 px-4 sm:px-8 lg:px-10">
        <PortfolioApp />
      </section>

      {/* stats */}
      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8 lg:px-[86px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-y border-black/[0.07] py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[46px] leading-none tracking-[-0.03em] sm:text-[56px]">{s.value}</p>
              <p className="mt-3 text-[15px] text-black/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* story */}
      <section id="story" className="mx-auto max-w-[1240px] scroll-mt-6 px-4 sm:px-8 lg:px-[86px]">
        <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-black/45">(01) Why</p>
        <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <p className="font-serif text-[34px] leading-[1.15] tracking-[-0.025em] sm:text-[44px]">
            My dad worked <span className="text-[#7C3AED]">10x harder</span> than me. I&apos;m taking the risks he was
            never able to.
          </p>
          <div className="space-y-4 text-[17px] leading-[1.7] text-black/60">
            <p>
              First he was the middle-class kid paying his family&apos;s electricity bill. Then the student paying off his
              own tuition. Then the husband on a visa with two babies to feed.
            </p>
            <p>Three jobs at once. 5am commutes. 96-hour shifts. No safety net, no do-overs, dreams parked.</p>
            <p className="text-black/85">He&apos;s the reason I&apos;m going all in.</p>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-[1240px] px-4 py-28 sm:px-8 lg:px-[86px]">
        <div className="relative overflow-hidden rounded-[22px] border border-black/[0.07] bg-[#F7F7F7] px-6 py-16 text-center sm:px-12">
          <p className="font-serif text-[40px] leading-[1.05] tracking-[-0.03em] sm:text-[56px]">
            Let&apos;s build <span className="text-[#7C3AED]">something</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-black/50">
            Hiring for product, starting something, or want a second brain on your roadmap? I reply fast.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:anish.polakala@gmail.com"
              className="rounded-[12px] bg-gradient-to-b from-[#8B4BEA] to-[#6D28D9] px-9 py-3.5 text-[16px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_16px_-6px_rgba(109,40,217,0.6)]"
            >
              anish.polakala@gmail.com
            </a>
            <Link
              href="/coach"
              className="rounded-[12px] border border-black/[0.09] bg-white px-9 py-3.5 text-[16px] font-medium"
            >
              Coaching
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] px-4 py-8 text-[14px] text-black/45 sm:px-8 lg:px-[86px]">
        <span className="font-serif text-[18px] text-black/80">Anish Polakala</span>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/anishpolakala/" target="_blank" rel="noreferrer" className="hover:text-black">LinkedIn</a>
          <a href="https://www.instagram.com/anishtweaksout/" target="_blank" rel="noreferrer" className="hover:text-black">Instagram</a>
          <a href="mailto:anish.polakala@gmail.com" className="hover:text-black">Email</a>
        </div>
        <span>© {new Date().getFullYear()} · Berkeley, CA</span>
      </footer>

      {/* chat bubble */}
      <a
        href="mailto:anish.polakala@gmail.com"
        aria-label="Email Anish"
        className="fixed bottom-8 right-8 z-[150] grid size-14 place-items-center rounded-full bg-[#7C3AED] text-white shadow-[0_8px_24px_-6px_rgba(109,40,217,0.6)] transition-transform hover:scale-105"
      >
        <MessageCircle size={24} strokeWidth={1.8} />
      </a>
    </div>
  );
}
