export type Role = {
  title: string;
  org: string;
  href?: string;
  place: string;
  dates: string;
  tag?: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    title: "Chief Product Officer",
    org: "Palo",
    href: "https://www.palo.ai/",
    place: "Palo Alto, CA",
    dates: "May 2026 – Present",
    tag: "AI content engine",
    bullets: [
      "Run daily syncs with 10+ engineers and creators, turning what we learn about hooks, pacing and trends into the core logic of the AI content engine.",
      "Built a 300-case eval set of past viral videos and flops to grade AI scripts against — the team's first objective quality metric. First-draft approval went from 40% to 75% in 6 weeks.",
    ],
  },
  {
    title: "Product Manager",
    org: "Freelance",
    place: "Berkeley, CA",
    dates: "Apr 2025 – Present",
    tag: "Creator platforms",
    bullets: [
      "Launched coaching platforms for 15+ wellness creators, now doing $70K in monthly revenue for clients.",
      "Ran sentiment and keyword analysis on 250K+ comments and DMs; the opportunities it surfaced became features and course modules that lifted free-to-paid conversion 150%.",
    ],
  },
  {
    title: "Cofounder & CPO",
    org: "Lemonhat",
    href: "https://www.lemonhat.io/",
    place: "Milpitas, CA",
    dates: "Oct 2020 – Dec 2025",
    tag: "Acquired",
    bullets: [
      "Scaled a farm-to-door delivery platform to 118K+ users and $6.2M in revenue, ending in a 7-figure acquisition.",
      "Ran 600+ focus groups with 40+ partner farms over 5 years, found 70+ lbs of weekly waste from overharvesting, and shipped forecasting that cut spoilage 20%.",
      "Mapped 10K+ orders by neighborhood and hour, piloted batched delivery in 3 cities, then rolled it out company-wide after it cut delivery costs 35%.",
    ],
  },
  {
    title: "Product Manager",
    org: "Prosimo",
    place: "San Jose, CA",
    dates: "Jun 2019 – Feb 2025",
    tag: "Acq. by Palo Alto Networks",
    bullets: [
      "Owned a multicloud traffic dashboard end to end — launched to 20 enterprise customers and adopted by 8 of the top 15 accounts within a quarter.",
      "Trained and managed a 10-person sales team, closing 7-figure enterprise deals through tailored technical demos.",
      "Ran weekly syncs with enterprise clients like the NBA, Verizon and Rakuten, turning recurring pain points into PRDs behind 15+ roadmap releases.",
    ],
  },
];

export const leadership: Role[] = [
  {
    title: "Head Researcher",
    org: "UC Berkeley",
    place: "Berkeley, CA",
    dates: "Aug 2025 – Present",
    tag: "Voice-first AI",
    bullets: [
      "Interviewed 100+ community members across rural India to learn how first-time smartphone users decide, defining requirements for a voice-first sanitation AI reaching 10,000+ people.",
      "Logged 2,500+ sessions, trained a random forest to predict task abandonment, then A/B tested the top features — drop-off fell 45%.",
    ],
  },
  {
    title: "President of Ventures",
    org: "Blackskies Investments",
    place: "Berkeley, CA",
    dates: "Jan 2026 – Present",
    tag: "$1.6M AUM",
    bullets: [
      "Scout and diligence 25+ early-stage startups per cycle alongside the GP, informing $50K checks across a $1.6M portfolio.",
      "Designed a 10-week PM bootcamp — research, market mapping, PRDs, prioritization, GTM — for 10+ new members.",
    ],
  },
  {
    title: "Lead Product Consultant",
    org: "Sonatus",
    place: "Berkeley, CA",
    dates: "Aug 2026 – Present",
    tag: "Semiconductor GTM",
    bullets: [
      "Led 8 analysts scoring 20+ verticals on buyer readiness, competition and technical fit; designed the semiconductor fab GTM plan adopted for 2027 pilots.",
      "Synthesized 50+ plant-manager interviews into the insight that AI stalls on legacy equipment integration, shifting the engineering roadmap.",
    ],
  },
];

export const stats = [
  { value: "$6.2M", label: "revenue scaled at Lemonhat" },
  { value: "118K+", label: "users on products I've led" },
  { value: "2", label: "acquisitions" },
  { value: "75%", label: "first-draft approval at Palo" },
];

export const skills = {
  build: ["Python", "SQL", "Pandas", "Claude", "Cursor", "Databricks", "Figma", "Jira"],
  product: [
    "Customer interviews",
    "PRDs",
    "Roadmaps",
    "Evals",
    "A/B tests",
    "GTM",
    "Market mapping",
    "Prototyping",
  ],
};

export const lore = [
  "first hustle: selling my cousin's old math tests in 5th grade",
  "my dad taught me to code when I was 9",
  "started building websites for restaurants — grew it into a dev agency with 4 full-time devs",
  "built a telemedicine platform for ESL patients, sold to a hospital chain (first acquisition)",
  "skipped school to found Lemonhat, a delivery system for local farms",
  "founding hire at Prosimo, acquired by Palo Alto Networks",
  "graduated valedictorian with 63.22% attendance",
  "skipped my CS final for a YC interview",
];
