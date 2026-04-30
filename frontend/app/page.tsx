"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import TrendingSection from "@/components/TrendingSection";

export default function HomePage() {
  const router = useRouter();

  const handleFilterChange = (label: string, value: string | null) => {
    if (!value) return;

    // Map labels to URL params
    const paramMap: Record<string, string> = {
      Location: "location",
      Type: "type",
      Fees: "fees",
      Rating: "rating",
      "NIRF Rank": "nirf_rank"
    };

    const paramName = paramMap[label] || label.toLowerCase();
    
    // For Fees, Rating, and NIRF, we need to map the labels to API values
    let finalValue = value;
    if (label === "Fees") {
      const feesMap: Record<string, string> = {
        "Under 1.5L": "under_1_5",
        "1.5L – 2L": "1_5_to_2",
        "2L – 2.5L": "2_to_2_5",
        "2.5L – 3L": "2_5_to_3",
        "Above 3L": "above_3"
      };
      finalValue = feesMap[value] || value;
    } else if (label === "Rating") {
      finalValue = value.replace("+", "");
    } else if (label === "NIRF Rank") {
      finalValue = value.replace("Top ", "");
    }

    // Redirect to explore page with the selected filter
    router.push(`/explore?${paramName}=${encodeURIComponent(finalValue)}`);
  };

  return (
    <main className="bg-white">
      <FilterBar onFilterChange={handleFilterChange} />
      <HeroSection />
      
      {/* Careers360 Style Enhancements */}
      <ProductGrid />
      <TrendingSection />
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-6 mb-16 rounded-3xl max-w-7xl mx-auto border border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-[#1a365d]">Confused about your career?</h2>
          <p className="text-gray-500 mb-8 text-lg font-medium">
            Our experts can help you choose the right path. Talk to us today.
          </p>
          <button className="bg-[#2A73CC] hover:bg-blue-600 text-white font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-blue-200">
            Talk to Expert
          </button>
        </div>
      </section>
    </main>
  );
}
