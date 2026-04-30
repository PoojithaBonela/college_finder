"use client";

import React from "react";
import { X } from "lucide-react";
import LocationDropdown from "./LocationDropdown";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";

interface FilterBarProps {
  selectedFilters: Record<string, string | null>;
  onFilterChange: (label: string, value: string | null) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
  onClearAll: () => void;
}

export default function FilterBar({
  selectedFilters = {},
  onFilterChange = () => {},
  selectedSort = "Fees: Low → High",
  onSortChange = () => {},
  onClearAll = () => {},
}: Partial<FilterBarProps>) {
  
  const filterConfig = [
    { label: "Type", options: ["IIT", "NIT", "IIIT", "Private"] },
    { label: "Fees", options: ["Under 1.5L", "1.5L – 2L", "2L – 2.5L", "2.5L – 3L", "Above 3L"] },
    { label: "Rating", options: ["4.5+", "4.2+", "4.0+"] },
    { label: "NIRF Rank", options: ["Top 10", "Top 20", "Top 30", "Top 50"] },
  ];

  // Get active filters for tags section
  const activeFilters = Object.entries(selectedFilters || {}).filter(([_, value]) => value !== null);

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        
        {/* ── Filters + Sort Row ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Custom Location Dropdown */}
            <LocationDropdown 
              selectedValue={selectedFilters.Location} 
              onSelect={(val) => onFilterChange("Location", val)} 
            />

            {/* Other Filters (Reusable) */}
            {filterConfig.map((filter) => (
              <FilterDropdown 
                key={filter.label} 
                label={filter.label} 
                options={filter.options}
                selectedValue={selectedFilters[filter.label]}
                onSelect={(val) => onFilterChange(filter.label, val)}
              />
            ))}
          </div>

          {/* Sort + Clear Group ── */}
          <div className="flex items-center justify-start lg:justify-end gap-4 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100 lg:ml-auto">
            <div className="lg:flex-none">
              <SortDropdown 
                selectedValue={selectedSort} 
                onSelect={onSortChange} 
              />
            </div>
            
            <button 
              onClick={onClearAll}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-600 transition-all whitespace-nowrap ml-auto lg:ml-0"
            >
              <X className="mr-1 h-4 w-4" />
              Clear
            </button>
          </div>

        </div>

        {/* ── Selected Filters Section ── */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
              Active Filters:
            </span>
            {activeFilters.map(([label, value]) => (
              <div 
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-[#2A73CC]"
              >
                <span className="text-blue-400 font-normal">{label}:</span>
                {value}
                <button 
                  onClick={() => onFilterChange(label, null)}
                  className="p-0.5 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button 
              onClick={onClearAll}
              className="text-xs text-gray-500 hover:text-gray-800 underline underline-offset-2 ml-2"
            >
              Clear All
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
