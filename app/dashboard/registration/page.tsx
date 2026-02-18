"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";

type StepItem = {
  title: string;
  description: string;
  done: boolean;
};

export default function RegistrationPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  const steps = useMemo<StepItem[]>(
    () => [
      {
        title: "Confirm details",
        description: "Student details",
        done: true,
      },
      {
        title: "Select modules",
        description: "Modules",
        done: true,
      },
      {
        title: "Fee payment",
        description: "Fees",
        done: false,
      },
      {
        title: "Accommodation",
        description: "Hostel",
        done: false,
      },
      {
        title: "Submit registration",
        description: "Submit",
        done: false,
      },
      {
        title: "Download slip",
        description: "Slip",
        done: false,
      },
    ],
    []
  );

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <DashboardShell title="Registration">
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative h-56 w-full">
                <Image
                  src="/portrait-confident-dark-skinned-woman-enterpreneur-with-serious-look-wears-round-glasses-red-blouse-going-meet-with-partners-from-abroad-prepares-presenting-company-isolated-white.jpg"
                  alt="Student"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-widest text-slate-500">STUDENT DETAILS</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Aisha M. Joseph</p>
                <p className="mt-1 text-sm text-slate-600">
                  Registration Number:{" "}
                  <span className="font-semibold text-slate-900">{registrationNumber || "2534477263"}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500">REGISTRATION STEPS</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Registration steps</p>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                {doneCount}/{steps.length}
              </div>
            </div>

            <div className="mt-6">
              <div className="relative space-y-3">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200" />
                {steps.map((step, idx) => {
                  const isCurrent = idx === activeStep;
                  const isDone = step.done;

                  return (
                    <div key={step.title} className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveStep(idx)}
                        className={
                          isCurrent
                            ? "flex w-full items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-3 text-left"
                            : "flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left hover:bg-slate-50"
                        }
                      >
                        <div
                          className={
                            isDone
                              ? "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white"
                              : isCurrent
                                ? "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand-blue)] text-white"
                                : "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500"
                          }
                          aria-hidden="true"
                        >
                          {isDone ? (
                            <CheckIcon />
                          ) : isCurrent ? (
                            <DotIcon />
                          ) : (
                            <span className="text-xs font-semibold">{idx + 1}</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                          <p className="mt-0.5 text-xs text-slate-600">{step.description}</p>
                        </div>
                      </button>

                      {isCurrent && (
                        <div className="absolute left-12 top-1/2 z-10 w-52 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg shadow-black/[.06]">
                          {activeStep === 0 && "Student details"}
                          {activeStep === 1 && "Modules selection"}
                          {activeStep === 2 && "Fees payment"}
                          {activeStep === 3 && "Hostel / accommodation"}
                          {activeStep === 4 && "Submit registration"}
                          {activeStep === 5 && "Download slip"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">Receipts</p>
              <span
                title="Control number and receipt number for each installment"
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600"
              >
                ?
              </span>
            </div>
            <p className="text-xs text-slate-500">Sample</p>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">
                    Control Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">
                    Receipt No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">
                    Installment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">991112223334</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">RCT-000128</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">1</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">991112223335</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">RCT-000129</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">2</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">991112223336</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">RCT-000130</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 12h.01"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
