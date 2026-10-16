"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  Compass,
  Flag,
  Home,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MessagesSquare,
  MoreHorizontal,
  PanelLeft,
  Rocket,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
  Wrench,
} from "lucide-react";
import { experience, leadership, lore, skills, type Role } from "@/lib/resume";

type Tab = "overview" | "experience" | "leadership" | "skills" | "lore";

const NAV: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <Home size={18} strokeWidth={1.6} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={18} strokeWidth={1.6} /> },
  { id: "leadership", label: "Leadership", icon: <Flag size={18} strokeWidth={1.6} /> },
  { id: "skills", label: "Skills", icon: <Wrench size={18} strokeWidth={1.6} /> },
  { id: "lore", label: "Lore", icon: <BookOpen size={18} strokeWidth={1.6} /> },
];

const EXTERNAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anishpolakala/", icon: <Linkedin size={18} strokeWidth={1.6} /> },
  { label: "Instagram", href: "https://www.instagram.com/anishtweaksout/", icon: <Instagram size={18} strokeWidth={1.6} /> },
];

const FOOT = [
  { label: "Coaching", href: "/coach", icon: <MessagesSquare size={18} strokeWidth={1.6} /> },
  { label: "Book a call", href: "/book", icon: <CalendarDays size={18} strokeWidth={1.6} /> },
  { label: "Email", href: "mailto:anish.polakala@gmail.com", icon: <Mail size={18} strokeWidth={1.6} />, out: true },
];

export default function PortfolioApp() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="overflow-hidden rounded-[22px] border border-black/[0.07] bg-[#F7F7F7] shadow-[0_1px_0_rgba(0,0,0,0.03),0_30px_80px_-40px_rgba(76,29,149,0.25)]">
      {/* top bar */}
      <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5 sm:w-[212px]">
          <span className="grid size-8 place-items-center rounded-[9px] bg-[#7C3AED] font-serif text-[15px] text-white">a</span>
          <span className="text-black/20">/</span>
          <span className="hidden items-center gap-1 text-[15px] font-medium text-black/85 sm:flex">
            Anish&apos;s Desk <ChevronsUpDown size={14} className="text-black/40" />
          </span>
          <PanelLeft size={18} strokeWidth={1.5} className="ml-auto hidden text-black/40 sm:block" />
        </div>
        <div className="flex h-10 min-w-0 flex-1 items-center rounded-xl border border-black/[0.08] bg-white text-[14px] text-black/80 sm:max-w-[420px]">
          <span className="min-w-0 flex-1 truncate px-4">anishpolakala.com</span>
          <ChevronDown size={16} className="mr-3 text-black/40" />
          <span className="grid h-full w-11 place-items-center border-l border-black/[0.08] text-black/50">
            <MoreHorizontal size={16} />
          </span>
        </div>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <span className="flex h-10 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3.5 text-[14px] font-medium text-black/80">
            <Trophy size={16} className="text-[#E8A33B]" /> 2 exits
          </span>
          <a
            href="mailto:anish.polakala@gmail.com"
            className="flex h-10 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3.5 text-[14px] font-medium text-black/80 transition-colors hover:bg-black/[0.02]"
          >
            <UserPlus size={16} className="text-[#7C3AED]" /> Hire me
          </a>
          <span className="grid size-10 place-items-center rounded-full bg-[#EDE4FB] text-[13px] font-medium text-[#5B21B6]">
            AP
          </span>
        </div>
      </div>

      {/* mobile tabs */}
      <div className="flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none] md:hidden">
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setTab(n.id)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[14px] ${
              tab === n.id ? "bg-black/[0.06] text-black" : "text-black/60"
            }`}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-[232px] shrink-0 flex-col px-3 pb-4 md:flex">
          <nav className="space-y-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setTab(n.id)}
                className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[15px] transition-colors ${
                  tab === n.id ? "bg-black/[0.06] text-black" : "text-black/65 hover:bg-black/[0.03]"
                }`}
              >
                <span className={tab === n.id ? "text-black/80" : "text-black/45"}>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="my-4 h-px bg-black/[0.07]" />
          <nav className="space-y-1">
            {EXTERNAL.map((n) => (
              <a
                key={n.label}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[15px] text-black/65 transition-colors hover:bg-black/[0.03]"
              >
                <span className="text-black/45">{n.icon}</span>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-10">
            <div className="mb-3 h-px bg-black/[0.07]" />
            {FOOT.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[15px] text-black/65 transition-colors hover:bg-black/[0.03]"
              >
                <span className="text-black/45">{n.icon}</span>
                {n.label}
                {n.out && <ArrowUpRight size={14} className="ml-auto text-black/35" />}
              </Link>
            ))}
          </div>
        </aside>

        {/* main panel */}
        <div className="min-h-[640px] min-w-0 flex-1 border-black/[0.07] bg-white p-5 sm:p-8 md:rounded-tl-[20px] md:border-l md:border-t">
          {tab === "overview" && <Overview go={setTab} />}
          {tab === "experience" && <RolesPanel title="Experience" sub="Where I've owned the product" roles={experience} />}
          {tab === "leadership" && <RolesPanel title="Leadership" sub="Research, investing and consulting" roles={leadership} />}
          {tab === "skills" && <SkillsPanel />}
          {tab === "lore" && <LorePanel />}
        </div>
      </div>
    </div>
  );
}

function PanelHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-7">
      <h3 className="font-serif text-[34px] leading-tight tracking-[-0.02em] text-black sm:text-[40px]">{title}</h3>
      <p className="mt-1 text-[16px] text-black/50 sm:text-[17px]">{sub}</p>
    </div>
  );
}

function CardLink({ children, onClick, href }: { children: ReactNode; onClick?: () => void; href?: string }) {
  const cls = "group mt-3 inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] text-black/50 transition-colors hover:text-[#7C3AED]";
  const inner = (
    <>
      {children} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function Label({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[15px] text-black/50">
      <span className="text-black/40">{icon}</span>
      {children}
    </p>
  );
}

/* faux "ad" tiles — one per company, like Bloom's ad library collage */
const TILES: { name: string; line: string; stat: string; bg: string; fg: string; accent: string }[] = [
  { name: "Palo", line: "AI that writes scripts creators approve", stat: "40→75%", bg: "#7C3AED", fg: "#fff", accent: "#E9DDFB" },
  { name: "lemonhat", line: "Farm to door, before it spoils.", stat: "$6.2M", bg: "#FFF6D6", fg: "#3B2F00", accent: "#F5B70A" },
  { name: "Prosimo", line: "One dashboard for every cloud.", stat: "8/15", bg: "#EAF2FF", fg: "#0B2E6B", accent: "#2F6FEB" },
  { name: "Blackskies", line: "Pre-seed checks, post-diligence.", stat: "$1.6M", bg: "#0E0E12", fg: "#fff", accent: "#A78BFA" },
  { name: "Freelance", line: "Coaching platforms for creators", stat: "$70K/mo", bg: "#F2FBF6", fg: "#0F3D24", accent: "#22A06B" },
  { name: "UC Berkeley", line: "Voice-first AI for first-time users", stat: "−45%", bg: "#F5F1FF", fg: "#2E1065", accent: "#7C3AED" },
  { name: "Sonatus", line: "GTM for semiconductor fabs", stat: "2027", bg: "#FFF1EA", fg: "#5A1E00", accent: "#F26A2E" },
  { name: "Palo Alto Networks", line: "Acquired Prosimo", stat: "exit", bg: "#FFFFFF", fg: "#111", accent: "#FA582D" },
];

function Tile({ t, tall }: { t: (typeof TILES)[number]; tall?: boolean }) {
  return (
    <div
      className={`flex flex-col justify-between rounded-[10px] border border-black/[0.08] p-3 ${tall ? "h-[168px]" : "h-[112px]"}`}
      style={{ background: t.bg, color: t.fg }}
    >
      <div>
        <p className="text-[11px] font-semibold tracking-tight">{t.name}</p>
        <p className="mt-1 text-[12px] font-semibold leading-[1.2]">{t.line}</p>
      </div>
      <span
        className="self-start rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ background: t.accent, color: t.accent === "#E9DDFB" ? "#5B21B6" : "#fff" }}
      >
        {t.stat}
      </span>
    </div>
  );
}

const THUMBS = ["IMG_8918", "IMG_2963", "IMG_1705", "IMG_2293", "IMG_1602"];

function Overview({ go }: { go: (t: Tab) => void }) {
  return (
    <div>
      <PanelHead title="Overview" sub="Discover what I've built, led and learned" />

      <div className="grid gap-5 xl:grid-cols-3">
        {/* big experience card */}
        <div className="relative overflow-hidden rounded-[18px] border border-black/[0.08] xl:col-span-2">
          <div className="grid h-full sm:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-center p-7">
              <Label icon={<Layers size={17} strokeWidth={1.6} />}>Experience</Label>
              <p className="mt-3 font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-black sm:text-[34px]">
                Built products at <span className="text-[#7C3AED]">acquired</span> companies
              </p>
              <CardLink onClick={() => go("experience")}>Browse</CardLink>
            </div>
            <div className="relative hidden h-[330px] overflow-hidden sm:block">
              <div className="absolute inset-0 grid grid-cols-3 gap-2.5 p-3 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
                <div className="-mt-10 space-y-2.5">
                  <Tile t={TILES[0]} tall />
                  <Tile t={TILES[3]} />
                  <Tile t={TILES[6]} />
                </div>
                <div className="mt-6 space-y-2.5">
                  <Tile t={TILES[1]} />
                  <Tile t={TILES[4]} tall />
                  <Tile t={TILES[7]} />
                </div>
                <div className="-mt-4 space-y-2.5">
                  <Tile t={TILES[2]} tall />
                  <Tile t={TILES[5]} tall />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* book a call */}
        <div className="flex flex-col items-center justify-center overflow-hidden rounded-[18px] p-6 text-center">
          <div className="flex items-end justify-center">
            {THUMBS.map((t, i) => (
              <img
                key={t}
                src={`/images/thumbs/${t}.jpg`}
                alt=""
                className="size-[64px] rounded-[10px] border-2 border-white object-cover shadow-sm 2xl:size-[72px]"
                style={{ marginLeft: i ? -14 : 0, transform: `rotate(${(i - 2) * 3}deg)`, zIndex: 5 - Math.abs(i - 2) }}
              />
            ))}
          </div>
          <p className="mt-6 font-serif text-[28px] leading-tight tracking-[-0.02em] text-black">Book a 1:1 call</p>
          <CardLink href="/book">Pick a time</CardLink>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* skills */}
        <div className="rounded-[18px] border border-black/[0.08] p-6">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: <Users size={22} strokeWidth={1.4} />, t: "User research" },
              { icon: <Compass size={22} strokeWidth={1.4} />, t: "Roadmaps" },
              { icon: <BarChart3 size={22} strokeWidth={1.4} />, t: "Data & evals" },
              { icon: <Rocket size={22} strokeWidth={1.4} />, t: "Go-to-market" },
            ].map((s) => (
              <div key={s.t} className="rounded-[12px] bg-[#F5F5F5] p-4 text-black/45">
                {s.icon}
                <p className="mt-4 text-[14px]">{s.t}</p>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <Label icon={<Sparkles size={16} strokeWidth={1.6} />}>Skills</Label>
            <p className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.02em] text-black">7 years shipping</p>
            <CardLink onClick={() => go("skills")}>Explore</CardLink>
          </div>
        </div>

        {/* ventures / brand */}
        <div className="rounded-[18px] border border-black/[0.08] p-6">
          <div className="grid h-[178px] place-items-center rounded-[12px] border border-black/[0.06] bg-[#F5F5F5]">
            <span className="flex items-stretch border border-black text-[12px] font-bold tracking-[0.08em]">
              <span className="bg-black px-3 py-1.5 text-white">AP</span>
              <span className="bg-white px-3 py-1.5 text-black">POLAKALA</span>
            </span>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <Label icon={<Rocket size={16} strokeWidth={1.6} />}>Ventures</Label>
              <div className="flex gap-1">
                {["#3A3A3F", "#FFFFFF", "#8B8B92", "#7C3AED"].map((c) => (
                  <span key={c} className="size-7 rounded-[7px] border border-black/[0.08]" style={{ background: c }} />
                ))}
              </div>
            </div>
            <p className="mt-2 truncate font-serif text-[26px] leading-tight tracking-[-0.02em] text-black">Lemonhat, Palo…</p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardLink onClick={() => go("experience")}>See details</CardLink>
              <div className="mt-3 flex gap-1.5 text-[13px] text-black/50">
                <span className="rounded-full bg-[#F5F5F5] px-2.5 py-1">founder</span>
                <span className="rounded-full bg-[#F5F5F5] px-2.5 py-1">operator</span>
                <span className="rounded-full bg-[#F5F5F5] px-2.5 py-1">+2</span>
              </div>
            </div>
          </div>
        </div>

        {/* leadership */}
        <div className="flex flex-col overflow-hidden rounded-[18px] border border-black/[0.08] p-6">
          <div className="grid flex-1 place-items-center py-6">
            <div className="flex gap-2">
              {["IMG_8918", "IMG_2963", "IMG_2293"].map((t) => (
                <img key={t} src={`/images/thumbs/${t}.jpg`} alt="" className="size-[76px] rounded-[6px] object-cover" />
              ))}
            </div>
          </div>
          <div>
            <Label icon={<Flag size={16} strokeWidth={1.6} />}>Leadership</Label>
            <p className="mt-2 font-serif text-[26px] leading-tight tracking-[-0.02em] text-black">3 current roles</p>
            <CardLink onClick={() => go("leadership")}>View</CardLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function RolesPanel({ title, sub, roles }: { title: string; sub: string; roles: Role[] }) {
  return (
    <div>
      <PanelHead title={title} sub={sub} />
      <div className="space-y-4">
        {roles.map((r) => (
          <article key={r.org + r.title} className="rounded-[18px] border border-black/[0.08] p-6">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div>
                <p className="font-serif text-[24px] leading-tight tracking-[-0.015em] text-black">{r.title}</p>
                <p className="mt-1 text-[15px] text-black/55">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noreferrer" className="text-[#7C3AED] hover:underline">
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}{" "}
                  · {r.place}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                {r.tag && <span className="rounded-full bg-[#F3EDFD] px-2.5 py-1 text-[#6D28D9]">{r.tag}</span>}
                <span className="text-black/45">{r.dates}</span>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-black/70">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#C4A6F5]" />
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div>
      <PanelHead title="Skills" sub="UC Berkeley, B.A. Data Science · 2028" />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          { label: "Product", items: skills.product },
          { label: "Build", items: skills.build },
        ].map((g) => (
          <div key={g.label} className="rounded-[18px] border border-black/[0.08] p-6">
            <p className="text-[13px] uppercase tracking-[0.08em] text-black/45">{g.label}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-black/[0.08] bg-[#FAFAFA] px-3 py-1.5 text-[14px] text-black/75">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-[18px] border border-black/[0.08] p-6">
        <p className="text-[13px] uppercase tracking-[0.08em] text-black/45">Coursework</p>
        <p className="mt-3 text-[15px] leading-relaxed text-black/70">
          Structure &amp; Interpretation of Computer Programs · Data Structures · Foundations of Data Science · Principles
          &amp; Techniques of Data Science · Human Contexts &amp; Ethics of Data
        </p>
      </div>
    </div>
  );
}

function LorePanel() {
  return (
    <div>
      <PanelHead title="Lore" sub="The unofficial résumé" />
      <ol className="relative ml-2 space-y-5 border-l border-black/[0.08] pl-7">
        {lore.map((l, i) => (
          <li key={l} className="relative text-[15px] leading-relaxed text-black/70">
            <span className="absolute -left-[33px] top-[7px] size-2.5 rounded-full border-2 border-white bg-[#A78BFA]" />
            <span className="mr-2 font-mono text-[12px] text-black/35">{String(i + 1).padStart(2, "0")}</span>
            {l}
          </li>
        ))}
      </ol>
    </div>
  );
}
