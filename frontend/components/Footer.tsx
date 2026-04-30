import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Column 1 — Branding */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm bg-[#2A73CC]"
              >
                CF
              </div>
              <span className="text-xl font-bold text-white">
                CollegeFinder
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find the right college smarter. Compare, explore, and predict your future.
            </p>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm hover:text-white transition">Explore Colleges</Link></li>
              <li><Link href="/comparison" className="text-sm hover:text-white transition">Compare Colleges</Link></li>
              <li><Link href="/explore?type=IIT" className="text-sm hover:text-white transition">Top IITs</Link></li>
              <li><Link href="/explore?type=NIT" className="text-sm hover:text-white transition">Top NITs</Link></li>
              <li><Link href="/explore?type=Private" className="text-sm hover:text-white transition">Top Private Colleges</Link></li>
            </ul>
          </div>

          {/* Column 3 — Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/predictor" className="text-sm hover:text-white transition">College Predictor</Link></li>
              <li><Link href="/predictor" className="text-sm hover:text-white transition">Rank Predictor</Link></li>
              <li><Link href="/comparison" className="text-sm hover:text-white transition">Compare Tool</Link></li>
            </ul>
          </div>

          {/* Column 4 — Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm hover:text-white transition">Courses</Link></li>
              <li><Link href="/explore" className="text-sm hover:text-white transition">Placements</Link></li>
              <li><Link href="/explore" className="text-sm hover:text-white transition">Fees Insights</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            © 2026 CollegeFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
