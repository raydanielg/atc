"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import { Phone, MessageSquareText, Mail, Users2, Filter, MessagesSquare, Send } from "lucide-react";

type Adviser = {
  id: string;
  name: string;
  title: string;
  department: string;
  programmes: string[];
  phone: string;
  email: string;
  office: string;
  photo?: string;
};

type ChatMessage = {
  id: string;
  adviserId: string;
  sender: "student" | "adviser";
  text: string;
  timestamp: number;
};

const advisers: Adviser[] = [
  {
    id: "adv-1",
    name: "Dr. Neema A. Kweka",
    title: "Senior Lecturer / Academic Adviser",
    department: "ICT Department",
    programmes: ["BIT", "CSE"],
    phone: "255712345678",
    email: "neema.kweka@atc.ac.tz",
    office: "Block B • Room 12",
  },
  {
    id: "adv-2",
    name: "Eng. Paul M. Nnko",
    title: "Lecturer / Academic Adviser",
    department: "Electrical Engineering",
    programmes: ["EEE"],
    phone: "255713987654",
    email: "paul.nnko@atc.ac.tz",
    office: "Block C • Room 05",
  },
  {
    id: "adv-3",
    name: "Ms. Rehema J. Mollel",
    title: "Assistant Lecturer / Academic Adviser",
    department: "Business Management",
    programmes: ["BBA", "Accounting"],
    phone: "255714555222",
    email: "rehema.mollel@atc.ac.tz",
    office: "Admin Building • Room 02",
  },
];

const programmeOptions = ["BIT", "CSE", "EEE", "BBA", "Accounting"] as const;

