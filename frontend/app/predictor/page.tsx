"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Target, ArrowRight, Loader2, ChevronDown, Trophy, Star, MapPin } from "lucide-react";
import { API_BASE_URL } from "@/utils/api";
import CollegeCard from "@/components/CollegeCard";

interface College {
  id: number | string;
  name: string;
  city: string;
  location?: string;
  established_year?: number | string;
  rating?: number | string;
  nirf_rank?: number | string;
  college_type: string;
  image_url?: string;
}

export default function PredictorPage() {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("General");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<College[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({
    IIT: 4,
    NIT: 4,
    IIIT: 4,
    Private: 4,
  });

  const categories = [
    "General",
    "Economically Weaker Section",
    "Other Backward Class - Non Creamy Layer",
    "Scheduled Caste",
    "Scheduled Tribe"
  ];

  const adjustRank = (rankNum: number, cat: string) => {
    const factors: Record<string, number> = {
      "General": 1,
      "Economically Weaker Section": 0.9,
      "Other Backward Class - Non Creamy Layer": 0.8,
      "Scheduled Caste": 0.65,
      "Scheduled Tribe": 0.6
    };
    return Math.floor(rankNum * (factors[cat] || 1));
  };

  const getCollegeTypes = (rankNum: number) => {
    if (rankNum <= 2000) return ["IIT", "NIT", "IIIT", "Private"];
    if (rankNum <= 10000) return ["NIT", "IIIT", "Private"];
    if (rankNum <= 30000) return ["NIT", "IIIT", "Private"];
    if (rankNum <= 100000) return ["IIIT", "Private"];
    return ["Private"];
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    const rankNum = Number(rank);
    if (!rankNum || rankNum > 500000) return;

    setLoading(true);
    try {
      const adjustedRank = adjustRank(rankNum, category);
      const response = await fetch(`${API_BASE_URL}/colleges`);
      const data = await response.json();
      
      const allowedTypes = getCollegeTypes(adjustedRank);
      const filtered = data.filter((c: College) => allowedTypes.includes(c.college_type));
      
      // Sort each group by NIRF Rank
      const sorted = filtered.sort((a: College, b: College) => {
        const rankA = parseInt(String(a.nirf_rank)) || 999;
        const rankB = parseInt(String(b.nirf_rank)) || 999;
        return rankA - rankB;
      });

      setResults(sorted);
      setActiveTab(allowedTypes[0] || "");
      setShowResults(true);
      
      // Reset visible counts when new prediction is made
      setVisibleCounts({
        IIT: 4,
        NIT: 4,
        IIIT: 4,
        Private: 4,
      });

      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: 500, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  const allowedTabs = useMemo(() => {
    const rankNum = Number(rank);
    if (!rankNum) return [];
    const adjustedRank = adjustRank(rankNum, category);
    return getCollegeTypes(adjustedRank);
  }, [rank, category, showResults]);

  const filteredResults = useMemo(() => {
    return results.filter(c => c.college_type === activeTab);
  }, [results, activeTab]);

  const handleLoadMore = (tab: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [tab]: prev[tab] + 4
    }));
  };

  const isFormValid = rank && !isNaN(Number(rank)) && Number(rank) > 0 && Number(rank) <= 500000;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* ── Predictor Input Section ── */}
      <div className="flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-10 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl">
                <Target className="w-6 h-6 text-[#2A73CC]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1a365d]">JEE College Predictor</h1>
                <p className="text-gray-500 text-sm font-medium">Enter your rank to discover the best colleges for you</p>
              </div>
            </div>

            <form onSubmit={handlePredict} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Rank Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#1a365d] uppercase tracking-wider ml-1">JEE Main Rank</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 24500"
                    value={rank}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (Number(val) <= 500000) setRank(val);
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A73CC]/10 focus:border-[#2A73CC] transition-all"
                  />
                  <p className="text-[11px] text-gray-400 flex items-center gap-1 ml-1">Max rank allowed: 500,000</p>
                </div>

                {/* Custom Category Dropdown */}
                <div className="space-y-2 relative">
                  <label className="block text-sm font-bold text-[#1a365d] uppercase tracking-wider ml-1">Category</label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium flex items-center justify-between hover:border-gray-300 transition-all focus:ring-2 focus:ring-[#2A73CC]/10"
                  >
                    <span>{category}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setCategory(cat);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                            category === cat ? "bg-blue-50 text-[#2A73CC]" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                  isFormValid && !loading
                    ? "bg-[#2A73CC] text-white hover:bg-[#1a365d] hover:shadow-blue-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Predict Colleges"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Results Section ── */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold text-[#1a365d] mb-2 italic">Based on your rank, here are your best college options</h2>
            <div className="w-20 h-1 bg-[#2A73CC] mx-auto rounded-full" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-white border border-gray-200 rounded-2xl shadow-sm">
              {allowedTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-[#1a365d] text-white shadow-lg"
                      : "text-gray-500 hover:text-[#1a365d] hover:bg-gray-50"
                  }`}
                >
                  {tab} ({results.filter(c => c.college_type === tab).length})
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filteredResults.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredResults.slice(0, visibleCounts[activeTab]).map((college) => (
                  <CollegeCard
                    key={college.id}
                    id={college.id}
                    name={college.name}
                    city={college.city}
                    location={college.location || "India"}
                    established_year={college.established_year || "N/A"}
                    rating={college.rating || "4.5"}
                    nirf_rank={college.nirf_rank || "N/A"}
                    college_type={college.college_type}
                    image_url={college.image_url}
                  />
                ))}
              </div>

              {/* Load More */}
              {visibleCounts[activeTab] < filteredResults.length && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => handleLoadMore(activeTab)}
                    className="flex items-center gap-2 px-10 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#1a365d] shadow-sm hover:shadow-md hover:border-[#2A73CC] transition-all"
                  >
                    Load More {activeTab}s
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">No {activeTab}s found for this rank range.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
