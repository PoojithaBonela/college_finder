"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValue?: string | null;
  onSelect: (value: string | null) => void;
}

export default function FilterDropdown({ label, options, selectedValue, onSelect }: FilterDropdownProps) {
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
        className={`inline-flex items-center justify-center min-w-[120px] px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
          isOpen || selectedValue
            ? "border-[#2A73CC] text-[#2A73CC] bg-blue-50/50" 
            : "border-gray-300 text-gray-700 bg-white hover:border-[#2A73CC] hover:text-[#2A73CC]"
        }`}
      >
        {label}
        <ChevronDown className={`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="py-2">
            {options.map((option) => (
              <div
                key={option}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                  selectedValue === option ? "bg-blue-100 text-[#2A73CC] font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-[#2A73CC]"
                }`}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
