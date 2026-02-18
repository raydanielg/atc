"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/DashboardShell";

type ExamVenue = {
  moduleCode: string;
  date: string;
  time: string;
  venue: string;
};

export default function ExamNumbersPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  const examNumber = useMemo(() => {
    const base = registrationNumber || "2534477263";
    return `ATC-EX-${base.slice(-5)}`;
  }, [registrationNumber]);

  const venues = useMemo<ExamVenue[]>(
    () => [
      { moduleCode: "CSDF 101", date: "10 Mar 2026", time: "09:00 - 10:00", venue: "Main Hall" },
      { moduleCode: "CSDF 104", date: "11 Mar 2026", time: "09:00 - 10:00", venue: "Lab 3" },
      { moduleCode: "CSDF 106", date: "12 Mar 2026", time: "11:00 - 12:00", venue: "Room B08" },
      { moduleCode: "CSDF 108", date: "13 Mar 2026", time: "09:00 - 10:00", venue: "Room B12" },
    ],
    []
  );

  return (
    <DashboardShell title="Exam Numbers">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500">EXAM NUMBER</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Assigned exam number</p>
          <p className="mt-1 text-sm text-slate-600">Use this number on your exam sheet.</p>

          <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold tracking-widest text-slate-500">STUDENT</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Info label="Name" value="Aisha M. Joseph" />
              <Info label="Reg No" value={registrationNumber || "2534477263"} />
              <Info label="Exam No" value={examNumber} strong />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500">EXAM VENUES</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Where to sit for exams</p>
            </div>
            <span
              title="This is sample exam venue data"
              className="inline-flex h-7 items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600"
            >
              Sample
            </span>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Module code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {venues.map((v) => (
                  <tr key={`${v.moduleCode}-${v.date}`} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{v.moduleCode}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{v.date}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{v.time}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{v.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Instructions</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Arrive at least 30 minutes before the exam starts. Carry your student ID and use the assigned exam number.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Info({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-slate-500">{label}</p>
      <p className={strong ? "mt-1 text-base font-semibold text-slate-900" : "mt-1 text-sm font-semibold text-slate-900"}>
        {value}
      </p>
    </div>
  );
}
