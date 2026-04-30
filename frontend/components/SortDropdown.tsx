"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  "Fees: Low → High",
  "Fees: High → Low",
  "Rating: High → Low",
  "Rating: Low → High",
  "NIRF Rank: Best First",
  "Newest Colleges",
  "Oldest Colleges"
];

interface SortDropdownProps {
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function SortDropdown({ selectedValue, onSelect }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center min-w-[140px] px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
          isOpen 
            ? "border-[#2A73CC] text-[#2A73CC] bg-blue-50/50" 
            : "border-gray-300 text-gray-700 bg-white hover:border-[#2A73CC] hover:text-[#2A73CC]"
        }`}
      >
        <span className="truncate max-w-[120px]">{selectedValue || "Sort"}</span>
        <ChevronDown className={`ml-2 h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="py-2">
            {sortOptions.map((option) => {
              const isSelected = selectedValue === option;
              return (
                <div
                  key={option}
                  className={`px-4 py-2.5 text-sm flex items-center gap-3 cursor-pointer transition-colors duration-150 ${
                    isSelected 
                      ? "bg-blue-50 text-[#2A73CC]" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#2A73CC]"
                  }`}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {/* Radio-style indicator */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? "border-[#2A73CC]" : "border-gray-300"
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#2A73CC]" />
                    )}
                  </div>
                  <span className={isSelected ? "font-semibold" : "font-medium"}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
