"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export type SidebarNavItem = {
  label: string;
  href: string;
};

export default function Sidebar({
  navItems,
  registrationNumber,
  open,
  onClose,
}: {
  navItems: SidebarNavItem[];
  registrationNumber: string;
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  const NavContent = (
    <>
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-28">
          <Image src="/atc%20logo.png" alt="Arusha Technical College" fill className="object-contain" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-5">Arusha Technical College</p>
          <p className="text-xs text-slate-500">ATC Student Portal</p>
        </div>
      </div>

      <nav className="mt-8 grid gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className={
                active
                  ? "flex h-10 w-full items-center rounded-xl bg-slate-100 px-3 text-left text-sm font-semibold text-slate-900"
                  : "flex h-10 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold tracking-widest text-slate-500">STUDENT</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">Aisha M. Joseph</p>
          <p className="mt-1 text-xs text-slate-600">
            Reg No:{" "}
            <span className="font-semibold text-slate-800">
              {registrationNumber ? registrationNumber : "2534477263"}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("atc_registration_number");
            onClose?.();
            router.push("/");
          }}
          className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            onClick={() => onClose?.()}
            aria-label="Close navigation"
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-2xl">
            {NavContent}
          </aside>
        </div>
      ) : null}

      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        {NavContent}
      </aside>
    </>
  );
}
