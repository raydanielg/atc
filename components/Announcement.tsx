"use client";

import { useState } from "react";

export default function Announcement({
  title,
  message,
}: {
  title?: string;
  message: string;
}) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-amber-800">{title ?? "NOTICE"}</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{message}</p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-200 bg-white text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}
