"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SectionKey =
  | "overview"
  | "profile"
  | "user-manual"
  | "registration"
  | "timetable"
  | "results"
  | "alumni";

export default function DashboardPage() {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [active, setActive] = useState<SectionKey>("overview");

  useEffect(() => {
    const reg = sessionStorage.getItem("atc_registration_number") ?? "";
    setRegistrationNumber(reg);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image src="/emblem.png" alt="ATC Emblem" fill className="object-contain p-1.5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-5">Arusha Technical College</p>
              <p className="text-xs text-slate-500">ATC Student Portal</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-1">
            <SidebarItem label="Overview" active={active === "overview"} onClick={() => setActive("overview")} />
            <SidebarItem label="Profile" active={active === "profile"} onClick={() => setActive("profile")} />
            <SidebarItem
              label="User Manual"
              active={active === "user-manual"}
              onClick={() => setActive("user-manual")}
            />
            <SidebarItem
              label="Registration"
              active={active === "registration"}
              onClick={() => setActive("registration")}
            />
            <SidebarItem
              label="Timetable"
              active={active === "timetable"}
              onClick={() => setActive("timetable")}
            />
            <SidebarItem label="Results" active={active === "results"} onClick={() => setActive("results")} />
            <SidebarItem
              label="Alumni"
              active={active === "alumni"}
              onClick={() => setActive("alumni")}
            />
          </nav>

          <div className="mt-auto pt-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold tracking-widest text-slate-500">SIGNED IN AS</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {registrationNumber ? registrationNumber : "Registration Number"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("atc_registration_number");
                router.push("/");
              }}
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-28 lg:hidden">
                <Image src="/atc%20logo.png" alt="Arusha Technical College" fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold">Dashboard</p>
                <p className="text-xs text-slate-500">Welcome{registrationNumber ? `, ${registrationNumber}` : ""}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActive("profile")}
                className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 sm:inline-flex"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("atc_registration_number");
                  router.push("/");
                }}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1 px-6 py-6">
            {active === "overview" ? (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <QuickCard
                  title="Profile"
                  description="Your details"
                  icon={<IconUser />}
                  onClick={() => setActive("profile")}
                />
                <QuickCard
                  title="User Manual"
                  description="How to use the portal"
                  icon={<IconBook />}
                  onClick={() => setActive("user-manual")}
                />
                <QuickCard
                  title="Registration"
                  description="Semester registration"
                  icon={<IconClipboard />}
                  onClick={() => setActive("registration")}
                />
                <QuickCard
                  title="Timetable"
                  description="Class schedule"
                  icon={<IconCalendar />}
                  onClick={() => setActive("timetable")}
                />
                <QuickCard
                  title="Results"
                  description="Academic performance"
                  icon={<IconChart />}
                  onClick={() => setActive("results")}
                />
                <QuickCard
                  title="Alumni"
                  description="Alumni info"
                  icon={<IconUsers />}
                  onClick={() => setActive("alumni")}
                />
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold">{sectionTitle(active)}</h2>
                  <button
                    type="button"
                    onClick={() => setActive("overview")}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Back
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-600">Coming soon.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "flex h-10 w-full items-center rounded-xl bg-slate-100 px-3 text-left text-sm font-semibold text-slate-900"
          : "flex h-10 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      }
    >
      {label}
    </button>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold tracking-widest text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
    </div>
  );
}

function PlaceholderCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function QuickCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-left transition hover:bg-slate-50"
    >
      <div>
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[color:var(--brand-blue)] transition group-hover:border-blue-200 group-hover:bg-blue-50">
        {icon}
      </div>
    </button>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M16.5 20.5c0-2.2-2.1-4-4.7-4s-4.8 1.8-4.8 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4.5 5.5c0-1.105.895-2 2-2H19.5v15H6.5a2 2 0 0 0-2 2V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 18.5H6.5a2 2 0 0 0-2 2V21.5H19.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M9 4.5h6M9 4.5a2 2 0 0 0-2 2V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2M9 4.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10h6M9 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M7 3.5v3M17 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 7.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M6.5 5.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 11h3M13 11h3M8 15h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5.5 19.5V4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5.5 19.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 16v-5M12 16V7M16 16v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M16.5 20.5c0-2.2-2.1-4-4.7-4s-4.8 1.8-4.8 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 20.5c0-1.6-1-3-2.6-3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function sectionTitle(key: SectionKey) {
  switch (key) {
    case "overview":
      return "Overview";
    case "profile":
      return "Profile";
    case "user-manual":
      return "User Manual";
    case "registration":
      return "Registration";
    case "timetable":
      return "Timetable";
    case "results":
      return "Results";
    case "alumni":
      return "Alumni";
    default:
      return "Overview";
  }
}
