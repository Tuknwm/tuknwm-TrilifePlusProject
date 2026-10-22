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
  const promoImage = `/Asuransi${type === "mobil" ? "Mobil" : type === "kesehatan" ? "Kesehatan" : "Jiwa"}.jpg`;
  const promoTitle = type === "mobil" ? "Complete Car Insurance at TrilifePlus" : type === "kesehatan" ? "Complete Health Insurance at TrilifePlus" : "Complete Life Insurance at TrilifePlus";
  const promoText = type === "mobil" ? "Car insurance provides financial protection against damage, loss, and accidents involving four-wheeled vehicles. At TrilifePlus, you can find trusted car insurance policies from leading companies in Indonesia. Choose protection that suits your needs with ease!" : type === "kesehatan" ? "Enjoy comprehensive health protection with TrilifePlus, featuring complete benefits for every family member, fast service, and full support so you can focus on your health without worrying about costs." : "Bring peace of mind to your family's future with TrilifePlus Life Insurance. Reliable financial protection, comprehensive benefits, and certainty for your loved ones when the unexpected happens.";
  const details = data ? type === "mobil" ? [["Make & Type", `${data.merk || "-"} ${data.jenis || "-"}`], ["Owner Name", data.pemilik || "-"], ["License Plate", data.plat || "-"], ["Car Value", money(Number(data.harga || 0))], ["Manufacturing Year", data.tahun || "-"], ["Car Age", `${data.umur ?? "-"} years`], ["Premium Category", data.kategori || "-"]] : type === "jiwa" ? [["Name", data.nama || "-"], ["Date of Birth", data.tgl_lahir ? new Date(data.tgl_lahir).toLocaleDateString("en-GB") : "-"], ["Age", `${data.umur ?? "-"} years`], ["Insurance Type", data.jenisJiwa || "-"], ["Sum Assured", money(Number(data.tanggungan || 0))], ["Premium Rate", data.tarif ? `${(data.tarif * 100).toFixed(1)}%` : "-"]] : [["Name", data.nama || "-"], ["Date of Birth", data.tgl_lahir ? new Date(data.tgl_lahir).toLocaleDateString("en-GB") : "-"], ["Occupation", data.pekerjaan || "-"], ["Age", `${data.umur ?? "-"} years`], ["Product Type", data.jenis || "-"], ["Base Premium", money(Number(data.premiDasar || 0))], ["Age Component", `+${money(Number(data.kompUmur || 0))}`], ["Smoking", `${Number(data.merokok) ? "Yes" : "No"} (+${money(Number(data.kompMerokok || 0))})`], ["Hypertension", `${Number(data.hipertensi) ? "Yes" : "No"} (+${money(Number(data.kompHipertensi || 0))})`], ["Diabetes", `${Number(data.diabetes) ? "Yes" : "No"} (+${money(Number(data.kompDiabetes || 0))})`]] : [];

  const pay = () => {
    if (!data || !method) return;
    const history = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
    history.push({ ...data, productName, paymentMethod: method, status: "Paid", paidAt: new Date().toISOString(), amount: data.premi });
    localStorage.setItem("paymentHistory", JSON.stringify(history));
    ["jiwa", "kesehatan", "mobil"].forEach((key) => { localStorage.removeItem(`${key}Data`); sessionStorage.removeItem(`${key}Data`); });
    router.push("/dashboard/history");
  };

  return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg px-6 py-10 text-[#475974]"><div className="mx-auto max-w-5xl"><Link href="/dashboard" className="text-sm font-semibold">← Back to dashboard</Link><h1 className="mt-5 text-3xl font-bold">Checkout</h1>{!data ? <div className="mt-8 p-8 text-center">Simulation data is not available.</div> : <><div className="mt-8 grid items-start gap-15 lg:grid-cols-[1.2fr_0.8fr]"><section className="py-2 lg:py-6"><p className="text-sm text-slate-400">Policy details</p><h2 className="mt-1 text-2xl font-bold">{productName}</h2><div className="mt-6 divide-y divide-slate-200/70">{details.map(([label, value]) => <div key={label} className="flex justify-between gap-6 py-3 text-sm"><span className="text-slate-500">{label}</span><span className="text-right font-semibold">{value}</span></div>)}</div><p className="mt-6 text-sm text-slate-400">Total premium</p><p className="text-3xl font-bold">{money(Number(data.premi))}</p></section><section className="flex w-full flex-col py-2 lg:py-6"><label className="grid w-full gap-2 text-sm font-semibold">Payment method<CustomSelect value={method} onChange={setMethod} options={[["", "Choose a payment method"], ["Bank Transfer", "Bank Transfer"], ["Virtual Account", "Virtual Account"], ["E-Wallet", "E-Wallet"]]} /></label><button onClick={pay} disabled={!method} className="mt-5 w-full rounded-[8px] bg-[#475974] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#36465d] disabled:cursor-not-allowed disabled:opacity-50">Pay now</button><div className="my-4 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR<span className="h-px flex-1 bg-slate-200" /></div><button type="button" onClick={() => router.push(`/dashboard/${type}`)} className="w-full cursor-pointer py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#475974]">Cancel</button></section></div><div className={`relative mt-6 grid min-h-72 overflow-hidden rounded-[8px] bg-[#eef2f8] shadow-sm ${type === "jiwa" ? "md:grid-cols-[0.8fr_1.2fr]" : "md:grid-cols-[1.2fr_0.8fr]"}`}><div className={type === "jiwa" ? "relative min-h-56 md:min-h-72" : "relative min-h-56 md:order-2 md:min-h-72"}><Image src={promoImage} alt={productName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" /></div><div className={`pointer-events-none absolute inset-y-0 ${type === "jiwa" ? "left-[40%]" : "left-[60%]"} z-10 hidden w-24 -translate-x-1/2 bg-[#eef2f8]/35 backdrop-blur-[14px] [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] md:block`} /><div className={type === "jiwa" ? "flex flex-col justify-center px-6 py-8 text-[#475974] md:px-10" : "flex flex-col justify-center px-6 py-8 text-[#475974] md:order-1 md:px-10"}><h2 className="text-2xl font-bold leading-tight md:text-3xl">{promoTitle}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base">{promoText}</p></div></div></>}</div></main>;
}








