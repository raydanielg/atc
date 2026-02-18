"use client";

import DashboardShell from "@/components/DashboardShell";

type ModuleItem = {
  code: string;
  name: string;
  credit: number;
};

export default function ModulesPage() {
  const semester1: ModuleItem[] = [
    { code: "CSDF 101", name: "Introduction to Cyber Security", credit: 10 },
    { code: "CSDF 103", name: "Computer Fundamentals & Operating Systems", credit: 10 },
    { code: "CSDF 105", name: "Networking Essentials", credit: 10 },
    { code: "CSDF 107", name: "Digital Forensics Fundamentals", credit: 10 },
    { code: "CSDF 109", name: "Communication Skills", credit: 5 },
  ];

  const semester2: ModuleItem[] = [
    { code: "CSDF 102", name: "Cryptography Basics", credit: 10 },
    { code: "CSDF 104", name: "Secure Programming", credit: 10 },
    { code: "CSDF 106", name: "Incident Response & Handling", credit: 10 },
    { code: "CSDF 108", name: "Network Security", credit: 10 },
    { code: "CSDF 110", name: "Ethics & Professional Practice", credit: 5 },
  ];

  return (
    <DashboardShell title="Modules">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500">COURSE</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">Cyber Security & Digital Forensics</p>
          <p className="mt-1 text-sm text-slate-600">Modules grouped by semester.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ModuleTable title="Semester 1" items={semester1} />
          <ModuleTable title="Semester 2" items={semester2} />
        </div>
      </div>
    </DashboardShell>
  );
}

function ModuleTable({ title, items }: { title: string; items: ModuleItem[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <p className="text-sm font-semibold text-slate-600">{items.length} modules</p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Module</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {items.map((m) => (
              <tr key={m.code} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{m.code}</td>
                <td className="min-w-[240px] px-4 py-3 text-sm text-slate-800">{m.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{m.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
