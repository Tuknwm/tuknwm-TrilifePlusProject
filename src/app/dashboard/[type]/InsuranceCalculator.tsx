"use client";

import { FormEvent, InputHTMLAttributes, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";



const money = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const ageOf = (date: string) => { const birth = new Date(date); const now = new Date(); let age = now.getFullYear() - birth.getFullYear(); if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--; return age; };

function CustomSelect({ label, value, options, onChange }: { label: string; value: string; options: [string, string][]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(([key]) => key === value)?.[1];
  return <label className="relative grid gap-2 text-sm font-semibold">{label}<input required tabIndex={-1} value={value} onChange={() => undefined} className="pointer-events-none absolute h-0 w-0 opacity-0" /><button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-[8px] border bg-white px-4 py-3 text-left font-normal"><span className={selected ? "text-[#475974]" : "text-slate-400"}>{selected || "Choose"}</span><ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>{open && <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-[8px] bg-white shadow-lg">{options.map(([key, text]) => <button type="button" key={key} onClick={() => { onChange(key); setOpen(false); }} className="block w-full px-4 py-3 text-left text-sm font-normal hover:bg-slate-100">{text}</button>)}</div>}</label>;
}

export default function InsurancePage({ type }: { type: string }) {
  const router = useRouter();
  const [result, setResult] = useState<Record<string, string | number> | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    let data: Record<string, string | number>;
    if (type === "jiwa") {
      const age = ageOf(form.tgl_lahir); const cover = Number(form.tanggungan); const rate = age <= 30 ? .002 : age <= 50 ? .004 : .01;
      data = { type, nama: form.nama, tgl_lahir: form.tgl_lahir, umur: age, tanggungan: cover, jenisJiwa: form.jenisJiwa, premi: rate * cover, tarif: rate, tanggunganText: money(cover) };
    } else if (type === "kesehatan") {
      const age = ageOf(form.tgl_lahir); const ageFactor = age <= 20 ? .1 : age <= 35 ? .2 : age <= 50 ? .25 : .4; const base = 2000000; const smoking = Number(form.merokok || 0) * .5 * base; const hypertension = Number(form.hipertensi || 0) * .4 * base; const diabetes = Number(form.diabetes || 0) * .5 * base;
      data = { type, nama: form.nama, tgl_lahir: form.tgl_lahir, pekerjaan: form.pekerjaan, jenis: form.jenis, umur: age, premiDasar: base, kompUmur: ageFactor * base, kompMerokok: smoking, kompHipertensi: hypertension, kompDiabetes: diabetes, premi: base + ageFactor * base + smoking + hypertension + diabetes };
    } else {
      const year = Number(form.tahun); const age = new Date().getFullYear() - year; const price = Number(form.harga); const rate = age <= 3 ? .025 : age <= 5 ? price < 200000000 ? .04 : .03 : .05;
      data = { type: "mobil", merk: form.merk, jenis: form.jenis, pemilik: form.pemilik, plat: form.plat, mesin: form.mesin, rangka: form.rangka, tahun: year, umur: age, harga: price, premi: rate * price * age };
    }
    localStorage.setItem(`${type}Data`, JSON.stringify(data)); sessionStorage.setItem(`${type}Data`, JSON.stringify(data)); setResult(data);
  };

  const title = type === "jiwa" ? "Life Insurance" : type === "kesehatan" ? "Health Insurance" : "Car Insurance";
  const input = (key: string, label: string, extra: InputHTMLAttributes<HTMLInputElement> = {}) => <label className="grid gap-2 text-sm font-semibold">{label}<input required value={form[key] || ""} onChange={(e) => set(key, e.target.value)} className="rounded-[8px] border px-4 py-3 font-normal outline-none focus:border-[#475974]" {...extra} /></label>;
  const select = (key: string, label: string, options: [string, string][]) => <CustomSelect label={label} value={form[key] || ""} options={options} onChange={(value) => set(key, value)} />;

  return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg px-6 py-10 text-[#475974]"><div className="mx-auto max-w-3xl"><Link href="/dashboard" className="text-sm font-semibold">← Dashboard</Link><h1 className="mt-5 text-3xl font-bold">{title}</h1><p className="mt-2 text-slate-500">Enter your details to calculate a premium estimate.</p><form onSubmit={submit} className="mt-8 grid gap-4 rounded-[8px] bg-white p-6 shadow-sm md:grid-cols-2">
    {type === "jiwa" && <>{input("nama", "Full name")} {input("tgl_lahir", "Date of birth", { type: "date" })} {select("tanggungan", "Sum assured", [["1000000000", money(1000000000)], ["2000000000", money(2000000000)], ["3500000000", money(3500000000)], ["5000000000", money(5000000000)], ["10000000000", money(10000000000)]])} {select("jenisJiwa", "Insurance type", [["jiwa", "Asuransi jiwa"]])}</>}
    {type === "kesehatan" && <>{input("nama", "Full name")} {input("tgl_lahir", "Date of birth", { type: "date" })} {input("pekerjaan", "Occupation")} {select("jenis", "Insurance type", [["individu", "Individu"], ["keluarga", "Log outga"]])} {select("merokok", "Smoking?", [["0", "No"], ["1", "Yes"]])} {select("hipertensi", "Hypertension?", [["0", "No"], ["1", "Yes"]])} {select("diabetes", "Diabetes?", [["0", "No"], ["1", "Yes"]])}</>}
    {type === "mobil" && <>{input("merk", "Car make")} {input("jenis", "Car type")} {input("tahun", "Manufacturing year", { type: "number", min: "1900" })} {input("harga", "Car value", { type: "number", min: "1" })} {input("plat", "License plate")} {input("mesin", "Engine number")} {input("rangka", "Chassis number")} {input("pemilik", "Owner name")}</>}
    <button className="md:col-span-2 rounded-[8px] bg-[#475974] px-5 py-3 font-semibold text-white">Calculate premium</button>
  </form>{result && <section className="mt-6 rounded-[8px] bg-[#475974] p-6 text-white"><p className="text-sm text-white/70">Estimated premium</p><p className="mt-1 text-3xl font-bold">{money(Number(result.premi))}</p><button onClick={() => router.push(`/dashboard/checkout?type=${type}`)} className="mt-5 rounded-[8px] bg-white px-5 py-3 font-semibold text-[#475974]">Continue to checkout →</button></section>}</div></main>;
}














