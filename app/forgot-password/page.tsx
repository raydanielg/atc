"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type DeliveryMethod = "email" | "sms";

type Step = 1 | 2 | 3;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("email");
  const [email, setEmail] = useState<string>("g@mail.com");
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const maskedEmail = useMemo(() => {
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    const name = parts[0] ?? "";
    const domain = parts[1] ?? "";
    if (name.length <= 2) return `**@${domain}`;
    return `${name.slice(0, 2)}***@${domain}`;
  }, [email]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="relative h-16 w-48">
                <Image
                  src="/atc%20logo.png"
                  alt="Arusha Technical College"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                Reset your password
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Enter your Registration Number, choose how to receive a verification
                code, then confirm the code to continue.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold tracking-widest text-slate-500">
                    SECURITY TIP
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Never share your verification code with anyone.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src="/emblem.png"
                      alt="ATC Emblem"
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <span>Powered by Arusha Technical College</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-black/[.06] ring-1 ring-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">Forgot password</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Step {step} of 3
                  </p>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-[color:var(--brand-blue)] hover:opacity-90"
                >
                  Back to sign in
                </a>
              </div>

              <div className="mt-6">
                {step === 1 && (
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(2);
                    }}
                  >
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold tracking-widest text-slate-500">
                        ANNOUNCEMENT
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-900">
                        You will receive a verification code to reset your password.
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Use your Registration Number (example: 2534477263).
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="registrationNumber" className="text-sm font-medium">
                        Registration Number
                      </label>
                      <input
                        id="registrationNumber"
                        name="registrationNumber"
                        type="text"
                        inputMode="numeric"
                        placeholder="2534477263"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    >
                      Continue
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(3);
                    }}
                  >
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold">Choose delivery method</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Select where to receive your verification code.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("email")}
                        className={
                          deliveryMethod === "email"
                            ? "rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left"
                            : "rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                        }
                      >
                        <p className="text-sm font-semibold">Email</p>
                        <p className="mt-1 text-sm text-slate-600">{maskedEmail}</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("sms")}
                        className={
                          deliveryMethod === "sms"
                            ? "rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left"
                            : "rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                        }
                      >
                        <p className="text-sm font-semibold">SMS</p>
                        <p className="mt-1 text-sm text-slate-600">Send code to phone</p>
                      </button>
                    </div>

                    {deliveryMethod === "email" && (
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                          required
                        />
                      </div>
                    )}

                    {deliveryMethod === "sms" && (
                      <div className="grid gap-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g. +255 7XX XXX XXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                          required
                        />
                      </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                      >
                        Send code
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold">Enter verification code</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        We sent a code to your {deliveryMethod === "email" ? "email" : "phone"}. Enter it below to continue.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="code" className="text-sm font-medium">
                        Verification code
                      </label>
                      <input
                        id="code"
                        name="code"
                        type="text"
                        inputMode="numeric"
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                        required
                      />
                      <p className="text-xs text-slate-500">
                        Registration Number: <span className="font-medium">{registrationNumber || "—"}</span>
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                      >
                        Verify code
                      </button>
                    </div>

                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setCode("");
                        }}
                        className="text-sm font-medium text-[color:var(--brand-blue)] hover:opacity-90"
                      >
                        Resend code
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              If you no longer have access to your email/phone, please contact the IT office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
