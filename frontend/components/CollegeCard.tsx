"use client";

import React from "react";
import Link from "next/link";
import { Star, Trophy, MapPin, Calendar } from "lucide-react";

interface CollegeCardProps {
  id: number | string;
  name: string;
  city: string;
  location: string;
  established_year: number | string;
  rating: number | string;
  nirf_rank: number | string;
  college_type: string;
  image_url?: string;
}

export default function CollegeCard({
  id,
  name,
  city,
  location,
  established_year,
  rating,
  nirf_rank,
  college_type,
  image_url
}: CollegeCardProps) {
  return (
    <Link href={`/colleges/${id}`} className="block group">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 transition-all duration-300 group-hover:shadow-md group-hover:border-blue-100 group-hover:-translate-y-0.5">
        
        {/* ── Logo (Square) ── */}
        <div className="flex-shrink-0">
          <img
            src={image_url || "/assets/college-logos/default.png"}
            alt={`${name} logo`}
            className="w-16 h-16 rounded-lg object-cover bg-gray-50 border border-gray-50"
          />
        </div>

        {/* ── Content Section ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          
          {/* College Name */}
          <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#2A73CC] transition-colors leading-tight">
            {name}
          </h3>

          {/* Location + Year */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">
              {city}, {location} • Established {established_year}
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mt-1">
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-orange-50 px-2 py-0.5 rounded-md">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{rating}</span>
            </div>

            {/* NIRF Rank */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 bg-blue-50 px-2 py-0.5 rounded-md">
              <Trophy className="w-4 h-4 text-[#2A73CC]" />
              <span>NIRF {nirf_rank}</span>
            </div>
          </div>

          {/* College Type Badge */}
          <div className="mt-2 flex">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#e8f0fb] text-[#2A73CC] uppercase tracking-wider">
              {college_type}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
