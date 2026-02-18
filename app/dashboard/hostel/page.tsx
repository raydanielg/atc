"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";

export default function HostelPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  return (
    <DashboardShell title="Hostel">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500">HOSTEL</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Hostel allocation</p>
              <p className="mt-1 text-sm text-slate-600">Your assigned hostel details.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white">
                <Image
                  src="/portrait-confident-dark-skinned-woman-enterpreneur-with-serious-look-wears-round-glasses-red-blouse-going-meet-with-partners-from-abroad-prepares-presenting-company-isolated-white.jpg"
                  alt="Student"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Aisha M. Joseph</p>
                <p className="text-xs text-slate-600">Reg No: {registrationNumber || "2534477263"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-slate-500">ALLOCATION</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Assigned hostel</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoRow label="Hostel" value="ATC Hostel A (Female)" />
              <InfoRow label="Block" value="A" />
              <InfoRow label="Room number" value="A-12" />
              <InfoRow label="Bed number" value="Bed 03" />
              <InfoRow label="Academic year" value="2025/2026" />
              <InfoRow label="Status" value="Allocated" />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Notes</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Report to the hostel office with your student ID. Keep your room and bed clean and follow hostel rules.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold tracking-widest text-slate-500">CONTACT</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Hostel office</p>

            <div className="mt-6 grid gap-3">
              <SmallRow label="Office" value="Hostel Office" />
              <SmallRow label="Phone" value="+255 7XX XXX XXX" />
              <SmallRow label="Hours" value="Mon–Fri, 08:00–16:00" />
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

function SmallRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
