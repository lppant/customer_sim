'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  TrendingUp
} from 'lucide-react';
import { BENCHMARK_SUMMARIES } from '@/data/benchmarkFixtures';
import { SEED_PERSONAS } from '@/data/seedPersonas';
import { BANKING_CATALOG } from '@/data/bankingCatalog';

export default function AnalyticsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleExportData = () => {
    const data = {
      benchmark: BENCHMARK_SUMMARIES,
      personas: SEED_PERSONAS,
      catalog: BANKING_CATALOG,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customersim_banking_benchmark_${Date.now()}.json`;
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="editorial-canvas min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059469] font-mono text-xs uppercase tracking-wider mb-2 font-bold border border-emerald-200">
              <BarChart3 className="w-3.5 h-3.5 text-[#059469]" />
              <span>Behavioral Gap & Recommendation Matrix · Deep Insights</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#121A15] tracking-tight">
              Recommendation Drift & Behavioral Analytics
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Empirical investigation of why language models drift from latent constraints in banking conversations and how UserGRPO restores persona fidelity.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#059469] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#047857] transition-all font-semibold shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Export Benchmark JSON'}</span>
          </button>
        </div>

        {/* Persuasion Drift Breakdown Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-semibold">
                Recommendation Drift
              </span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-3xl font-extrabold text-[#121A15]">58.4%</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Human-steered models drift from their explicit dealbreakers more than half the time when banking companions recommend attractive features that mask latent dealbreakers.
            </p>
            <div className="pt-2 border-t border-red-100 text-[11px] text-red-700 font-mono">
              High risk in automated banking audits
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-700 font-semibold">
                Turn-1 Overdisclosure
              </span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#121A15]">5.69 <span className="text-sm font-normal text-gray-400">vs 2.99</span></div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Standard models dump nearly twice as many criteria in the opening greeting as real human shoppers, leading to unrealistic companion interactions.
            </p>
            <div className="pt-2 border-t border-amber-100 text-[11px] text-amber-800 font-mono">
              Human benchmark target: ~2.99
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-2xs space-y-3 bg-emerald-50/20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#059469] font-bold">
                UserGRPO Defense
              </span>
              <ShieldCheck className="w-4 h-4 text-[#059469]" />
            </div>
            <div className="text-3xl font-extrabold text-[#059469]">+23.5%</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Trajectory-level RL boosts decision alignment to 65.2% on open-source backbones while preserving linguistic fluidity across all financial categories.
            </p>
            <div className="pt-2 border-t border-emerald-200 text-[11px] text-[#059469] font-mono">
              Zero degradation on held-out domains
            </div>
          </div>
        </div>

        {/* Persuasion Vulnerability Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
            <h3 className="font-bold text-base text-[#121A15]">
              Susceptibility by Product Domain & Feature Type
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Where simulated customers are most vulnerable to companion suggestions vs where dealbreakers hold firm.
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  feature: 'Hidden Annual Maintenance Fees ($120+/yr)',
                  vulnerability: 'Very High (62% Drift in Baseline)',
                  mitigation: 'UserGRPO flags fee thresholds in inner monologue trace',
                  status: 'Protected with RL'
                },
                {
                  feature: 'Interest Rate Caps (Refusing Mortgages > 6.0%)',
                  vulnerability: 'High (48% Drift in Baseline)',
                  mitigation: 'RL trajectory reward R_align penalizes non-compliant applications',
                  status: 'Protected with RL'
                },
                {
                  feature: 'Physical Branch Requirement vs Online-Only',
                  vulnerability: 'Moderate (35% Drift in Baseline)',
                  mitigation: 'Explicit rule evaluation in turn-level verification',
                  status: 'Protected with RL'
                },
                {
                  feature: 'Infeasible Products (Demanding 6.5% Guaranteed CD)',
                  vulnerability: 'Critical (55% Fail to Abstain in Baseline)',
                  mitigation: 'Abstention reward triggers correct terminal rejection',
                  status: 'Protected with RL'
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-gray-200 transition-colors">
                  <div>
                    <div className="font-bold text-[#121A15] text-sm">{item.feature}</div>
                    <div className="text-gray-500 mt-0.5">{item.mitigation}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-red-600 block">{item.vulnerability}</span>
                    <span className="font-mono text-[10px] text-[#059469] font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1 inline-block">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