export default function AcademicAdviserPage() {
  const [programme, setProgramme] = useState<(typeof programmeOptions)[number]>("BIT");
  const [activeView, setActiveView] = useState<"directory" | "chat">("directory");
  const [selectedAdviserId, setSelectedAdviserId] = useState<string>(advisers[0]?.id ?? "");
  const [chatInput, setChatInput] = useState("");
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("atc_adviser_chat_messages");
      return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
    } catch {
      return [];
    }
  });
  const [adviserOnline, setAdviserOnline] = useState<Record<string, boolean>>({
    "adv-1": true,
    "adv-2": true,
    "adv-3": false,
  });

  const [studentRegNo, setStudentRegNo] = useState<string>("2534477263");
  const studentName = "Aisha M. Joseph";

  const channelRef = useRef<BroadcastChannel | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(
    () => advisers.filter((a) => a.programmes.includes(programme)),
    [programme]
  );

  const selectedAdviser = useMemo(
    () => advisers.find((a) => a.id === selectedAdviserId) ?? filtered[0] ?? advisers[0],
    [selectedAdviserId, filtered]
  );

  const visibleMessages = useMemo(() => {
    if (!selectedAdviser) return [];
    return messages
      .filter((m) => m.adviserId === selectedAdviser.id)
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [messages, selectedAdviser]);

  useEffect(() => {
    if (!selectedAdviserId && filtered[0]?.id) setSelectedAdviserId(filtered[0].id);
  }, [filtered, selectedAdviserId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("atc_adviser_chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const channel = new BroadcastChannel("atc_adviser_chat");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const data = event.data as
        | { type: "message"; payload: ChatMessage }
        | { type: "presence"; payload: { adviserId: string; online: boolean } };

      if (data?.type === "message") {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.payload.id)) return prev;
          return [...prev, data.payload];
        });
      }

      if (data?.type === "presence") {
        setAdviserOnline((prev) => ({ ...prev, [data.payload.adviserId]: data.payload.online }));
      }
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setStudentRegNo(sessionStorage.getItem("atc_registration_number") ?? "2534477263");
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleMessages.length]);

  const sendMessage = () => {
    if (!selectedAdviser) return;
    const text = chatInput.trim();
    if (!text) return;

    const outgoing: ChatMessage = {
      id: `m_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      adviserId: selectedAdviser.id,
      sender: "student",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, outgoing]);
    channelRef.current?.postMessage({ type: "message", payload: outgoing });
    setChatInput("");

    const online = adviserOnline[selectedAdviser.id] ?? true;
    if (online) {
      window.setTimeout(() => {
        const reply: ChatMessage = {
          id: `m_${Date.now()}_${Math.random().toString(16).slice(2)}`,
          adviserId: selectedAdviser.id,
          sender: "adviser",
          text: "Received. Please share your Registration Number and the issue details, then I will guide you.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, reply]);
        channelRef.current?.postMessage({ type: "message", payload: reply });
      }, 700);
    }
  };

  const mentionItems = useMemo(() => {
    const items = [
      { key: "details", label: "My details", value: `Name: ${studentName} | Reg No: ${studentRegNo} | Programme: ${programme}` },
      { key: "name", label: "My name", value: studentName },
      { key: "reg", label: "My registration number", value: studentRegNo },
      { key: "programme", label: "My programme", value: programme },
    ];

    const q = mentionQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.key.includes(q));
  }, [mentionQuery, programme, studentName, studentRegNo]);

  const insertMention = (value: string) => {
    const start = mentionStart;
    if (start == null) return;
    const el = inputRef.current;
    const end = el?.selectionStart ?? chatInput.length;
    const before = chatInput.slice(0, start);
    const after = chatInput.slice(end);
    const next = `${before}${value} ${after}`;
    setChatInput(next);
    setMentionOpen(false);
    setMentionQuery("");
    setMentionStart(null);

    window.setTimeout(() => {
      const cursor = (before + value + " ").length;
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(cursor, cursor);
    }, 0);
  };

  return (
    <DashboardShell title="Academic Adviser">
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Student Support</p>
              <h1 className="mt-2 text-xl font-bold text-slate-900">Academic Advisers</h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Find your academic adviser based on your programme and contact them for guidance on registration, timetable issues, results,
                postponement/leave procedures, and general academic support.
              </p>
            </div>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Users2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-2">
          <div className="flex flex-wrap gap-1 p-1">
            <button
              type="button"
              onClick={() => setActiveView("directory")}
              className={
                activeView === "directory"
                  ? "inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
                  : "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }
            >
              <Users2 className="h-4 w-4" />
              Advisers
            </button>
            <button
              type="button"
              onClick={() => setActiveView("chat")}
              className={
                activeView === "chat"
                  ? "inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
                  : "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }
            >
              <MessagesSquare className="h-4 w-4" />
              Live Chat
            </button>
          </div>
        </div>

        {activeView === "directory" ? (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Filter</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">Choose your programme</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700">
                    <Filter className="h-4 w-4" />
                  </div>
                  <select
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value as (typeof programmeOptions)[number])}
                    className="h-11 w-full min-w-[200px] rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                  >
                    {programmeOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {filtered.map((adviser) => (
                <AdviserCard
                  key={adviser.id}
                  adviser={adviser}
                  programme={programme}
                  online={adviserOnline[adviser.id] ?? true}
                  onChat={() => {
                    setSelectedAdviserId(adviser.id);
                    setActiveView("chat");
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Advisers</p>
                <div className="mt-3 grid gap-2">
                  {filtered.map((a) => {
                    const active = selectedAdviser?.id === a.id;
                    const online = adviserOnline[a.id] ?? true;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setSelectedAdviserId(a.id)}
                        className={
                          active
                            ? "w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left"
                            : "w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50"
                        }
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-bold text-slate-900">{a.name}</p>
                          <span className={online ? "text-xs font-bold text-emerald-700" : "text-xs font-bold text-slate-400"}>
                            {online ? "Online" : "Offline"}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{a.department}</p>
                        <p className="mt-1 text-[11px] text-slate-500">Programmes: {a.programmes.join(", ")}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-white">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Live Chat (Demo)</p>
                      <p className="mt-1 truncate text-base font-bold text-slate-900">{selectedAdviser?.name ?? "Select adviser"}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                        <span
                          className={
                            adviserOnline[selectedAdviser?.id ?? ""]
                              ? "inline-flex items-center gap-2 font-semibold text-emerald-700"
                              : "inline-flex items-center gap-2 font-semibold text-slate-400"
                          }
                        >
                          <span
                            className={
                              adviserOnline[selectedAdviser?.id ?? ""]
                                ? "h-2 w-2 rounded-full bg-emerald-500"
                                : "h-2 w-2 rounded-full bg-slate-300"
                            }
                          />
                          {adviserOnline[selectedAdviser?.id ?? ""] ? "Online" : "Offline"}
                        </span>
                        <span className="text-slate-300">/</span>
                        <span className="truncate">{selectedAdviser?.office}</span>
                      </div>
                    </div>

                    {selectedAdviser ? (
                      <button
                        type="button"
                        onClick={() => {
                          const current = adviserOnline[selectedAdviser.id] ?? true;
                          const next = !current;
                          setAdviserOnline((p) => ({ ...p, [selectedAdviser.id]: next }));
                          channelRef.current?.postMessage({
                            type: "presence",
                            payload: { adviserId: selectedAdviser.id, online: next },
                          });
                        }}
                        className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Toggle online
                      </button>
                    ) : null}
                  </div>

                  <div ref={listRef} className="max-h-[52vh] overflow-auto p-4 sm:p-5">
                    {visibleMessages.length === 0 ? (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-900">Start a conversation</p>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                          Send your message and include your Registration Number for faster support.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {visibleMessages.map((m) => (
                          <ChatBubble key={m.id} mine={m.sender === "student"} text={m.text} timestamp={m.timestamp} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <input
                        ref={inputRef}
                        value={chatInput}
                        onChange={(e) => {
                          const next = e.target.value;
                          setChatInput(next);

                          const caret = e.target.selectionStart ?? next.length;
                          const uptoCaret = next.slice(0, caret);
                          const atIndex = uptoCaret.lastIndexOf("@");

                          if (atIndex >= 0) {
                            const afterAt = uptoCaret.slice(atIndex + 1);
                            const invalid = /\s/.test(afterAt);
                            if (!invalid) {
                              setMentionOpen(true);
                              setMentionStart(atIndex);
                              setMentionQuery(afterAt);
                              return;
                            }
                          }

                          setMentionOpen(false);
                          setMentionQuery("");
                          setMentionStart(null);
                        }}
                        onKeyDown={(e) => {
                          if (mentionOpen) {
                            if (e.key === "Escape") {
                              setMentionOpen(false);
                              setMentionQuery("");
                              setMentionStart(null);
                              return;
                            }
                            if (e.key === "Enter") {
                              const first = mentionItems[0];
                              if (first) {
                                e.preventDefault();
                                insertMention(first.value);
                                return;
                              }
                            }
                          }
                          if (e.key === "Enter") sendMessage();
                        }}
                        placeholder="Type your message..."
                        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[color:var(--brand-blue)] focus:ring-4 focus:ring-blue-500/10"
                      />
                      <button
                        type="button"
                        onClick={sendMessage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--brand-blue)] text-white transition hover:opacity-95"
                        aria-label="Send"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>

                    {mentionOpen ? (
                      <div className="relative">
                        <div className="absolute bottom-14 left-0 w-full">
                          <div className="w-full rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-black/10">
                            <p className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                              Insert my details
                            </p>
                            <div className="grid gap-1">
                              {mentionItems.slice(0, 6).map((item) => (
                                <button
                                  key={item.key}
                                  type="button"
                                  onClick={() => insertMention(item.value)}
                                  className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"
                                >
                                  <p className="text-sm font-bold text-slate-900">@{item.key}</p>
                                  <p className="mt-0.5 text-xs text-slate-600">{item.label}</p>
                                </button>
                              ))}
                              {mentionItems.length === 0 ? (
                                <div className="px-3 py-3 text-sm text-slate-600">No matches</div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <p className="mt-2 text-[11px] text-slate-500">
                      Demo mode: messages sync between tabs on the same browser. Real backend can be added later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-blue-900">Tip</p>
          <p className="mt-2 text-sm text-blue-800/90 leading-relaxed">
            If you cannot reach your adviser, contact your Department Office and share your Registration Number and Programme for quicker support.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function AdviserCard({
  adviser,
  programme,
  online,
  onChat,
}: {
  adviser: Adviser;
  programme: string;
  online?: boolean;
  onChat?: () => void;
}) {
  const message = `Hello ${adviser.name}, I am a student from ${programme}. I need academic support.`;
  const whatsappLink = `https://wa.me/${adviser.phone}?text=${encodeURIComponent(message)}`;
  const smsLink = `sms:${adviser.phone}?body=${encodeURIComponent(message)}`;
  const phoneLink = `tel:${adviser.phone}`;
  const emailLink = `mailto:${adviser.email}?subject=${encodeURIComponent(
    `Academic Advising (${programme})`
  )}&body=${encodeURIComponent(message)}`;

  const initials = adviser.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {adviser.photo ? (
            <Image src={adviser.photo} alt={adviser.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-black text-slate-700">{initials}</div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-bold text-slate-900 truncate">{adviser.name}</p>
            <span
              className={
                online
                  ? "inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700"
                  : "inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500"
              }
            >
              <span className={online ? "h-2 w-2 rounded-full bg-emerald-500" : "h-2 w-2 rounded-full bg-slate-300"} />
              {online ? "Online" : "Offline"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{adviser.title}</p>
          <div className="mt-3 grid gap-1 text-xs text-slate-500">
            <p>
              <span className="font-semibold text-slate-700">Department:</span> {adviser.department}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Office:</span> {adviser.office}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Programmes:</span> {adviser.programmes.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {onChat ? (
        <button
          type="button"
          onClick={onChat}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-blue)]"
        >
          <MessagesSquare className="h-4 w-4" />
          Open live chat
        </button>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ContactButton href={phoneLink} label="Call" icon={<Phone className="h-4 w-4" />} />
        <ContactButton href={smsLink} label="SMS" icon={<MessageSquareText className="h-4 w-4" />} />
        <ContactButton href={whatsappLink} label="WhatsApp" icon={<MessageSquareText className="h-4 w-4" />} />
        <ContactButton href={emailLink} label="Email" icon={<Mail className="h-4 w-4" />} />
      </div>
    </div>
  );
}

function ChatBubble({ mine, text, timestamp }: { mine: boolean; text: string; timestamp: number }) {
  const time = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className={mine ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          mine
            ? "max-w-[85%] rounded-3xl rounded-tr-lg bg-[color:var(--brand-blue)] px-4 py-3 text-white"
            : "max-w-[85%] rounded-3xl rounded-tl-lg border border-slate-200 bg-white px-4 py-3 text-slate-900"
        }
      >
        <p className="text-sm leading-relaxed">{text}</p>
        <p className={mine ? "mt-2 text-[10px] text-white/70" : "mt-2 text-[10px] text-slate-500"}>{time}</p>
      </div>
    </div>
  );
}

function ContactButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {icon}
      <span className="truncate">{label}</span>
    </a>
  );
}
