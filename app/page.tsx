"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-black/[.06] ring-1 ring-black/10">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-16 w-48">
                  <Image
                    src="/atc%20logo.png"
                    alt="Arusha Technical College"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h1 className="mt-6 text-2xl font-semibold tracking-tight">
                  Welcome to ATC
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Sign in to access your student management system.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold tracking-widest text-slate-500">
                  ANNOUNCEMENT
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Semester registration is now open.
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Please sign in using your Registration Number and Password to
                  view fees, timetable, and results.
                </p>
              </div>

              <form
                className="mt-8 grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  sessionStorage.setItem("atc_registration_number", registrationNumber);
                  router.push("/dashboard");
                }}
              >
                <div className="grid gap-2">
                  <label htmlFor="registrationNumber" className="text-sm font-medium">
                    Registration Number
                  </label>
                  <input
                    id="registrationNumber"
                    name="registrationNumber"
                    type="text"
                    autoComplete="username"
                    placeholder="e.g. 2534477263"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 rounded border-slate-300 accent-[color:var(--brand-blue)]"
                    />
                    Remember me
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-[color:var(--brand-blue)] hover:opacity-90"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  Sign in
                </button>

                <p className="pt-2 text-center text-sm text-slate-600">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-[color:var(--brand-green)] hover:opacity-90"
                  >
                    Contact admin
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center px-12 py-12">
          <div className="w-full max-w-lg">
            <p className="text-xs font-semibold tracking-widest text-slate-500">
              ARUSHA TECHNICAL MANAGEMENT SYSTEM
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Student Management System
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Manage students, courses, registrations, and academic records in one
              secure platform. Built for clarity, speed, and a modern experience.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold">Centralized Records</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Student profiles, performance, and history in one place.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold">Role-based Access</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Secure access for admins, staff, and students.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <Image
                  src="/emblem.png"
                  alt="ATC Emblem"
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <p className="text-xs text-slate-500">Powered by Arusha Technical College</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
