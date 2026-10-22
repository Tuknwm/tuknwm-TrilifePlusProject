"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(Boolean(localStorage.getItem("currentUser")));
  }, []);

  return (
    <main className="page-transition dashboard-bg flex min-h-screen items-center justify-center px-6 py-12 text-[#475974]">
      <section className="w-full max-w-xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-20 w-40 items-center justify-center">
          <SearchX className="h-12 w-12" />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Error 404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
          The page you are looking for may have been moved, deleted, or never existed.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#475974] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2F3C4F]">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          {isSignedIn && <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-slate-200 px-5 py-3 text-sm font-semibold text-[#475974] transition-colors hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4" />
              Go to Dashboard
            </Link>}
        </div>
      </section>
    </main>
  );
}
