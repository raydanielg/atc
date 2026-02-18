"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import { 
  UserCheck, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  FileText, 
  PieChart, 
  MapPin, 
  Bed, 
  Contact, 
  HelpCircle, 
  Users2, 
  History,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Zap,
  Vote
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard Overview">
      <div className="space-y-8">
        {/* Student Status Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard 
            title="Academic Level" 
            value="NTA Level 8" 
            subValue="BEng in IT (Year 3)" 
            icon={<GraduationCap className="h-5 w-5" />} 
            trend="+2% GPA"
          />
          <StatusCard 
            title="Current GPA" 
            value="3.8" 
            subValue="First Class" 
            icon={<PieChart className="h-5 w-5" />} 
            color="blue"
          />
          <StatusCard 
            title="Registration" 
            value="Active" 
            subValue="Semester II (2025/26)" 
            icon={<UserCheck className="h-5 w-5" />} 
            color="emerald"
          />
          <StatusCard 
            title="SOTECO" 
            value="Member" 
            subValue="BIT 3 Representative" 
            icon={<Zap className="h-5 w-5" />} 
            color="orange"
            href="/dashboard/soteco"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Quick Links Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Student Services</h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Quick Access</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <QuickLinkCard href="/dashboard/registration" title="Registration" icon={<FileText className="h-5 w-5" />} color="blue" />
              <QuickLinkCard href="/dashboard/modules" title="Modules" icon={<BookOpen className="h-5 w-5" />} color="indigo" />
              <QuickLinkCard href="/dashboard/timetable" title="Timetable" icon={<Calendar className="h-5 w-5" />} color="emerald" />
              <QuickLinkCard href="/dashboard/assessment-plans" title="Assessments" icon={<PieChart className="h-5 w-5" />} color="orange" />
              <QuickLinkCard href="/dashboard/results" title="Results" icon={<GraduationCap className="h-5 w-5" />} color="violet" />
              <QuickLinkCard href="/dashboard/soteco" title="SOTECO" icon={<Users2 className="h-5 w-5" />} color="red" />
              <QuickLinkCard href="/dashboard/voting" title="Voting" icon={<Vote className="h-5 w-5" />} color="orange" />
              <QuickLinkCard href="/dashboard/hostel" title="Hostel" icon={<Bed className="h-5 w-5" />} color="cyan" />
              <QuickLinkCard href="/dashboard/student-id" title="Student ID" icon={<Contact className="h-5 w-5" />} color="slate" />
              <QuickLinkCard href="/dashboard/ipt-arrival-note" title="IPT/Training" icon={<MapPin className="h-5 w-5" />} color="amber" />
            </div>
          </div>

          {/* Activity & Side Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
              <History className="h-4 w-4 text-slate-400" />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-5">
                <ActivityItem 
                  icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
                  title="Success Login"
                  time="Just now"
                  location="Arusha, TZ (Desktop)"
                />
                <ActivityItem 
                  icon={<Clock className="h-4 w-4 text-blue-600" />}
                  title="Result Viewed"
                  time="2 hours ago"
                  location="BIT 3 - Semester 1"
                />
                <ActivityItem 
                  icon={<ShieldCheck className="h-4 w-4 text-emerald-600" />}
                  title="Success Login"
                  time="Yesterday, 08:34 AM"
                  location="Arusha, TZ (Mobile)"
                />
              </div>
              <button className="mt-6 w-full rounded-2xl border border-slate-100 bg-slate-50 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100">
                View Full Activity Log
              </button>
            </div>

            <div className="rounded-3xl bg-blue-600 p-6 text-white">
              <HelpCircle className="h-6 w-6 text-blue-200" />
              <h3 className="mt-4 font-bold">Need Help?</h3>
              <p className="mt-1 text-sm text-blue-100 leading-relaxed">
                Check the User Manual for a full guide on how to use the portal.
              </p>
              <Link 
                href="/dashboard/user-manual"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:underline"
              >
                Open Manual
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatusCard({ 
  title, 
  value, 
  subValue, 
  icon, 
  trend,
  color = "slate",
  href
}: { 
  title: string; 
  value: string; 
  subValue: string; 
  icon: ReactNode;
  trend?: string;
  color?: string;
  href?: string;
}) {
  const CardWrapper = ({ children }: { children: ReactNode }) => 
    href ? <Link href={href} className="block transition-transform hover:-translate-y-1">{children}</Link> : <div className="transition-transform hover:-translate-y-1">{children}</div>;

  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    slate: "bg-slate-50 text-slate-600"
  };

  return (
    <CardWrapper>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorStyles[color] || colorStyles.slate}`}>
            {icon}
          </div>
          {trend && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
          <p className="text-sm text-slate-500">{subValue}</p>
        </div>
      </div>
    </CardWrapper>
  );
}

function QuickLinkCard({ 
  href, 
  title, 
  icon,
  color = "blue"
}: { 
  href: string; 
  title: string; 
  icon: ReactNode;
  color?: string;
}) {
  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    violet: "bg-violet-50 text-violet-600",
    red: "bg-red-50 text-red-600",
    cyan: "bg-cyan-50 text-cyan-600",
    slate: "bg-slate-50 text-slate-600",
    amber: "bg-amber-50 text-amber-600"
  };

  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white p-6 text-center transition-all hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-xl hover:shadow-black/[.02]"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorStyles[color] || colorStyles.blue} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <p className="mt-4 text-sm font-bold text-slate-900">{title}</p>
    </Link>
  );
}

function ActivityItem({ 
  icon, 
  title, 
  time, 
  location 
}: { 
  icon: ReactNode; 
  title: string; 
  time: string; 
  location: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate">{title}</p>
        <p className="text-[11px] font-medium text-slate-400">{time}</p>
        <p className="mt-0.5 text-xs text-slate-500 truncate">{location}</p>
      </div>
    </div>
  );
}


