"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";

type Row = {
  moduleCode: string;
  moduleName: string;
  ca: number;
  exam: number;
  total: number;
};

export default function ExamResultDetailsPage() {
  const params = useParams<{ examId: string }>();
  const search = useSearchParams();
  const moduleCode = search.get("module") ?? "";

  const examTitle = useMemo(() => {
    const id = params.examId ?? "";
    if (id === "2026-sem2-final") return "Final Exam Results — Semester 2 (2025/2026)";
    if (id === "2026-sem2-mid") return "Midterm Results — Semester 2 (2025/2026)";
    return "Exam Results";
  }, [params.examId]);

  const rows = useMemo<Row[]>(
    () => [
      { moduleCode: "CSDF 101", moduleName: "Introduction to Cyber Security", ca: 28, exam: 46, total: 74 },
      { moduleCode: "CSDF 104", moduleName: "Secure Programming", ca: 22, exam: 41, total: 63 },
      { moduleCode: "CSDF 106", moduleName: "Incident Response & Handling", ca: 18, exam: 35, total: 53 },
      { moduleCode: "CSDF 108", moduleName: "Network Security", ca: 30, exam: 50, total: 80 },
    ],
    []
  );

  const selected = useMemo(() => {
    const found = rows.find((r) => r.moduleCode === moduleCode);
    return found ?? rows[0];
  }, [rows, moduleCode]);

  const percent = selected.total;
  const grade = useMemo(() => {
    if (percent >= 75) return "A";
    if (percent >= 65) return "B";
    if (percent >= 55) return "C";
    if (percent >= 45) return "D";
    return "E";
  }, [percent]);

  return (
    <DashboardShell title="Exam Results">
      <div className="grid gap-5">
        <div>
          <p className="text-xs font-semibold tracking-widest text-slate-500">EXAM</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{examTitle}</p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              {selected.moduleCode}
              <span className="px-2 text-slate-300">|</span>
              <span className="text-slate-700">{selected.moduleName}</span>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              CA {selected.ca} • Exam {selected.exam} • Total {selected.total} ({percent}%)
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
              Grade {grade}
            </div>
            <DonutChart value={percent} label="Total" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Module</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">CA</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Exam</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((r) => (
                <tr
                  key={r.moduleCode}
                  className={r.moduleCode === selected.moduleCode ? "bg-blue-50" : "hover:bg-slate-50"}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{r.moduleCode}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{r.ca}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{r.exam}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <svg width="96" height="96" viewBox="0 0 48 48" aria-label={label} role="img">
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
