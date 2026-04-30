import React from "react";
import { Scale, Star, BookOpen, Calculator, List, ClipboardCheck } from "lucide-react";
import Link from "next/link";

const products = [
  { icon: Scale, label: "College Compare", color: "text-[#1a365d]", bg: "bg-blue-50" },
  { icon: Star, label: "College Reviews", color: "text-[#1a365d]", bg: "bg-blue-50" },
  { icon: BookOpen, label: "B.Tech Companion", color: "text-[#1a365d]", bg: "bg-blue-50" },
  { icon: Calculator, label: "College Predictor", color: "text-[#1a365d]", bg: "bg-blue-50" },
  { icon: List, label: "List of Courses", color: "text-[#1a365d]", bg: "bg-blue-50" },
  { icon: ClipboardCheck, label: "College Applications", color: "text-[#1a365d]", bg: "bg-blue-50" },
];

export default function ProductGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1a365d] text-center mb-12 tracking-tight">
          Explore Our Services
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {products.map((item, idx) => (
            <Link 
              key={idx} 
              href="#" 
              className="flex flex-col items-center group transition-all duration-300"
            >
              <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <span className="text-sm font-bold text-gray-700 text-center group-hover:text-[#2A73CC] transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
