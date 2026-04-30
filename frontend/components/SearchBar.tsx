"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/utils/api";
import { useRouter, usePathname } from "next/navigation";

interface College {
  id: number | string;
  name: string;
  city: string;
}

interface SearchBarProps {
  onSelect?: (college: College) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps = {}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<College[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isComparisonPage = pathname === "/comparison";

  // Debounced API call
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/colleges?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        // Limit to 5 results
        setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (college: College) => {
    setShowDropdown(false);
    setQuery("");
    if (onSelect) {
      onSelect(college);
    } else {
      router.push(`/explore?search=${college.name}`);
    }
  };

  const handleViewAll = () => {
    setShowDropdown(false);
    if (!onSelect) {
      router.push(`/explore?search=${query}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      {/* ── Search Input ── */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#2A73CC] transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A73CC]/20 focus:border-[#2A73CC] transition-all"
          placeholder="Search colleges (IIT, NIT, IIIT...)"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-5 w-5 border-2 border-[#2A73CC] border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* ── Suggestions Dropdown ── */}
      {showDropdown && query.length >= 2 && (
        <div className="absolute z-[100] mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {suggestions.length > 0 ? (
              <>
                {suggestions.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => handleSelect(college)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 group flex items-start gap-3 transition-colors"
                  >
                    <div className="mt-1 bg-gray-100 p-1.5 rounded-lg group-hover:bg-white transition-colors">
                      <Search className="h-4 w-4 text-gray-400 group-hover:text-[#2A73CC]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-[#2A73CC]">
                        {college.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {college.city}
                      </div>
                    </div>
                  </button>
                ))}
                
                {/* View All Results */}
                {!isComparisonPage && (
                  <button
                    onClick={handleViewAll}
                    className="w-full text-left px-4 py-3 border-t border-gray-50 bg-gray-50/50 hover:bg-blue-50 flex items-center justify-between group transition-colors"
                  >
                    <span className="text-sm font-bold text-[#2A73CC]">View all results for "{query}"</span>
                    <ArrowRight className="h-4 w-4 text-[#2A73CC] transform group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </>
            ) : !loading ? (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                No colleges found matching "{query}"
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
