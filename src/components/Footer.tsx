import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/60 pt-16 pb-12 text-[#475974]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-10 w-28 flex items-center justify-center">
                <Image
                  src="/Logo4.png"
                  alt="TriLifePlus"
                  width={112}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              Leading digital insurance marketplace platform. Providing reliable protection and instant simulations for your future peace of mind.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="grid gap-1 text-xs text-slate-400">
                <span>Simulation & Educational platform</span>
              </div>
            </div>
          </div>

          <div className="md:translate-x-20 md:justify-self-end">
            <h4 className="text-sm font-semibold text-[#475974] mb-4">About the Brand</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <Link href="/#about" className="hover:font-bold transition-colors">
                  About TriLifePlus
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:font-bold transition-colors">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:font-bold transition-colors">
                  Our Products
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-fit max-w-[280px] md:justify-self-end">
            <h4 className="text-sm font-semibold text-[#475974] mb-4">Contact Us</h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              24/7 Customer Support is always ready to assist your inquiries and guide your simulation claims.
            </p>
            <div className="text-xs font-medium text-slate-600 space-y-1.5">
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />kurokyu.project@gmail.com</p>
              <a href="https://github.com/Tuknwm/tuknwm-TrilifePlusProject" className="mt-2 flex items-center gap-2 hover:font-bold transition-colors">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg>
                GitHub Project
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 TriLifePlus. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:font-bold cursor-pointer">Privacy Policy</span>
            <span className="hover:font-bold cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
