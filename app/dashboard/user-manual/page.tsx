import DashboardShell from "@/components/DashboardShell";

export default function UserManualPage() {
  return (
    <DashboardShell title="User Manual">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">ATC Student Portal (ATMS)</p>
          <h1 className="mt-2 text-xl font-bold text-slate-900">User Manual (English)</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            This is a prototype of the ATC Student Portal designed to help students access key academic and college services in a clean, modern interface.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-bold text-slate-900">How to Sign In (Login)</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-700">
            <p>1. Open the Login page.</p>
            <p>2. Enter your Registration Number and Password.</p>
            <p>3. Click Sign in.</p>
            <p className="text-slate-600">After signing in, you will be redirected to the Dashboard.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-bold text-slate-900">Menus and What They Do</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Dashboard</p>
              <p className="mt-1 text-sm text-slate-600">Quick overview of key services with shortcuts to important pages.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Profile</p>
              <p className="mt-1 text-sm text-slate-600">Student details and a simple performance/attendance summary.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Registration</p>
              <p className="mt-1 text-sm text-slate-600">Semester registration steps and receipt/payment info in a table.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Modules</p>
              <p className="mt-1 text-sm text-slate-600">Your modules organized under Semester 1 and Semester 2.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Timetable</p>
              <p className="mt-1 text-sm text-slate-600">Class timetable with day filters to quickly view a specific day.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Results</p>
              <p className="mt-1 text-sm text-slate-600">Results by academic year; select a session to see analysis and status.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Exam Results</p>
              <p className="mt-1 text-sm text-slate-600">Marks table for a session plus a details view for a selected module.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Exam Numbers</p>
              <p className="mt-1 text-sm text-slate-600">Your exam number and exam venues, with instructions.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Assessment Plans</p>
              <p className="mt-1 text-sm text-slate-600">CA progress per module and an overall CA summary.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Hostel</p>
              <p className="mt-1 text-sm text-slate-600">Hostel allocation details plus a flip-style Hostel Card.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Student ID</p>
              <p className="mt-1 text-sm text-slate-600">Flip-style Student ID Card with identification details.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">IPT Arrival Note</p>
              <p className="mt-1 text-sm text-slate-600">Tabs for companies, requests, approvals, arrival notes, and work performance.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Alumni</p>
              <p className="mt-1 text-sm text-slate-600">Graduation information and certificates; open Certificate Preview to view a certificate.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Certificate Preview</p>
              <p className="mt-1 text-sm text-slate-600">Official-style certificate preview with watermark (prototype demo).</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
              <p className="text-sm font-semibold text-slate-900">Project Info / Developer Profile</p>
              <p className="mt-1 text-sm text-slate-600">
                The floating info icon explains that this is an innovation/prototype. The Developer Profile shows the tech stack (frontend/backend) and direct contact options (WhatsApp/SMS).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-sm font-bold text-blue-900">Quick Help (Troubleshooting)</h2>
          <div className="mt-3 grid gap-2 text-sm text-blue-900/90">
            <p>- If you can’t sign in: confirm your Registration Number is correct, refresh, then try again.</p>
            <p>- If a page looks empty: go back to the Dashboard and open the menu again.</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
