"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

interface NavbarProps {
  currentUser?: { nama: string; email?: string } | null;
  onLogout?: () => void;
  onOpenAuth?: (mode: "login" | "register") => void;
  isDashboard?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, onOpenAuth, isDashboard = false }) => {
  const [showSignOut, setShowSignOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { lenis } = useSmoothScroll();
  const pathname = usePathname();
  const dashboardNav = isDashboard || pathname.startsWith("/dashboard");

  useEffect(() => {
    if (sessionStorage.getItem("hasVisited")) setLoaded(true);
    const reveal = () => setLoaded(true);
    window.addEventListener("loading-complete", reveal, { once: true });
    return () => window.removeEventListener("loading-complete", reveal);
  }, []);

  const navLinks = dashboardNav ? [] : [
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
    <div className={`sticky top-4 !z-[100] w-full px-4 sm:px-6 flex justify-center pointer-events-none ${loaded ? "navbar-loaded" : "navbar-loading"}`}>
      <header className="pointer-events-auto w-full max-w-6xl h-16 px-5 sm:px-7 rounded-[8px] backdrop-blur-md bg-[#F9FAFC]/90 border border-slate-200/70 shadow-xs flex items-center justify-between transition-all duration-300">
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-10 w-28 flex items-center justify-center">
            <img
              src="/Logo4.png"
              alt="TriLifePlus Logo"
              width={112}
              height={40}
              className="block h-10 w-28 object-contain"
            />
          </div>
        </Link>

        
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
              {dashboardNav ? <Link href="/" className="text-sm font-semibold text-[#475974] hover:text-sky-600">Home</Link> : <Link href="/dashboard" className="text-sm font-semibold text-[#475974] hover:text-sky-600">Dashboard</Link>}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSignOut((open) => !open)}
                  className="text-xs sm:text-sm font-semibold text-rose-600 px-3.5 py-2 rounded-[8px] transition-all relative group/btn cursor-pointer"
                >
                  <span>Sign out</span>
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] bg-rose-600 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200"></span>
                </button>
                <div style={{ backgroundColor: "#F9FAFC", color: "#475974", opacity: showSignOut ? 1 : 0, zIndex: 99999 }} className={`absolute right-[-2rem] top-full mt-6 w-56 origin-top-right rounded-[8px] border border-slate-200 p-4 shadow-[0_14px_30px_rgba(71,89,116,0.18)] transition-all duration-200 ${showSignOut ? "translate-y-0 scale-100" : "pointer-events-none -translate-y-2 scale-95"}`}>
                  <p className="text-sm font-semibold">Sign out?</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">You can sign in again anytime.</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowSignOut(false)} className="cursor-pointer rounded-[8px] px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100">Cancel</button>
                    <button type="button" onClick={onLogout} className="cursor-pointer rounded-[8px] bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700">Sign out</button>
                  </div>
                </div>
              </div>
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




