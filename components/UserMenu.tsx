"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu({
  studentName,
  registrationNumber,
  onLogout,
}: {
  studentName: string;
  registrationNumber: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const initials = useMemo(() => {
    const parts = studentName.trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "A";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "T";
    return `${first}${last}`.toUpperCase();
  }, [studentName]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!open) return;
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="hidden sm:inline-flex items-center gap-2">
          <span className="text-xs text-slate-500">{registrationNumber || "2534477263"}</span>
          <FlameIcon />
        </span>
        <span className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-white">
          <Image
            src="/portrait-confident-dark-skinned-woman-enterpreneur-with-serious-look-wears-round-glasses-red-blouse-going-meet-with-partners-from-abroad-prepares-presenting-company-isolated-white.jpg"
            alt={studentName}
            fill
            sizes="36px"
            className="object-cover"
            priority
          />
          <span className="sr-only">{initials}</span>
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-black/[.08]"
          role="menu"
        >
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">{studentName}</p>
            <p className="mt-0.5 text-xs text-slate-600">Reg No: {registrationNumber || "2534477263"}</p>
          </div>

          <div className="p-2">
            <MenuLink href="/dashboard" label="Dashboard" icon={<HomeIcon />} onClick={() => setOpen(false)} />
            <MenuLink
              href="/dashboard/registration"
              label="Registration"
              icon={<ClipboardIcon />}
              onClick={() => setOpen(false)}
            />
            <MenuLink href="/dashboard/modules" label="Modules" icon={<GridIcon />} onClick={() => setOpen(false)} />
            <MenuLink href="/dashboard/profile" label="Profile" icon={<UserIcon />} onClick={() => setOpen(false)} />

            <div className="my-2 h-px bg-slate-200" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              role="menuitem"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
      role="menuitem"
    >
      {icon}
      {label}
    </Link>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--brand-blue)]" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c1.5 2.6 2.2 4.5 1.4 6.4-.5 1.3-1.7 2.2-2.6 3.1-1.4 1.4-1.9 2.6-1.9 4.1a5.6 5.6 0 0 0 11.2 0c0-3.2-2.2-5.2-4.2-7.3-.7-.8-1.4-1.5-1.8-2.4-.6-1.3-.7-2.9-.1-5.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 12 4l7.5 6.5V20a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 22v-7h4v7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M9 4.5h6M9 4.5a2 2 0 0 0-2 2V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2M9 4.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10h6M9 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4.5 4.5h6v6h-6v-6Zm9 0h6v6h-6v-6Zm-9 9h6v6h-6v-6Zm9 0h6v6h-6v-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M16.5 20.5c0-2.2-2.1-4-4.7-4s-4.8 1.8-4.8 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M10 7.5V6.5a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M3.5 12h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M7 9l-3 3 3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
