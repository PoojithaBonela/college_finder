"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star, Trophy, MapPin, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/utils/api";

interface College {
  id: number | string;
  name: string;
  city: string;
  location: string;
  established_year: number | string;
  rating: number | string;
  nirf_rank: number | string;
  college_type: string;
  image_url?: string;
  description?: string;
  placement_percentage?: number | string;
  avg_package?: number | string;
  courses?: string;
  fees: number;
}

export default function CollegeDetailsPage() {
  const params = useParams();
  const id = params.id;
  
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);

  // Helpers for formatting
  const formatLPA = (val?: number | string) => {
    if (!val) return "N/A";
    const num = typeof val === "string" ? parseFloat(val) : val;
    if (isNaN(num)) return "N/A";
    if (num < 1000) return `${num} LPA`;
    return `${(num / 100000).toFixed(1)} LPA`;
  };

  const formatLakhs = (num: number) => `₹${(num / 100000).toFixed(1)} L`;

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/colleges/${id}`);
        if (!response.ok) throw new Error("College not found");
        const data = await response.json();
        setCollege(data);
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCollegeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-[#2A73CC] animate-spin" />
        <p className="text-gray-500 font-medium">Loading college details...</p>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">College Not Found</h1>
        <p className="mt-2 text-gray-500">We couldn't find the college you were looking for.</p>
      </div>
    );
  }

  // Hero Image logic
  const typeKey = (college.college_type || "Private").toUpperCase();
  const heroImage = typeKey.includes("IIT") ? "/assets/images/IIT.png" :
                    typeKey.includes("NIT") ? "/assets/images/NIT.png" :
                    typeKey.includes("IIIT") ? "/assets/images/IIIT.png" :
                    "/assets/images/private.png";

  // Data processing
  const courseList = college.courses ? college.courses.split(",") : [];
  const totalFees = college.fees || 0;
  const perYearFees = totalFees / 4;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* ── Hero Image Section ── */}
      <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden">
        <img 
          src={heroImage} 
          alt={college.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ── Profile Section ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <img
              src={college.image_url || heroImage}
              alt={`${college.name} logo`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border-4 border-white shadow-md bg-white"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black text-[#1a365d] mb-2">{college.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span>{college.city}, {college.location} • Est. {college.established_year}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-lg text-sm font-bold text-gray-700">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                {college.rating}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-lg text-sm font-bold text-[#2A73CC]">
                <Trophy className="w-4 h-4" />
                NIRF #{college.nirf_rank}
              </div>
            </div>

            <span className="inline-flex px-3 py-1 rounded-md text-xs font-black bg-[#e8f0fb] text-[#2A73CC] uppercase tracking-widest">
              {college.college_type}
            </span>
          </div>
        </div>

        {/* ── Main Details Grid ── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: About & Courses */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#1a365d] mb-4">About the Institution</h2>
              <p className="text-gray-600 leading-relaxed">
                {college.description || `Established in ${college.established_year}, ${college.name} is one of the premier institutions in ${college.city}.`}
              </p>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#1a365d]">Courses Offered</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {courseList.map((course, index) => (
                      <tr key={index} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {course.trim()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Right Column: Stats & Fees */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Founded</span>
                  <span className="font-semibold text-gray-900">{college.established_year}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">NIRF Rank</span>
                  <span className="font-semibold text-[#2A73CC]">#{college.nirf_rank}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Placement</span>
                  <span className="font-semibold text-green-600">{college.placement_percentage || "90"}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Avg. Package</span>
                  <span className="font-semibold text-gray-900">{formatLPA(college.avg_package)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-gray-900">{college.college_type}</span>
                </div>
              </div>
            </div>

            {/* Fees Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.57-.25-3.04-1.07-3.95-2.23l1.51-1.51c.64.71 1.63 1.25 2.44 1.45v-3.79c-1.87-.51-3.75-1.06-3.75-3.13 0-1.74 1.34-2.98 3-3.32V4h2.82v1.9c1.4.24 2.5 1 3.2 1.88l-1.5 1.5c-.41-.5-1-.93-1.7-1.1v3.4c1.87.54 3.75 1.25 3.75 3.29 0 1.93-1.46 3.09-3 3.32z"/></svg>
              </div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Course Fees</h2>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#1a365d]">{formatLakhs(college.fees * 4)}</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded">
                    {formatLakhs(college.fees)} / year
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-400 italic">
                * Total estimated fees for the entire course
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
