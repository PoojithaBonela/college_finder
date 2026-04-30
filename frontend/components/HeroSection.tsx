import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* ── Background Image ── */}
      <img
        src="/assets/images/cta.png"
        alt="College campus background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ── Soft Gradient Overlay ── */}
      <div className="absolute inset-0 bg-white/20" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center -translate-y-16">
        
        {/* Top Label */}
        <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#2A73CC] mb-2">
          FROM SEARCH TO DECISION
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-2">
          <span className="text-[#1a365d]">Make Smarter</span><br />
          <span className="text-[#2A73CC]">College Decisions</span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-6 font-medium">
          Search, compare, and predict the best colleges based on your rank
        </p>

        {/* CTA Button */}
        <Link
          href="/predictor"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-white font-semibold text-lg shadow-md hover:opacity-90 transition-all duration-300 active:scale-95"
          style={{ backgroundColor: "#2A73CC" }}
        >
          Get Started
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
