"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";

const helpText = `How to Create Login Account
Step 1 : Admission number verification

Fill in your admission number(You can obtain admission number by visiting your account in our admission system www.oas.atc.ac.tz), then click verify admission number button. If admission number is valid you will be redirected to step 2.
Step 2 : Account Activation

You are required to have a working email address and mobile phone number in order to activate your account, an activation link will be sent to your email address for verification and activation purposes.Use your own email address and mobile phone number as we shall be using these to contact you, and you will need them in the near future to retrieve your account in case you forget password.`;

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [showHelp, setShowHelp] = useState(false);

  const [admissionNumber, setAdmissionNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canVerify = useMemo(() => admissionNumber.trim().length >= 5, [admissionNumber]);
  const canActivate = useMemo(() => email.trim().length > 3 && phone.trim().length > 6, [email, phone]);

  const verifyAdmissionNumber = () => {
    if (!canVerify) return;
    setStep(2);
  };

  const activateAccount = () => {
    if (!canActivate) return;
    alert("Activation link sent to your email (demo). Please check inbox.");
  };

  useEffect(() => {
    if (!showHelp) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowHelp(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [showHelp]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-black/[.06] ring-1 ring-black/10">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-14 w-44">
                  <Image
                    src="/atc%20logo.png"
                    alt="Arusha Technical College"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h1 className="mt-6 text-2xl font-semibold tracking-tight">Create Account</h1>
                <p className="mt-2 text-sm text-slate-600">Follow the steps below to activate your student portal account.</p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <StepPill label="1" active={step === 1} done={step > 1} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Step 1</p>
                    <p className="text-xs text-slate-600">Admission number verification</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowHelp(true)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    aria-label="How to Create Login Account"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {showHelp ? (
                <HelpModal
                  title="How to Create Login Account"
                  body={helpText}
                  onClose={() => setShowHelp(false)}
                />
              ) : null}

              <div className="mt-6">
                {step === 1 ? (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="admissionNumber" className="text-sm font-medium">
                        Admission Number
                      </label>
                      <input
                        id="admissionNumber"
                        name="admissionNumber"
                        type="text"
                        placeholder="e.g. ATC-ADM-2026-001"
                        value={admissionNumber}
                        onChange={(e) => setAdmissionNumber(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                      <p className="text-xs text-slate-500">You can obtain admission number by visiting www.oas.atc.ac.tz</p>
                    </div>

                    <button
                      type="button"
                      onClick={verifyAdmissionNumber}
                      disabled={!canVerify}
                      className={`inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold text-white shadow-sm transition ${
                        canVerify ? "bg-[color:var(--brand-blue)] hover:opacity-95" : "bg-slate-300 cursor-not-allowed"
                      }`}
                    >
                      Verify admission number
                    </button>

                    <div className="text-center">
                      <Link href="/" className="text-sm font-semibold text-[color:var(--brand-blue)] hover:opacity-90">
                        Back to sign in
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <StepPill label="2" active={step === 2} done={false} />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Step 2</p>
                          <p className="text-xs text-slate-600">Account Activation</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        Change admission number
                      </button>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">Activation requirements</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        You are required to have a working email address and mobile phone number in order to activate your account. An activation link will be sent to your email address for verification and activation purposes.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Use your own email address and mobile phone number as we shall be using these to contact you, and you will need them in the near future to retrieve your account in case you forget password.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">Mobile phone number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. 0612xxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={activateAccount}
                      disabled={!canActivate}
                      className={`inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold text-white shadow-sm transition ${
                        canActivate ? "bg-[color:var(--brand-blue)] hover:opacity-95" : "bg-slate-300 cursor-not-allowed"
                      }`}
                    >
                      Send activation link
                    </button>

                    <div className="text-center">
                      <Link href="/" className="text-sm font-semibold text-[color:var(--brand-blue)] hover:opacity-90">
                        Back to sign in
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center px-12 py-12">
          <div className="w-full max-w-lg">
            <p className="text-xs font-semibold tracking-widest text-slate-500">ACCOUNT CREATION</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">First year student?</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Create your login account using your admission number, then activate your account using your own email address and mobile phone number.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold">Step 1</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Verify your admission number from OAS.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold">Step 2</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">Activate your account via email link.</p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="relative h-11 w-24 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <Image
                  src="/atc%20logo.png"
                  alt="ATC Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Arusha Technical College</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPill({ label, active, done }: { label: string; active: boolean; done: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black transition ${
        done
          ? "bg-emerald-50 text-emerald-700"
          : active
            ? "bg-blue-50 text-blue-700"
            : "bg-slate-100 text-slate-500"
      }`}
    >
      {label}
    </div>
  );
}

function HelpModal({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/20">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Help</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="Close"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-6">
          <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{body}</pre>
        </div>

        <div className="border-t border-slate-100 p-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
