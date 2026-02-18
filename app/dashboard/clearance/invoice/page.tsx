"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import { CreditCard, Printer } from "lucide-react";
import PayModal from "./pay";

type Invoice = {
  invoiceNo: string;
  amount: number;
  currency: string;
  dueDate: string;
  studentName: string;
  regNo: string;
  programme: string;
  academicYear: string;
};

export default function ClearanceInvoicePage() {
  const [regNo, setRegNo] = useState("2534477263");
  const [payOpen, setPayOpen] = useState(false);

  useEffect(() => {
    setRegNo(sessionStorage.getItem("atc_registration_number") ?? "2534477263");
  }, []);

  const invoice: Invoice = useMemo(() => {
    return {
      invoiceNo: "ATC/INV/2026/04511",
      amount: 320000,
      currency: "TZS",
      dueDate: "2026-03-05",
      studentName: "Aisha M. Joseph",
      regNo,
      programme: "BIT",
      academicYear: "2025/2026",
    };
  }, [regNo]);

  return (
    <DashboardShell title="Invoice">
      <div className="grid gap-4">
        <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => setPayOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            <CreditCard className="h-4 w-4" />
            Pay
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            Print invoice
          </button>
        </div>

        {payOpen ? (
          <PayModal
            invoiceNo={invoice.invoiceNo}
            amount={invoice.amount}
            currency={invoice.currency}
            onClose={() => setPayOpen(false)}
          />
        ) : null}

        <div id="invoice-print" className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200">
            <div className="h-2 w-full bg-[color:var(--brand-blue)]" />
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-28">
                  <Image src="/atc%20logo.png" alt="Arusha Technical College" fill className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">ARUSHA TECHNICAL COLLEGE</p>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Finance Office</p>
                  <p className="mt-2 text-xs text-slate-600">
                    P.O. Box 296, Arusha, Tanzania
                    <br />
                    Email: finance@atc.ac.tz
                  </p>
                </div>
              </div>

              <div className="w-full max-w-sm">
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Invoice</p>
                <div className="mt-2 grid gap-1 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">Invoice No:</span> {invoice.invoiceNo}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Due date:</span> {invoice.dueDate}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Academic year:</span> {invoice.academicYear}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Billed to</p>
                <div className="mt-2 grid gap-1 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">Student name:</span> {invoice.studentName}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Reg No:</span> {invoice.regNo}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Programme:</span> {invoice.programme}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Payment note</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Pay using the provided control number (in the real system). Keep your receipt for verification.
                </p>
              </div>
            </div>

            <div className="my-6 border-t border-slate-200" />

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <div className="col-span-7">Description</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-3 text-right">Amount</div>
              </div>
              <div className="divide-y divide-slate-200">
                <div className="grid grid-cols-12 gap-3 px-4 py-4">
                  <div className="col-span-12 sm:col-span-7">
                    <p className="text-sm font-semibold text-slate-900">Tuition Fees Balance</p>
                    <p className="mt-1 text-xs text-slate-500">Clearance requirement • Finance</p>
                  </div>
                  <div className="col-span-6 sm:col-span-2 text-right text-sm text-slate-700">1</div>
                  <div className="col-span-6 sm:col-span-3 text-right text-sm font-semibold text-slate-900">
                    {invoice.currency} {invoice.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-4">
                <div className="flex items-center justify-end gap-6">
                  <p className="text-sm font-semibold text-slate-700">Total</p>
                  <p className="text-lg font-black text-slate-900">
                    {invoice.currency} {invoice.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Authorized by</p>
                <div className="mt-10 border-b border-slate-300" />
                <p className="mt-2 text-sm font-semibold text-slate-900">Finance Officer</p>
                <p className="text-xs text-slate-500">Signature / Date</p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Official stamp</p>
                <div className="mt-10 border-b border-dashed border-slate-300" />
                <p className="mt-2 text-xs text-slate-500">Stamp here</p>
                <p className="mt-3 text-xs text-slate-500">
                  This invoice is valid only with official signature and stamp.
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              System-generated document • For support contact Finance Office.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          #invoice-print {
            border: none !important;
          }
          body * {
            visibility: hidden;
          }
          #invoice-print,
          #invoice-print * {
            visibility: visible;
          }
          #invoice-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </DashboardShell>
  );
}
