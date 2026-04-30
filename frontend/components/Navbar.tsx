"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/comparison", label: "Compare" },
    { href: "/predictor", label: "Predictor" },
    { href: "/explore", label: "Explore" },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">

          {/* ── LEFT: Logo ── */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{ backgroundColor: "#2A73CC" }}
            >
              CF
            </div>
            <span className="text-2xl font-black text-[#1a365d] tracking-tight group-hover:text-[#2A73CC] transition-colors duration-200">
              CollegeFinder
            </span>
          </Link>

          {/* ── CENTER: Search (desktop) ── */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* ── RIGHT: Nav links + Auth (desktop) ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#2A73CC] bg-[#e8f0fb]"
                      : "text-gray-600 hover:text-[#2A73CC] hover:bg-[#e8f0fb]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="w-px h-5 bg-gray-200 mx-2" />

            {/* Login — outlined */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-md text-sm font-semibold text-[#2A73CC] border border-[#2A73CC] hover:bg-[#e8f0fb] transition-colors duration-200"
            >
              Login
            </Link>

            {/* Sign Up — filled */}
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "#2A73CC" }}
            >
              Sign Up
            </Link>
          </div>

          {/* ── Mobile: hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2">
          {/* Mobile search */}
          <div className="relative mb-3">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search colleges (IIT, NIT, IIIT...)"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#2A73CC] focus:ring-2 focus:ring-[#2A73CC]/20 transition-all duration-200"
            />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#2A73CC] bg-[#e8f0fb]"
                  : "text-gray-600 hover:text-[#2A73CC] hover:bg-[#e8f0fb]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-md text-sm font-semibold text-[#2A73CC] border border-[#2A73CC] hover:bg-[#e8f0fb] transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-md text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: "#2A73CC" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
