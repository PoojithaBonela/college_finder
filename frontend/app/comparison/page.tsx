"use client";

import React, { useRef } from "react";
import { X, MapPin, Building2, ChevronDown, Info, Award, Briefcase, GraduationCap } from "lucide-react";
import { useComparison, College } from "@/context/ComparisonContext";

function parsePackage(value: any): number {
  if (!value) return 0;
  if (typeof value === "number") return value;
  
  let strValue = value.toString().toUpperCase().replace(/,/g, "").trim();
  
  if (strValue.includes("L")) {
    return parseFloat(strValue) * 100000;
  }
  if (strValue.includes("CR")) {
    return parseFloat(strValue) * 10000000;
  }
  return parseFloat(strValue) || 0;
}

function parseNumeric(value: any): number {
    if (!value) return 0;
    if (typeof value === "number") return value;
    const num = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
}

function formatCurrency(num: number, isPackage: boolean = false): string {
  if (!num) return "";

  let unit = "";
  let val = 0;

  if (num >= 10000000) {
    val = num / 10000000;
    unit = "Cr";
  } else {
    val = num / 100000;
    unit = "L";
  }

  const formattedVal = val % 1 === 0 ? val.toString() : val.toFixed(1);
  const result = `₹${formattedVal}${unit}`;

  if (isPackage && unit === "L") {
    return `${result}PA`;
  }
  return result;
}

function formatFees(perYearValue: any) {
  const perYear = parseNumeric(perYearValue);
  if (!perYear) return null;
  
  const total = perYear * 4;
  
  return {
    perYear: `${formatCurrency(perYear)} / year`,
    total: `${formatCurrency(total)} total (4 years)`
  };
}

