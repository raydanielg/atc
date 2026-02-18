export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Arusha Technical College</p>
        <p>ATC Student Portal</p>
      </div>
    </footer>
  );
}
