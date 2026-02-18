"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { FileText, Award, Download, Eye } from "lucide-react";

type Certificate = {
  id: string;
  name: string;
  type: string;
  issuedDate: string;
  refNo: string;
};

export default function AlumniPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  const certificates: Certificate[] = [
    {
      id: "cert-001",
      name: "Bachelor Degree in Information Technology",
      type: "Degree",
      issuedDate: "15 Nov 2027",
      refNo: "ATC/CERT/2027/001",
    },
    {
      id: "cert-002",
      name: "Transcript of Academic Records",
      type: "Transcript",
      issuedDate: "15 Nov 2027",
      refNo: "ATC/TRANS/2027/001",
    },
  ];

  return (
    <DashboardShell title="Alumni">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500">ALUMNI STATUS</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Graduation Details</p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Detail label="Graduation Year" value="2027" />
            <Detail label="Status" value="Graduated" />
            <Detail label="Award" value="Bachelor Degree" />
            <Detail label="GPA" value="4.2 / 5.0" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500">DOCUMENTS</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">Academic Certificates</p>
          <p className="mt-1 text-sm text-slate-600">View and verify your official certificates.</p>

          <div className="mt-6 grid gap-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-xs text-slate-500">Ref: {cert.refNo} • Issued: {cert.issuedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/alumni/preview?id=${cert.id}`}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </Link>
                  <button className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-blue-600 px-4 text-xs font-semibold text-white transition hover:bg-blue-700">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}
