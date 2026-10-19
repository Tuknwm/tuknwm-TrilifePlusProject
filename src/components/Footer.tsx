import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/60 pt-16 pb-12 text-[#475974]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <Image
                  src="/images/Logo6.png"
                  alt="TriLifePlus"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#475974]">
                TriLife<span className="text-sky-600 font-extrabold">Plus</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              Leading digital insurance marketplace platform. Providing reliable protection and instant simulations for your future peace of mind.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-slate-400">Simulation & Educational platform</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#475974] mb-4">Our Products</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <Link href="#products" className="hover:text-[#475974] transition-colors">
                  Life Insurance
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-[#475974] transition-colors">
                  Health Insurance
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-[#475974] transition-colors">
                  Car Insurance
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-[#475974] transition-colors">
                  Policy Comparison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#475974] mb-4">About the Brand</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <Link href="#about" className="hover:text-[#475974] transition-colors">
                  About TriLifePlus
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#475974] transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-[#475974] transition-colors">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-[#475974] transition-colors">
                  Help & FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#475974] mb-4">Contact Us</h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              24/7 Customer Support is always ready to assist your inquiries and guide your simulation claims.
            </p>
            <div className="text-xs font-medium text-slate-600 space-y-1.5">
              <p>Email: support@trilifeplus.com</p>
              <p>WhatsApp: +62 812-3456-7890</p>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 TriLifePlus. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
