"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { AlertCircle, CalendarClock, CheckCircle2, XCircle, RotateCcw, Info } from "lucide-react";

type TemporaryLeaveRequest = {
  regNo: string;
  programme: string;
  reason: string;
  leaveFrom: string;
  leaveTo: string;
  contactPhone: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
  reviewedAt?: number;
  reviewerMessage?: string;
};

const STORAGE_KEY = "atc_temporary_leave_request";

export default function TemporaryLeavePage() {
  const [regNo, setRegNo] = useState("2534477263");
  const [programme, setProgramme] = useState("BIT");
  const [reason, setReason] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [request, setRequest] = useState<TemporaryLeaveRequest | null>(null);

  useEffect(() => {
    setRegNo(sessionStorage.getItem("atc_registration_number") ?? "2534477263");
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setRequest(raw ? (JSON.parse(raw) as TemporaryLeaveRequest) : null);
    } catch {
      setRequest(null);
    }
  }, []);

  useEffect(() => {
    if (!request) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(request));
  }, [request]);

  const canSubmit = useMemo(() => {
    return reason.trim().length > 10 && !!leaveFrom && !!leaveTo && contactPhone.trim().length > 6;
  }, [reason, leaveFrom, leaveTo, contactPhone]);

  const submit = () => {
    if (!canSubmit) return;

    const payload: TemporaryLeaveRequest = {
      regNo,
      programme,
      reason: reason.trim(),
      leaveFrom,
      leaveTo,
      contactPhone: contactPhone.trim(),
      status: "pending",
      createdAt: Date.now(),
    };
    setRequest(payload);

    const decisionApproved = Math.random() > 0.25;
    window.setTimeout(() => {
      setRequest((prev) => {
        if (!prev) return prev;
        if (prev.status !== "pending") return prev;
        return {
          ...prev,
          status: decisionApproved ? "approved" : "rejected",
          reviewedAt: Date.now(),
          reviewerMessage: decisionApproved
            ? "Your temporary leave request has been approved. Please report back on the return date."
            : "Your request was rejected. Please contact your Academic Adviser for clarification.",
        };
      });
    }, 1200);
  };

  const reset = () => {
    setRequest(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DashboardShell title="Temporary Leave">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Short-term permission</p>
          <h1 className="mt-2 text-xl font-bold text-slate-900">Temporary Leave Request</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Request a short-term leave (ruhusa ya muda mfupi). After submitting, you will see the decision (approved or rejected).
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Temporary Leave vs Postponement</p>
              <p className="mt-1 text-sm text-blue-900/80 leading-relaxed">
                Temporary Leave is for a short period (days/weeks). Postponement is pausing studies for a longer period (months/years).
              </p>
              <p className="mt-2 text-sm text-blue-900/80 leading-relaxed">
                If you need to stop studies for a long time, use <span className="font-semibold">Postpone Students</span>.
              </p>
              <Link
                href="/dashboard/postpone-students"
                className="mt-3 inline-flex h-10 items-center justify-center rounded-2xl bg-slate-900 px-4 text-xs font-bold text-white hover:bg-[color:var(--brand-blue)]"
              >
                Go to Postpone Students
              </Link>
            </div>
          </div>
        </div>

        {request ? (
          <div
            className={
              request.status === "approved"
                ? "rounded-3xl border border-emerald-100 bg-emerald-50 p-6"
                : request.status === "rejected"
                  ? "rounded-3xl border border-red-100 bg-red-50 p-6"
                  : "rounded-3xl border border-amber-100 bg-amber-50 p-6"
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={
                    request.status === "approved"
                      ? "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-700"
                      : request.status === "rejected"
                        ? "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-red-700"
                        : "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-700"
                  }
                >
                  {request.status === "approved" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : request.status === "rejected" ? (
                    <XCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Request status: {request.status.toUpperCase()}</p>
                  <p className="mt-1 text-sm text-slate-700">Reg No: {request.regNo} • Programme: {request.programme}</p>
                  <p className="mt-1 text-sm text-slate-700">
                    Leave: {request.leaveFrom} to {request.leaveTo}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">Contact: {request.contactPhone}</p>
                  {request.reviewerMessage ? (
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">{request.reviewerMessage}</p>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 hover:bg-slate-50"
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
                <label className="text-sm font-semibold text-slate-900">Leave from</label>
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">Leave to</label>
                <div className="relative">
                  <CalendarClock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <label className="text-sm font-semibold text-slate-900">Contact phone number</label>
              <input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g. 0612xxxxxx"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
              />
              <p className="text-xs text-slate-500">This number may be used to contact you during leave.</p>
            </div>

            <div className="mt-4 grid gap-2">
              <label className="text-sm font-semibold text-slate-900">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Explain why you need temporary leave..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <AlertCircle className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  Demo mode: the system will automatically respond with approved/rejected after a short moment.
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
                Submit leave request
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
