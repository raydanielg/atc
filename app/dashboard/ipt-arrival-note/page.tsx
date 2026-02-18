"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/DashboardShell";

type TabKey = "companies" | "requests" | "approved" | "arrival" | "performance";

type Company = {
  name: string;
  location: string;
  field: string;
  availableSlots: number;
};

type RequestRow = {
  company: string;
  position: string;
  requestedOn: string;
  status: "Pending" | "Approved" | "Rejected";
};

type ApprovedRow = {
  company: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed";
};

type ArrivalRow = {
  company: string;
  arrivalDate: string;
  referenceNo: string;
  status: "Submitted" | "Verified";
  attachmentName?: string;
};

export default function IptArrivalNotePage() {
  const [tab, setTab] = useState<TabKey>("companies");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [applyCompany, setApplyCompany] = useState<string>("");
  const [applyPosition, setApplyPosition] = useState<string>("");
  const [applyNotes, setApplyNotes] = useState<string>("");

  const [arrivalCompany, setArrivalCompany] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [arrivalReference, setArrivalReference] = useState<string>("");
  const [arrivalAttachment, setArrivalAttachment] = useState<File | null>(null);
  const [showArrivalForm, setShowArrivalForm] = useState(false);

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  const companies = useMemo<Company[]>(
    () => [
      { name: "TANESCO", location: "Arusha", field: "IT Support", availableSlots: 8 },
      { name: "NHC", location: "Arusha", field: "Software & Networks", availableSlots: 4 },
      { name: "TRA", location: "Arusha", field: "Cyber Security", availableSlots: 3 },
      { name: "CRDB Bank", location: "Arusha", field: "Systems & Helpdesk", availableSlots: 5 },
      { name: "Vodacom", location: "Dar es Salaam", field: "Networking", availableSlots: 6 },
    ],
    []
  );

  const requests = useMemo<RequestRow[]>(
    () => [
      { company: "TRA", position: "Cyber Security Intern", requestedOn: "05 Feb 2026", status: "Pending" },
      { company: "CRDB Bank", position: "IT Support Intern", requestedOn: "02 Feb 2026", status: "Approved" },
      { company: "NHC", position: "Network Intern", requestedOn: "28 Jan 2026", status: "Rejected" },
    ],
    []
  );

  const [requestRows, setRequestRows] = useState<RequestRow[]>(requests);

  const approved = useMemo<ApprovedRow[]>(
    () => [
      {
        company: "CRDB Bank",
        supervisor: "Mr. Daniel M. Mwakyusa",
        startDate: "01 Mar 2026",
        endDate: "30 May 2026",
        status: "Active",
      },
    ],
    []
  );

  const arrivalNotes = useMemo<ArrivalRow[]>(
    () => [
      {
        company: "CRDB Bank",
        arrivalDate: "02 Mar 2026",
        referenceNo: "ATC-IPT-00021",
        status: "Submitted",
      },
    ],
    []
  );

  const [arrivalRows, setArrivalRows] = useState<ArrivalRow[]>(arrivalNotes);

  const performance = useMemo(
    () => ({ attendance: 92, tasksCompleted: 18, tasksTotal: 24, supervisorRating: 4.3 }),
    []
  );

  return (
    <DashboardShell title="IPT Arrival Note">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500">IPT</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Industrial Practical Training</p>
              <p className="mt-1 text-sm text-slate-600">
                Registration No: <span className="font-semibold text-slate-900">{registrationNumber || "2534477263"}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <TabButton active={tab === "companies"} onClick={() => setTab("companies")}>
                Companies
              </TabButton>
              <TabButton active={tab === "requests"} onClick={() => setTab("requests")}>
                My requests
              </TabButton>
              <TabButton active={tab === "approved"} onClick={() => setTab("approved")}>
                Approved
              </TabButton>
              <TabButton active={tab === "arrival"} onClick={() => setTab("arrival")}>
                Arrival notes
              </TabButton>
              <TabButton active={tab === "performance"} onClick={() => setTab("performance")}>
                Work performance
              </TabButton>
            </div>
          </div>
        </div>

        {tab === "companies" && (
          <Section title="Companies" subtitle="Available companies for IPT placement (sample).">
            <DataTable
              columns={["Company", "Location", "Field", "Slots", "Action"]}
              rows={companies.map((c) => [
                c.name,
                c.location,
                c.field,
                String(c.availableSlots),
                <button
                  key={`${c.name}-apply`}
                  type="button"
                  onClick={() => {
                    setApplyCompany(c.name);
                    setApplyPosition("");
                    setApplyNotes("");
                  }}
                  className="inline-flex h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Apply
                </button>,
              ])}
            />

            {applyCompany && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Apply to {applyCompany}</p>
                    <p className="mt-1 text-sm text-slate-600">Fill the details below (demo).</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApplyCompany("")}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    aria-label="Close apply form"
                  >
                    ×
                  </button>
                </div>

                <form
                  className="mt-4 grid gap-3 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const position = applyPosition.trim() || "IPT Intern";
                    setRequestRows((prev) => [
                      {
                        company: applyCompany,
                        position,
                        requestedOn: formatDate(new Date()),
                        status: "Pending",
                      },
                      ...prev,
                    ]);
                    setApplyCompany("");
                    setTab("requests");
                  }}
                >
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-slate-700">Position</label>
                    <input
                      value={applyPosition}
                      onChange={(e) => setApplyPosition(e.target.value)}
                      placeholder="e.g. Cyber Security Intern"
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-slate-700">Notes</label>
                    <input
                      value={applyNotes}
                      onChange={(e) => setApplyNotes(e.target.value)}
                      placeholder="Optional"
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2 flex gap-2">
                    <button
                      type="submit"
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white transition hover:opacity-95"
                    >
                      Submit application
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setApplyCompany("");
                      }}
                      className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Section>
        )}

        {tab === "requests" && (
          <Section title="My requests" subtitle="Your IPT applications and their status.">
            <DataTable
              columns={["Company", "Position", "Requested on", "Status"]}
              rows={requestRows.map((r) => [
                r.company,
                r.position,
                r.requestedOn,
                <Status key={r.company} kind={r.status} />,
              ])}
            />
          </Section>
        )}

        {tab === "approved" && (
          <Section title="Approved placements" subtitle="Your approved IPT placement(s).">
            <DataTable
              columns={["Company", "Supervisor", "Start", "End", "Status"]}
              rows={approved.map((a) => [
                a.company,
                a.supervisor,
                a.startDate,
                a.endDate,
                <Status key={a.company} kind={a.status} />,
              ])}
            />
          </Section>
        )}

        {tab === "arrival" && (
          <Section title="Arrival notes" subtitle="Arrival note submissions and verification.">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-800">Your arrival notes</div>
              <button
                type="button"
                onClick={() => {
                  setShowArrivalForm(true);
                  setArrivalCompany(approved[0]?.company ?? "");
                  setArrivalDate("");
                  setArrivalReference("");
                  setArrivalAttachment(null);
                }}
                className="inline-flex h-9 items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Submit arrival note
              </button>
            </div>

            {showArrivalForm && (
              <form
                className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                onSubmit={(e) => {
                  e.preventDefault();

                  const company = arrivalCompany || approved[0]?.company || "Company";
                  const ref = arrivalReference.trim() || `ATC-IPT-${Math.floor(Math.random() * 90000 + 10000)}`;
                  const dateText = arrivalDate ? formatInputDate(arrivalDate) : formatDate(new Date());

                  setArrivalRows((prev) => [
                    {
                      company,
                      arrivalDate: dateText,
                      referenceNo: ref,
                      status: "Submitted",
                      attachmentName: arrivalAttachment?.name,
                    },
                    ...prev,
                  ]);

                  setShowArrivalForm(false);
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Submit arrival note</p>
                    <p className="mt-1 text-sm text-slate-600">Company, arrival date, reference and attachment (demo).</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowArrivalForm(false)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    aria-label="Close arrival note form"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-slate-700">Company</label>
                    <select
                      value={arrivalCompany}
                      onChange={(e) => setArrivalCompany(e.target.value)}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
                    >
                      <option value="">Select company</option>
                      {approved.map((a) => (
                        <option key={a.company} value={a.company}>
                          {a.company}
                        </option>
                      ))}
                      {companies.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-slate-700">Arrival date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-slate-700">Reference number</label>
                    <input
                      value={arrivalReference}
                      onChange={(e) => setArrivalReference(e.target.value)}
                      placeholder="e.g. ATC-IPT-00021"
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-semibold text-slate-700">Attachment</label>
                    <input
                      type="file"
                      onChange={(e) => setArrivalAttachment(e.target.files?.[0] ?? null)}
                      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-5 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowArrivalForm(false)}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <DataTable
              columns={["Company", "Arrival date", "Reference", "Status"]}
              rows={arrivalRows.map((n) => [
                n.company,
                n.arrivalDate,
                n.referenceNo,
                <Status key={n.referenceNo} kind={n.status} />,
              ])}
            />
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Tip</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                After you arrive, submit your arrival note with the correct date and company details.
              </p>
            </div>
          </Section>
        )}

        {tab === "performance" && (
          <Section title="Work performance" subtitle="Simple summary of your IPT progress.">
            <div className="grid gap-4 md:grid-cols-2">
              <Metric label="Attendance" value={`${performance.attendance}%`} />
              <Metric label="Supervisor rating" value={`${performance.supervisorRating}/5`} />
              <Metric
                label="Tasks completed"
                value={`${performance.tasksCompleted}/${performance.tasksTotal}`}
              />
              <Metric
                label="Progress"
                value={`${Math.round((performance.tasksCompleted / performance.tasksTotal) * 100)}%`}
              />
            </div>
          </Section>
        )}
      </div>
    </DashboardShell>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "h-9 rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-800"
          : "h-9 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
      }
    >
      {children}
    </button>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <p className="text-xs font-semibold tracking-widest text-slate-500">{title.toUpperCase()}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<string | React.ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((r, idx) => (
            <tr key={idx} className="hover:bg-slate-50">
              {r.map((cell, i) => (
                <td key={i} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Status({ kind }: { kind: string }) {
  const cls =
    kind === "Approved" || kind === "Verified" || kind === "Active"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : kind === "Pending" || kind === "Submitted"
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : "bg-rose-50 text-rose-700 ring-rose-200";

  return (
    <span className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold ring-1 ${cls}`}>{kind}</span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold tracking-widest text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function formatDate(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatInputDate(isoDate: string) {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return formatDate(d);
}
