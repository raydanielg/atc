"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { AlertCircle, CheckCircle2, ClipboardCheck, RotateCcw } from "lucide-react";

type PostponeRequest = {
  regNo: string;
  programme: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
};

type ResumeRequest = {
  regNo: string;
  programme: string;
  expectedReturnDate: string;
  remarks: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
};

const POSTPONE_KEY = "atc_postpone_request";
const RESUME_KEY = "atc_resume_request";

export default function ResumeStudiesPage() {
  const [postpone, setPostpone] = useState<PostponeRequest | null>(null);
  const [resume, setResume] = useState<ResumeRequest | null>(null);

  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    try {
      const p = localStorage.getItem(POSTPONE_KEY);
      setPostpone(p ? (JSON.parse(p) as PostponeRequest) : null);
    } catch {
      setPostpone(null);
    }

    try {
      const r = localStorage.getItem(RESUME_KEY);
      setResume(r ? (JSON.parse(r) as ResumeRequest) : null);
    } catch {
      setResume(null);
    }
  }, []);

  useEffect(() => {
    if (!resume) return;
    localStorage.setItem(RESUME_KEY, JSON.stringify(resume));
  }, [resume]);

  const canApply = useMemo(() => {
    return !!expectedReturnDate && remarks.trim().length > 5;
  }, [expectedReturnDate, remarks]);

  const eligible = postpone && postpone.status === "approved";

  const submit = () => {
    if (!eligible) return;
    if (!canApply) return;
    const payload: ResumeRequest = {
      regNo: postpone.regNo,
      programme: postpone.programme,
      expectedReturnDate,
      remarks: remarks.trim(),
      status: "pending",
      createdAt: Date.now(),
    };
    setResume(payload);
  };

  const reset = () => {
    setResume(null);
    localStorage.removeItem(RESUME_KEY);
  };

  return (
    <DashboardShell title="Resume Studies">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Application</p>
          <h1 className="mt-2 text-xl font-bold text-slate-900">Resume Studies Request</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            This page is used to request returning back to studies. It is available only after you have an approved postponement request.
          </p>
        </div>

        {!postpone ? (
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-700">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900">Not eligible yet</p>
                <p className="mt-1 text-sm text-amber-900/80 leading-relaxed">
                  You have no postponement request on record. Submit postponement first, then come back here.
                </p>
                <Link
                  href="/dashboard/postpone-students"
                  className="mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-[color:var(--brand-blue)]"
                >
                  Go to Postpone Students
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Postponement record</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Reg No: {postpone.regNo}</p>
                <p className="mt-1 text-sm text-slate-600">Programme: {postpone.programme}</p>
                <p className="mt-1 text-sm text-slate-600">
                  Period: {postpone.fromDate} to {postpone.toDate}
                </p>
              </div>
              <div
                className={
                  postpone.status === "approved"
                    ? "inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
                    : postpone.status === "rejected"
                      ? "inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                      : "inline-flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700"
                }
              >
                <ClipboardCheck className="h-4 w-4" />
                Status: {postpone.status.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {eligible ? (
          resume ? (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Resume request submitted</p>
                    <p className="mt-1 text-sm text-emerald-900/80">Expected return: {resume.expectedReturnDate}</p>
                    <p className="mt-1 text-sm text-emerald-900/80">Status: {resume.status.toUpperCase()}</p>
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
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-900">Expected return date</label>
                  <input
                    type="date"
                    value={expectedReturnDate}
                    onChange={(e) => setExpectedReturnDate(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-900">Remarks</label>
                  <input
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Short note (e.g. ready to continue)"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-slate-500" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Demo mode: your resume request will be stored locally as <span className="font-semibold">PENDING</span> for review.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={submit}
                  disabled={!canApply}
                  className={
                    canApply
                      ? "inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand-blue)] px-6 text-sm font-semibold text-white hover:opacity-95"
                      : "inline-flex h-11 items-center justify-center rounded-2xl bg-slate-300 px-6 text-sm font-semibold text-white cursor-not-allowed"
                  }
                >
                  Submit resume request
                </button>
              </div>
            </div>
          )
        ) : postpone ? (
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-700">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900">Resume request locked</p>
                <p className="mt-1 text-sm text-amber-900/80 leading-relaxed">
                  Your postponement status is <span className="font-semibold">{postpone.status.toUpperCase()}</span>. You can apply to resume only when postponement is approved.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DashboardShell>
  );
}
