"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Announcement from "@/components/Announcement";
import Sidebar from "@/components/Sidebar";
import UserMenu from "@/components/UserMenu";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "User Manual", href: "/dashboard/user-manual" },
  { label: "Registration", href: "/dashboard/registration" },
  { label: "Modules", href: "/dashboard/modules" },
  { label: "Timetable", href: "/dashboard/timetable" },
  { label: "Assessment Plans", href: "/dashboard/assessment-plans" },
  { label: "Exam Numbers", href: "/dashboard/exam-numbers" },
  { label: "Results", href: "/dashboard/results" },
  { label: "Exam Results", href: "/dashboard/exam-results" },
  { label: "IPT Arrival Note", href: "/dashboard/ipt-arrival-note" },
  { label: "Alumni", href: "/dashboard/alumni" },
];

export default function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const studentName = "Aisha M. Joseph";

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <Sidebar navItems={navItems} registrationNumber={registrationNumber} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-28 lg:hidden">
                <Image src="/atc%20logo.png" alt="Arusha Technical College" fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-slate-500">Welcome{registrationNumber ? `, ${registrationNumber}` : ""}</p>
              </div>
            </div>

            <UserMenu
              studentName={studentName}
              registrationNumber={registrationNumber}
              onLogout={() => {
                sessionStorage.removeItem("atc_registration_number");
                router.push("/");
              }}
            />
          </header>

          <main className="flex-1 px-6 py-6">
            <div className="mb-4">
              <Announcement
                title="ANNOUNCEMENT"
                message="All students with outstanding fees are advised to complete fee payment as soon as possible."
              />
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
