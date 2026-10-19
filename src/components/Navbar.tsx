"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

interface NavbarProps {
  currentUser?: { nama: string; email?: string } | null;
  onLogout?: () => void;
  onOpenAuth?: (mode: "login" | "register") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, onOpenAuth }) => {
  const { lenis } = useSmoothScroll();

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -90 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="sticky top-4 z-50 w-full px-4 sm:px-6 flex justify-center pointer-events-none">
      <header className="pointer-events-auto w-full max-w-6xl h-16 px-5 sm:px-7 rounded-[8px] backdrop-blur-md bg-[#F9FAFC]/90 border border-slate-200/70 shadow-xs flex items-center justify-between transition-all duration-300">
        {/* Brand logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src="/images/Logo6.png"
              alt="TriLifePlus Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#475974]">
            TriLife<span className="text-sky-600 font-extrabold">Plus</span>
          </span>
        </Link>

        {/* Navigation with bottom-to-top subtle line animation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#475974]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="relative py-1 group/nav text-[#475974] cursor-pointer transition-colors"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#475974] rounded-[8px] scale-x-0 opacity-0 translate-y-1 group-hover/nav:scale-x-100 group-hover/nav:opacity-100 group-hover/nav:translate-y-0 transition-all duration-300 ease-out origin-center"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[#475974]">
                Hi, {currentUser.nama}
              </span>
              <button
                onClick={onLogout}
                className="text-xs sm:text-sm font-semibold text-rose-600 px-3.5 py-2 rounded-[8px] transition-all relative group/btn cursor-pointer"
              >
                <span>Logout</span>
                <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] bg-rose-600 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200"></span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAuth?.("login")}
                className="text-xs sm:text-sm font-semibold text-[#475974] px-3.5 py-2 rounded-[8px] transition-all relative group/btn cursor-pointer"
              >
                <span>Sign In</span>
                <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] bg-[#475974] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth?.("register")}
                className="text-xs sm:text-sm font-medium bg-[#475974] text-white hover:bg-[#2F3C4F] px-4 py-2 rounded-[8px] shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};




