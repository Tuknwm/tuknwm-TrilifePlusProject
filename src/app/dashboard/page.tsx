"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Car, FileText, HeartPulse, Mail, LogOut, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

type User = { nama: string; email?: string };
type HistoryItem = { name?: string; policyName?: string; insuranceType?: string; status?: string; date?: string };

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [settings, setSettings] = useState({ nama: "", email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [confirmAction, setConfirmAction] = useState<"transactions" | "account" | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setSettings((current) => ({ ...current, nama: parsedUser.nama || "", email: parsedUser.email || "" }));
      } catch { localStorage.removeItem("currentUser"); }
    }
    const storedHistory = localStorage.getItem("paymentHistory") || localStorage.getItem("history") || localStorage.getItem("purchaseHistory");
    if (storedHistory) {
      try { setHistory(JSON.parse(storedHistory)); } catch { setHistory([]); }
    }
  }, []);

  const recentHistory = useMemo(() => history.slice(-3).reverse(), [history]);
  const accountActive = history.length > 0;
  const logout = () => { localStorage.removeItem("currentUser"); window.location.href = "/"; };
  const saveSettings = (event: React.FormEvent) => { event.preventDefault(); const updatedUser = { nama: settings.nama, email: settings.email }; localStorage.setItem("currentUser", JSON.stringify(updatedUser)); setUser(updatedUser); setSettings((current) => ({ ...current })); };
  const deleteTransactions = () => { localStorage.removeItem("paymentHistory"); setHistory([]); setConfirmAction(null); };
  const deleteAccount = () => { ["currentUser", "paymentHistory", "jiwaData", "kesehatanData", "mobilData"].forEach((key) => localStorage.removeItem(key)); window.location.href = "/"; };
  const savePassword = (event: React.FormEvent) => { event.preventDefault(); if (settings.newPassword !== settings.confirmPassword) { window.alert("New password and confirmation do not match."); return; } window.alert("Password updated successfully."); setSettings((current) => ({ ...current, currentPassword: "", newPassword: "", confirmPassword: "" })); };

  if (!user) return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg flex items-center justify-center p-6 text-[#475974]"><div className="text-center"><h1 className="text-2xl font-bold">Session unavailable</h1><p className="mt-2 text-slate-500">Please sign in from the home page.</p><Link href="/" className="inline-flex mt-5 items-center gap-2 rounded-[8px] bg-[#475974] px-5 py-3 text-sm font-semibold text-white">Back <ArrowRight className="h-4 w-4" /></Link></div></main>;

  return <main className="page-transition min-h-screen bg-[#f7f9fc] dashboard-bg text-[#475974]"><Navbar currentUser={user} onLogout={logout} /><section className="mx-auto max-w-6xl px-6 py-10"><div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"><div><p className="text-sm font-semibold text-slate-400">Personal dashboard</p><h1 className="mt-1 text-3xl font-bold">Hello, {user.nama}</h1><p className="mt-2 text-slate-500">Manage your insurance simulations and policy history here.</p></div><div className="grid gap-4 sm:grid-cols-3 lg:mt-6 lg:min-w-[420px]"><div className="p-1"><ShieldCheck className="h-6 w-6" /><p className="mt-3 text-sm text-slate-400">Account status</p><p className={`text-xl font-bold ${accountActive ? "text-emerald-600" : "text-slate-400"}`}>{accountActive ? "Active" : "Inactive"}</p></div><div className="p-1"><FileText className="h-6 w-6" /><p className="mt-3 text-sm text-slate-400">Total history</p><p className="text-xl font-bold">{history.length} transactions</p></div><div className="p-1"><Mail className="h-6 w-6" /><p className="mt-3 text-sm text-slate-400">Email</p><p className="break-all text-xl font-bold">{user.email || "-"}</p></div></div></div><div className="mt-10 grid gap-4 md:grid-cols-4"><a href="/dashboard/jiwa" className="rounded-[8px] bg-white p-5 shadow-sm hover:ring-[#475974]"><UserRound className="h-6 w-6" /><p className="mt-4 font-bold">Life Insurance</p><p className="mt-1 text-sm text-slate-400">Life insurance simulation</p></a><a href="/dashboard/kesehatan" className="rounded-[8px] bg-white p-5 shadow-sm hover:ring-[#475974]"><HeartPulse className="h-6 w-6" /><p className="mt-4 font-bold">Health Insurance</p><p className="mt-1 text-sm text-slate-400">Calculate health premium</p></a><a href="/dashboard/mobil" className="rounded-[8px] bg-white p-5 shadow-sm hover:ring-[#475974]"><Car className="h-6 w-6" /><p className="mt-4 font-bold">Car Insurance</p><p className="mt-1 text-sm text-slate-400">Car insurance simulation</p></a><a href="/dashboard/history" className="rounded-[8px] bg-white p-5 shadow-sm hover:ring-[#475974]"><FileText className="h-6 w-6" /><p className="mt-4 font-bold">History</p><p className="mt-1 text-sm text-slate-400">View previous transactions</p></a></div><div className="mt-12 max-w-none"><h2 className="text-xl font-bold">Account settings</h2><p className="mt-1 text-sm text-slate-500">Update your profile information and password.</p><div className="mt-5 grid gap-10 lg:grid-cols-2"><form onSubmit={saveSettings} className="grid gap-4"><h3 className="font-semibold">Profile information</h3><label className="grid gap-2 text-sm font-semibold">Username<input disabled required value={settings.nama} placeholder="John Doe" onChange={(e) => setSettings({ ...settings, nama: e.target.value })} className="cursor-not-allowed rounded-[8px] border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none" /></label><label className="grid gap-2 text-sm font-semibold">Email<input disabled required type="email" value={settings.email} placeholder="example@user.com" onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="cursor-not-allowed rounded-[8px] border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none" /></label><button disabled type="submit" className="w-fit cursor-not-allowed rounded-[8px] bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-500">Save profile</button></form><form onSubmit={savePassword} className="grid gap-4 lg:grid-cols-2"><h3 className="font-semibold lg:col-span-2">Password settings</h3><label className="grid gap-2 text-sm font-semibold lg:col-span-2">Current password<input disabled required type="password" value={settings.currentPassword} placeholder="Enter current password" onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })} className="cursor-not-allowed rounded-[8px] border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none" /></label><label className="grid gap-2 text-sm font-semibold">New password<input disabled required type="password" value={settings.newPassword} placeholder="Enter new password" onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })} className="cursor-not-allowed rounded-[8px] border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none" /></label><label className="grid gap-2 text-sm font-semibold">Confirm new password<input disabled required type="password" value={settings.confirmPassword} placeholder="Confirm new password" onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })} className="cursor-not-allowed rounded-[8px] border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none" /></label><button disabled type="submit" className="w-fit cursor-not-allowed rounded-[8px] bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-500 lg:col-span-2">Update password</button></form></div><div className="mt-12 pb-10"><h2 className="text-xl font-bold text-red-500/75">Danger zone</h2><p className="mt-1 text-sm text-slate-500">Use these options carefully. They remove dummy data from this browser and cannot be undone.</p><div className="mt-5 grid gap-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-slate-600">Delete transactions</p><p className="mt-1 text-sm text-slate-500">Remove all saved transaction history from this browser.</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => setConfirmAction(confirmAction === "transactions" ? null : "transactions")} className={confirmAction === "transactions" ? "w-fit rounded-[8px] px-0 py-2 text-sm font-semibold text-secondary" : "w-fit rounded-[8px] px-0 py-2 text-sm font-semibold text-red-500/80 transition-colors hover:text-red-600"}>{confirmAction === "transactions" ? "Are you sure?" : "Delete transactions"}</button>{confirmAction === "transactions" && <><button disabled type="button" onClick={deleteTransactions} className="cursor-not-allowed text-sm font-semibold text-slate-400">Confirm</button><button type="button" onClick={() => setConfirmAction(null)} className="text-sm text-slate-500">Cancel</button></>}</div></div><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-slate-600">Delete account</p><p className="mt-1 text-sm text-slate-500">Remove the dummy account and all saved insurance data.</p></div><div className="flex items-center gap-3"><button type="button" onClick={() => setConfirmAction(confirmAction === "account" ? null : "account")} className={confirmAction === "account" ? "w-fit rounded-[8px] px-0 py-2 text-sm font-semibold text-secondary" : "w-fit rounded-[8px] px-0 py-2 text-sm font-semibold text-red-500/80 transition-colors hover:text-red-600"}>{confirmAction === "account" ? "Are you sure?" : "Delete account"}</button>{confirmAction === "account" && <><button disabled type="button" onClick={deleteAccount} className="cursor-not-allowed text-sm font-semibold text-slate-400">Confirm</button><button type="button" onClick={() => setConfirmAction(null)} className="text-sm text-slate-500">Cancel</button></>}</div></div></div></div></div></section></main>;
}

























