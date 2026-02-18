"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";

type Slot = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  time: string;
  moduleCode: string;
  lecturer: string;
  venue: string;
};

export default function TimetablePage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<Slot["day"]>("Monday");

  useEffect(() => {
    setRegistrationNumber(sessionStorage.getItem("atc_registration_number") ?? "");
  }, []);

  const slots = useMemo<Slot[]>(
    () => [
      {
        day: "Monday",
        time: "08:00 - 09:00",
        moduleCode: "CSDF 101",
        lecturer: "Eng. Grace N. Mushi",
        venue: "Lab 2",
      },
      {
        day: "Monday",
        time: "09:30 - 10:30",
        moduleCode: "CSDF 105",
        lecturer: "Ms. Neema J. Mbise",
        venue: "Room B12",
      },
      {
        day: "Monday",
        time: "11:00 - 12:00",
        moduleCode: "CSDF 107",
        lecturer: "Mr. Hassan A. Kweka",
        venue: "Lab 1",
      },
      {
        day: "Monday",
        time: "13:30 - 14:30",
        moduleCode: "CSDF 102",
        lecturer: "Mr. Peter L. Mrema",
        venue: "Room B10",
      },
      {
        day: "Tuesday",
        time: "08:00 - 09:00",
        moduleCode: "CSDF 104",
        lecturer: "Eng. Grace N. Mushi",
        venue: "Lab 3",
      },
      {
        day: "Tuesday",
        time: "09:30 - 10:30",
        moduleCode: "CSDF 106",
        lecturer: "Ms. Neema J. Mbise",
        venue: "Room B08",
      },
      {
        day: "Tuesday",
        time: "11:00 - 12:00",
        moduleCode: "CSDF 108",
        lecturer: "Mr. Hassan A. Kweka",
        venue: "Room B12",
      },
      {
        day: "Tuesday",
        time: "13:30 - 14:30",
        moduleCode: "CSDF 110",
        lecturer: "Mr. Peter L. Mrema",
        venue: "Room B06",
      },
      {
        day: "Wednesday",
        time: "08:00 - 09:00",
        moduleCode: "CSDF 101",
        lecturer: "Eng. Grace N. Mushi",
        venue: "Room B10",
      },
      {
        day: "Wednesday",
        time: "09:30 - 10:30",
        moduleCode: "CSDF 105",
        lecturer: "Ms. Neema J. Mbise",
        venue: "Lab 2",
      },
      {
        day: "Wednesday",
        time: "11:00 - 12:00",
        moduleCode: "CSDF 102",
        lecturer: "Mr. Peter L. Mrema",
        venue: "Room B10",
      },
      {
        day: "Wednesday",
        time: "13:30 - 14:30",
        moduleCode: "CSDF 107",
        lecturer: "Mr. Hassan A. Kweka",
        venue: "Lab 1",
      },
      {
        day: "Thursday",
        time: "10:30 - 11:30",
        moduleCode: "CSDF 104",
        lecturer: "Eng. Grace N. Mushi",
        venue: "Lab 3",
      },
      {
        day: "Thursday",
        time: "12:00 - 13:00",
        moduleCode: "CSDF 108",
        lecturer: "Mr. Hassan A. Kweka",
        venue: "Room B12",
      },
      {
        day: "Thursday",
        time: "13:30 - 14:30",
        moduleCode: "CSDF 110",
        lecturer: "Mr. Peter L. Mrema",
        venue: "Room B06",
      },
      {
        day: "Friday",
        time: "08:00 - 09:00",
        moduleCode: "CSDF 106",
        lecturer: "Ms. Neema J. Mbise",
        venue: "Room B08",
      },
      {
        day: "Friday",
        time: "09:30 - 10:30",
        moduleCode: "CSDF 107",
        lecturer: "Mr. Hassan A. Kweka",
        venue: "Lab 1",
      },
      {
        day: "Friday",
        time: "11:00 - 12:00",
        moduleCode: "CSDF 101",
        lecturer: "Eng. Grace N. Mushi",
        venue: "Room B10",
      },
    ],
    []
  );

  const filteredSlots = useMemo(
    () => slots.filter((s) => s.day === selectedDay),
    [slots, selectedDay]
  );

  return (
    <DashboardShell title="Timetable">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-28">
                <Image src="/atc%20logo.png" alt="Arusha Technical College" fill className="object-contain" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500">UNITED REPUBLIC OF TANZANIA</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">ARUSHA TECHNICAL COLLEGE (ATC)</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold tracking-widest text-slate-500">REPORT</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Student Timetable</p>
              <p className="mt-0.5 text-xs text-slate-600">Issued: 17 Feb 2026</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Student" value="Aisha M. Joseph" />
            <Info label="Registration No" value={registrationNumber || "2534477263"} />
            <Info label="Course" value="Cyber Security & Digital Forensics" />
            <Info label="Semester" value="2" />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-900">Weekly timetable</p>
            <span
              title="This is sample timetable data"
              className="inline-flex h-7 items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600"
            >
              Sample
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {([
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ] as Slot["day"][]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDay(d)}
                className={
                  d === selectedDay
                    ? "h-9 rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-800"
                    : "h-9 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                }
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Module code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Lecturer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-500">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredSlots.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-sm font-semibold text-slate-500" colSpan={4}>
                      No sessions for {selectedDay}.
                    </td>
                  </tr>
                ) : (
                  filteredSlots.map((s, idx) => (
                    <tr key={`${s.day}-${s.time}-${idx}`} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{s.time}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{s.moduleCode}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{s.lecturer}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{s.venue}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Note: Keep this timetable for reference. Any updates will be communicated via announcements.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-semibold tracking-widest text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
