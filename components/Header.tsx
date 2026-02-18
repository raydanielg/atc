import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-28">
            <Image src="/atc%20logo.png" alt="Arusha Technical College" fill className="object-contain" />
          </div>
          <span className="sr-only">Arusha Technical College</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
