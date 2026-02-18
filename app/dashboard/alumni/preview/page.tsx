"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import { Download, Printer, ShieldCheck, Award, CheckCircle2 } from "lucide-react";

export default function CertificatePreviewPage() {
  const searchParams = useSearchParams();
  const certId = searchParams.get("id");

  const certData = useMemo(() => {
    if (certId === "cert-002") {
      return {
        name: "Transcript of Academic Records",
        refNo: "ATC/TRANS/2027/001",
        issuedDate: "15 Nov 2027",
      };
    }
    return {
      name: "Bachelor Degree in Information Technology",
      refNo: "ATC/CERT/2027/001",
      issuedDate: "15 Nov 2027",
    };
  }, [certId]);

  return (
    <DashboardShell title="Certificate Preview">
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">PREVIEW</p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">{certData.name}</h1>
            <p className="text-sm text-slate-600">Reference: {certData.refNo}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[1.414/1] w-full max-w-4xl overflow-hidden rounded-xl border-4 border-double border-blue-900 bg-white shadow-2xl">
          {/* Certificate Design */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-16 text-center">
            {/* Border pattern */}
            <div className="absolute inset-2 border-2 border-blue-900/20" />
            <div className="absolute inset-6 border-[1px] border-blue-900/10" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-6">
                <div className="relative h-24 w-24">
                  <Image src="/atc%20logo.png" alt="ATC Logo" fill className="object-contain" />
                </div>
                <div className="text-left border-l-2 border-blue-900/20 pl-6">
                  <h2 className="text-3xl font-serif font-black text-blue-900 tracking-tight leading-none">ARUSHA TECHNICAL COLLEGE</h2>
                  <p className="mt-1 text-xs font-bold tracking-[0.3em] text-blue-800 uppercase">The United Republic of Tanzania</p>
                  <p className="mt-2 text-[10px] font-bold text-blue-700 italic">"Skills make the difference"</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <p className="font-serif italic text-xl text-slate-600">This is to certify that</p>
              <h3 className="mt-6 text-5xl font-serif font-bold text-slate-900 underline underline-offset-8 decoration-slate-200">Aisha M. Joseph</h3>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-700">
                has successfully completed the requirements for the award of
              </p>
              <h4 className="mt-6 text-3xl font-bold text-blue-900 uppercase tracking-wide px-8 py-2 border-y border-blue-900/10">
                {certData.name}
              </h4>
              <p className="mt-4 text-sm font-medium text-slate-500 italic">
                With all the honors, rights and privileges appertaining thereto.
              </p>
            </div>

            <div className="relative z-10 w-full grid grid-cols-3 items-end gap-4 px-4">
              <div className="flex flex-col items-center">
                <div className="h-12 w-32 relative mb-1 opacity-80">
                  {/* Signature Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center font-serif italic text-blue-800 text-lg opacity-40">Signature</div>
                </div>
                <div className="w-full border-t border-slate-400 pt-2">
                  <p className="text-[10px] font-black text-slate-900 uppercase">Governing Council Secretary</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-900/20 animate-[spin_20s_linear_infinite]" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-900/5 text-blue-900">
                    <ShieldCheck className="h-10 w-10" />
                  </div>
                </div>
                <p className="mt-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">Official College Seal</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-12 w-32 relative mb-1 opacity-80">
                  <div className="absolute inset-0 flex items-center justify-center font-serif italic text-blue-800 text-lg opacity-40">Signature</div>
                </div>
                <div className="w-full border-t border-slate-400 pt-2">
                  <p className="text-[10px] font-black text-slate-900 uppercase">College Principal</p>
                  <p className="text-[8px] text-slate-500">Date: {certData.issuedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Watermark/Texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:url('/atc%20logo.png')] [background-size:200px_200px] [background-position:center] [background-repeat:no-repeat]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:radial-gradient(#003366_1.5px,transparent_1.5px)] [background-size:30px_30px]" />
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 flex items-start gap-3">
          <Award className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Verification Note</p>
            <p className="mt-1 text-sm text-blue-800 leading-relaxed">
              This is a digital preview of your official academic certificate. You can use the QR code on your Student ID to verify this document online.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
