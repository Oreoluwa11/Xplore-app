'use client'

import React from 'react'
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";


// const isActive

const Header = () => {

  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Mainland", path: "/mainland" },
    { label: "Island", path: "/island" },
    { label: "All Restaurants", path: "/restaurants" },
  ];

  const navigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => pathname === path;


  return (
    <div className='px-8 md:px-16 py-6 fixed top-0 left-0 right-0 z-50 flex border-b border-primary'>
      {/* <div className="flex mx-auto"> */}
        {/* <div className="flex justify-between items-center w-full"> */}
          <div>
            <h1 className='font-bold text-2xl'><span className='text-primary'>XP</span>lore</h1>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex gap-10 justify-center align-items-center flex-1">
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
        {/* </div> */}

        {/* Mobile menu button */}
        <div className="md:hidden justify-end flex-1 flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black hover:text-blue-600 p-2"
          >
            {isOpen ? <X size={24} className='justify-center items-center' /> : <Menu size={24} className='text-primary'/>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden bg-transparent border-t animate-fadeIn">
            <ul className="flex flex-col items-center py-4 space-y-4 px-2 pt-2 pb-3">
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

      {/* </div> */}
      {/* <div className="pt-10" /> */}
    </div>
  )
}

export default Header