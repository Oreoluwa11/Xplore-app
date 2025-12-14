"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  expandDirection?: "left" | "right";
  className?: string;
  iconClassName?: string;
  inputClassName?: string;
}

export function ExpandableSearch({
  onSearch,
  placeholder = "Search...",
  expandDirection = "left",
  className,
  iconClassName,
  inputClassName,
}: Readonly<ExpandableSearchProps>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    // Focus the input after expansion animation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the blur is happening because we clicked the search icon
    if (containerRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }

    setIsExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center  border border-border rounded-lg overflow-hidden transition-all duration-300 ease-in-out",
        isExpanded ? "w-35 md:w-64" : "w-[36px]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center transition-all duration-300 ease-in-out",
          expandDirection === "right" && isExpanded && "order-2"
        )}
      >
        <button
          onClick={isExpanded ? handleSearch : handleExpand}
          className={cn(
            "flex items-center py-2 justify-center text-white ",
            iconClassName
          )}
          type="button"
        >
          <Search className="w-4 h-4" strokeWidth={4} />
        </button>
      </div>

      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn(
          "flex-1 px-3 py-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ease-in-out",
          isExpanded ? "opacity-100 w-full bg-white" : "opacity-0 w-0",
          expandDirection === "left" && isExpanded && "order-1",
          inputClassName
        )}
      />
    </div>
  );
}
