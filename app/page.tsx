"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "HEY, I'M ANISH";
  const [showCursor, setShowCursor] = useState(true);
  const [showHowIStarted, setShowHowIStarted] = useState(false);
  const [showMyGoal, setShowMyGoal] = useState(false);

  // Typing animation
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section - Compact */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated gradient orbs */}
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

        {/* Top Navigation Links - Fixed */}
        <div className="fixed top-8 right-8 z-50 flex items-center gap-6 text-xs uppercase tracking-[0.15em] font-bold h-14">
          <Link href="mailto:anish.polakala@gmail.com" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
            Contact
          </Link>
          <Link href="https://www.linkedin.com/in/anishpolakala/" target="_blank" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
            LinkedIn
          </Link>
          <Link href="https://www.instagram.com/anishtweaksout/" target="_blank" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
            Instagram
          </Link>
          <Link href="/coach" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
            Coach
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-48 pb-20">

          {/* Name and Intro */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-6 tracking-tight font-[family-name:var(--font-inter)]">
              YO I'M ANISH<span className="animate-blink">_</span>
          </h1>
            <p className="text-lg text-gray-700 mb-2">
              serial founder | builder | coach | model
            </p>
            <p className="text-gray-600">
            <span className="text-[#7C3AED] font-medium">18 @ san francisco</span>
            </p>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white">
        {/* Subtle gradient mesh */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>


        <div className="max-w-3xl mx-auto px-6 py-16 relative z-10">


          {/* Quote */}
          <p className="mb-8 text-[15px] text-gray-600 font-light italic">
            "The world belongs to the energetic."    - Ralph Waldo Emerson
          </p>


          {/* Achievements with stagger animation */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              legendary moments
            </p>
            <div className="space-y-3">
              {[
                { text: '7 ventures across industries, 2 acqusitions' },
                { text: "scaled to 1M+ users across products" },
                { text: "developed data systems for the nba, verizon, etc" },
                { text: "head of an ai medical research team as a uc berkeley freshman" },
                { text: "lead 50+ full-time employees before getting my drivers license" },
                { text: "financially independent @ 15 (and lost it all trying new shit)" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 group hover:translate-x-2 transition-transform"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-[#7C3AED] mt-0 group-hover:scale-125 transition-transform font-bold leading-[1.7]">→</span>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors font-light text-[15px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects with hover effects */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              ongoing quests
            </p>
            <div className="space-y-3">
              {[
                { name: "amma", desc: "ai healthtech startup in stealth mode" },
                { name: "cannon app", desc: "the future of computer vision" },
                { name: "paperghost", desc: "linkedin ghostwriting agency for founders" },
                { name: "modeling", desc: "im only going to be in my prime once" },
                { name: "side projects", desc: "bringing my childhood dreams to life" },
              ].map((project, i) => (
                <div
                  key={i}
                  className="flex gap-3 group hover:translate-x-2 transition-transform"
                >
                  <span className="text-[#7C3AED] mt-0 group-hover:scale-125 transition-transform font-bold leading-[1.7]">→</span>
                  <p className="text-gray-700 font-light text-[15px] leading-relaxed">
                    <Link
                      href="#"
                      className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold relative inline-block group/link"
                    >
                      {project.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#7C3AED] group-hover/link:w-full transition-all duration-300" />
                    </Link>{" "}
                    — {project.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="mb-16 max-w-2xl">
            <p className="text text-gray-700 leading-relaxed mb-4 hover:text-gray-900 transition-colors font-light">
            i spent a lot of time alone as a child (not always by choice).<br></br>
            this allowed me to develop my own unique style of thinking without external influence.<br></br>
            it's shaped everything i've built so far.
            <br></br><br></br>if all of this doesn't work out, i'm perfectly happy being homeless for the rest of my life. <br></br>
            at least i'll know i tried.
            </p>
          </div>

          {/* TLDR / Lore */}
          <div className="mb-16 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full" />
              lore
            </p>
            
            {/* Timeline */}
            <div className="mb-8 relative ml-12">
              {/* Vertical line */}
              <div className="absolute left-1 top-0 bottom-0 w-px bg-gray-200" />
              
              <div className="space-y-8">
                {/* Timeline Item 1 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    my first hustle was selling my cousin's old math tests in 5th grade.
                  </p>
                </div>
                
                {/* Timeline Item 2 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    my dad taught me to code when i was 9 y.o.<br/>
                  </p>
                </div>
                
                {/* Timeline Item 3 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                  started my first startup building websites for restaurants<br/>
                  expanded to a webdev agency managing 4 full-time devs
                  </p>
                </div>




                    {/* Timeline Item 3 */}
                  <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    built a new kind of telemedicine platform for ESL patients <br/>
                    sold to an anonymous hospital chain (1st acquisition)
                  </p>
                </div>



                 {/* Timeline Item 3 */}
                 <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    started skipping school to work on my side hustles <br/>
                    founded <a href="https://www.lemonhat.io/" target="_blank" className="text-[#7C3AED] hover:underline font-semibold">lemonhat</a>: delivery system for local farms (scaled to 100K+ users)
                  </p>
                </div>




 

                  {/* Timeline Item 3 */}
                  <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    worked as a founding eng at <a href="https://www.linkedin.com/company/prosimo-io/posts/?feedView=all" target="_blank" className="text-[#7C3AED] hover:underline font-semibold">prosimo</a> <br/>
                    got acquired by palo alto networks ($10B)
                  </p>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    booked a couple amateur modeling shoots bc someone called me chopped
                  </p>
                </div>

            
                {/* Timeline Item 3 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    graduated valedictorian with 63.22% attendance
                  </p>
                </div>


                  {/* Timeline Item 3 */}
                  <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    full-sweeped college apps (except stanford)<br/>
                    started freshman year at berkeley
                  </p>
                </div>



                  {/* Timeline Item 3 */}
                  <div className="relative pl-8">
                  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    skipped my cs final for a <a href="https://www.ycombinator.com/" target="_blank" className="text-[#7C3AED] hover:underline font-semibold">yc</a> interview
                  </p>
                </div>

              </div>


              
        </div>

            {/* HOW I STARTED - Expandable Section */}
            <div className="mb-6">
              <button
                onClick={() => setShowHowIStarted(!showHowIStarted)}
                className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold">
                    MOTIVATION
                  </h3>
                  <span className="text-[#7C3AED] font-bold text-xs uppercase tracking-wider hover:underline">
                    {showHowIStarted ? 'CLOSE' : 'OPEN'}
                  </span>
                </div>
              </button>
              
              {showHowIStarted && (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mt-2 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-gray-700 leading-relaxed font-semibold text-[15px]">
                    my dad worked 10x harder than me.
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                      first, he was the middle-class kid paying his family's electricity bill.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                      then the student paying off his own tuition.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                      then the husband on a visa with two babies to feed.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    3 jobs at once. 5am commutes. 96-hour shifts
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                      no safety net. no do-overs. dreams parked.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                      his whole life was making sure someone else was safe.
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                      i'm taking the risks he was never able to.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-semibold text-[15px]">
                      he's the reason i'm going all in.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* MY GOAL - Expandable Section */}
            <div className="mb-6">
              <button
                onClick={() => setShowMyGoal(!showMyGoal)}
                className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold">
                    Final Level
                  </h3>
                  <span className="text-[#7C3AED] font-bold text-xs uppercase tracking-wider hover:underline">
                    {showMyGoal ? 'CLOSE' : 'OPEN'}
                  </span>
                </div>
              </button>
              
              {showMyGoal && (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mt-2 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
                    build an empire<br></br>
                    maybe get a girlfriend
                  </p>
                </div>
              )}
            </div>
          </div>


          {/* Footer */}
          <div className="pt-16 border-t-2 border-gray-300 text-center">
            <p className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-mono tracking-wider">
              © 2023 anish polakala • lifemaxxer
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 3rem;
          }
        }
        
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        
        .animate-expand {
          animation: expand 0.8s ease-out;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
