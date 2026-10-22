"use client";

import { FormEvent, InputHTMLAttributes, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";



const money = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
const ageOf = (date: string) => { const birth = new Date(date); const now = new Date(); let age = now.getFullYear() - birth.getFullYear(); if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--; return age; };
const carModels: Record<string, string[]> = { Toyota: ["Avanza", "Vios", "Yaris", "Fortuner", "Corolla"], Honda: ["Brio", "Jazz", "Civic", "CR-V", "HR-V"], Mitsubishi: ["Pajero", "Xpander", "Lancer", "Eclipse Cross", "Outlander"], Suzuki: ["Ertiga", "Swift", "Ignis", "Baleno", "APV"], Daihatsu: ["Xenia", "Terios", "Ayla", "Sirion", "Gran Max"], Nissan: ["March", "X-Trail", "GT-R", "Navara", "Almera"], Mazda: ["Mazda2", "Mazda3", "CX-3", "CX-5", "CX-9"], Kia: ["Picanto", "Rio", "Seltos", "Sportage", "Carnival"], Hyundai: ["i10", "i20", "Tucson", "Santa Fe", "Palisade"], Ford: ["Fiesta", "Focus", "Ranger", "Everest", "Mustang"], Chevrolet: ["Spark", "Aveo", "Trailblazer", "Captiva", "Colorado"], Mercedes: ["A-Class", "C-Class", "E-Class", "GLA", "GLE"], BMW: ["Series 1", "Series 3", "Series 5", "X1", "X5"], Audi: ["A3", "A4", "A6", "Q3", "Q5"], Volkswagen: ["Polo", "Golf", "Passat", "Tiguan", "Touareg"], Lexus: ["IS", "ES", "RX", "NX", "UX"], Jeep: ["Wrangler", "Cherokee", "Compass", "Renegade", "Grand Cherokee"], "Land Rover": ["Range Rover", "Discovery", "Defender", "Velar", "Evoque"], Porsche: ["Cayenne", "Macan", "911", "Panamera", "Taycan"], Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Roadster"] };
const carBrands = Object.keys(carModels);

function CustomSelect({ label, value, options, onChange }: { label: string; value: string; options: [string, string][]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(([key]) => key === value)?.[1];
  return <label className="relative grid gap-2 text-sm font-semibold">{label}<input required tabIndex={-1} value={value} onChange={() => undefined} className="pointer-events-none absolute h-0 w-0 opacity-0" /><button type="button" onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between rounded-[8px] border bg-white px-4 py-3 text-left font-normal"><span className={selected ? "text-[#475974]" : "text-slate-400"}>{selected || "Choose"}</span><ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>{open && <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-[8px] bg-white shadow-lg">{options.map(([key, text]) => <button type="button" key={key} onClick={() => { onChange(key); setOpen(false); }} className="block w-full cursor-pointer px-4 py-3 text-left text-sm font-normal hover:bg-slate-100">{text}</button>)}</div>}</label>;
}

export default function InsurancePage({ type }: { type: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState("");
  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if ((type === "jiwa" || type === "kesehatan") && (!form.tgl_lahir || !Number.isFinite(new Date(form.tgl_lahir).getTime()) || ageOf(form.tgl_lahir) <= 0)) {
      setAlertMessage("Please select a valid date of birth.");
      return;
    }
    if (type === "mobil" && (!form.tahun || !Number.isInteger(Number(form.tahun)) || Number(form.tahun) > new Date().getFullYear() || Number(form.tahun) < 1900)) {
      setAlertMessage("Please enter a valid manufacturing year.");
      return;
    }
    let data: Record<string, string | number>;
    if (type === "jiwa") {
      const age = ageOf(form.tgl_lahir); const cover = Number(form.tanggungan); const rate = age <= 30 ? .002 : age <= 50 ? .004 : .01;
      data = { type, nama: form.nama, tgl_lahir: form.tgl_lahir, umur: age, tanggungan: cover, jenisJiwa: form.jenisJiwa, premi: rate * cover, tarif: rate, tanggunganText: money(cover) };
    } else if (type === "kesehatan") {
      const age = ageOf(form.tgl_lahir); const ageFactor = age <= 20 ? .1 : age <= 35 ? .2 : age <= 50 ? .25 : .4; const base = 2000000; const smoking = Number(form.merokok || 0) * .5 * base; const hypertension = Number(form.hipertensi || 0) * .4 * base; const diabetes = Number(form.diabetes || 0) * .5 * base;
      data = { type, nama: form.nama, tgl_lahir: form.tgl_lahir, pekerjaan: form.pekerjaan, jenis: form.jenis, merokok: Number(form.merokok || 0), hipertensi: Number(form.hipertensi || 0), diabetes: Number(form.diabetes || 0), umur: age, premiDasar: base, kompUmur: ageFactor * base, kompMerokok: smoking, kompHipertensi: hypertension, kompDiabetes: diabetes, premi: base + ageFactor * base + smoking + hypertension + diabetes };
    } else {
      const year = Number(form.tahun); const age = new Date().getFullYear() - year; const price = Number(form.harga); const rate = age <= 3 ? .025 : age <= 5 ? price < 200000000 ? .04 : .03 : .05; const kategori = age <= 3 ? "0–3 tahun (2.5% per tahun)" : age <= 5 ? price < 200000000 ? "3–5 tahun & harga < 200 juta (4% per tahun)" : "3–5 tahun & harga ≥ 200 juta (3% per tahun)" : ">5 tahun (5% per tahun)";
      data = { type: "mobil", merk: form.merk, jenis: form.jenis, pemilik: form.pemilik, plat: form.plat, mesin: form.mesin, rangka: form.rangka, tahun: year, umur: age, harga: price, kategori, foto_depan: form.foto_depan, foto_belakang: form.foto_belakang, foto_kiri: form.foto_kiri, foto_kanan: form.foto_kanan, foto_dashboard: form.foto_dashboard, foto_mesin: form.foto_mesin, premi: rate * price * age };
    }
    localStorage.setItem(`${type}Data`, JSON.stringify(data)); sessionStorage.setItem(`${type}Data`, JSON.stringify(data)); router.push(`/dashboard/checkout?type=${type}`);
  };

  const title = type === "jiwa" ? "Life Insurance" : type === "kesehatan" ? "Health Insurance" : "Car Insurance";
  const input = (key: string, label: string, extra: InputHTMLAttributes<HTMLInputElement> = {}) => <label className="grid gap-2 text-sm font-semibold">{label}<input required value={form[key] || ""} onChange={(e) => set(key, e.target.value)} className="rounded-[8px] border px-4 py-3 font-normal outline-none focus:border-[#475974]" {...extra} /></label>;
  const select = (key: string, label: string, options: [string, string][]) => <CustomSelect label={label} value={form[key] || ""} options={options} onChange={(value) => set(key, value)} />;
  const fileInput = (key: string, label: string) => <label className="grid gap-2 text-sm font-semibold">{label}<input disabled type="file" accept="image/*" onChange={(e) => set(key, e.target.files?.[0]?.name || "")} className="w-full cursor-not-allowed rounded-[8px] border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-normal text-slate-400" /></label>;

  return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg px-6 py-10 text-[#475974]"><div className="mx-auto max-w-3xl"><Link href="/dashboard" className="text-sm font-semibold">← Dashboard</Link><h1 className="mt-5 text-3xl font-bold">{title}</h1><div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"><p className="text-slate-500">Enter your details to calculate a premium estimate.</p>{alertMessage && <p className="font-semibold text-red-500" role="alert">{alertMessage}</p>}</div><form onSubmit={submit} className="mt-8 grid gap-4 rounded-[8px] bg-white p-6 shadow-sm md:grid-cols-2">
    {type === "jiwa" && <>{input("nama", "Full name")} {input("tgl_lahir", "Date of birth", { type: "date", required: false })} {select("tanggungan", "Sum assured", [["1000000000", money(1000000000)], ["2000000000", money(2000000000)], ["3500000000", money(3500000000)], ["5000000000", money(5000000000)], ["10000000000", money(10000000000)]])} {select("jenisJiwa", "Life Insurance Type", [["Berjangka", "Term Life Insurance"], ["Seumur Hidup", "Whole Life Insurance"], ["Unit Link", "Unit-Linked Life Insurance"], ["Dwiguna", "Endowment Life Insurance"], ["Kredit", "Credit Life Insurance"]])}</>}
    {type === "kesehatan" && <>{input("nama", "Full name")} {input("tgl_lahir", "Date of birth", { type: "date", required: false })} {input("pekerjaan", "Occupation")} {select("jenis", "Health Insurance Type", [["Inpatient Care", "Inpatient Care"], ["Outpatient Care", "Outpatient Care"], ["Dental Care", "Dental Care"], ["Maternity Care", "Maternity Care"], ["Paket Lengkap", "Comprehensive Package"]])} {select("merokok", "Smoking?", [["0", "No"], ["1", "Yes"]])} {select("hipertensi", "Hypertension?", [["0", "No"], ["1", "Yes"]])} {select("diabetes", "Diabetes?", [["0", "No"], ["1", "Yes"]])}</>}
    {type === "mobil" && <>{select("merk", "Car Make", carBrands.map((brand) => [brand, brand] as [string, string]))} {select("jenis", "Car Model", (carModels[form.merk] || []).map((model) => [model, model] as [string, string]))} {input("tahun", "Manufacturing year", { type: "number", min: "1900", max: "2099" })} {input("harga", "Car value", { type: "number", min: "0" })} {input("plat", "License plate")} {input("mesin", "Engine number")} {input("rangka", "Chassis number")} {input("pemilik", "Owner name")} {fileInput("foto_depan", "Front View Photo")} {fileInput("foto_belakang", "Rear View Photo")} {fileInput("foto_kiri", "Left View Photo")} {fileInput("foto_kanan", "Right View Photo")} {fileInput("foto_dashboard", "Dashboard Photo")} {fileInput("foto_mesin", "Engine Photo")}</>}
    <button className="md:col-span-2 rounded-[8px] bg-[#475974] px-5 py-3 font-semibold text-white">Calculate premium</button>
  </form></div></main>;
}














