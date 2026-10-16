"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { extractSnapshotBody } from "@/lib/extract-snapshot-body";
import { achievements, contact, journey, logos, now, orgLinks } from "@/lib/resume";
import HalftoneFace from "./components/halftone-face";
import { BerkeleyTime, Logo, Reveal } from "./components/site-bits";

const NAV = [
  { label: "Now", href: "#now" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const BUILT_AT = ["Palo", "Lemonhat", "Prosimo", "Palo Alto Networks", "Blackskies Investments", "Sonatus", "UC Berkeley"];

const LINK_RE = new RegExp(`(${Object.keys(orgLinks).join("|")})`, "g");

/** Wraps known org names in links to their sites. */
function Linked({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK_RE).map((part, i) =>
        orgLinks[part] ? (
          <a
            key={i}
            href={orgLinks[part]}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#7C3AED] hover:decoration-[#7C3AED]"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Arrow({ up = false, size = 14 }: { up?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-300 ${up ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5"}`}
    >
      {up ? (
        <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function Section({ id, label, sub, children }: { id: string; label: string; sub: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-black/[0.08]">
      <div className="mx-auto grid max-w-[1180px] gap-x-12 gap-y-8 px-5 py-20 sm:px-8 md:grid-cols-[220px_1fr] md:py-28 lg:grid-cols-[300px_1fr]">
        <Reveal>
          <div className="md:sticky md:top-10">
            <h2 className="text-[15px] font-medium text-black">{label}</h2>
            <p className="mt-1 max-w-[240px] text-[15px] leading-snug text-black/45">{sub}</p>
          </div>
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const [htmlOverride, setHtmlOverride] = useState<string | null>(null);

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
    <div className="min-h-screen bg-white text-[#0A0A0A] selection:bg-[#7C3AED] selection:text-white">
      {/* header */}
      <header className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-[15px] font-medium tracking-[-0.01em]">
          Anish Polakala
        </Link>
        <nav className="flex items-center gap-6 text-[14px] text-black/50">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`transition-colors hover:text-black ${n.label === "Contact" ? "" : "hidden sm:inline"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 pb-16 pt-8 sm:px-8 md:pt-14 lg:min-h-[calc(100svh-64px-120px)] lg:grid-cols-[1.1fr_1fr] lg:pb-10">
        <div className="order-2 lg:order-1">
          <Reveal>
            <a
              href="https://www.palo.ai/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] py-1 pl-1 pr-3.5 text-[13.5px] text-black/60 transition-colors hover:border-black/20 hover:text-black"
            >
              <Logo org="Palo" size={24} />
              Currently CPO at Palo
              <Arrow up />
            </a>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 text-[44px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[60px] lg:text-[68px]">
              I build products
              <br />
              from zero <span className="text-[#7C3AED]">to exit.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[520px] text-[18px] leading-[1.6] text-black/50 sm:text-[19px]">
              I&apos;m Anish, a product lead with 7 years of experience and 2x exited founder located in the SF area.
              I&apos;ve led companies from concept to 8-figure acquisition, and now I lead product at Palo while studying
              data science at UC Berkeley.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#0A0A0A] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#7C3AED]"
              >
                Get in touch <Arrow />
              </a>
              <a href="#journey" className="group inline-flex items-center gap-2 text-[15px] text-black/60 transition-colors hover:text-black">
                Read my story <Arrow />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HalftoneFace
            src="/face/anish-turn.mp4"
            poster="/face/anish-bust.jpg"
            className="aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[540px]"
          />
        </div>
      </section>

      {/* built at */}
      <div className="border-t border-black/[0.08]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="shrink-0 text-[13px] text-black/45">Built product at</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
            {BUILT_AT.map((org) => (
              <li key={org} className="flex items-center gap-2 text-[13.5px] text-black/70">
                <Logo org={org} size={24} />
                {orgLinks[org] ? (
                  <a href={orgLinks[org]} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#7C3AED]">
                    {org}
                  </a>
                ) : org === "Blackskies Investments" ? (
                  "Blackskies"
                ) : (
                  org
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* now */}
      <Section id="now" label="Now" sub="What I'm working on this fall.">
        <ul>
          {now.map((item, i) => (
            <Reveal key={item.role + item.org} delay={i * 60}>
              <li className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-black/[0.08] py-6 sm:grid-cols-[auto_1fr_auto]">
                <Logo org={item.org} size={40} />
                <div className="min-w-0">
                  <p className="text-[17px] font-medium tracking-[-0.01em]">
                    {item.role},{" "}
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="underline decoration-black/15 underline-offset-4 transition-colors hover:decoration-[#7C3AED]">
                        {item.org}
                      </a>
                    ) : (
                      item.org
                    )}
                  </p>
                  <p className="mt-1.5 max-w-[560px] text-[15.5px] leading-relaxed text-black/55">{item.note}</p>
                </div>
                <p className="col-start-2 font-mono text-[12.5px] text-black/40 sm:col-start-3 sm:pt-1 sm:text-right">{item.since}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* journey */}
      <Section id="journey" label="Journey" sub="From selling old math tests to two exits.">
        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-black/[0.08]" />
          {journey.map((step, i) => {
            const last = i === journey.length - 1;
            return (
              <Reveal key={step.title} delay={Math.min(i, 4) * 50}>
                <li className="relative grid grid-cols-[11px_1fr] gap-x-6 pb-10 sm:grid-cols-[11px_104px_1fr]">
                  <span
                    aria-hidden="true"
                    className={`mt-[7px] size-[11px] rounded-full border-2 border-white ${last ? "bg-[#7C3AED] shadow-[0_0_0_4px_rgba(124,58,237,0.15)]" : "bg-black/20"}`}
                  />
                  <p className="font-mono text-[12.5px] leading-[26px] text-black/40 max-sm:col-start-2">{step.when}</p>
                  <div className="max-sm:col-start-2">
                    <p className="flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.01em]">
                      <span>
                        <Linked text={step.title} />
                      </span>
                      {step.org && <Logo org={step.org} size={20} />}
                    </p>
                    <p className="mt-1.5 max-w-[560px] text-[15.5px] leading-relaxed text-black/55"><Linked text={step.body} /></p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      {/* selected work */}
      <Section id="work" label="Selected work" sub="The results I'm proudest of, and how I got them.">
        <ul>
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <li className="grid gap-x-10 gap-y-3 border-b border-black/[0.08] py-9 md:grid-cols-[230px_1fr]">
                <p className="text-[44px] font-medium leading-none tracking-[-0.045em] tabular-nums sm:text-[52px]">{a.metric}</p>
                <div>
                  <p className="flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.01em]">
                    {logos[a.org] && <Logo org={a.org} size={22} />}
                    <span>
                      <Linked text={a.title} />
                    </span>
                  </p>
                  <p className="mt-2 max-w-[560px] text-[15.5px] leading-relaxed text-black/55"><Linked text={a.body} /></p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* why */}
      <Section id="why" label="Why" sub="What keeps me going all in.">
        <Reveal>
          <p className="max-w-[760px] text-[30px] font-medium leading-[1.18] tracking-[-0.03em] sm:text-[40px]">
            My dad worked ten times harder than I ever have.{" "}
            <span className="text-black/35">I&apos;m taking the risks he never got to take.</span>
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 grid max-w-[760px] gap-6 text-[16.5px] leading-[1.7] text-black/55 sm:grid-cols-2 sm:gap-10">
            <p>
              First he was the middle-class kid paying his family&apos;s electricity bill. Then the student paying off his
              own tuition. Then a husband on a visa with two babies to feed.
            </p>
            <p>
              Three jobs at once, 5am commutes, 96-hour shifts. No safety net and no do-overs. His whole life was making
              sure someone else was safe. <span className="text-black">He&apos;s the reason I&apos;m going all in.</span>
            </p>
          </div>
        </Reveal>
      </Section>

      {/* contact */}
      <Section id="contact" label="Contact" sub="Hiring, building, or just want to talk product.">
        <Reveal>
          <p className="text-[15.5px] text-black/55">The fastest way to reach me is email.</p>
          <a
            href={`mailto:${contact.email}`}
            className="group mt-3 inline-flex items-center gap-3 break-all text-[26px] font-medium tracking-[-0.035em] transition-colors hover:text-[#7C3AED] sm:text-[44px] lg:text-[52px]"
          >
            {contact.email}
            <span className="hidden text-black/30 transition-colors group-hover:text-[#7C3AED] sm:inline-flex">
              <Arrow up size={36} />
            </span>
          </a>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-12 border-t border-black/[0.08]">
            {[
              { label: "LinkedIn", detail: "/in/anishpolakala", href: contact.linkedin, out: true },
              { label: "Instagram", detail: "@anishtweaksout", href: contact.instagram, out: true },
              { label: "Strategy call", detail: "30 or 60 minutes, 1:1", href: "/book", out: false },
            ].map((l) => (
              <li key={l.label} className="border-b border-black/[0.08]">
                <a
                  href={l.href}
                  target={l.out ? "_blank" : undefined}
                  rel={l.out ? "noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-5 text-[16px] transition-colors hover:text-[#7C3AED]"
                >
                  <span className="font-medium">{l.label}</span>
                  <span className="flex items-center gap-3 text-black/45 transition-colors group-hover:text-[#7C3AED]">
                    {l.detail}
                    <Arrow up={l.out} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <footer className="border-t border-black/[0.08]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-8 text-[13px] text-black/45 sm:px-8">
          <span>© {new Date().getFullYear()} Anish Polakala</span>
          <span>
            Berkeley, CA · <BerkeleyTime />
          </span>
        </div>
      </footer>
    </div>
  );
}
