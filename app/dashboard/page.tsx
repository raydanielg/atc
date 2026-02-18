"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <QuickLinkCard href="/dashboard" title="Dashboard" description="Home" icon={<IconHome />} />
        <QuickLinkCard
          href="/dashboard/registration"
          title="Registration"
          description="Semester registration"
          icon={<IconClipboard />}
        />
        <QuickLinkCard href="/dashboard/modules" title="Modules" description="My modules" icon={<IconGrid />} />
        <QuickLinkCard
          href="/dashboard/timetable"
          title="Timetable"
          description="Class schedule"
          icon={<IconCalendar />}
        />
        <QuickLinkCard
          href="/dashboard/assessment-plans"
          title="Assessment plans"
          description="Course assessments"
          icon={<IconChecklist />}
        />
        <QuickLinkCard
          href="/dashboard/exam-numbers"
          title="Exam numbers"
          description="Exam slip numbers"
          icon={<IconIdCard />}
        />
        <QuickLinkCard
          href="/dashboard/exam-results"
          title="Exam results"
          description="Final exam results"
          icon={<IconChart />}
        />
        <QuickLinkCard
          href="/dashboard/results"
          title="Results"
          description="Academic results"
          icon={<IconChart />} 
        />
        <QuickLinkCard
          href="/dashboard/ipt-arrival-note"
          title="IPT Arrival Note"
          description="Industrial training"
          icon={<IconPin />}
        />
        <QuickLinkCard href="/dashboard/user-manual" title="User manual" description="Help" icon={<IconBook />} />
        <QuickLinkCard href="/dashboard/alumni" title="Alumni" description="Alumni info" icon={<IconUsers />} />
        <QuickLinkCard href="/dashboard/profile" title="Profile" description="Your details" icon={<IconUser />} />
      </div>
    </DashboardShell>
  );
}

function QuickLinkCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group w-full rounded-3xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:shadow-black/[.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 motion-reduce:transform-none"
    >
      <div className="flex flex-col items-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[color:var(--brand-blue)] transition duration-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:scale-[1.03] motion-reduce:transform-none">
          {icon}
        </div>
        <p className="mt-4 text-base font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </Link>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 12 4l7.5 6.5V20a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 22v-7h4v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
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

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4.5 4.5h6v6h-6v-6Zm9 0h6v6h-6v-6Zm-9 9h6v6h-6v-6Zm9 0h6v6h-6v-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChecklist() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M9 6.5h10M9 12h10M9 17.5h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 6.5l1.1 1.1L7.8 5.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12l1.1 1.1L7.8 11.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17.5l1.1 1.1 1.7-1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconIdCard() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4.5 7.5h15v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 11.5h6M8 15.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M4.5 7.5V6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12a2.3 2.3 0 1 0 0-4.6A2.3 2.3 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
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
