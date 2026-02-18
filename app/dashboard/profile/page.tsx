"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";

export default function ProfilePage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  const admissionNo = useMemo(() => registrationNumber || "20051013032", [registrationNumber]);

  return (
    <DashboardShell title="Profile">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="relative h-64 w-full">
              <Image
                src="/portrait-confident-dark-skinned-woman-enterpreneur-with-serious-look-wears-round-glasses-red-blouse-going-meet-with-partners-from-abroad-prepares-presenting-company-isolated-white.jpg"
                alt="Student"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold tracking-widest text-slate-500">STUDENT</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Aisha M. Joseph</p>
              <p className="mt-1 text-sm text-slate-600">BIT • NTA Level 7-2</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500">STUDENT INFORMATION</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Details</p>
            </div>

            <div className="mt-6 grid gap-3">
              <InfoRow label="Name" value="Aisha M. Joseph" />
              <InfoRow label="Admission No" value={admissionNo} />
              <InfoRow label="Course" value="Bachelor in Information Technology (BIT)" />
              <InfoRow label="NTA-Level" value="7-2" />
              <InfoRow label="Semester" value="2" />
              <InfoRow label="Date of birth" value="12 Aug 2003" />
              <InfoRow label="Gender" value="Female" />
              <InfoRow label="Nationality" value="Tanzanian" />
              <InfoRow label="Campus" value="Arusha" />
              <InfoRow label="Department" value="Computing & IT" />
              <InfoRow label="Intake" value="2024/2025" />
              <InfoRow label="Study mode" value="Full-time" />
              <InfoRow label="Phone" value="+255 7XX XXX XXX" />
              <InfoRow label="Email" value="g@mail.com" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500">PERFORMANCE</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Academic progress</p>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <DonutChart value={78} label="Pass rate" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Pass rate</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Summary for the current academic year.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-slate-500">Academic year</p>
                  <p className="text-sm font-semibold text-slate-900">2025/2026</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500">ATTENDANCE</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Class attendance</p>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <DonutChart value={92} label="Attendance" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Attendance</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Based on the current semester.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-slate-500">Duration</p>
                  <p className="text-sm font-semibold text-slate-900">Year 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
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
