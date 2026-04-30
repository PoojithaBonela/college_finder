"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterBar from "@/components/FilterBar";
import CollegeCard from "@/components/CollegeCard";
import { Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/utils/api";

interface College {
  id: number | string;
  name: string;
  city: string;
  location?: string;
  established_year?: number | string;
  rating?: number | string;
  nirf_rank?: number | string;
  college_type?: string;
  image_url?: string;
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") || "";
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize state directly from URL params to avoid double-fetch
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>(() => {
    const filters: Record<string, string | null> = {
      Location: searchParams.get("location"),
      Type: searchParams.get("type"),
      Fees: null,
      Rating: searchParams.get("rating") ? `${searchParams.get("rating")}+` : null,
      "NIRF Rank": searchParams.get("nirf_rank") ? `Top ${searchParams.get("nirf_rank")}` : null,
    };

    if (searchParams.get("fees")) {
      const reverseFeesMap: Record<string, string> = {
        "under_1_5": "Under 1.5L",
        "1_5_to_2": "1.5L – 2L",
        "2_to_2_5": "2L – 2.5L",
        "2_5_to_3": "2.5L – 3L",
        "above_3": "Above 3L"
      };
      filters.Fees = reverseFeesMap[searchParams.get("fees")!] || null;
    }
    return filters;
  });

  const [selectedSort, setSelectedSort] = useState(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      const reverseSortMap: Record<string, string> = {
        "fees_asc": "Fees: Low → High",
        "fees_desc": "Fees: High → Low",
        "rating_desc": "Rating: High → Low",
        "rating_asc": "Rating: Low → High",
        "nirf_best": "NIRF Rank: Best First",
        "newest": "Newest Colleges",
        "oldest": "Oldest Colleges"
      };
      return reverseSortMap[sortParam] || "Fees: Low → High";
    }
    return "Fees: Low → High";
  });

  const handleFilterChange = (label: string, value: string | null) => {
    // If we are applying a new filter and there is a search query active,
    // we should clear the search from the URL to allow the filters to take over.
    if (value && initialSearch) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.replace(`/explore?${params.toString()}`);
    }
    setSelectedFilters(prev => ({ ...prev, [label]: value }));
  };

  const handleClearAll = () => {
    setSelectedFilters({
      Location: null,
      Type: null,
      Fees: null,
      Rating: null,
      "NIRF Rank": null,
    });
  };

  // Sync: Clear filter state if a search is active in the URL
  // This ensures the UI (FilterBar) stays in sync with the URL
  useEffect(() => {
    if (initialSearch) {
      const hasActiveFilters = Object.values(selectedFilters).some(val => val !== null);
      if (hasActiveFilters) {
        setSelectedFilters({
          Location: null,
          Type: null,
          Fees: null,
          Rating: null,
          "NIRF Rank": null,
        });
      }
    }
  }, [initialSearch]);

  // Fetch logic: Runs when search, filters, or sort changes
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const url = new URL(`${API_BASE_URL}/colleges`);
        
        // Use Search if present
        if (initialSearch) {
          url.searchParams.append("search", initialSearch);
        } else {
          // Otherwise use Filters
          if (selectedFilters.Location) url.searchParams.append("location", selectedFilters.Location);
          if (selectedFilters.Type) url.searchParams.append("type", selectedFilters.Type);
          
          if (selectedFilters.Fees) {
            const feesMap: Record<string, string> = {
              "Under 1.5L": "under_1_5",
              "1.5L – 2L": "1_5_to_2",
              "2L – 2.5L": "2_to_2_5",
              "2.5L – 3L": "2_5_to_3",
              "Above 3L": "above_3"
            };
            url.searchParams.append("fees", feesMap[selectedFilters.Fees] || selectedFilters.Fees);
          }

          if (selectedFilters.Rating) {
            const ratingMap: Record<string, string> = {
              "4.5+": "4.5",
              "4.2+": "4.2",
              "4.0+": "4.0"
            };
            url.searchParams.append("rating", ratingMap[selectedFilters.Rating] || selectedFilters.Rating);
          }

          if (selectedFilters["NIRF Rank"]) {
            const nirfMap: Record<string, string> = {
              "Top 10": "10",
              "Top 20": "20",
              "Top 30": "30",
              "Top 50": "50"
            };
            url.searchParams.append("nirf_rank", nirfMap[selectedFilters["NIRF Rank"]] || selectedFilters["NIRF Rank"]);
          }
        }
        
        // Always add sort
        if (selectedSort) {
          const sortMap: Record<string, string> = {
            "Fees: Low → High": "fees_asc",
            "Fees: High → Low": "fees_desc",
            "Rating: High → Low": "rating_desc",
            "Rating: Low → High": "rating_asc",
            "NIRF Rank: Best First": "nirf_best",
            "Newest Colleges": "newest",
            "Oldest Colleges": "oldest"
          };
          url.searchParams.append("sort", sortMap[selectedSort] || selectedSort);
        }
        
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setColleges(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching colleges:", error);
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [initialSearch, selectedFilters, selectedSort]);

  // Derived variable for header title
  const hasActiveFilters = Object.values(selectedFilters).some(val => val !== null);
  const pageTitle = (initialSearch && !hasActiveFilters) 
    ? `Results for "${initialSearch}"` 
    : "All Colleges";

  return (
    <main className="min-h-screen bg-gray-50/50">
      <FilterBar 
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onClearAll={handleClearAll}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-[#1a365d] tracking-tight">
            {pageTitle}
            <span className="ml-3 text-sm font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
              {colleges.length} Found
            </span>
          </h1>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#2A73CC] animate-spin" />
            <p className="text-gray-500 font-medium italic">Filtering the best options for you...</p>
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                city={college.city}
                location={college.location || "India"}
                established_year={college.established_year || "N/A"}
                rating={college.rating || "4.5"}
                nirf_rank={college.nirf_rank || "N/A"}
                college_type={college.college_type || "Institute"}
                image_url={college.image_url}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
            <div className="text-gray-400 mb-4 flex justify-center">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No colleges found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters to see more results.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <ExploreContent />
    </Suspense>
  );
}
