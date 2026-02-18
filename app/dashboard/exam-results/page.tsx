"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";

type ResultRow = {
  moduleCode: string;
  ca: number;
  exam: number;
  total: number;
  grade: string;
};

type ExamSession = {
  id: string;
  title: string;
  published: boolean;
  rows: ResultRow[];
};

export default function ExamResultsPage() {
  const sessions = useMemo<ExamSession[]>(
    () => [
      {
        id: "2026-sem2-final",
        title: "Final Exam Results — Semester 2 (2025/2026)",
        published: true,
        rows: [
          { moduleCode: "CSDF 101", ca: 28, exam: 46, total: 74, grade: "B" },
          { moduleCode: "CSDF 104", ca: 22, exam: 41, total: 63, grade: "C" },
          { moduleCode: "CSDF 106", ca: 18, exam: 35, total: 53, grade: "D" },
          { moduleCode: "CSDF 108", ca: 30, exam: 50, total: 80, grade: "A" },
        ],
      },
      {
        id: "2026-sem2-mid",
        title: "Midterm Results — Semester 2 (2025/2026)",
        published: true,
        rows: [
          { moduleCode: "CSDF 101", ca: 20, exam: 32, total: 52, grade: "D" },
          { moduleCode: "CSDF 104", ca: 18, exam: 30, total: 48, grade: "E" },
          { moduleCode: "CSDF 106", ca: 16, exam: 28, total: 44, grade: "E" },
          { moduleCode: "CSDF 108", ca: 24, exam: 36, total: 60, grade: "C" },
        ],
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState(sessions[0]?.id ?? "");
  const selected = sessions.find((s) => s.id === selectedId) ?? sessions[0];

  const overallPercent = useMemo(() => {
    const rows = selected?.rows ?? [];
    if (rows.length === 0) return 0;
    return Math.round(rows.reduce((acc, r) => acc + r.total, 0) / rows.length);
  }, [selected]);

  const overallGrade = useMemo(() => {
    if (overallPercent >= 75) return "A";
    if (overallPercent >= 65) return "B";
    if (overallPercent >= 55) return "C";
    if (overallPercent >= 45) return "D";
    return "E";
  }, [overallPercent]);

  return (
    <DashboardShell title="Exam Results">
      <div className="grid gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-500">EXAM RESULTS</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Module marks</p>
            <p className="mt-1 text-sm text-slate-600">Select an exam session to view marks.</p>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-semibold tracking-widest text-slate-500">SESSION</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">
            Overall: <span className="text-slate-900">{overallPercent}%</span>
            <span className="px-2 text-slate-300">|</span>
            Grade: <span className="text-slate-900">{overallGrade}</span>
            <span className="px-2 text-slate-300">|</span>
            Modules: <span className="text-slate-900">{selected?.rows.length ?? 0}</span>
          </p>
          {selected?.published ? (
            <span className="inline-flex h-7 items-center rounded-full bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Published
            </span>
          ) : (
            <span className="inline-flex h-7 items-center rounded-full bg-amber-50 px-3 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
              Pending
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Module code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">CA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Exam</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Grade</th>
                <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-500">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {(selected?.rows ?? []).map((r) => (
                <tr key={r.moduleCode} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{r.moduleCode}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{r.ca}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{r.exam}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{r.total}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{r.grade}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/exam-results/${selected?.id}?module=${encodeURIComponent(r.moduleCode)}`}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
