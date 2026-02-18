"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { AlertCircle, CalendarClock, CheckCircle2, RotateCcw } from "lucide-react";

type PostponeRequest = {
  regNo: string;
  programme: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
};

const STORAGE_KEY = "atc_postpone_request";

export default function PostponeStudentsPage() {
  const [regNo, setRegNo] = useState("2534477263");
  const [programme, setProgramme] = useState("BIT");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [request, setRequest] = useState<PostponeRequest | null>(null);

  useEffect(() => {
    setRegNo(sessionStorage.getItem("atc_registration_number") ?? "2534477263");
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRequest(JSON.parse(raw) as PostponeRequest);
    } catch {
      setRequest(null);
    }
  }, []);

  useEffect(() => {
    if (!request) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(request));
  }, [request]);

  const canSubmit = useMemo(() => {
    return reason.trim().length > 10 && !!fromDate && !!toDate;
  }, [reason, fromDate, toDate]);

  const submit = () => {
    if (!canSubmit) return;
    const payload: PostponeRequest = {
      regNo,
      programme,
      reason: reason.trim(),
      fromDate,
      toDate,
      status: "approved",
      createdAt: Date.now(),
    };
    setRequest(payload);
  };

  const reset = () => {
    setRequest(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DashboardShell title="Postpone Students">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Request</p>
          <h1 className="mt-2 text-xl font-bold text-slate-900">Postponement Application</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Use this form to apply for postponement. After approval, you will be able to apply to resume studies on the Resume Studies page.
          </p>
        </div>

        {request ? (
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-900">Postponement status: {request.status.toUpperCase()}</p>
                  <p className="mt-1 text-sm text-emerald-900/80">Reg No: {request.regNo} • Programme: {request.programme}</p>
                  <p className="mt-1 text-sm text-emerald-900/80">
                    Period: {request.fromDate} to {request.toDate}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 text-xs font-bold text-emerald-800 hover:bg-emerald-100/40"
              >
                <RotateCcw className="h-4 w-4" />
                Reset (demo)
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Next</p>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Proceed to Resume Studies to request returning back to studies.
              </p>
              <Link
                href="/dashboard/resume-studies"
                className="mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-[color:var(--brand-blue)]"
              >
                Go to Resume Studies
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">Registration Number</label>
                <input
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">Programme</label>
                <input
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">From</label>
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">To</label>
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <label className="text-sm font-semibold text-slate-900">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Explain why you need postponement..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
              />
              <p className="text-xs text-slate-500">Tip: include your situation and the expected return date.</p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  Demo mode: submitting this form will mark your postponement as approved so you can test Resume Studies.
                </p>
              </div>

              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className={
                  canSubmit
                    ? "inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand-blue)] px-6 text-sm font-semibold text-white hover:opacity-95"
                    : "inline-flex h-11 items-center justify-center rounded-2xl bg-slate-300 px-6 text-sm font-semibold text-white cursor-not-allowed"
                }
              >
                Submit application
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
