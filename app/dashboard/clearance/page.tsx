"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { CheckCircle2, XCircle, AlertCircle, FileText, Printer } from "lucide-react";

type ClearanceItem = {
  department: string;
  requirement: string;
  status: "cleared" | "pending" | "not_cleared";
  note?: string;
};

type StudentClearance = {
  studentName: string;
  regNo: string;
  programme: string;
  academicYear: string;
  status: "CLEARED" | "NOT CLEARED";
  reportNo: string;
  generatedAt: string;
  items: ClearanceItem[];
  invoice?: {
    invoiceNo: string;
    amount: number;
    currency: string;
    dueDate: string;
  };
};

export default function ClearancePage() {
  const [regNo, setRegNo] = useState("2534477263");

  useEffect(() => {
    setRegNo(sessionStorage.getItem("atc_registration_number") ?? "2534477263");
  }, []);

  const report: StudentClearance = useMemo(() => {
    const generatedAt = new Date().toLocaleString();
    const base: StudentClearance = {
      studentName: "Aisha M. Joseph",
      regNo,
      programme: "BIT",
      academicYear: "2025/2026",
      status: "NOT CLEARED",
      reportNo: "ATC/CLR/2026/00192",
      generatedAt,
      items: [
        {
          department: "Finance",
          requirement: "Tuition fee balance",
          status: "not_cleared",
          note: "Outstanding balance detected.",
        },
        {
          department: "Library",
          requirement: "Return all borrowed books",
          status: "cleared",
          note: "No borrowed items.",
        },
        {
          department: "Hostel",
          requirement: "Room handover / Hostel charges",
          status: "pending",
          note: "Hostel office review required.",
        },
        {
          department: "ICT",
          requirement: "Portal account / ICT equipment",
          status: "cleared",
        },
        {
          department: "Department",
          requirement: "Departmental confirmation",
          status: "cleared",
        },
        {
          department: "Examinations",
          requirement: "Exam clearance",
          status: "cleared",
        },
      ],
      invoice: {
        invoiceNo: "ATC/INV/2026/04511",
        amount: 320000,
        currency: "TZS",
        dueDate: "2026-03-05",
      },
    };

    const cleared = base.items.every((i) => i.status === "cleared");
    return {
      ...base,
      status: cleared ? "CLEARED" : "NOT CLEARED",
      invoice: cleared ? undefined : base.invoice,
    };
  }, [regNo]);

  const outstanding = useMemo(() => report.items.filter((i) => i.status !== "cleared"), [report.items]);

  const statusTone = report.status === "CLEARED" ? "emerald" : "red";

  return (
    <DashboardShell title="Clearance">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Government-style report</p>
              <h1 className="mt-2 text-xl font-bold text-slate-900">Student Clearance Report</h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                This report shows your clearance status across all relevant departments. Clear all outstanding items to complete clearance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Student details</p>
              <div className="mt-3 grid gap-1 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Name:</span> {report.studentName}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Reg No:</span> {report.regNo}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Programme:</span> {report.programme}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Academic Year:</span> {report.academicYear}
                </p>
              </div>
            </div>

            <div className="min-w-[260px] rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Clearance status</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p
                  className={
                    statusTone === "emerald"
                      ? "text-lg font-black text-emerald-700"
                      : "text-lg font-black text-red-700"
                  }
                >
                  {report.status}
                </p>
                {report.status === "CLEARED" ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-700" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-700" />
                )}
              </div>
              <div className="mt-3 grid gap-1 text-xs text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">Report No:</span> {report.reportNo}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Generated:</span> {report.generatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Department checklist</p>
              <p className="mt-1 text-sm text-slate-600">All sections must be cleared.</p>
            </div>
            {report.invoice ? (
              <Link
                href="/dashboard/clearance/invoice"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-blue)]"
              >
                <FileText className="h-4 w-4" />
                View invoice
              </Link>
            ) : (
              <span className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-600">
                No invoice
              </span>
            )}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div className="col-span-3">Department</div>
              <div className="col-span-6">Requirement</div>
              <div className="col-span-3">Status</div>
            </div>
            <div className="divide-y divide-slate-200">
              {report.items.map((item) => (
                <div key={`${item.department}-${item.requirement}`} className="grid grid-cols-12 gap-3 px-4 py-4">
                  <div className="col-span-12 text-sm font-semibold text-slate-900 sm:col-span-3">{item.department}</div>
                  <div className="col-span-12 text-sm text-slate-700 sm:col-span-6">
                    {item.requirement}
                    {item.note ? <p className="mt-1 text-xs text-slate-500">{item.note}</p> : null}
                  </div>
                  <div className="col-span-12 sm:col-span-3">
                    {item.status === "cleared" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Cleared
                      </span>
                    ) : item.status === "pending" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Not cleared
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-700">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="w-full">
              <p className="text-sm font-bold text-amber-900">Outstanding items</p>
              {outstanding.length === 0 ? (
                <p className="mt-2 text-sm text-amber-900/80">No outstanding items. You are cleared.</p>
              ) : (
                <div className="mt-3 grid gap-2">
                  {outstanding.map((i) => (
                    <div key={`${i.department}-${i.requirement}`} className="rounded-2xl border border-amber-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">{i.department}</p>
                      <p className="mt-1 text-sm text-slate-600">{i.requirement}</p>
                      {i.note ? <p className="mt-1 text-xs text-slate-500">{i.note}</p> : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
