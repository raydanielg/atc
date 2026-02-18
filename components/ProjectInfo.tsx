"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, X, Sparkles, User, ChevronRight, GraduationCap } from "lucide-react";

export default function ProjectInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:bottom-8 sm:right-8"
        title="Project Information"
      >
        <Info className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
          <div 
            className="absolute inset-0 bg-slate-900/60" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-orange-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="text-xl font-bold">Project Innovation</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6 rounded-2xl bg-orange-50 p-4 border border-orange-100">
                <p className="text-sm font-bold text-orange-800 flex items-center gap-2">
                  <Info className="h-4 w-4 shrink-0" />
                  Important Notice:
                </p>
                <p className="mt-2 text-sm leading-relaxed text-orange-700">
                  This is <strong>NOT</strong> the official site of Arusha Technical College (ATC). It is a conceptual prototype.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project Type</p>
                    <p className="text-sm font-bold text-slate-800">Student Innovation Project</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Developer</p>
                    <p className="text-sm font-bold text-slate-800">Ray Daniel</p>
                    <p className="text-xs text-slate-500">ATC Student</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Objective</p>
                    <p className="text-sm leading-relaxed text-slate-700 font-medium">
                      Innovation of ICT systems to modernize student services.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/developer/ray-daniel"
                onClick={() => setIsOpen(false)}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-95"
              >
                View Developer Profile
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
