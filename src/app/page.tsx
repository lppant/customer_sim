'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  ArrowRight,
  CheckCircle2,
  Layers,
  Users,
  Zap,
  BarChart3,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { BENCHMARK_SUMMARIES } from '@/data/benchmarkFixtures';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'decision_alignment' | 'conversational_fidelity' | 'usergrpo_rl'>('decision_alignment');

  return (
    <div className="editorial-canvas min-h-screen space-y-16 pb-24">
      {/* Hero Header Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6">

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#121A15] leading-[1.08]">
                Multimodal Customer Simulation for{' '}
                <span className="text-[#059469] inline-block underline decoration-emerald-300 underline-offset-8">
                  Banking Products.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Benchmarking and aligning LLMs as realistic, persona-driven customer simulators interacting with proactive <strong>Banking Companions</strong>. Featuring <strong>UserGRPO</strong> trajectory reinforcement learning.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/arena"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#059469] text-white text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#047857] active:scale-[0.98] transition-all font-mono"
                >
                  <Bot className="w-4 h-4" />
                  <span>Launch Simulation Arena</span>
                </Link>
                <Link
                  href="/benchmark"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#121A15] text-xs font-semibold uppercase tracking-wider border border-gray-200 hover:bg-gray-50 transition-all font-mono"
                >
                  <BarChart3 className="w-4 h-4 text-[#059469]" />
                  <span>Benchmark Matrix</span>
                </Link>
                <a
                  href="https://arxiv.org/html/2605.08334v2"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  <span>Read Related Paper (arXiv)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Research Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 max-w-xl">
                <div>
                  <div className="font-mono text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Alignment Gain</div>
                  <div className="text-2xl font-bold text-[#059469] mt-0.5">+23.5%</div>
                  <div className="text-[11px] text-gray-500">UserGRPO vs Baseline</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Catalog Schema</div>
                  <div className="text-2xl font-bold text-[#121A15] mt-0.5">18 Products</div>
                  <div className="text-[11px] text-gray-500">Across 6 verticals</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Personas</div>
                  <div className="text-2xl font-bold text-[#121A15] mt-0.5">300+ Profiles</div>
                  <div className="text-[11px] text-gray-500">Latent dealbreakers</div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Simulation Window Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Window Title Bar */}
                <div className="bg-[#121A15] text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="ml-2 text-gray-300 font-semibold text-[11px]">companion_trajectory.py</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    UserGRPO Policy
                  </span>
                </div>

                {/* Dialog Preview */}
                <div className="p-4 space-y-3 bg-[#F9FAF9] text-xs">
                  {/* Companion Turn */}
                  <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#059469] font-bold">
                      <span>TURN 3 · BANKING COMPANION</span>
                      <span>lookup_product_items()</span>
                    </div>
                    <p className="text-gray-800 text-[11px]">
                      "Based on your savings goals, here is our Titan High-Yield Savings (5.15% APY) with zero fees. Would you like to set this up together?"
                    </p>
                  </div>

                  {/* Customer Inner Monologue (Latent State) */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1 text-amber-950">
                    <div className="flex justify-between items-center text-[10px] font-mono text-amber-800 font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        LATENT REASONING TRACE
                      </span>
                      <span>Resist: 95%</span>
                    </div>
                    <p className="text-[11px] font-mono text-amber-900">
                      ✓ APY (5.15% &gt;= 4.50%) · ✓ $0 Fee · ⚠️ Verify mobile app rating &gt; 4.5
                    </p>
                  </div>

                  {/* Customer Utterance */}
                  <div className="p-3 bg-[#121A15] text-white rounded-xl space-y-1 shadow-2xs">
                    <div className="flex justify-between items-center text-[10px] font-mono opacity-80">
                      <span>TURN 4 · CUSTOMER (MAYA LIN)</span>
                      <span>Action: INQUIRE_DETAILS</span>
                    </div>
                    <p className="text-[11px]">
                      "The 5.15% rate fits my criteria. Can you confirm if your mobile check deposit supports same-day clearance?"
                    </p>
                  </div>

                  {/* Trajectory Evaluation Summary */}
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200 flex justify-between items-center text-[11px] font-mono">
                    <span className="text-gray-500">Decision Alignment:</span>
                    <span className="font-bold text-[#059469] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059469]" />
                      ALIGNED (R_align = 1.0)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-gray-200 text-center">
                  <Link
                    href="/arena"
                    className="text-xs font-semibold text-[#059469] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Run Full Interactive Simulation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          {/* Section Subheader */}
          <div className="px-6 py-4 border-b border-gray-200 bg-[#FAFAF9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#059469] font-bold">
                Benchmark Results
              </div>
              <h2 className="text-xl font-bold text-[#121A15] tracking-tight mt-0.5">
                Model Evaluation & Behavioral Insights
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('decision_alignment')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${activeTab === 'decision_alignment'
                  ? 'bg-[#121A15] text-white font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                1. Alignment Rates
              </button>
              <button
                onClick={() => setActiveTab('conversational_fidelity')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${activeTab === 'conversational_fidelity'
                  ? 'bg-[#121A15] text-white font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                2. Conversational Fidelity
              </button>
              <button
                onClick={() => setActiveTab('usergrpo_rl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${activeTab === 'usergrpo_rl'
                  ? 'bg-[#059469] text-white font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                3. UserGRPO Recipe
              </button>
            </div>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            {activeTab === 'decision_alignment' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                    Paper Section 4.2 · Decision Alignment
                  </span>
                  <h3 className="text-2xl font-bold text-[#121A15] tracking-tight">
                    Standard Models Drift Under Suggestion Bias
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Even advanced models like ChatGPT-5.6 (73.1%) and Claude Opus 4.8 (72.3%) drift from latent persona specifications when banking companions recommend products with hidden fees. Open-source backbones (Gemma-3-4B) achieve only 41.7% zero-shot alignment.
                  </p>
                  <dl className="space-y-2.5 border-t border-gray-100 pt-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <dt className="text-gray-500 font-mono text-[11px]">ChatGPT-5.6 (Closed SOTA)</dt>
                      <dd className="font-mono font-bold text-[#121A15]">73.1%</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <dt className="text-gray-500 font-mono text-[11px]">Claude Opus 4.8 (Closed SOTA)</dt>
                      <dd className="font-mono font-bold text-[#121A15]">72.3%</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <dt className="text-gray-500 font-mono text-[11px]">Gemma-3-4B Base (Open Source)</dt>
                      <dd className="font-mono font-bold text-red-600">41.7%</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <dt className="text-gray-500 font-mono text-[11px]">Gemma-3 + UserGRPO (Proposed RL)</dt>
                      <dd className="font-mono font-bold text-[#059469]">65.2% (+23.5 pts)</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-6 bg-[#FAFAF9] rounded-xl border border-gray-200 space-y-4">
                  <div className="font-mono text-xs uppercase text-gray-700 font-bold">Decision Alignment Score (DA%)</div>
                  <div className="space-y-3">
                    {BENCHMARK_SUMMARIES.slice(0, 4).map((b) => (
                      <div key={b.modelName} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#121A15]">{b.modelName}</span>
                          <span className="font-mono font-bold">{b.decisionAlignmentRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${b.policy === 'usergrpo_rl'
                              ? 'bg-[#059469]'
                              : b.policy === 'human_steered'
                                ? 'bg-amber-500'
                                : 'bg-[#121A15]'
                              }`}
                            style={{ width: `${b.decisionAlignmentRate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'conversational_fidelity' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase text-[#059469] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Paper Section 4.4 · Linguistic Quality
                  </span>
                  <h3 className="text-2xl font-bold text-[#121A15] tracking-tight">
                    The Prompt Steering Trade-Off
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Stylistic prompt steering makes models sound more human-like (reducing criteria dumps from 5.22 to 1.81), but <strong>damages decision alignment severely</strong> (halving it to 24.9%). Trajectory-level RL avoids this trade-off.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#FAFAF9] rounded-xl border border-gray-200">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">First-Turn Criteria Dump</div>
                      <div className="text-xl font-bold text-[#121A15] mt-1">2.99 <span className="text-xs font-normal text-gray-400">Human</span></div>
                      <div className="text-[10px] text-red-600 mt-0.5">Models average &gt;5.2</div>
                    </div>
                    <div className="p-3 bg-[#FAFAF9] rounded-xl border border-gray-200">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Sentence Completeness</div>
                      <div className="text-xl font-bold text-[#121A15] mt-1">37% <span className="text-xs font-normal text-gray-400">Human</span></div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Models average &gt;93%</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#FAFAF9] rounded-xl border border-gray-200 space-y-3 text-xs">
                  <div className="font-mono text-xs uppercase text-gray-700 font-bold">Steering vs RL Comparison</div>
                  <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
                    <div className="font-bold text-[#121A15]">1. Baseline Gemma-3 (Zero-Shot)</div>
                    <div className="font-mono text-gray-600 text-[11px]">41.7% DA · 5.22 Criteria Dump · 93.0% Completeness</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                    <div className="font-bold text-amber-900">2. Stylistic Human Steering (Prompting)</div>
                    <div className="font-mono text-amber-800 text-[11px]">24.9% DA (Degrades by 16.8 pts) · 1.81 Criteria Dump</div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                    <div className="font-bold text-[#059469]">3. UserGRPO (Trajectory RL)</div>
                    <div className="font-mono text-[#0D5C3A] text-[11px]">65.2% DA (+23.5 pts) · Fluent & Consistent</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usergrpo_rl' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] uppercase text-[#059469] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Paper Section 3 · Reward Formulation
                  </span>
                  <h3 className="text-2xl font-bold text-[#121A15] tracking-tight">
                    Trajectory-Level Multi-Objective Optimization
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    UserGRPO evaluates the complete conversation trajectory tau instead of isolated individual turns, ensuring rewards reflect full decision history and latent constraint adherence.
                  </p>
                  <div className="p-3 bg-[#121A15] text-emerald-300 font-mono text-xs rounded-xl overflow-x-auto">
                    R_total = 0.40·R_align + 0.25·R_reason + 0.15·R_ngram + 0.10·R_fmt + 0.10·R_len
                  </div>
                </div>

                <div className="p-6 bg-[#FAFAF9] rounded-xl border border-gray-200 space-y-3 text-xs">
                  <div className="font-mono text-xs uppercase text-gray-700 font-bold mb-2">Reward Components Breakdown</div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-emerald-100 text-[#059469] flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                      <div><strong className="text-[#121A15]">R_align (0 or 1):</strong> Verifiable mathematical check against persona dealbreakers.</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-emerald-100 text-[#059469] flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                      <div><strong className="text-[#121A15]">R_reason (0.0 - 1.0):</strong> LLM judge scoring reasoning trace coherence.</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded bg-emerald-100 text-[#059469] flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                      <div><strong className="text-[#121A15]">R_ngram (0.0 - 1.0):</strong> Classifier penalizing rigid bot-like repetitive phrasings.</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <Link href="/usergrpo" className="text-xs font-semibold text-[#059469] hover:underline inline-flex items-center gap-1">
                      <span>Open UserGRPO Trajectory Lab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Feature Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/arena"
            className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#059469] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059469] flex items-center justify-center font-bold group-hover:bg-[#059469] group-hover:text-white transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#121A15] group-hover:text-[#059469] transition-colors">
                Live Simulation Arena
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Step-by-step or auto-play customer simulator dialogs. Inspect real-time reasoning traces and test persuasion drift.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#059469]">
              <span>Launch Arena</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/catalog"
            className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#059469] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059469] flex items-center justify-center font-bold group-hover:bg-[#059469] group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#121A15] group-hover:text-[#059469] transition-colors">
                Banking Catalog Registry
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Explore 18 structured banking products across Checking, Savings, Mortgages, Credit Cards, Loans, and Portfolios.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#059469]">
              <span>Explore Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/benchmark"
            className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#059469] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059469] flex items-center justify-center font-bold group-hover:bg-[#059469] group-hover:text-white transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#121A15] group-hover:text-[#059469] transition-colors">
                Batch Benchmark Suite
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Execute batch rollouts and view empirical comparisons across Decision Alignment (DA), Criteria (Crit.), and Formality.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#059469]">
              <span>View Benchmarks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
