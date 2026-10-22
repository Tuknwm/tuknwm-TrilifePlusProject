"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function CustomSelect({ value, options, onChange }: { value: string; options: [string, string][]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(([key]) => key === value)?.[1];
  return <div className="relative"><button type="button" onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between rounded-[8px] border bg-white px-4 py-3 text-left font-normal"><span className={selected ? "text-[#475974]" : "text-slate-400"}>{selected || "Choose"}</span><ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>{open && <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[8px] bg-white shadow-lg">{options.map(([key, text]) => <button type="button" key={key} onClick={() => { onChange(key); setOpen(false); }} className="block w-full cursor-pointer px-4 py-3 text-left text-sm font-normal hover:bg-slate-100">{text}</button>)}</div>}</div>;
}

