"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CustomSelect } from "@/components/CustomSelect";
type Payment = { productName?: string; type?: string; paymentMethod?: string; status?: string; amount?: number; paidAt?: string; };
export default function HistoryPage() { const [items, setItems] = useState<Payment[]>([]); const [query, setQuery] = useState(""); const [type, setType] = useState("all"); useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("paymentHistory") || "[]")); } catch { setItems([]); } }, []); const filtered = useMemo(() => items.filter((item) => (type === "all" || item.type === type) && (item.productName || "").toLowerCase().includes(query.toLowerCase())).reverse(), [items, query, type]); return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg px-6 py-10 text-[#475974]"><div className="mx-auto max-w-4xl"><Link href="/dashboard" className="text-sm font-semibold">← Dashboard</Link><h1 className="mt-5 text-3xl font-bold">Purchase History</h1><div className="mt-6 flex flex-wrap gap-3"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari transactions..." className="min-w-60 flex-1 rounded-[8px] border bg-white px-4 py-3" /><CustomSelect value={type} onChange={setType} options={[["all", "All products"], ["jiwa", "Life"], ["kesehatan", "Health"], ["mobil", "Car"]]} /></div><div className="mt-6 grid gap-3">{filtered.length ? filtered.map((item, index) => <article key={`${item.paidAt}-${index}`} className="flex flex-wrap items-center justify-between gap-4 rounded-[8px] bg-white p-5 shadow-sm"><div><p className="font-bold">{item.productName || "Asuransi"}</p><p className="text-sm text-slate-400">{item.paymentMethod || "-"} · {item.paidAt ? new Date(item.paidAt).toLocaleDateString("en-GB") : "-"}</p></div><div className="text-right"><p className="font-bold">Rp {Number(item.amount || 0).toLocaleString("id-ID")}</p><span className="text-xs font-semibold text-emerald-600">{item.status || "Lunas"}</span></div></article>) : <div className="rounded-[8px] bg-white p-10 text-center text-slate-500">No purchase history yet.</div>}</div></div></main>; }






