import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import { Users } from "lucide-react";

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
  return (
    <DashboardShell title="SOTECO">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Student Government</p>
              <h1 className="mt-2 text-xl font-bold text-slate-900">SOTECO Leadership Tree</h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                A clear overview of the student government structure, from the main leadership to course/class representatives.
              </p>
            </div>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2 overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Leadership Structure</p>
                  <p className="mt-1 text-sm text-slate-600">From top leadership to course/class representatives.</p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Announcements</p>
            <h2 className="mt-2 text-lg font-bold text-slate-900">SOTECO Updates</h2>

            <div className="mt-4 grid gap-3">
              {announcements.map((a) => (
                <div key={a.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                    <span
                      className={
                        a.tag === "Important"
                          ? "rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700"
                          : a.tag === "Event"
                            ? "rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700"
                            : "rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700"
                      }
                    >
                      {a.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{a.date}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Where to report issues</p>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                Start with your Class Representative. If the issue needs escalation, it will be forwarded to the relevant committee or executive leader.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-blue-900">Tip</p>
          <p className="mt-1 text-sm text-blue-800 leading-relaxed">
            To use real photos, add image files to the <span className="font-semibold">/public</span> folder and set <span className="font-semibold">imageSrc</span> for each leader.
          </p>
        </div>
      </div>
    </DashboardShell>
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

  const nameClass = tone === "compact" ? "text-sm" : "text-sm";
  const titleClass = tone === "compact" ? "text-[11px]" : "text-xs";

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
          <p className={`truncate font-semibold text-slate-900 ${nameClass}`}>{person.name}</p>
          <p className={`truncate text-slate-600 ${titleClass}`}>{person.title}</p>
          {person.phone ? <p className="mt-1 text-[11px] text-slate-500">{person.phone}</p> : null}
        </div>
      </div>
    </div>
  );
}
