'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Play, 
  Zap
} from 'lucide-react';
import { BENCHMARK_SUMMARIES, HUMAN_BENCHMARK_TARGETS } from '@/data/benchmarkFixtures';
import { SEED_PERSONAS } from '@/data/seedPersonas';
import { runSimulationRollout } from '@/lib/simulationEngine';
import { SimulatorPolicy, SimulationTrajectory } from '@/types';

export default function BenchmarkPage() {
  const [isRunningBatch, setIsRunningBatch] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<number>(0);
  const [completedRollouts, setCompletedRollouts] = useState<SimulationTrajectory[]>([]);

  const handleRunBatch = () => {
    setIsRunningBatch(true);
    setBatchProgress(0);
    setCompletedRollouts([]);

    const policies: SimulatorPolicy[] = ['baseline_llm', 'human_steered', 'sft_aligned', 'usergrpo_rl'];
    const results: SimulationTrajectory[] = [];
    let completed = 0;
    const total = SEED_PERSONAS.length * policies.length;

    const interval = setInterval(() => {
      if (completed >= total) {
        clearInterval(interval);
        setIsRunningBatch(false);
        setBatchProgress(100);
        return;
      }

      const personaIdx = completed % SEED_PERSONAS.length;
      const policyIdx = Math.floor(completed / SEED_PERSONAS.length);
      const persona = SEED_PERSONAS[personaIdx];
      const policy = policies[policyIdx];

      const traj = runSimulationRollout(persona, policy);
      results.push(traj);
      setCompletedRollouts([...results]);

      completed++;
      setBatchProgress(Math.round((completed / total) * 100));
    }, 120);
  };

  return (
    <div className="editorial-canvas min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059469] font-mono text-xs uppercase tracking-wider mb-2 border border-emerald-200 font-bold">
              <Activity className="w-3.5 h-3.5 text-[#059469]" />
              <span>Benchmark & Evaluation Suite · arXiv:2605.08334</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#121A15] tracking-tight">
              Batch Rollout & Decision Alignment Benchmark
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Empirical evaluation across Decision Alignment (DA), First-Turn Criteria Dump (Crit.), Sentence Formality (%Cpl.), and Tool Format Adherence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunBatch}
              disabled={isRunningBatch}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059469] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#047857] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs transition-all font-semibold active:scale-[0.98]"
            >
              <Play className={`w-3.5 h-3.5 ${isRunningBatch ? 'animate-spin' : ''}`} />
              <span>{isRunningBatch ? `Running Rollouts (${batchProgress}%)` : 'Run Live Benchmark (32 Rollouts)'}</span>
            </button>
          </div>
        </div>

        {/* Live Rollout Progress Bar if active */}
        {isRunningBatch && (
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
            <div className="flex justify-between text-xs font-mono uppercase text-[#121A15] font-semibold">
              <span>Simulating Customer-Companion Interactions across 8 Personas × 4 Policies...</span>
              <span className="font-bold text-[#059469]">{batchProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#059469] h-full transition-all duration-150 rounded-full"
                style={{ width: `${batchProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Benchmark Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-[#121A15]">
                Model Comparison: Decision Alignment & Conversational Fidelity
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                CustomerSim Benchmark results across 360 multi-turn retail banking trajectories.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#059469] font-bold border border-emerald-200">
                ★ UserGRPO Target: DA &gt; 65%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/40 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-4 font-semibold">Model / Policy Backbone</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Decision Alignment (DA ↑)</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Turn-1 Crit. Dump (Crit. ↓)</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Sentence Formality (%Cpl. ↓)</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Lexical Redundancy (Red. ↓)</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Format Err (Fmt. ↓)</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Drift Risk (Drift ↓)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Human Ground Truth Target Row */}
                <tr className="bg-emerald-50/30 font-semibold text-[#121A15]">
                  <td className="py-3 px-4 flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#059469]" />
                    <span>Human Shopper Reference</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[#059469] font-bold">100.0%</td>
                  <td className="py-3 px-4 text-center font-mono">{HUMAN_BENCHMARK_TARGETS.firstTurnCriteria}</td>
                  <td className="py-3 px-4 text-center font-mono">{(HUMAN_BENCHMARK_TARGETS.sentenceCompleteness * 100).toFixed(0)}%</td>
                  <td className="py-3 px-4 text-center font-mono">{HUMAN_BENCHMARK_TARGETS.lexicalRedundancy}</td>
                  <td className="py-3 px-4 text-center font-mono">0.0%</td>
                  <td className="py-3 px-4 text-center font-mono">0.0%</td>
                </tr>

                {BENCHMARK_SUMMARIES.map((m) => {
                  const isUserGRPO = m.policy === 'usergrpo_rl';
                  const isHumanSteered = m.policy === 'human_steered';
                  return (
                    <tr
                      key={m.modelName}
                      className={`hover:bg-gray-50/60 transition-colors ${
                        isUserGRPO ? 'bg-emerald-50/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#121A15] flex items-center gap-1.5">
                          {isUserGRPO && <Zap className="w-3.5 h-3.5 text-[#059469]" />}
                          <span>{m.modelName}</span>
                        </div>
                        <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                          {m.totalRollouts} rollouts · {m.policy}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 font-mono font-bold text-sm text-[#121A15]">
                          <span className={isUserGRPO ? 'text-[#059469]' : isHumanSteered ? 'text-amber-600' : ''}>
                            {m.decisionAlignmentRate}%
                          </span>
                        </div>
                        <div className="w-20 mx-auto bg-gray-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full ${
                              isUserGRPO ? 'bg-[#059469]' : isHumanSteered ? 'bg-amber-500' : 'bg-[#121A15]'
                            }`}
                            style={{ width: `${m.decisionAlignmentRate}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                        <span className={m.firstTurnCriteriaAvg > 5.0 ? 'text-red-600 font-semibold' : ''}>
                          {m.firstTurnCriteriaAvg.toFixed(2)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                        {m.sentenceCompletenessPct.toFixed(1)}%
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                        {m.lexicalRedundancyAvg.toFixed(3)}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                        <span className={m.formatErrorRate > 2.0 ? 'text-amber-700 font-semibold' : ''}>
                          {m.formatErrorRate.toFixed(1)}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-gray-700">
                        <span className={m.persuasionSusceptibilityRate > 40 ? 'text-red-600 font-semibold' : ''}>
                          {m.persuasionSusceptibilityRate.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Performance Breakdown Grid */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#059469] font-bold">
              Cross-Category Generalization
            </div>
            <h3 className="text-xl font-bold text-[#121A15] tracking-tight mt-0.5">
              Decision Alignment Across Retail Banking Domains
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Comparing UserGRPO vs SFT vs Baseline across 6 financial categories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'checking', label: 'Everyday Accounts', base: 45.0, sft: 65.0, grpo: 68.3 },
              { id: 'savings', label: 'High-Yield Savings & CDs', base: 43.3, sft: 63.3, grpo: 66.7 },
              { id: 'mortgage', label: 'Home Loans', base: 38.3, sft: 59.3, grpo: 65.4 },
              { id: 'credit_card', label: 'Credit Cards (0% & Rewards)', base: 41.7, sft: 62.0, grpo: 64.1 },
              { id: 'personal_loan', label: 'Personal & Auto Loans', base: 36.7, sft: 57.8, grpo: 60.2 },
              { id: 'wealth_investment', label: 'Wealth Portfolios', base: 45.0, sft: 74.2, grpo: 76.5 },
            ].map((cat) => (
              <div key={cat.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <div className="font-semibold text-xs text-[#121A15]">{cat.label}</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500 font-mono">UserGRPO:</span>
                    <span className="font-bold font-mono text-[#059469]">{cat.grpo}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#059469] h-full rounded-full" style={{ width: `${cat.grpo}%` }} />
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500 font-mono">SFT Baseline:</span>
                    <span className="font-medium font-mono text-gray-700">{cat.sft}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-700 h-full rounded-full" style={{ width: `${cat.sft}%` }} />
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500 font-mono">Zero-Shot Base:</span>
                    <span className="font-medium font-mono text-gray-400">{cat.base}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-400 h-full rounded-full" style={{ width: `${cat.base}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
