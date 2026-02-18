"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import DashboardShell from "@/components/DashboardShell";
import { CheckCircle2, Trophy, Users, Vote, BarChart3, Clock, AlertCircle } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  position: string;
  image?: string;
  votes: number;
  vision: string;
};

const initialCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "John Doe",
    position: "SOTECO President",
    votes: 450,
    vision: "Modernizing student services and improving academic transparency.",
  },
  {
    id: "cand-2",
    name: "Sarah Smith",
    position: "SOTECO President",
    votes: 482,
    vision: "Enhancing student welfare and sports activities across all departments.",
  },
  {
    id: "cand-3",
    name: "Michael Juma",
    position: "Vice President",
    votes: 320,
    vision: "Bridging the gap between students and administration.",
  },
  {
    id: "cand-4",
    name: "Anna Malecela",
    position: "Vice President",
    votes: 510,
    vision: "Promoting digital literacy and ICT innovation among students.",
  },
];

export default function VotingPage() {
  const [hasVoted, setHasVoted] = useState<Record<string, string>>({}); // position -> candidateId
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [showResults, setShowResults] = useState(false);

  const handleVote = (candidateId: string, position: string) => {
    if (hasVoted[position]) return;

    setHasVoted((prev) => ({ ...prev, [position]: candidateId }));
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      )
    );
  };

  const positions = useMemo(() => Array.from(new Set(candidates.map((c) => c.position))), [candidates]);

  const totalVotes = useMemo(() => candidates.reduce((acc, c) => acc + c.votes, 0), [candidates]);

  return (
    <DashboardShell title="Student Voting">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Vote className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SOTECO Elections 2026</h1>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Clock className="h-3.5 w-3.5" />
                  Ends in 2 days • Real-time Results
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <BarChart3 className="h-4 w-4" />
              {showResults ? "Hide Results" : "Show Live Results"}
            </button>
          </div>
        </div>

        {/* Voting Sections */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {positions.map((pos) => (
              <div key={pos} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">{pos}</h2>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {candidates
                    .filter((c) => c.position === pos)
                    .map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        isVoted={hasVoted[pos] === candidate.id}
                        isDisabled={!!hasVoted[pos]}
                        onVote={() => handleVote(candidate.id, pos)}
                        showResults={showResults}
                        totalPositionVotes={candidates
                          .filter((c) => c.position === pos)
                          .reduce((acc, cur) => acc + cur.votes, 0)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                Voting Rules
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="text-sm text-slate-600 flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold">1</span>
                  You can only vote once per position.
                </li>
                <li className="text-sm text-slate-600 flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold">2</span>
                  Votes are encrypted and anonymous.
                </li>
                <li className="text-sm text-slate-600 flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold">3</span>
                  Results shown are updated in real-time.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-200">
              <Trophy className="h-8 w-8 opacity-50" />
              <h3 className="mt-4 text-lg font-bold">Current Statistics</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-blue-100 uppercase font-bold tracking-widest">Total Voters</p>
                  <p className="text-2xl font-black mt-1">1,240</p>
                </div>
                <div>
                  <p className="text-xs text-blue-100 uppercase font-bold tracking-widest">Participation</p>
                  <p className="text-2xl font-black mt-1">84%</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-blue-100 italic">"Your vote is your voice. Shape the future of ATC."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function CandidateCard({
  candidate,
  isVoted,
  isDisabled,
  onVote,
  showResults,
  totalPositionVotes,
}: {
  candidate: Candidate;
  isVoted: boolean;
  isDisabled: boolean;
  onVote: () => void;
  showResults: boolean;
  totalPositionVotes: number;
}) {
  const percentage = totalPositionVotes > 0 
    ? Math.round((candidate.votes / totalPositionVotes) * 100) 
    : 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
        isVoted 
          ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-50" 
          : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-black/[.03]"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
            <div className="flex h-full w-full items-center justify-center text-xl font-black text-slate-400 uppercase">
              {candidate.name.split(" ").map(n => n[0]).join("")}
            </div>
          </div>
          {isVoted && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-black text-slate-900">{candidate.name}</h3>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">{candidate.position}</p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
            "{candidate.vision}"
          </p>
        </div>

        {showResults && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 uppercase tracking-widest">Votes: {candidate.votes}</span>
              <span className="text-blue-600">{percentage}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={onVote}
          disabled={isDisabled}
          className={`mt-6 w-full rounded-2xl py-3 text-sm font-black transition-all duration-200 ${
            isVoted
              ? "bg-blue-600 text-white"
              : isDisabled
              ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
              : "bg-slate-900 text-white hover:bg-blue-600 active:scale-[0.98]"
          }`}
        >
          {isVoted ? "Voted ✅" : "Vote Now"}
        </button>
      </div>
    </div>
  );
}
