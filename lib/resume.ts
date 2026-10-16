/** Square brand marks pulled from each organization's own site. */
export const logos: Record<string, string> = {
  Palo: "/logos/palo.svg",
  Lemonhat: "/logos/lemonhat.png",
  Prosimo: "/logos/prosimo-icon.png",
  "Palo Alto Networks": "/logos/panw.png",
  Sonatus: "/logos/sonatus-icon.png",
  "Blackskies Investments": "/logos/blackskies-icon.png",
  "UC Berkeley": "/logos/berkeley-icon.svg",
};

export const contact = {
  email: "anish.polakala@gmail.com",
  linkedin: "https://www.linkedin.com/in/anishpolakala/",
  instagram: "https://www.instagram.com/anishtweaksout/",
};

/** What I'm doing right now — most important first. */
export const now: { role: string; org: string; href?: string; since: string; note: string }[] = [
  {
    role: "Chief Product Officer",
    org: "Palo",
    href: "https://www.palo.ai/",
    since: "May 2026",
    note: "Leading product for an AI content engine. Built the eval set that took first-draft approval from 40% to 75%.",
  },
  {
    role: "Head Researcher",
    org: "UC Berkeley",
    since: "Aug 2025",
    note: "Designing a voice-first sanitation AI for first-time smartphone users in rural India, reaching 10,000+ people.",
  },
  {
    role: "President of Ventures",
    org: "Blackskies Investments",
    since: "Jan 2026",
    note: "Sourcing and diligencing early-stage startups for a $1.6M portfolio. Wrote and run a 10-week PM bootcamp.",
  },
  {
    role: "Lead Product Consultant",
    org: "Sonatus",
    since: "Aug 2026",
    note: "Led 8 analysts to design the semiconductor fab go-to-market plan adopted for 2027 pilots.",
  },
  {
    role: "B.A. Data Science",
    org: "UC Berkeley",
    since: "Class of 2028",
    note: "Coursework in programming structures, data structures and the principles of data science.",
  },
];

/** The journey, in order. Labels are ages/eras where there's no exact date. */
export const journey: { when: string; title: string; body: string; org?: string }[] = [
  { when: "Age 9", title: "Learned to code", body: "My dad taught me on the family computer." },
  { when: "5th grade", title: "First hustle", body: "Sold my cousin's old math tests to classmates." },
  {
    when: "Agency",
    title: "Websites for restaurants",
    body: "Turned one-off sites into a small dev agency with four full-time developers.",
  },
  {
    when: "First exit",
    title: "Telemedicine for ESL patients",
    body: "Built a care platform for patients who don't speak English and sold it to a hospital chain.",
  },
  {
    when: "2019",
    title: "Founding intern at Prosimo",
    org: "Prosimo",
    body: "Grew into a product manager shipping multicloud tooling for the NBA, Verizon and Rakuten. Prosimo was acquired by Palo Alto Networks.",
  },
  {
    when: "2020",
    title: "Cofounded Lemonhat",
    org: "Lemonhat",
    body: "Farm-to-door delivery for local farms. Scaled to 118K+ users and $6.2M in revenue before a 7-figure acquisition in 2025.",
  },
  {
    when: "2025",
    title: "Valedictorian, then Berkeley",
    org: "UC Berkeley",
    body: "Graduated top of my class with 63.22% attendance, then started data science at UC Berkeley. Skipped a CS final for a YC interview.",
  },
  {
    when: "2025",
    title: "Product for creators",
    body: "Launched coaching platforms for 15+ wellness creators, now doing $70K a month for clients.",
  },
  {
    when: "2026",
    title: "CPO at Palo",
    org: "Palo",
    body: "Leading product at an AI content startup in Palo Alto.",
  },
];

/** Outcomes worth bragging about, each with the move behind it. */
export const achievements: { metric: string; title: string; body: string; org: string }[] = [
  {
    metric: "$6.2M",
    title: "Lemonhat, scaled to acquisition",
    org: "Lemonhat",
    body: "Grew a farm-to-door platform to 118K+ users. Mapped 10K+ orders by neighborhood and hour, then rolled out batched delivery that cut costs 35%.",
  },
  {
    metric: "40→75%",
    title: "Palo's first quality metric",
    org: "Palo",
    body: "Built a 300-case eval set of viral videos and flops to grade AI scripts against. First-draft approval nearly doubled in six weeks.",
  },
  {
    metric: "8 of 15",
    title: "Top accounts adopted in a quarter",
    org: "Prosimo",
    body: "Owned Prosimo's multicloud traffic dashboard end to end, launched it to 20 enterprise customers, and closed 7-figure deals through technical demos.",
  },
  {
    metric: "+150%",
    title: "Free-to-paid for creator businesses",
    org: "Freelance",
    body: "Analyzed 250K+ comments and DMs to find what audiences actually wanted, then shipped it as features and course modules.",
  },
  {
    metric: "−45%",
    title: "Drop-off for first-time phone users",
    org: "UC Berkeley",
    body: "Interviewed 100+ people across rural India, logged 2,500+ sessions, trained a model to predict abandonment, and A/B tested the fixes.",
  },
];
