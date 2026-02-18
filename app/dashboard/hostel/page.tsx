"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import HostelCard from "@/components/HostelCard";

export default function HostelPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  return (
    <DashboardShell title="Hostel">
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <section>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold tracking-widest text-slate-500">HOSTEL CARD</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Digital Allocation ID</p>
              <p className="mt-1 text-sm text-slate-600 mb-8">
                Tap to flip and view room terms.
              </p>
              
              <HostelCard
                studentName="Aisha M. Joseph"
                registrationNumber={registrationNumber || "2534477263"}
                hostelName="ATC Hostel A (Female)"
                roomNumber="A-12"
                bedNumber="Bed 03"
                academicYear="2025/2026"
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold tracking-widest text-slate-500">ALLOCATION DETAILS</p>
              <div className="mt-6 grid gap-3">
                <InfoRow label="Hostel" value="ATC Hostel A (Female)" />
                <InfoRow label="Block" value="A" />
                <InfoRow label="Room number" value="A-12" />
                <InfoRow label="Bed number" value="Bed 03" />
                <InfoRow label="Status" value="Allocated" />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold tracking-widest text-slate-500">HOSTEL OFFICE</p>
              <div className="mt-6 grid gap-3">
                <SmallRow label="Location" value="Block B • Ground Floor" />
                <SmallRow label="Phone" value="+255 7XX XXX XXX" />
                <SmallRow label="Office hours" value="Mon–Fri, 08:00–16:00" />
              </div>
            </div>
          </section>
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

function SmallRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
