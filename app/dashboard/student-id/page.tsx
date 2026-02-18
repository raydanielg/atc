"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import StudentIDCard from "@/components/StudentIDCard";

export default function StudentIdPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  return (
    <DashboardShell title="Student ID">
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold tracking-widest text-slate-500">DIGITAL ID</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Generated Student ID</p>
            <p className="mt-1 text-sm text-slate-600 mb-8">
              Tap to flip and view terms.
            </p>
            
            <StudentIDCard
              studentName="Aisha M. Joseph"
              registrationNumber={registrationNumber || "2534477263"}
              course="Cyber Security & Digital Forensics"
              ntaLevel="7-2"
              expiryDate="30 Oct 2027"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold tracking-widest text-slate-500">ID STATUS</p>
            <div className="mt-6 grid gap-3">
              <InfoRow label="Status" value="Active" />
              <InfoRow label="Issued" value="15 Jan 2025" />
              <InfoRow label="Expires" value="30 Oct 2027" />
              <InfoRow label="ID Type" value="Student Smart ID" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold tracking-widest text-slate-500">SUPPORT</p>
            <div className="mt-6 grid gap-3">
              <SmallRow label="Office" value="Admissions Office" />
              <SmallRow label="Room" value="Admin Block • 1st Floor" />
              <SmallRow label="Help Desk" value="+255 7XX XXX XXX" />
            </div>
          </div>
        </section>
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

function SmallRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
