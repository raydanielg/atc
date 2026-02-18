"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import { Users, Megaphone, FileText, Info } from "lucide-react";

type OrgPerson = {
  name: string;
  title: string;
  imageSrc?: string;
  phone?: string;
};

const topLeader: OrgPerson = {
  name: "SOTECO President",
  title: "Student Government",
};

const executiveLeaders: OrgPerson[] = [
  { name: "Vice President", title: "Executive" },
  { name: "Secretary General", title: "Executive" },
  { name: "Treasurer", title: "Finance" },
];

const committeeLeaders: OrgPerson[] = [
  { name: "Academic Affairs", title: "Committee Chair" },
  { name: "Welfare & Health", title: "Committee Chair" },
  { name: "Sports & Culture", title: "Committee Chair" },
  { name: "Discipline", title: "Committee Chair" },
];

const classRepresentatives: OrgPerson[] = [
  { name: "BIT 1", title: "Class Representative" },
  { name: "BIT 2", title: "Class Representative" },
  { name: "BIT 3", title: "Class Representative" },
  { name: "CSE 1", title: "Class Representative" },
  { name: "CSE 2", title: "Class Representative" },
  { name: "CSE 3", title: "Class Representative" },
  { name: "EEE 1", title: "Class Representative" },
  { name: "EEE 2", title: "Class Representative" },
];

type SotecoAnnouncement = {
  title: string;
  date: string;
  body: string;
  tag: "Important" | "Update" | "Event";
};

const announcements: SotecoAnnouncement[] = [
  {
    title: "General Meeting",
    date: "Fri • 10:00 AM",
    body: "All class representatives are required to attend. Agenda: student welfare, hostel issues, and timetable updates.",
    tag: "Important",
  },
  {
    title: "Sports & Culture Week",
    date: "Next Week",
    body: "Departments should submit team lists. More details will be shared via class reps.",
    tag: "Event",
  },
  {
    title: "Academic Affairs Update",
    date: "Today",
    body: "Please report any timetable clashes to your class representative for consolidation.",
    tag: "Update",
  },
];

export default function SotecoPage() {
  const [activeTab, setActiveTab] = useState<"structure" | "announcements" | "constitution">("structure");

  return (
    <DashboardShell title="SOTECO">
      <div className="space-y-6">
        {/* Header Tab Navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-2">
          <div className="flex flex-wrap gap-1 p-1">
            <TabButton 
              active={activeTab === "structure"} 
              onClick={() => setActiveTab("structure")}
              icon={<Users className="h-4 w-4" />}
              label="Leadership Structure"
            />
            <TabButton 
              active={activeTab === "announcements"} 
              onClick={() => setActiveTab("announcements")}
              icon={<Megaphone className="h-4 w-4" />}
              label="Announcements"
            />
            <TabButton 
              active={activeTab === "constitution"} 
              onClick={() => setActiveTab("constitution")}
              icon={<FileText className="h-4 w-4" />}
              label="Constitution"
            />
          </div>
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">
            Student Government
          </div>
        </div>

        {/* Dynamic Content Based on Selected Tab */}
        <div className="transition-all duration-300">
          {activeTab === "structure" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 overflow-x-auto">
                <div className="min-w-[900px]">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">SOTECO Leadership Tree</h2>
                      <p className="text-sm text-slate-500 mt-1">Official hierarchy of the student government.</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <OrgNode person={topLeader} tone="primary" />
                  </div>

                  <div className="mx-auto h-6 w-px bg-slate-300" />
                  <div className="mx-auto h-px w-full max-w-4xl bg-slate-300" />

                  <div className="mt-0 flex justify-center gap-6">
                    {executiveLeaders.map((p) => (
                      <div key={p.name} className="flex w-1/3 flex-col items-center">
                        <div className="mt-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                          Executive
                        </div>
                        <div className="h-4 w-px bg-slate-300" />
                        <OrgNode person={p} />
                      </div>
                    ))}
                  </div>

                  <div className="mx-auto h-8 w-px bg-slate-300" />
                  <div className="mx-auto h-px w-full max-w-5xl bg-slate-300" />

                  <div className="mt-0 flex justify-center gap-6">
                    {committeeLeaders.map((p) => (
                      <div key={p.name} className="flex w-1/4 flex-col items-center">
                        <div className="mt-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                          Committees
                        </div>
                        <div className="h-4 w-px bg-slate-300" />
                        <OrgNode person={p} tone="muted" />
                      </div>
                    ))}
                  </div>

                  <div className="mx-auto h-10 w-px bg-slate-300" />
                  <div className="mx-auto h-px w-full max-w-6xl bg-slate-300" />

                  <div className="mt-0 grid grid-cols-4 gap-5">
                    {classRepresentatives.map((p) => (
                      <div key={p.name} className="flex flex-col items-center">
                        <div className="mt-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                          Class Reps
                        </div>
                        <div className="h-4 w-px bg-slate-300" />
                        <OrgNode person={p} tone="compact" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {announcements.map((a) => (
                <div key={a.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={
                        a.tag === "Important"
                          ? "rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase text-red-700 tracking-widest"
                          : a.tag === "Event"
                            ? "rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700 tracking-widest"
                            : "rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase text-blue-700 tracking-widest"
                      }
                    >
                      {a.tag}
                    </span>
                    <p className="text-xs font-bold text-slate-400">{a.date}</p>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "constitution" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4 opacity-20" />
                  <h2 className="text-2xl font-black text-slate-900">SOTECO Constitution</h2>
                  <p className="text-slate-500 mt-2">Revised Edition 2024</p>
                </div>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Article I: Name & Objective</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The name of the organization shall be SOTECO (Student Organization of Arusha Technical College). Its primary objective is to represent students' interests and promote academic excellence.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Article II: Membership</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every registered student of Arusha Technical College is a member of SOTECO and is entitled to all rights and privileges as outlined in this constitution.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Article III: Leadership</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Leadership consists of the President, Vice President, Cabinet, and Class Representatives, all elected democratically by the student body.
                    </p>
                  </section>
                </div>

                <button className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors">
                  <FileText className="h-5 w-5" />
                  Download Full Constitution (PDF)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-6 flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900 uppercase tracking-widest">SOTECO Information Portal</p>
            <p className="mt-1 text-sm text-blue-800/80 leading-relaxed">
              This portal is maintained by SOTECO to ensure transparency and easy access to student government resources. For any queries, contact your class representative.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function TabButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
        active 
          ? "bg-slate-900 text-white shadow-lg shadow-black/10" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function OrgNode({
  person,
  tone,
}: {
  person: OrgPerson;
  tone?: "primary" | "muted" | "compact";
}) {
  const initials = person.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const cardClass =
    tone === "primary"
      ? "border-blue-200 bg-blue-50"
      : tone === "muted"
        ? "border-slate-200 bg-slate-50"
        : "border-slate-200 bg-white";

  return (
    <div className={`w-full max-w-[280px] rounded-2xl border ${cardClass} p-4 shadow-sm`}>
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {person.imageSrc ? (
            <Image src={person.imageSrc} alt={person.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-black text-slate-700">
              {initials}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-900 text-sm">{person.name}</p>
          <p className="truncate text-slate-600 text-xs font-medium">{person.title}</p>
        </div>
      </div>
    </div>
  );
}

