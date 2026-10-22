"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  HeartHandshake, 
  Car, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  BadgeCheck, 
  Clock, 
  HelpCircle, 
  Quote,
  ChevronRight
} from "lucide-react";

function CountUp({ end, suffix = "", decimals = 0, active = false }: { end: number; suffix?: string; decimals?: number; active?: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / 1200, 1);
      setValue(end * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [active, end]);
  return `${decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString()}${suffix}`;
}
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<{ nama: string; email?: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll(".homepage section");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); if ((entry.target as HTMLElement).id === "home") setStatsActive(true); } }), { threshold: 0.16 });
    const startAnimations = () => sections.forEach((section) => observer.observe(section));
    if (sessionStorage.getItem("hasVisited")) startAnimations();
    else window.addEventListener("loading-complete", startAnimations, { once: true });
    return () => { observer.disconnect(); window.removeEventListener("loading-complete", startAnimations); };
  }, []);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch {
        console.error("Failed to parse user session");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: { nama: string; email?: string }) => {
    setCurrentUser(user);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -90 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const products = [
    {
      id: "health",
      title: "Health Insurance",
      description:
        "Covers medical consultations, inpatient hospitalization, and emergency treatments. Relieve the worry of unexpected hospital bills.",
      features: [
        "Inpatient & ICU Coverage",
        "Cashless across Leading Hospital Networks",
        "Fast 24-Hour Claim Processing",
      ],
      image: "/kesehatan.jpg",
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
      link: "/products/health",
    },
    {
      id: "life",
      title: "Life Insurance",
      description:
        "The best financial protection for your beloved family in case of unforeseen life events. Ensure your children's future remains secured.",
      features: [
        "Sum Assured up to $100,000+",
        "Flexible Premiums by Age",
        "Transparent & Swift Payouts",
      ],
      image: "/jiwa.avif",
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      link: "/products/life",
    },
    {
      id: "auto",
      title: "Car Insurance",
      description:
        "End-to-end protection against accident damage, collision risks, and vehicle theft. Choose between Comprehensive and Total Loss Only (TLO) plans.",
      features: [
        "Nationwide Authorized Repair Shops",
        "Quick Online Photo Inspection",
        "24/7 Roadside Assistance & Towing",
      ],
      image: "/mobil.jpg",
      icon: <Car className="w-5 h-5 text-amber-600" />,
      link: "/products/auto",
    },
  ];

  const brandValues = [
    {
      icon: <Zap className="w-6 h-6 text-[#475974]" />,
      title: "Fast & Effortless",
      desc: "Receive instant policy quotes and digital simulations in minutes without piles of paperwork.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#475974]" />,
      title: "Best Rate Guarantee",
      desc: "Full transparency with zero hidden charges. Compare flexible plans that suit your monthly budget.",
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-[#475974]" />,
      title: "Safe & Trustworthy",
      desc: "Modern standard encryption ensures that your personal information stays private and secure.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#475974]" />,
      title: "24/7 Dedicated Support",
      desc: "Our insurance consultants are available around the clock to answer queries and guide your claims.",
    },
  ];

  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Entrepreneur",
      city: "Jakarta",
      content:
        "Applying for insurance on TriLifePlus is genuinely effortless. Everything is done online, completely eliminating the hassle of handling physical paperwork.",
    },
    {
      name: "Citra Lestari",
      role: "Digital Marketer",
      city: "Surabaya",
      content:
        "I simulated my health insurance plan here, and every single policy term was crystal clear. Perfect for anyone looking into coverage for the first time.",
    },
    {
      name: "Rudi Hartono",
      role: "Corporate Executive",
      city: "Bandung",
      content:
        "The customer service was remarkably responsive in explaining auto coverage options. It gave me total confidence in selecting a comprehensive policy.",
    },
    {
      name: "Nabila Ananda",
      role: "Homemaker",
      city: "Semarang",
      content:
        "TriLifePlus car insurance is super practical—even the inspection was done directly through online photo verification. Saved me tons of valuable time!",
    },
    {
      name: "Melati Wulandari",
      role: "Freelance Designer",
      city: "Yogyakarta",
      content:
        "The life insurance options provided the exact transparency I wanted. No hidden conditions, clear breakdowns, and truly budget-friendly premiums.",
    },
  ];

  return (
    <div className="page-transition homepage flex flex-col min-h-screen bg-[#F9FAFC] text-[#475974] selection:bg-slate-200">
      
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={openAuth}
      />

      <main className="flex-1">
        
        <section id="home" className="relative py-16 md:py-24 overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-7 text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#475974] tracking-tight leading-[1.12]">
                  Insurance Made Simple, Fast & <span className="text-sky-600">Affordable</span> For Everyone.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                  TriLifePlus delivers true peace of mind for you and your family against life&apos;s unexpected moments. Easily compare and tailor Life, Health, and Car insurance policies in one trusted digital platform.
                </p>

                
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Explore Protection Options:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#products"
                      onClick={(e) => handleSmoothScroll(e, "#products")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-white border border-slate-200/70 hover:border-slate-300 hover:shadow-xs transition-all text-xs font-semibold text-[#475974]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#475974]" />
                      Life Insurance
                    </a>
                    <a
                      href="#products"
                      onClick={(e) => handleSmoothScroll(e, "#products")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-white border border-slate-200/70 hover:border-slate-300 hover:shadow-xs transition-all text-xs font-semibold text-[#475974]"
                    >
                      <HeartHandshake className="w-4 h-4 text-[#475974]" />
                      Health Insurance
                    </a>
                    <a
                      href="#products"
                      onClick={(e) => handleSmoothScroll(e, "#products")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-white border border-slate-200/70 hover:border-slate-300 hover:shadow-xs transition-all text-xs font-semibold text-[#475974]"
                    >
                      <Car className="w-4 h-4 text-[#475974]" />
                      Car Insurance
                    </a>
                  </div>
                </div>

                
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openAuth("register")}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] bg-[#475974] text-white font-medium shadow-xs hover:bg-[#2F3C4F] hover:shadow-md transition-all text-sm cursor-pointer"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#about"
                    onClick={(e) => handleSmoothScroll(e, "#about")}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] bg-white border border-slate-200 text-[#475974] font-medium hover:bg-slate-50 transition-all text-sm cursor-pointer"
                  >
                    Learn More
                  </a>
                </div>

                
                <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-6 max-w-lg">
                  <div className="homepage-stat">
                    <p className="text-2xl font-extrabold text-[#475974]"><CountUp end={10000} suffix="+" active={statsActive} /></p>
                    <p className="text-xs text-slate-500">Protected Members</p>
                  </div>
                  <div className="homepage-stat">
                    <p className="text-2xl font-extrabold text-[#475974]"><CountUp end={99.8} decimals={1} suffix="%" active={statsActive} /></p>
                    <p className="text-xs text-slate-500">Satisfaction Rate</p>
                  </div>
                  <div className="homepage-stat">
                    <p className="text-2xl font-extrabold text-[#475974]"><CountUp end={24} suffix="/7" active={statsActive} /></p>
                    <p className="text-xs text-slate-500">Instant Assistance</p>
                  </div>
                </div>
              </div>

              
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="relative w-full max-w-md lg:max-w-none">
                  <div className="relative h-[380px] sm:h-[440px] w-full">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/Fmly.png"
                      className="h-full w-full object-contain"
                      aria-label="TriLifePlus Happy Family"
                    >
                      <source src="/Fmly.webm" type="video/webm" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#F9FAFC]/60 to-[#F9FAFC] pointer-events-none backdrop-blur-[2px]"></div>
        </section>

        
        <section id="about" className="relative py-24 bg-white">
          
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F9FAFC] via-[#F9FAFC]/40 to-transparent pointer-events-none backdrop-blur-[2px]"></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#475974] tracking-tight">
                Modern Digital Insurance Built Around You
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We bridge users with premier insurance choices. Eliminating confusing jargon and delivering impartial recommendations for your lifelong peace of mind.
              </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandValues.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9FAFC] border border-slate-200/80 rounded-[8px] p-6 space-y-4 hover:border-slate-300 hover:shadow-xs transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-[8px] bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {val.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#475974]">{val.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500">{val.desc}</p>
                </div>
              ))}
            </div>

            
            <div className="mt-16 bg-[#F9FAFC] border border-slate-200 rounded-[8px] p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <HelpCircle className="w-4 h-4 text-[#475974]" />
                    Transparency & Education
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#475974]">
                    How does TriLifePlus differ from traditional insurance brokers?
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    As an independent digital platform, we are committed to objectivity. TriLifePlus offers unbiased comparisons, transparent premium calculators, and honest guidance so that you get the coverage that genuinely fits your lifestyle and financial goals.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openAuth("register")}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#475974] hover:text-[#2F3C4F] cursor-pointer"
                    >
                      Register to explore instant simulation <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-[8px] border border-slate-200 shadow-2xs">
                    <p className="text-xs font-bold text-[#475974] uppercase tracking-wider mb-1">Instant Quotes</p>
                    <h4 className="text-sm font-bold text-[#475974] mb-2">Real-Time Calculation</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Instant coverage estimates customized right in the palm of your hand.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-[8px] border border-slate-200 shadow-2xs">
                    <p className="text-xs font-bold text-[#475974] uppercase tracking-wider mb-1">Digital Inspection</p>
                    <h4 className="text-sm font-bold text-[#475974] mb-2">Hassle-Free Auto Policy</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Submit vehicle photos digitally without scheduling physical surveyor visits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none backdrop-blur-[2px]"></div>
        </section>

        
        <section id="products" className="relative py-24 bg-[#F9FAFC]">
          
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none backdrop-blur-[2px]"></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <div className="space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#475974] tracking-tight">
                  Tailored Protection for Life&apos;s Milestones
                </h2>
                <p className="text-slate-600 text-sm">
                  Choose from our three core insurance products trusted by thousands of families and drivers.
                </p>
              </div>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-[8px] border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-[8px] border border-slate-200/80 flex items-center gap-2 shadow-2xs">
                      {prod.icon}
                      <span className="text-xs font-bold text-[#475974]">{prod.title}</span>
                    </div>
                  </div>

                  
                  <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-[#475974] pt-1">{prod.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{prod.description}</p>
                    </div>

                    
                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      <p className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                        Key Coverage Benefits:
                      </p>
                      {prod.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-2.5 text-xs text-[#475974]">
                          <CheckCircle2 className="w-4 h-4 text-[#475974] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!currentUser) {
                            openAuth("login");
                          } else {
                            window.location.href = prod.link;
                          }
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[8px] bg-[#F9FAFC] border border-slate-200 text-[#475974] font-semibold text-xs hover:bg-[#475974] hover:text-white transition-all shadow-2xs cursor-pointer"
                      >
                        Simulate Policy
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#F9FAFC]/50 to-[#F9FAFC] pointer-events-none backdrop-blur-[2px]"></div>
        </section>

        
        <section id="testimonials" className="relative py-24 bg-white overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F9FAFC] via-[#F9FAFC]/40 to-transparent pointer-events-none backdrop-blur-[2px]"></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#475974] tracking-tight">
                Trusted by Everyday Individuals
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Genuine stories from members who found simplicity and peace of mind with our protection options.
              </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testi, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9FAFC] border border-slate-200/90 rounded-[8px] p-6 flex flex-col justify-between hover:shadow-xs hover:border-slate-300 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <Quote className="w-8 h-8 text-slate-300 rotate-180" />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      &ldquo;{testi.content}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#475974]">{testi.name}</h4>
                      <p className="text-[11px] text-slate-400">
                        {testi.role} • {testi.city}
                      </p>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none backdrop-blur-[2px]"></div>
        </section>

        
        <section className="relative py-28 bg-[#F9FAFC]">
          
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none backdrop-blur-[2px]"></div>

          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center text-[#475974] space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#475974]">
                Ready to Protect Your Family&apos;s Tomorrow?
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Sign up today to unlock instant premium simulations, compare policies transparently, and receive free consultations from TriLifePlus experts.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => openAuth("register")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[8px] bg-[#475974] text-white font-medium text-sm shadow-xs hover:bg-[#2F3C4F] hover:shadow-md transition-all cursor-pointer"
                >
                  Register Account Free
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[8px] bg-transparent border border-slate-300 text-[#475974] font-medium text-sm hover:bg-slate-100/60 transition-all cursor-pointer"
                >
                  Already have an account? Sign In
                </button>
              </div>

              <p className="text-[11px] text-slate-400 pt-2">
                ✓ No credit card required • Instant 1-minute setup • Encrypted & private data
              </p>
            </div>
          </div>
        </section>

        
        <div className="relative z-20 -mb-8 h-16 bg-gradient-to-b from-[#F9FAFC] via-white/80 to-transparent backdrop-blur-[24px]"></div>
        <section className="relative py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest updates</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#475974]">News &amp; Insights</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">Tips and updates to help you make smarter protection decisions.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[{ date: "12 June 2025", title: "Understanding the right life insurance coverage", text: "A simple guide to choosing protection that fits your family goals.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80" }, { date: "28 May 2025", title: "Why health protection matters early", text: "Small decisions today can make future healthcare planning easier.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80" }, { date: "10 May 2025", title: "Prepare your car for a safer journey", text: "Practical reminders for protecting your vehicle and everyone inside it.", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80" }].map((news) => <article key={news.title} className="overflow-hidden rounded-[8px] border border-slate-200/80 bg-[#F9FAFC] transition-all hover:border-slate-300 hover:shadow-xs"><div className="relative h-40 w-full bg-slate-100"><img src={news.image} alt={news.title} className="h-full w-full object-cover" /></div><div className="p-6"><p className="text-xs font-semibold text-slate-400">{news.date}</p><h3 className="mt-3 text-lg font-bold leading-snug text-[#475974]">{news.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-500">{news.text}</p><button type="button" className="mt-5 text-xs font-bold text-[#475974] transition-colors hover:text-sky-600">Read more →</button></div></article>)}
            </div>
          </div>
        </section>
      </main>

      
      <Footer />

      
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

