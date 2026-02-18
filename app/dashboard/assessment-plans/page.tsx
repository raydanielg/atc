"use client";

import { useMemo } from "react";
import DashboardShell from "@/components/DashboardShell";

type CaItem = {
  moduleCode: string;
  moduleName: string;
  caPercent: number;
  plan: string;
};

export default function AssessmentPlansPage() {
  const items = useMemo<CaItem[]>(
    () => [
      {
        moduleCode: "CSDF 101",
        moduleName: "Introduction to Cyber Security",
        caPercent: 70,
        plan: "Quiz 10% • Assignment 20% • Test 40%",
      },
      {
        moduleCode: "CSDF 104",
        moduleName: "Secure Programming",
        caPercent: 55,
        plan: "Lab 20% • Assignment 15% • Test 20%",
      },
      {
        moduleCode: "CSDF 106",
        moduleName: "Incident Response & Handling",
        caPercent: 35,
        plan: "Quiz 10% • Practical 15% • Test 10%",
      },
      {
        moduleCode: "CSDF 108",
        moduleName: "Network Security",
        caPercent: 85,
        plan: "Assignment 25% • Test 30% • Practical 30%",
      },
    ],
    []
  );

  const overall = Math.round(items.reduce((acc, i) => acc + i.caPercent, 0) / items.length);

  return (
    <DashboardShell title="Assessment Plans">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500">CONTINUOUS ASSESSMENT (CA)</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Assessment plans</p>
          <p className="mt-1 text-sm text-slate-600">
            Track your CA progress per module.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((i) => (
            <div key={i.moduleCode} className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-widest text-slate-500">{i.moduleCode}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{i.moduleName}</p>
                  <p className="mt-1 text-sm text-slate-600">{i.plan}</p>
                </div>
                <DonutChart value={i.caPercent} label="CA" />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold tracking-widest text-slate-500">CA PROGRESS</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{i.caPercent}%</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500">SUMMARY</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Overall CA progress</p>
              <p className="mt-1 text-sm text-slate-600">
                You have completed approximately <span className="font-semibold text-slate-900">{overall}%</span> of your CA.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <DonutChart value={overall} label="Overall" />
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500">CURRENT LEVEL</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">NTA 7-2</p>
                <p className="mt-1 text-xs text-slate-600">Semester 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function DonutChart({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = 18;
  const c = 2 * Math.PI * r;
  const dash = (clamped / 100) * c;
  const gap = c - dash;

  return (
    <div className="flex flex-col items-center">
      <svg width="64" height="64" viewBox="0 0 48 48" aria-label={label} role="img">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="var(--brand-blue)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          transform="rotate(-90 24 24)"
        />
        <text x="24" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
          {clamped}%
        </text>
      </svg>
      <p className="mt-2 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}
