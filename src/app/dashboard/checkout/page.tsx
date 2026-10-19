"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CustomSelect } from "@/components/CustomSelect";

const money = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;
type Data = Record<string, any>;

export default function CheckoutPage() {
  const router = useRouter();
  const [type, setType] = useState("kesehatan");
  const [data, setData] = useState<Data | null>(null);
  const [method, setMethod] = useState("");

  useEffect(() => {
    const nextType = new URLSearchParams(window.location.search).get("type") || "kesehatan";
    setType(nextType);
    const raw = sessionStorage.getItem(`${nextType}Data`) || localStorage.getItem(`${nextType}Data`);
    if (raw) setData(JSON.parse(raw));
  }, []);

  const productName = type === "mobil" ? "Car Insurance" : type === "jiwa" ? "Life Insurance" : "Health Insurance";
  const bannerName = type === "mobil" ? "AsuransiMobil" : type === "jiwa" ? "AsuransiJiwa" : "AsuransiKesehatan";
  const details = data ? type === "mobil" ? [["Make & Type", `${data.merk || "-"} ${data.jenis || "-"}`], ["Owner Name", data.pemilik || "-"], ["License Plate", data.plat || "-"], ["Car Value", money(Number(data.harga || 0))], ["Manufacturing Year", data.tahun || "-"], ["Car Age", `${data.umur || "-"} years`], ["Premium Category", data.kategori || "-"]] : type === "jiwa" ? [["Name", data.nama || "-"], ["Date of Birth", data.tgl_lahir ? new Date(data.tgl_lahir).toLocaleDateString("en-GB") : "-"], ["Age", `${data.umur || "-"} years`], ["Insurance Type", data.jenisJiwa || "-"], ["Sum Assured", money(Number(data.tanggungan || 0))], ["Premium Rate", data.tarif ? `${(data.tarif * 100).toFixed(1)}%` : "-"]] : [["Name", data.nama || "-"], ["Date of Birth", data.tgl_lahir ? new Date(data.tgl_lahir).toLocaleDateString("en-GB") : "-"], ["Occupation", data.pekerjaan || "-"], ["Age", `${data.umur || "-"} years`], ["Product Type", data.jenis || "-"], ["Base Premium", money(Number(data.premiDasar || 0))], ["Age Component", `+${money(Number(data.kompUmur || 0))}`], ["Smoking", `${data.k1 ? "Yes" : "No"} (+${money(Number(data.kompMerokok || 0))})`], ["Hypertension", `${data.k2 ? "Yes" : "No"} (+${money(Number(data.kompHipertensi || 0))})`], ["Diabetes", `${data.k3 ? "Yes" : "No"} (+${money(Number(data.kompDiabetes || 0))})`]] : [];

  const pay = () => {
    if (!data || !method) return;
    const history = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
    history.push({ ...data, productName, paymentMethod: method, status: "Paid", paidAt: new Date().toISOString(), amount: data.premi });
    localStorage.setItem("paymentHistory", JSON.stringify(history));
    ["jiwa", "kesehatan", "mobil"].forEach((key) => { localStorage.removeItem(`${key}Data`); sessionStorage.removeItem(`${key}Data`); });
    router.push("/dashboard/history");
  };

  return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg px-6 py-10 text-[#475974]"><div className="mx-auto max-w-5xl"><Link href="/dashboard" className="text-sm font-semibold">← Back to dashboard</Link><h1 className="mt-5 text-3xl font-bold">Checkout</h1>{!data ? <div className="mt-8 p-8 text-center">Simulation data is not available.</div> : <><div className="mt-8 grid items-start gap-15 lg:grid-cols-[1.2fr_0.8fr]"><section className="py-2 lg:py-6"><p className="text-sm text-slate-400">Policy details</p><h2 className="mt-1 text-2xl font-bold">{productName}</h2><div className="mt-6 divide-y divide-slate-200/70">{details.map(([label, value]) => <div key={label} className="flex justify-between gap-6 py-3 text-sm"><span className="text-slate-500">{label}</span><span className="text-right font-semibold">{value}</span></div>)}</div><p className="mt-6 text-sm text-slate-400">Total premium</p><p className="text-3xl font-bold">{money(Number(data.premi))}</p></section><section className="flex w-full flex-col py-2 lg:py-6"><label className="grid w-full gap-2 text-sm font-semibold">Payment method<CustomSelect value={method} onChange={setMethod} options={[["", "Choose a payment method"], ["Bank Transfer", "Bank Transfer"], ["Virtual Account", "Virtual Account"], ["E-Wallet", "E-Wallet"]]} /></label><button onClick={pay} disabled={!method} className="mt-5 w-full rounded-[8px] bg-[#475974] px-5 py-3 font-semibold text-white disabled:opacity-50">Pay now</button></section></div><div className="relative mt-6 min-h-72 overflow-hidden rounded-[8px] bg-[#202020]"><Image src={`/images/${bannerName}.png`} alt={productName} fill className={`object-contain ${type === "jiwa" ? "object-left" : "object-right"}`} sizes="(max-width: 1024px) 100vw, 80vw" /></div></>}</div></main>;
}








