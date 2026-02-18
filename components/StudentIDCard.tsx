"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { CreditCard, ShieldCheck } from "lucide-react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

export default function StudentIDCard({
  studentName,
  registrationNumber,
  course,
  ntaLevel,
  expiryDate,
}: {
  studentName: string;
  registrationNumber: string;
  course: string;
  ntaLevel: string;
  expiryDate: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const initials = useMemo(() => {
    const parts = studentName.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "A";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "T";
    return `${first}${last}`.toUpperCase();
  }, [studentName]);

  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}/dashboard/profile` : "";

  const cardStyles = {
    container: { perspective: "1500px" },
    card: {
      transformStyle: "preserve-3d" as const,
      transition: "transform 1000ms",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    },
    face: {
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
    },
    back: {
      transform: "rotateY(180deg)",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-sm" style={cardStyles.container}>
        <div
          ref={cardRef}
          onClick={() => setFlipped((v) => !v)}
          className="relative block h-[240px] w-full cursor-pointer rounded-[22px] text-left shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-shadow hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)]"
          style={cardStyles.card}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[22px] text-white"
            style={cardStyles.face}
          >
            <div className="relative h-full w-full bg-[#003366]">
              {/* Patterned background for white section */}
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-white shadow-sm overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(45deg,#003366_25%,transparent_25%,transparent_50%,#003366_50%,#003366_75%,transparent_75%,transparent)] [background-size:10px_10px]" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(-45deg,transparent,transparent:5px,#003366:5px,#003366:6px)]" />
                <div className="absolute bottom-0 left-0 right-0 h-12 translate-y-full overflow-hidden">
                  <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
                    <path
                      d="M0.00,49.98 C149.99,150.00 349.85,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
                      className="fill-white"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="relative h-full w-full p-5 flex flex-col">
                <div className="relative flex items-start justify-between">
                  <div className="flex flex-col pt-1 text-[#003366]">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-[11px] font-black tracking-tighter uppercase leading-none">
                        Arusha Technical College
                      </span>
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase mt-1 opacity-80">
                      Student ID Card
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="relative h-10 w-10">
                      <Image src="/atc%20logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-[7px] font-bold text-blue-900 tracking-tight italic mt-1">
                      Skills make the difference
                    </span>
                  </div>
                </div>

                <div className="h-[25%]" />

                <div className="relative flex items-center gap-3 mt-2">
                  <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full border-4 border-white bg-blue-900 flex items-center justify-center shadow-lg -mt-8 z-10">
                    <Image
                      src="/portrait-confident-dark-skinned-woman-enterpreneur-with-serious-look-wears-round-glasses-red-blouse-going-meet-with-partners-from-abroad-prepares-presenting-company-isolated-white.jpg"
                      alt={studentName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 pt-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-blue-100 uppercase font-bold tracking-tighter">Full Name</span>
                      <div className="truncate text-sm font-black leading-tight uppercase text-white">
                        {studentName}
                      </div>
                    </div>
                    <div className="flex flex-col mt-1">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1 backdrop-blur-md border border-white/20">
                        <span className="text-[8px] text-blue-100 uppercase font-bold tracking-tighter whitespace-nowrap">Reg No:</span>
                        <span className="text-[10px] text-white font-mono font-bold tracking-wider">
                          {registrationNumber}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[9px] text-blue-100 uppercase font-bold tracking-tighter">Course:</span>
                      <span className="text-[10px] text-white font-black uppercase tracking-tight truncate">
                        {course}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white p-1 shrink-0 mt-2">
                    <QRCode size={40} value={profileUrl} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[22px] text-white"
            style={{ ...cardStyles.face, ...cardStyles.back }}
          >
            <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 p-5 text-center">
              <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-blue-200/10 blur-2xl" />

              <div>
                <div className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-blue-100">
                  ID CARD TERMS
                </div>
                <div className="mt-2 text-[9px] leading-relaxed text-white/90 font-medium px-2">
                  NTA Level: <span className="font-bold text-white">{ntaLevel}</span> | Expiry: <span className="font-bold text-white">{expiryDate}</span><br />
                  <span className="mt-2 block italic text-[8px]">
                    This card is the property of Arusha Technical College. If found, please return to the nearest police station or ATC office.
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <div className="rounded-lg bg-white p-1.5 shadow-inner">
                  <Barcode
                    value={registrationNumber || "000000"}
                    height={30}
                    width={1.2}
                    displayValue={false}
                    background="transparent"
                    margin={0}
                  />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-tighter opacity-80">{registrationNumber}</span>
              </div>

              <div className="text-[9px] font-semibold text-white/70 tracking-tight">
                Arusha Technical College | Student ID System
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Tap the card to view the back.
        </p>
      </div>
    </div>
  );
}
