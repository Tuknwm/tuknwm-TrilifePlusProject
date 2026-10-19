"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Mail, Lock, ArrowRight, User, Phone, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "register";
  onClose: () => void;
  onSuccess?: (user: { nama: string; email?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = "login",
  onClose,
  onSuccess,
}) => {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [rendered, setRendered] = useState(false);
  const [active, setActive] = useState(false);

  // Smooth open & close animation timing
  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      setMode(initialMode);
      // Trigger enter transition in next paint
      const timer = setTimeout(() => {
        setActive(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setActive(false);
      const timer = setTimeout(() => {
        setRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialMode]);

  if (!rendered) return null;

  const handleClose = () => {
    setActive(false);
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyUser = {
      nama: mode === "register" ? "New Member" : "John Doe",
      email: mode === "register" ? "newmember@trilifeplus.com" : "johndoe@trilifeplus.com",
    };

    localStorage.setItem("currentUser", JSON.stringify(dummyUser));

    if (onSuccess) {
      onSuccess(dummyUser);
    }
    handleClose();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with smooth fade transition */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Popout box with smooth scale, translate, and opacity transition */}
      <div
        className={`relative w-full max-w-md bg-[#F9FAFC] border border-slate-200/90 rounded-[8px] shadow-2xl p-6 sm:p-8 z-10 text-[#475974] transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-[8px] text-slate-400 hover:text-[#475974] hover:bg-slate-200/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Logo.png */}
        <div className="flex flex-col items-center text-center space-y-2.5 mb-6">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image
              src="/images/Logo.png"
              alt="TriLifePlus Logo"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#475974] transition-all">
              {mode === "login" ? "Sign In to TriLifePlus" : "Create Your Free Account"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {mode === "login"
                ? "Access your saved policies and personal insurance dashboard."
                : "Join thousands of members enjoying transparent digital insurance."}
            </p>
          </div>
        </div>

        {/* Form container with smooth fade transition when switching between login and register */}
        <div className="transition-all duration-200 ease-in-out">
          {mode === "login" ? (
            /* ================= SIGN IN FORM ================= */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#475974] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value="demo.user@trilifeplus.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-slate-100/80 border border-slate-200 text-xs text-slate-500 cursor-not-allowed select-none opacity-80"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#475974]">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-400 cursor-not-allowed">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    disabled
                    value="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-slate-100/80 border border-slate-200 text-xs text-slate-500 cursor-not-allowed select-none opacity-80"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  defaultChecked
                  disabled
                  className="w-3.5 h-3.5 rounded-[4px] border-slate-300 text-[#475974] cursor-not-allowed"
                />
                <label htmlFor="rememberMe" className="text-xs text-slate-500">
                  Remember this device
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-[8px] bg-[#475974] text-white text-xs font-semibold hover:bg-[#2F3C4F] shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
              >
                Sign In Instantly
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* ================= REGISTER FORM ================= */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#475974] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled
                    value="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-slate-100/80 border border-slate-200 text-xs text-slate-500 cursor-not-allowed select-none opacity-80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475974] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value="new.member@trilifeplus.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-slate-100/80 border border-slate-200 text-xs text-slate-500 cursor-not-allowed select-none opacity-80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475974] mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    disabled
                    value="+62 812 3456 7890"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-slate-100/80 border border-slate-200 text-xs text-slate-500 cursor-not-allowed select-none opacity-80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475974] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    disabled
                    value="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-slate-100/80 border border-slate-200 text-xs text-slate-500 cursor-not-allowed select-none opacity-80"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#475974] shrink-0" />
                <span>Free instant simulations & policy comparison</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-[8px] bg-[#475974] text-white text-xs font-semibold hover:bg-[#2F3C4F] shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
              >
                Complete Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Switch Mode Footer */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 text-center text-xs text-slate-500">
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-semibold text-[#475974] hover:underline cursor-pointer"
              >
                Register now
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-[#475974] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
