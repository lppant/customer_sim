'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Sliders
} from 'lucide-react';
import { SEED_PERSONAS } from '@/data/seedPersonas';
import { runSimulationRollout } from '@/lib/simulationEngine';
import { SimulatorPolicy, SimulationTrajectory } from '@/types';

export default function UserGRPOLabPage() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(SEED_PERSONAS[5].id); // Arthur Pendelton (Infeasible edge-case)
  
  // Custom reward weights
  const [wAlign, setWAlign] = useState<number>(0.40);
  const [wReason, setWReason] = useState<number>(0.25);
  const [wNgram, setWNgram] = useState<number>(0.15);
  const [wFormat, setWFormat] = useState<number>(0.10);
  const [wLength, setWLength] = useState<number>(0.10);

  const selectedPersona = SEED_PERSONAS.find(p => p.id === selectedPersonaId) || SEED_PERSONAS[5];

  // Generate 4 side-by-side trajectories for this persona
  const baselineTraj = runSimulationRollout(selectedPersona, 'baseline_llm');
  const steeredTraj = runSimulationRollout(selectedPersona, 'human_steered');
  const sftTraj = runSimulationRollout(selectedPersona, 'sft_aligned');
  const usergrpoTraj = runSimulationRollout(selectedPersona, 'usergrpo_rl');

  const policies: { name: string; policy: SimulatorPolicy; traj: SimulationTrajectory; highlight?: boolean }[] = [
    { name: 'Baseline Zero-Shot LLM', policy: 'baseline_llm', traj: baselineTraj },
    { name: 'Human Stylistic Steered', policy: 'human_steered', traj: steeredTraj },
    { name: 'SFT Supervised Stage', policy: 'sft_aligned', traj: sftTraj },
    { name: 'UserGRPO (Proposed RL)', policy: 'usergrpo_rl', traj: usergrpoTraj, highlight: true },
  ];

  return (
    <div className="editorial-canvas min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059469] font-mono text-xs uppercase tracking-wider mb-2 font-bold border border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-[#059469]" />
              <span>UserGRPO Multi-Objective Trajectory Optimization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#121A15] tracking-tight">
              UserGRPO Alignment & Trajectory Lab
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Visualizing trajectory-level rewards and comparing how reinforcement learning enforces latent constraint adherence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100 text-right">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Trajectory Reward Formula</div>
              <div className="text-xs font-mono font-bold text-[#059469] mt-0.5">
                R_total = {wAlign}·R_align + {wReason}·R_reason + {wNgram}·R_ngram
              </div>
            </div>
          </div>
        </div>

        {/* Trajectory Reward Formulation Overview */}
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Reward Weight Tuner */}
          <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#059469]" />
                <span>Reward Weight Tuner</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-[#059469] rounded-full font-bold border border-emerald-200">
                Σ = {(wAlign + wReason + wNgram + wFormat + wLength).toFixed(2)}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span>R_align (Decision Correctness):</span>
                  <span className="font-bold text-[#059469]">{wAlign.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={wAlign}
                  onChange={(e) => setWAlign(parseFloat(e.target.value))}
                  className="w-full accent-[#059469]"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span>R_reason (LLM Judge Coherence):</span>
                  <span className="font-bold text-emerald-700">{wReason.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  value={wReason}
                  onChange={(e) => setWReason(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span>R_ngram (Linguistic Realism):</span>
                  <span className="font-bold text-amber-600">{wNgram.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.4"
                  step="0.05"
                  value={wNgram}
                  onChange={(e) => setWNgram(parseFloat(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] mb-1">
                  <span>Auxiliary (Format & Length):</span>
                  <span className="font-bold text-gray-500">{(wFormat + wLength).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.3"
                  step="0.05"
                  value={wFormat}
                  onChange={(e) => {
                    setWFormat(parseFloat(e.target.value) / 2);
                    setWLength(parseFloat(e.target.value) / 2);
                  }}
                  className="w-full accent-gray-400"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-medium text-gray-700 mb-1">Test on Scenario Persona</label>
              <select
                value={selectedPersonaId}
                onChange={(e) => setSelectedPersonaId(e.target.value)}
                className="w-full text-xs bg-emerald-50/20 border border-gray-200 rounded-xl px-3 py-2 text-[#121A15] focus:outline-none focus:ring-2 focus:ring-[#059469]"
              >
                {SEED_PERSONAS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.targetCategory}) {p.isInfeasible ? '⚠️ (Infeasible Edge Case)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Policy Trajectory Comparison Cards */}
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
            {policies.map((item) => {
              const isAligned = item.traj.isDecisionAligned;
              return (
                <div
                  key={item.name}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'bg-white border-[#059469] ring-2 ring-[#059469]/20 shadow-xs'
                      : 'bg-white border-gray-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#121A15]">
                        {item.highlight && <Zap className="w-3.5 h-3.5 text-[#059469]" />}
                        <span>{item.name}</span>
                      </div>
                      <div className="font-mono text-[10px] text-gray-400 mt-0.5">
                        Final Action: {item.traj.finalAction.toUpperCase()}
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      isAligned
                        ? 'bg-emerald-50 text-[#059469] border border-emerald-200'
                        : 'bg-red-100 text-red-900 border border-red-200'
                    }`}>
                      {isAligned ? 'ALIGNED' : 'MISALIGNED'}
                    </span>
                  </div>

                  {/* Score Breakdown */}
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500 font-mono text-[10px]">R_align (Correctness)</span>
                      <span className="font-bold text-[#121A15]">{item.traj.rewards.rAlign.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500 font-mono text-[10px]">R_reason (Coherence)</span>
                      <span className="font-bold text-[#121A15]">{item.traj.rewards.rReason.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500 font-mono text-[10px]">R_ngram (Realism)</span>
                      <span className="font-bold text-[#121A15]">{item.traj.rewards.rNgram.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 pt-2 border-t border-gray-100 font-bold">
                      <span className="text-[#121A15] font-mono text-[11px]">Weighted Total:</span>
                      <span className={`font-mono text-sm ${item.highlight ? 'text-[#059469]' : 'text-[#121A15]'}`}>
                        {item.traj.rewards.totalWeightedReward.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* Turn 6 Snippet */}
                  <div className="mt-4 p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-700 space-y-1">
                    <div className="font-mono text-[9px] uppercase text-gray-400 font-semibold">Turn 6 (Closing Decision)</div>
                    <p className="italic leading-snug">
                      &quot;{item.traj.turns[item.traj.turns.length - 1]?.utterance}&quot;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Deep Transcript Comparison */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <h3 className="font-bold text-base text-[#121A15]">
              Full Multi-Turn Transcript Comparison ({selectedPersona.name})
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Observing how UserGRPO correctly identifies dealbreakers while Baseline LLM drifts under companion suggestions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-xs">
            {/* Baseline Transcript */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-[#121A15]">Baseline LLM (Zero-Shot)</span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 bg-red-100 text-red-900 rounded-full font-bold border border-red-200">
                  {baselineTraj.isDecisionAligned ? 'Aligned' : 'Recommendation Drift'}
                </span>
              </div>
              <div className="space-y-3">
                {baselineTraj.turns.map((t) => (
                  <div key={t.turnIndex} className="space-y-1">
                    <div className="font-mono text-[10px] text-gray-400">
                      Turn {t.turnIndex} · {t.speaker === 'advisor' || t.speaker === 'companion' ? 'BANKING COMPANION' : 'CUSTOMER'}
                    </div>
                    <div className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                      t.speaker === 'advisor' || t.speaker === 'companion' ? 'bg-[#F9FAF9] text-[#121A15] border border-gray-200' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {t.utterance}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UserGRPO Transcript */}
            <div className="p-6 space-y-4 bg-emerald-50/20">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <span className="font-bold text-[#059469] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#059469]" />
                  <span>UserGRPO (Proposed RL Recipe)</span>
                </span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 bg-emerald-50 text-[#059469] rounded-full font-bold border border-emerald-200">
                  {usergrpoTraj.isDecisionAligned ? 'Aligned (Passed)' : 'Misaligned'}
                </span>
              </div>
              <div className="space-y-3">
                {usergrpoTraj.turns.map((t) => (
                  <div key={t.turnIndex} className="space-y-1">
                    <div className="font-mono text-[10px] text-gray-400">
                      Turn {t.turnIndex} · {t.speaker === 'advisor' || t.speaker === 'companion' ? 'BANKING COMPANION' : 'CUSTOMER'}
                    </div>
                    <div className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                      t.speaker === 'advisor' || t.speaker === 'companion' ? 'bg-white text-[#121A15] border border-gray-200' : 'bg-[#121A15] text-white'
                    }`}>
                      {t.utterance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
