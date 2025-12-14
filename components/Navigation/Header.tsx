'use client'

import React from 'react'
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ExpandableSearch } from "@/components/ui/expand-search";


interface Props {
  onSearch?: (query: string) => void;
}

const Header: React.FC<Readonly<Props>> = ({ onSearch }) => {

  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "All Restaurants", path: "/restaurant" },
    { label: "Mainland", path: "/mainland" },
    { label: "Island", path: "/island" },
  ];

  const navigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleSearch = (q: string) => {
    if (!q) return;
    if (onSearch) {
      onSearch(q);
    } else {
      router.push(`/restaurant?query=${encodeURIComponent(q)}`);
    }
  };

  const isActive = (path: string) => pathname === path;


  return (
    <div className="px-4 md:px-16 py-4 fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-primary bg-background">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl"><span className="text-primary">XP</span>lore</h1>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex gap-10 justify-center items-center flex-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative transition ${
              isActive(item.path)
                ? "text-primary font-normal after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
                : "hover:text-blue-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile controls (search + menu) */}
      <div className="md:hidden flex items-center gap-2">
        <ExpandableSearch
          onSearch={handleSearch}
          placeholder="Search..."
          iconClassName="!aspect-[45/52] bg-primary text-white min-w-9"
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black hover:text-blue-600 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="justify-center items-center" />
          ) : (
            <Menu size={24} className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden absolute top-full right-4 mt-2 bg-background border rounded-lg shadow-md animate-fadeIn w-48 z-50">
          <ul className="flex flex-col items-stretch py-2 space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`transition block px-3 py-2 text-base font-medium w-full text-left ${
                    isActive(item.path)
                      ? "text-blue-600 font-medium underline underline-offset-4"
                      : "hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="hidden md:flex items-center gap-2 lg:gap-8">
        <ExpandableSearch
          onSearch={handleSearch}
          placeholder="Search..."
          iconClassName="!aspect-[45/52] bg-primary text-white min-w-9"
        />
      </div>
    </div>
  )
}

export default Header