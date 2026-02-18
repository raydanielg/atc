"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  Award, 
  Code2, 
  Rocket, 
  ChevronLeft,
  ExternalLink,
  MessageSquare
} from "lucide-react";

export default function DeveloperProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header/Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs">
            RD
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/portrait-confident-dark-skinned-woman-enterpreneur-with-serious-look-wears-round-glasses-red-blouse-going-meet-with-partners-from-abroad-prepares-presenting-company-isolated-white.jpg"
                    alt="Ray Daniel"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold text-slate-900">Ray Daniel</h1>
                  <p className="text-sm font-medium text-blue-600">Full Stack Developer & Student</p>
                  <p className="mt-2 text-xs text-slate-500 flex items-center justify-center gap-1">
                    <Globe className="h-3 w-3" />
                    Arusha, Tanzania
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Connect</h2>
                <div className="mt-4 space-y-3">
                  <SocialLink icon={<Github className="h-4 w-4" />} label="GitHub" href="#" />
                  <SocialLink icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" href="#" />
                  <SocialLink icon={<Mail className="h-4 w-4" />} label="Email" href="mailto:ray@example.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-blue-600">
                <Award className="h-6 w-6" />
                <h2 className="text-xl font-bold">About the Developer</h2>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                I am a passionate student at <span className="font-bold text-slate-900">Arusha Technical College (ATC)</span>, specializing in ICT and software innovation. My mission is to bridge the gap between complex academic processes and user-friendly digital solutions.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Education</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">Arusha Technical College</p>
                  <p className="text-xs text-slate-500">ICT Innovation & Software Dev</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Goal</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">Modernize Student Services</p>
                  <p className="text-xs text-slate-500">Innovation of ICT Systems</p>
                </div>
              </div>
            </section>

            {/* Project Details Section */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-orange-600">
                <Rocket className="h-6 w-6" />
                <h2 className="text-xl font-bold">Innovation Focus</h2>
              </div>
              <div className="mt-6 space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  This Student Portal prototype was built to demonstrate how modern web technologies like <span className="font-semibold text-slate-900">React, Next.js, and Tailwind CSS</span> can transform institutional management systems into fast, accessible, and intuitive platforms.
                </p>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Modern Stack</h3>
                      <p className="text-xs text-slate-500 mt-1">High performance and real-time interactions.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">User Centric</h3>
                      <p className="text-xs text-slate-500 mt-1">Designed specifically for the student experience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <div className="rounded-3xl bg-blue-600 p-8 text-white">
              <h3 className="text-lg font-bold italic">"Skills make the difference"</h3>
              <p className="mt-2 text-blue-100 text-sm opacity-80">
                This project is a testament to the power of innovation in education. Dedicated to all tech-driven students at ATC.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-50">
                Get in touch
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a 
      href={href} 
      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50 group"
    >
      <div className="flex items-center gap-3">
        <span className="text-slate-400 group-hover:text-blue-600">{icon}</span>
        <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-900">{label}</span>
      </div>
      <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-blue-400" />
    </a>
  );
}
