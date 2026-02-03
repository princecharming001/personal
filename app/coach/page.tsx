"use client";

import Link from "next/link";

export default function CoachPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section - Matching main page aesthetic */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated gradient orbs - matching main page */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Minimal grid lines */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Back to Home Link */}
        <div className="fixed top-8 left-8 z-50">
          <Link href="/" className="text-gray-500 hover:text-[#7C3AED] transition-colors text-xs uppercase tracking-[0.15em] font-bold">
            ← Back
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-6 tracking-tight font-[family-name:var(--font-inter)]">
              RESUME ROASTS 
            </h1>
            <p className="text-lg text-gray-700 mb-2 font-light leading-relaxed max-w-2xl">
              no generic advice. no fluff. no bs.
            </p>
            <p className="text-gray-600">
              <span className="text-[#7C3AED] font-medium">weird hyperniche tips that actually work </span>
            </p>
          </div>

          {/* Qualifications Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              for the greater good
            </p>
            <div className="space-y-3">
              {[
                { text: 'ive watched multiple people close to me suffer from cancer' },
                { text: 'treatment impacts not just patients, but entire families' },
                { text: 'that burden is 100X heavier for single mothers supporting children while undergoing treatment' },
                { text: "that's why I donate 100% of profits to charities supporting single moms fighting cancer (primarily infinite strength)", bold: '100% of profits' },
                { text: 'every resume i review directly contributes to helping a family stay afloat during treatment' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 group hover:translate-x-2 transition-transform"
                >
                  <span className="text-[#7C3AED] mt-0 group-hover:scale-125 transition-transform font-bold leading-[1.7]">→</span>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors font-light text-[15px] leading-relaxed">
                    {item.bold ? (
                      <>
                        {item.text.split(item.bold)[0]}
                        <strong className="font-bold text-[#7C3AED]">{item.bold}</strong>
                        {item.text.split(item.bold)[1]}
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications Section - Duplicate */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              creds
            </p>
            <div className="space-y-3">
              {[
                { text: 'former recruiter at a startup now worth $10B - 4 years' },
                { text: 'personally reviewed 5,000+ resumes' },
                { text: 'expert at optimizing resumes for ATS systems' },
                { text: 'helped 187 people get an offer within 45 days' },
                { text: '3X more callbacks on average' },
              ].map((item, i) => (
                <div
                  key={`dup-${i}`}
                  className="flex gap-3 group hover:translate-x-2 transition-transform"
                >
                  <span className="text-[#7C3AED] mt-0 group-hover:scale-125 transition-transform font-bold leading-[1.7]">→</span>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors font-light text-[15px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              pick your package
            </p>
            <p className="text-gray-600 font-light text-[15px] mb-6">fundraising for single moms with breast cancer • helping people land their dream job</p>
            
            {/* Compact 3-Column Grid */}
            <div className="grid md:grid-cols-3 gap-4">
            
              {/* Package 1: Omega */}
              <div className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-5 hover:border-[#7C3AED] transition-all hover:shadow-lg hover:-translate-y-1 group relative flex flex-col">
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">Omega</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#7C3AED]">$49</p>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">basic resume review</p>
                </div>
                <ul className="space-y-1.5 mb-4 text-gray-700 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">48-72 hour turnaround</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">line-by-line analysis + feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">ats optimization</span>
                  </li>
                </ul>
                <a
                  href="mailto:anish.polakala@gmail.com?subject=Omega Package - $49"
                  className="block w-full text-center px-3 py-2 bg-white border-2 border-[#7C3AED] text-[#7C3AED] rounded font-bold uppercase text-[10px] tracking-wider hover:bg-[#7C3AED] hover:text-white transition-all"
                >
                  get started
                </a>
              </div>

              {/* Package 2: Alpha - Career Accelerator - BEST VALUE */}
              <div className="bg-gradient-to-br from-[#7C3AED]/10 to-transparent backdrop-blur-sm border-2 border-[#7C3AED] rounded-lg p-5 hover:shadow-xl hover:-translate-y-1 transition-all relative flex flex-col">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full font-bold shadow-md">
                  best value
                </div>
                <div className="mb-3 mt-2">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">Alpha</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#7C3AED]">$299</p>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">career accelerator</p>
                </div>
                <ul className="space-y-1.5 mb-4 text-gray-700 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">everything in omega</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">unlimited revisions for 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">unreleased documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">full linkedin audit + optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">repost on my linkedin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">2x 30-minute strategy call 1:1 w/ me</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">access to exclusive seminars with FAANG recruiters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">intensive interview prep (mock interviews + feedback)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">direct connect with someone hiring in your domain</span>
                  </li>
                </ul>
                <p className="text-center text-[10px] text-gray-600 mb-4 font-light">
                  <span className="text-[#7C3AED] font-semibold">85%</span> choose this
                </p>
                <a
                  href="mailto:anish.polakala@gmail.com?subject=Alpha Package - $299"
                  className="block w-full text-center px-3 py-2 bg-[#7C3AED] text-white rounded font-bold uppercase text-[10px] tracking-wider hover:bg-[#6D28D9] transition-all shadow-md"
                >
                  get started
                </a>
              </div>

              {/* Package 3: Beta */}
              <div className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-5 hover:border-[#7C3AED] transition-all hover:shadow-lg hover:-translate-y-1 group relative flex flex-col">
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">Beta</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#7C3AED]">$99</p>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">complete upgrade</p>
                </div>
                <ul className="space-y-1.5 mb-4 text-gray-700 flex-grow">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">everything in omega</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">full resume rewrite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">full linkedin audit + optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">2 revision rounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">30-min 1:1 strategy call w/ me</span>
                  </li>
                </ul>
                <a
                  href="mailto:anish.polakala@gmail.com?subject=Beta Package - $99"
                  className="block w-full text-center px-3 py-2 bg-white border-2 border-[#7C3AED] text-[#7C3AED] rounded font-bold uppercase text-[10px] tracking-wider hover:bg-[#7C3AED] hover:text-white transition-all"
                >
                  get started
                </a>
              </div>

            </div>
            
            {/* Limited Spots Notice */}
            <div className="mt-6 text-center">
              <p className="text-[13px] text-gray-600 font-light">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-pulse"></span>
                  <span className="font-semibold text-gray-700">limited spots available</span>
                  <span>— closing mid-late january</span>
                </span>
              </p>
            </div>
          </div>

          {/* FAQ - Compact */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full" />
              quick answers
            </p>
            <div className="space-y-3">
              <details className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-4 hover:border-[#7C3AED] transition-all group">
                <summary className="font-bold text-gray-900 text-[13px] cursor-pointer list-none flex justify-between items-center">
                  how to contact you?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  through linkedin. send me a message and i'll get back to you as soon as possible.
                </p>
              </details>
              <details className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-4 hover:border-[#7C3AED] transition-all group">
                <summary className="font-bold text-gray-900 text-[13px] cursor-pointer list-none flex justify-between items-center">
                  what industries do you specialize in?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  primarily tech (swe/pm/design), consulting, and finance. but i've helped people in healthcare, marketing, and 99% of major sectors. <br></br>if you're applying to jobs/internships, i can help.
                </p>
              </details>
              <details className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-4 hover:border-[#7C3AED] transition-all group">
                <summary className="font-bold text-gray-900 text-[13px] cursor-pointer list-none flex justify-between items-center">
                  how fast will i get my review?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  depends on the plan. i try to move quickly, but never rush feedback at the expense of quality.
                  <br></br>about 24 hours for omega, 72 hours for beta, and alpha is a intensive 30-day experience with unlimited resources.
                </p>
              </details>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t-2 border-gray-300 text-center">
            <p className="text-xs text-gray-500 font-mono tracking-wider">
              questions? email me at <a href="mailto:anish.polakala@gmail.com" className="text-[#7C3AED] hover:underline font-semibold">anish.polakala@gmail.com</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
