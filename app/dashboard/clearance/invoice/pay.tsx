"use client";

import { useEffect } from "react";
import { CreditCard, Info, X } from "lucide-react";

export default function PayModal({
  invoiceNo,
  amount,
  currency,
  onClose,
}: {
  invoiceNo: string;
  amount: number;
  currency: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const controlNumber = "99123 456 789";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close payment popup"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/20">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Payment</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">Pay Invoice</h2>
              <p className="mt-1 text-xs text-slate-500">Invoice: {invoiceNo}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Amount</p>
            <p className="mt-1 text-2xl font-black text-slate-900">
              {currency} {amount.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-slate-600">Control Number</p>
            <p className="mt-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 tracking-wider">
              {controlNumber}
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-700">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">How to pay</p>
                <p className="mt-1 text-sm text-blue-900/80 leading-relaxed">
                  Use the control number above to pay via bank/mobile money. After payment, your invoice will be verified by Finance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(controlNumber).catch(() => undefined);
              }}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Copy control number
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white hover:opacity-95"
            >
              Done
            </button>
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            Demo payment popup: in the real system, payment gateway and receipt upload will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
