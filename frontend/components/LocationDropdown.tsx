"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", 
  "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", 
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal"
];

const cities = [
  "Agartala", "Aizawl", "Bangalore", "Bhilai", "Bhopal", "Bhubaneswar", 
  "Chennai", "Coimbatore", "Dehradun", "Dhanbad", "Dharwad", "Dimapur", 
  "Durgapur", "Gandhinagar", "Goa", "Greater Noida", "Guwahati", "Gwalior", 
  "Hamirpur", "Hyderabad", "Imphal", "Indore", "Jaipur", "Jalandhar", 
  "Jammu", "Jamshedpur", "Jodhpur", "Kanpur", "Karaikal", "Kharagpur", 
  "Kota", "Kozhikode", "Krishnankoil", "Kurukshetra", "Lucknow", "Manipal", 
  "Mandi", "Mohali", "Mumbai", "Mysore", "Nagpur", "New Delhi", "Noida", 
  "Palakkad", "Patiala", "Patna", "Phagwara", "Pilani", "Ponda", "Prayagraj", 
  "Pune", "Raipur", "Ravangla", "Roorkee", "Rourkela", "Rupnagar", "Shillong", 
  "Silchar", "Srinagar", "Sri City", "Surampalem", "Surathkal", 
  "Tadepalligudem", "Thanjavur", "Tiruchirappalli", "Tirupati", "Vadodara", 
  "Varanasi", "Vellore", "Vijayawada", "Visakhapatnam", "Warangal", "Yupia"
];

interface LocationDropdownProps {
  selectedValue?: string | null;
  onSelect: (value: string | null) => void;
}

export default function LocationDropdown({ selectedValue, onSelect }: LocationDropdownProps) {
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
        Location
        <ChevronDown className={`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="max-h-80 overflow-y-auto custom-scrollbar py-2">
            
            {/* Section: States */}
            <div className="mb-2">
              <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                States
              </h3>
              <div className="flex flex-col">
                {states.map((state) => (
                  <div
                    key={state}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                      selectedValue === state ? "bg-blue-100 text-[#2A73CC] font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-[#2A73CC]"
                    }`}
                    onClick={() => {
                      onSelect(state);
                      setIsOpen(false);
                    }}
                  >
                    {state}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1" />

            {/* Section: Cities */}
            <div>
              <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Cities
              </h3>
              <div className="flex flex-col">
                {cities.map((city) => (
                  <div
                    key={city}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                      selectedValue === city ? "bg-blue-100 text-[#2A73CC] font-semibold" : "text-gray-700 hover:bg-blue-50 hover:text-[#2A73CC]"
                    }`}
                    onClick={() => {
                      onSelect(city);
                      setIsOpen(false);
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>

          </div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 999px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
