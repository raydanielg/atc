"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/components/DashboardShell";

type ExamStatus = "Pass" | "Disco" | "Fail";

type ExamSession = {
  id: string;
  title: string;
  year: number;
  semester: string;
  overallPercent: number;
  status: ExamStatus;
  passModules: number;
  discoModules: number;
  failModules: number;
};

export default function ResultsPage() {
  const sessions = useMemo<ExamSession[]>(
    () => [
      {
        id: "y1-s1",
        title: "Semester 1 Results",
        year: 1,
        semester: "Semester 1",
        overallPercent: 62,
        status: "Pass",
        passModules: 6,
        discoModules: 0,
        failModules: 1,
      },
      {
        id: "y1-s2",
        title: "Semester 2 Results",
        year: 1,
        semester: "Semester 2",
        overallPercent: 48,
        status: "Disco",
        passModules: 4,
        discoModules: 2,
        failModules: 1,
      },
      {
        id: "y2-s1",
        title: "Semester 1 Results",
        year: 2,
        semester: "Semester 1",
        overallPercent: 71,
        status: "Pass",
        passModules: 7,
        discoModules: 0,
        failModules: 0,
      },
      {
        id: "y2-s2",
        title: "Semester 2 Results",
        year: 2,
        semester: "Semester 2",
        overallPercent: 39,
        status: "Fail",
        passModules: 2,
        discoModules: 1,
        failModules: 4,
      },
    ],
    []
  );

  const years = useMemo(
    () => Array.from(new Set(sessions.map((s) => s.year))).sort((a, b) => a - b),
    [sessions]
  );

  const [selectedId, setSelectedId] = useState(sessions[0]?.id ?? "");
  const selected = sessions.find((s) => s.id === selectedId) ?? sessions[0];

  return (
    <DashboardShell title="Results">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-1">
          <p className="text-xs font-semibold tracking-widest text-slate-500">EXAMS</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">All results</p>
          <p className="mt-1 text-sm text-slate-600">Grouped by academic year.</p>

          <div className="mt-6 grid gap-5">
            {years.map((year) => (
              <div key={year}>
                <p className="text-xs font-semibold tracking-widest text-slate-500">YEAR {year}</p>
                <div className="mt-3 grid gap-2">
                  {sessions
                    .filter((s) => s.year === year)
                    .map((s) => {
                      const active = s.id === selectedId;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedId(s.id)}
                          className={
                            active
                              ? "w-full rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-left"
                              : "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left hover:bg-slate-50"
                          }
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                              <p className="mt-1 text-xs text-slate-600">{s.semester}</p>
                            </div>
                            <StatusPill status={s.status} />
                          </div>
                          <p className="mt-2 text-sm font-semibold text-slate-800">{s.overallPercent}%</p>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <p className="text-xs font-semibold tracking-widest text-slate-500">ANALYSIS</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Year {selected.year} • {selected.semester}
              </p>
              <p className="mt-1 text-sm text-slate-600">Summary for the selected exam session.</p>
            </div>
            <StatusPill status={selected.status} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-4">
              <DonutChart value={selected.overallPercent} label="Overall" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Overall performance</p>
                <p className="mt-1 text-sm text-slate-600">{selected.overallPercent}%</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Modules breakdown</p>
              <div className="mt-4 grid gap-2">
                <BreakdownRow label="Pass" value={selected.passModules} color="emerald" />
                <BreakdownRow label="Disco" value={selected.discoModules} color="amber" />
                <BreakdownRow label="Fail" value={selected.failModules} color="rose" />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Remarks</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {selected.status === "Pass" && "Congratulations. You passed this session."}
              {selected.status === "Disco" && "You have a discontinuation warning. Please contact your department."}
              {selected.status === "Fail" && "You failed this session. Please follow the academic guidelines for repeats."}
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatusPill({ status }: { status: ExamStatus }) {
  const cls =
    status === "Pass"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "Disco"
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : "bg-rose-50 text-rose-700 ring-rose-200";

  return (
    <span className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold ring-1 ${cls}`}>{status}</span>
  );
}

function BreakdownRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "emerald" | "amber" | "rose";
}) {
  const dot =
    color === "emerald"
      ? "bg-emerald-600"
      : color === "amber"
        ? "bg-amber-500"
        : "bg-rose-600";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <p className="text-sm font-semibold text-slate-700">{label}</p>
      </div>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
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
      <svg width="72" height="72" viewBox="0 0 48 48" aria-label={label} role="img">
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
