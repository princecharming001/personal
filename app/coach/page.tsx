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
              COACHING SERVICES
            </h1>
            <p className="text-lg text-gray-700 mb-2 font-light leading-relaxed max-w-2xl">
              i've reviewed 500+ resumes and helped students land offers at top companies.
            </p>
            <p className="text-gray-600">
              <span className="text-[#7C3AED] font-medium">let me help you stand out.</span>
            </p>
          </div>

          {/* Qualifications Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              why work with me
            </p>
            <div className="space-y-3">
              {[
                { text: '500+ resumes reviewed across faang, startups, and fortune 500s' },
                { text: 'helped students 3x their interview callbacks' },
                { text: 'former recruiter at a $10b company — i know what gets past ats' },
                { text: 'built linkedin profiles that went from 50 to 2000+ monthly impressions' },
                { text: '24-48 hour turnaround (i dont waste your time)' },
              ].map((item, i) => (
                <div
                  key={i}
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

          {/* Trust Builders */}
          <div className="mb-12 grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/30 backdrop-blur-sm rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-[#7C3AED] mb-1">500+</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 font-bold">resumes reviewed</p>
            </div>
            <div className="text-center p-4 bg-white/30 backdrop-blur-sm rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-[#7C3AED] mb-1">3x</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 font-bold">more callbacks</p>
            </div>
            <div className="text-center p-4 bg-white/30 backdrop-blur-sm rounded-lg border border-gray-200">
              <p className="text-2xl font-bold text-[#7C3AED] mb-1">24hr</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 font-bold">turnaround</p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              pick your package
            </p>
            <p className="text-gray-600 font-light text-[15px] mb-6">100% money back guarantee • no questions asked</p>
            
            {/* Compact 3-Column Grid */}
            <div className="grid md:grid-cols-3 gap-4">
            
              {/* Package 1: Resume Review */}
              <div className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-5 hover:border-[#7C3AED] transition-all hover:shadow-lg hover:-translate-y-1 group relative">
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">Resume</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#7C3AED]">$50</p>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">for job seekers</p>
                </div>
                <ul className="space-y-1.5 mb-4 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">line-by-line feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">ats optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">24hr delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">1 revision round</span>
                  </li>
                </ul>
                <a
                  href="mailto:anish.polakala@gmail.com?subject=Resume Review - $50"
                  className="block w-full text-center px-3 py-2 bg-white border-2 border-[#7C3AED] text-[#7C3AED] rounded font-bold uppercase text-[10px] tracking-wider hover:bg-[#7C3AED] hover:text-white transition-all"
                >
                  get started
                </a>
              </div>

              {/* Package 2: Resume + LinkedIn - BEST VALUE */}
              <div className="bg-gradient-to-br from-[#7C3AED]/10 to-transparent backdrop-blur-sm border-2 border-[#7C3AED] rounded-lg p-5 hover:shadow-xl hover:-translate-y-1 transition-all relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full font-bold shadow-md">
                  best value
                </div>
                <div className="mb-3 mt-2">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">Resume + LinkedIn</h3>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 line-through font-light">$150</p>
                      <p className="text-2xl font-bold text-[#7C3AED]">$100</p>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">most popular</p>
                </div>
                <ul className="space-y-1.5 mb-4 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">all resume features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">linkedin optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">headline rewrite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">48hr delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">2 revision rounds</span>
                  </li>
                </ul>
                <a
                  href="mailto:anish.polakala@gmail.com?subject=Resume + LinkedIn - $100"
                  className="block w-full text-center px-3 py-2 bg-[#7C3AED] text-white rounded font-bold uppercase text-[10px] tracking-wider hover:bg-[#6D28D9] transition-all shadow-md"
                >
                  get started
                </a>
                <p className="text-center text-[10px] text-gray-600 mt-2 font-light">
                  <span className="text-[#7C3AED] font-semibold">87%</span> choose this
                </p>
              </div>

              {/* Package 3: Full Package */}
              <div className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-5 hover:border-[#7C3AED] transition-all hover:shadow-lg hover:-translate-y-1 group relative">
                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-bold text-gray-900">Premium</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#7C3AED]">$200</p>
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">for serious job seekers</p>
                </div>
                <ul className="space-y-1.5 mb-4 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">all resume + linkedin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">1hr coaching call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">interview prep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">job search strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7C3AED] text-xs mt-0.5">✓</span>
                    <span className="font-light text-[13px] leading-snug">unlimited revisions (7d)</span>
                  </li>
                </ul>
                <a
                  href="mailto:anish.polakala@gmail.com?subject=Full Package - $200"
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
                  <span className="font-semibold text-gray-700">4 spots left this week</span>
                  <span>— book now to secure your slot</span>
                </span>
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              success stories
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/40 backdrop-blur-sm border-l-4 border-[#7C3AED] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#7C3AED] font-bold text-sm">S</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Sarah Chen</p>
                    <p className="text-[11px] text-gray-500">SWE @ Google</p>
                  </div>
                </div>
                <p className="text-gray-700 italic font-light text-[13px] leading-relaxed">
                  "landed interviews at google, meta, and stripe after anish's review. brutally honest feedback = exactly what i needed."
                </p>
                <div className="mt-2 flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-[#7C3AED] text-xs">★</span>
                  ))}
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-sm border-l-4 border-[#7C3AED] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#7C3AED] font-bold text-sm">M</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Marcus Williams</p>
                    <p className="text-[11px] text-gray-500">PM @ Microsoft</p>
                  </div>
                </div>
                <p className="text-gray-700 italic font-light text-[13px] leading-relaxed">
                  "linkedin impressions went from 50/month → 2000+/month. worth every penny. response rate tripled overnight."
                </p>
                <div className="mt-2 flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-[#7C3AED] text-xs">★</span>
                  ))}
                </div>
              </div>
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
                  how does payment work?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  email me with your package choice → i send venmo/paypal request → you pay → send me your materials → i deliver within 24-48hrs
                </p>
              </details>
              <details className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-4 hover:border-[#7C3AED] transition-all group">
                <summary className="font-bold text-gray-900 text-[13px] cursor-pointer list-none flex justify-between items-center">
                  what if i'm not satisfied?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  100% money back guarantee. no questions asked. i want you to land the job, not waste your money.
                </p>
              </details>
              <details className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-4 hover:border-[#7C3AED] transition-all group">
                <summary className="font-bold text-gray-900 text-[13px] cursor-pointer list-none flex justify-between items-center">
                  what industries do you specialize in?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  tech (swe, pm, design), consulting, finance. but i've helped people in healthcare, marketing, sales, and more. if you're applying to jobs, i can help.
                </p>
              </details>
              <details className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-4 hover:border-[#7C3AED] transition-all group">
                <summary className="font-bold text-gray-900 text-[13px] cursor-pointer list-none flex justify-between items-center">
                  how fast will i get my review?
                  <span className="text-[#7C3AED] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 font-light text-[13px] leading-relaxed mt-3 pl-1">
                  resume review: 24hrs. resume + linkedin: 48hrs. full package: coordinated based on your schedule for the call.
                </p>
              </details>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mb-12 text-center bg-gradient-to-br from-[#7C3AED]/5 to-transparent border-2 border-[#7C3AED]/30 rounded-lg p-8">
            <p className="text-[13px] text-gray-600 font-light mb-4">
              still on the fence?
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              book a free 15-min chat
            </h3>
            <p className="text-[13px] text-gray-600 font-light mb-4 max-w-md mx-auto">
              not sure which package is right? let's talk. i'll tell you exactly what you need (even if it's not me).
            </p>
            <a
              href="mailto:anish.polakala@gmail.com?subject=Free 15min Consultation"
              className="inline-block px-6 py-2.5 bg-white border-2 border-[#7C3AED] text-[#7C3AED] rounded font-bold uppercase text-xs tracking-wider hover:bg-[#7C3AED] hover:text-white transition-all"
            >
              schedule free call
            </a>
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
