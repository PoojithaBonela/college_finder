import React from "react";
import Link from "next/link";
import { BookMarked, GraduationCap } from "lucide-react";

const specializations = [
  "Digital marketing", "Cyber Security", "Artificial Intelligence", 
  "Business Analytics", "Data Science", "Data Analysis", 
  "Machine Learning", "Cloud Computing", "AWS", "Big Data Hadoop"
];

const trendingCourses = [
  "Online Degree", "Online Diploma", "Certifications", 
  "Short Term Courses", "Bootcamps", "Free Certifications"
];

export default function TrendingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-4">Online Courses and Certifications</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Upskill and reskill to empower your career journey with curated Online Courses and Certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Cards */}
          <div className="space-y-8">
            
            {/* Card 1: Specializations */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <BookMarked className="w-6 h-6 text-[#2A73CC]" />
                <h3 className="text-xl font-bold text-gray-900">Trending Specializations</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {specializations.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:border-[#2A73CC] hover:text-[#2A73CC] transition-all cursor-pointer">
                    {item}
                  </span>
                ))}
              </div>
              <Link href="#" className="text-[#2A73CC] font-bold text-sm hover:underline">View All</Link>
            </div>

            {/* Card 2: Courses */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-[#2A73CC]" />
                <h3 className="text-xl font-bold text-gray-900">Trending Courses</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {trendingCourses.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:border-[#2A73CC] hover:text-[#2A73CC] transition-all cursor-pointer">
                    {item}
                  </span>
                ))}
              </div>
              <Link href="#" className="text-[#2A73CC] font-bold text-sm hover:underline">View All</Link>
            </div>

          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-[#2A73CC]/5 rounded-full blur-3xl -z-10" />
            <img 
              src="/assets/images/learning-illustration.png" 
              alt="Learning Illustration" 
              className="w-full max-w-md mx-auto drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
