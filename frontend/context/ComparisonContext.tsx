"use client";

import React, { createContext, useContext, useState } from "react";

export interface College {
  id: number | string;
  name: string;
  city: string;
  location?: string;
  fees?: string | number;
  rating?: string | number;
  placement_percentage?: string | number;
  courses?: string;
  image_url?: string;
  nirf_rank?: string | number;
  avg_package?: string | number;
  college_type?: string;
  established_year?: string | number;
}

interface ComparisonContextType {
  selectedColleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (id: string | number) => void;
  clearColleges: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  const addCollege = (college: College) => {
    setSelectedColleges((prev) => {
      if (prev.some((c) => c.id === college.id)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  };

  const removeCollege = (id: string | number) => {
    setSelectedColleges((prev) => prev.filter((c) => c.id !== id));
  };

  const clearColleges = () => setSelectedColleges([]);

  return (
    <ComparisonContext.Provider value={{ selectedColleges, addCollege, removeCollege, clearColleges }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