export default function ComparisonPage() {
  const { selectedColleges, removeCollege } = useComparison();
  const tableRef = useRef<HTMLDivElement>(null);

  const handleCompareNow = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Best values calculations
  const validNirfs = selectedColleges.map((c) => parseNumeric(c.nirf_rank)).filter(v => v > 0);
  const bestNirf = validNirfs.length > 0 ? Math.min(...validNirfs) : Infinity;
  
  const bestRating = Math.max(
    ...selectedColleges.map((c) => parseNumeric(c.rating) || 0)
  );
  
  const bestPackage = Math.max(
    ...selectedColleges.map((c) => parsePackage(c.avg_package))
  );

  const getHighlightClass = (type: 'nirf' | 'rating' | 'package', value: any) => {
    if (!value) return "";
    
    if (type === 'nirf' && (parseNumeric(value) || Infinity) === bestNirf && bestNirf !== Infinity) {
      return "bg-blue-50 text-[#2A73CC] font-bold border-blue-200 border";
    }
    if (type === 'rating' && (parseNumeric(value) || 0) === bestRating && bestRating !== 0) {
      return "bg-blue-50 text-[#2A73CC] font-bold border-blue-200 border";
    }
    if (type === 'package' && parsePackage(value) === bestPackage && bestPackage !== 0) {
      return "bg-blue-50 text-[#2A73CC] font-bold border-blue-200 border";
    }
    return "border border-transparent";
  };

  const renderSlot = (index: number) => {
    const college = selectedColleges[index];
    
    if (college) {
      return (
        <div key={`slot-${index}`} className="flex-1 min-w-[280px] max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300 relative group">
          <button 
            onClick={() => removeCollege(college.id)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors z-10 shadow-sm"
            aria-label="Remove college"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="h-28 bg-gray-100 relative overflow-hidden">
            {college.image_url ? (
               <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                 <Building2 className="w-8 h-8 text-indigo-200" />
               </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{college.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1.5">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {college.city || "Unknown City"}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div key={`empty-slot-${index}`} className="flex-1 min-w-[280px] max-w-sm border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 bg-gray-50/50 text-gray-400 opacity-60">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
          <span className="text-xl font-light text-gray-300">+</span>
        </div>
        <p className="text-sm font-medium">Add College</p>
      </div>
    );
  };

  const renderFallback = (value: any) => {
    return value ? value : <span className="text-gray-400 italic">N/A</span>;
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-24 font-sans">
      {/* Top Section - Simplified */}
      <section className="bg-white border-b border-gray-100 pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Use the search bar in the navigation to add up to 3 colleges and compare them side-by-side.
          </p>
          
          {/* Status Message */}
          <div className="mt-6 max-w-xl mx-auto relative z-50">
            {selectedColleges.length >= 3 ? (
              <div className="w-full py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium text-sm">
                Maximum 3 colleges selected
              </div>
            ) : (
              <div className="w-full py-3 bg-blue-50 border border-blue-100 rounded-xl text-[#2A73CC] font-medium text-sm">
                {selectedColleges.length === 0 
                  ? "Search for colleges above to start comparing" 
                  : `Selected ${selectedColleges.length} of 3 colleges`}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          {[0, 1, 2].map(renderSlot)}
        </div>
        
        {/* Compare Button */}
        <div className="mt-10 flex justify-center h-14">
          {selectedColleges.length >= 2 ? (
            <button
              onClick={handleCompareNow}
              className="group inline-flex items-center gap-2 bg-[#2A73CC] hover:bg-[#2A73CC]/90 text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-blue-200 transition-all hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
            >
              Compare Now
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          ) : (
             <div className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-gray-400 bg-gray-100 border border-gray-200 transition-all text-sm">
               Select at least 2 colleges to compare
             </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      {selectedColleges.length >= 2 && (
        <section ref={tableRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full text-left border-collapse table-fixed">
                <thead className="bg-white z-20 shadow-sm relative">
                  <tr>
                    <th className="p-6 bg-gray-50/80 backdrop-blur border-b border-r border-gray-200 w-1/4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Feature
                    </th>
                    {selectedColleges.map((college, idx) => (
                      <th key={college.id} className="p-6 bg-white border-b border-gray-200 align-top" style={{ width: `${75 / selectedColleges.length}%` }}>
                        <div className="flex flex-col">
                          <h4 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">{college.name}</h4>
                          <span className="text-sm font-medium text-[#2A73CC] mt-1">College {idx + 1}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm md:text-base">
                  
                  {/* Section 1: Basic Info */}
                  <tr>
                    <td colSpan={selectedColleges.length + 1} className="bg-gray-50 px-6 py-3 font-semibold text-gray-900 border-b border-gray-200 border-r-0">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-[#2A73CC]" />
                        Basic Info
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">College Type</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="px-6 py-5 text-gray-900">{renderFallback(c.college_type)}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">Location (State)</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="px-6 py-5 text-gray-900">{renderFallback(c.location)}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">City</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="px-6 py-5 text-gray-900">{renderFallback(c.city)}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">Established Year</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="px-6 py-5 text-gray-900">{renderFallback(c.established_year)}</td>
                    ))}
                  </tr>

                  {/* Section 2: Rankings & Ratings */}
                  <tr>
                    <td colSpan={selectedColleges.length + 1} className="bg-gray-50 px-6 py-3 font-semibold text-gray-900 border-b border-t border-gray-200 border-r-0">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#2A73CC]" />
                        Rankings & Ratings
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">NIRF Rank</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-3 align-top">
                        <div className={`px-4 py-3 rounded-xl h-full flex items-center transition-colors ${getHighlightClass('nirf', c.nirf_rank)}`}>
                           {renderFallback(c.nirf_rank)}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">Rating</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-3 align-top">
                        <div className={`px-4 py-3 rounded-xl h-full flex items-center transition-colors ${getHighlightClass('rating', c.rating)}`}>
                           {c.rating ? `${c.rating} / 5` : renderFallback(c.rating)}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Section 3: Fees & Placement */}
                  <tr>
                    <td colSpan={selectedColleges.length + 1} className="bg-gray-50 px-6 py-3 font-semibold text-gray-900 border-b border-t border-gray-200 border-r-0">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#2A73CC]" />
                        Fees & Placement
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">Tuition Fees</td>
                    {selectedColleges.map((c) => {
                      const fees = formatFees(c.fees);
                      return (
                        <td key={c.id} className="px-6 py-5">
                          {fees ? (
                            <div className="flex flex-col gap-0.5">
                              <span className="text-gray-900 font-bold">{fees.perYear}</span>
                              <span className="text-xs text-gray-400 font-medium">{fees.total}</span>
                            </div>
                          ) : (
                            renderFallback(c.fees)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">Avg Package</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-3 align-top">
                        <div className={`px-4 py-2 rounded-full inline-flex items-center transition-colors text-sm font-bold ${getHighlightClass('package', c.avg_package)}`}>
                           {c.avg_package ? formatCurrency(parsePackage(c.avg_package), true) : renderFallback(c.avg_package)}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white">Placement Rate</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="px-6 py-5 text-gray-900 font-semibold">
                        {c.placement_percentage ? `${c.placement_percentage}%` : renderFallback(c.placement_percentage)}
                      </td>
                    ))}
                  </tr>

                  {/* Section 4: Academics */}
                  <tr>
                    <td colSpan={selectedColleges.length + 1} className="bg-gray-50 px-6 py-3 font-semibold text-gray-900 border-b border-t border-gray-200 border-r-0">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#2A73CC]" />
                        Academics
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-500 border-r border-gray-100 bg-white align-top">Courses</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="px-6 py-5 text-gray-900 leading-relaxed align-top">
                        {c.courses ? (
                          <ul className="space-y-1.5">
                            {c.courses.split(",").map((course, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2A73CC] flex-shrink-0" />
                                {course.trim()}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          renderFallback(c.courses)
                        )}
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
