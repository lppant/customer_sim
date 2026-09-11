'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { SEED_PERSONAS } from '@/data/seedPersonas';
import { BANKING_CATALOG } from '@/data/bankingCatalog';
import { PersonaProfile, ProductCategory } from '@/types';

export default function PersonasPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLifeStage, setSelectedLifeStage] = useState<string>('all');
  const [customPersonas, setCustomPersonas] = useState<PersonaProfile[]>(SEED_PERSONAS);
  const [showCreatorModal, setShowCreatorModal] = useState<boolean>(false);

  // New Persona Form State
  const [newPersonaName, setNewPersonaName] = useState<string>('Alex Thorne');
  const [newAge, setNewAge] = useState<number>(31);
  const [newIncome, setNewIncome] = useState<number>(85000);
  const [newCreditScore, setNewCreditScore] = useState<number>(710);
  const [newCategory, setNewCategory] = useState<ProductCategory>('savings');
  const [newDealbreaker, setNewDealbreaker] = useState<string>('APY must be at least 4.50%');

  const filteredPersonas = customPersonas.filter((p) => {
    if (selectedLifeStage !== 'all' && p.lifeStage !== selectedLifeStage) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchOcc = p.occupation.toLowerCase().includes(q);
      const matchBio = p.bio.toLowerCase().includes(q);
      if (!matchName && !matchOcc && !matchBio) return false;
    }
    return true;
  });

  const handleCreatePersona = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PersonaProfile = {
      id: `custom-${Date.now()}`,
      name: newPersonaName,
      age: newAge,
      occupation: 'Tech Specialist',
      creditTier: newCreditScore > 740 ? 'Very Good (740-799)' : 'Good (670-739)',
      creditScore: newCreditScore,
      annualIncome: newIncome,
      liquidSavings: Math.round(newIncome * 0.35),
      currentDebt: 5000,
      riskTolerance: 'Moderate',
      lifeStage: 'Young Professional',
      targetCategory: newCategory,
      explicitPreferences: [
        `Looking for competitive ${newCategory.replace('_', ' ')} options`,
        'Needs mobile app and low fees'
      ],
      latentDealbreakers: [
        {
          rule: newDealbreaker,
          field: 'apyOrApr',
          operator: 'gte',
          value: 4.5,
          explanation: 'Strict user-defined financial threshold'
        }
      ],
      acceptableProductIds: ['sav-01', 'sav-02'],
      isInfeasible: false,
      bio: `${newPersonaName} is looking for tailored ${newCategory} solutions with strict criteria around ${newDealbreaker}.`,
      speechStyle: 'casual_terse'
    };

    setCustomPersonas([created, ...customPersonas]);
    setShowCreatorModal(false);
  };

  return (
    <div className="editorial-canvas min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059469] font-mono text-xs uppercase tracking-wider mb-2 border border-emerald-200 font-bold">
              <Users className="w-3.5 h-3.5 text-[#059469]" />
              <span>Persona Profiles · Ground-Truth Evaluation Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#121A15] tracking-tight">
              Customer Persona Registry
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Standardized customer profiles with explicit preferences and latent dealbreakers to evaluate decision alignment.
            </p>
          </div>

          <button
            onClick={() => setShowCreatorModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#059469] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#047857] shadow-2xs transition-all font-semibold active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Synthesize Persona</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search personas by name, occupation, or financial needs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-emerald-50/20 border border-gray-200 rounded-xl text-[#121A15] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059469]"
            />
          </div>

          <div className="flex items-center gap-2">
            {['all', 'Young Professional', 'First-Time Homebuyer', 'Retiree'].map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedLifeStage(stage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all ${
                  selectedLifeStage === stage
                    ? 'bg-[#059469] text-white border-[#059469] font-bold shadow-2xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {stage === 'all' ? 'All Personas' : stage}
              </button>
            ))}
          </div>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonas.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all group"
            >
              <div className="space-y-4">
                {/* Persona Top Info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#121A15] group-hover:text-[#059469] transition-colors">
                        {p.name}
                      </h3>
                      {p.isInfeasible && (
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                          Infeasible
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] uppercase text-gray-400 font-semibold">
                      {p.age} yrs · {p.occupation}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#059469] font-bold uppercase border border-emerald-200">
                    {p.targetCategory.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {p.bio}
                </p>

                {/* Financial Snapshot */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-500 font-mono text-[10px] uppercase font-semibold">Income</span>
                    <div className="font-bold text-[#121A15]">${(p.annualIncome / 1000).toFixed(0)}k/yr</div>
                  </div>
                  <div>
                    <span className="text-gray-500 font-mono text-[10px] uppercase font-semibold">Credit Tier</span>
                    <div className="font-bold text-[#121A15]">{p.creditScore} ({p.creditTier.split(' ')[0]})</div>
                  </div>
                </div>

                {/* Latent Dealbreakers */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-gray-500 font-semibold flex items-center justify-between">
                    <span>Latent Dealbreakers</span>
                    <span>{p.latentDealbreakers.length} Rules</span>
                  </div>
                  <div className="space-y-1">
                    {p.latentDealbreakers.map((d, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-red-50/50 border border-red-100 text-xs text-red-900">
                        <div className="font-semibold text-[11px] flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span>{d.rule}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ground Truth Acceptable set */}
                <div className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs">
                  <div className="text-[#121A15] font-mono text-[10px] uppercase font-bold">
                    Acceptable Ground Truth Set
                  </div>
                  {p.acceptableProductIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.acceptableProductIds.map(id => {
                        const prod = BANKING_CATALOG.find(pr => pr.id === id);
                        return (
                          <span key={id} className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                            {prod?.name || id}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-[10px] text-amber-800 font-semibold mt-0.5">
                      ⚠️ Abstention Required (No suitable catalog product)
                    </div>
                  )}
                </div>
              </div>

              {/* Launch in Arena Link */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase">
                  Style: {p.speechStyle.replace('_', ' ')}
                </span>
                <Link
                  href={`/arena`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#059469] hover:underline"
                >
                  <span>Launch in Arena</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Synthesize Persona Modal */}
        {showCreatorModal && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-lg w-full p-6 space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#059469]" />
                  <h3 className="font-bold text-base text-[#121A15]">Synthesize Financial Persona</h3>
                </div>
                <button onClick={() => setShowCreatorModal(false)} className="text-gray-400 hover:text-gray-800">✕</button>
              </div>

              <form onSubmit={handleCreatePersona} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Persona Full Name</label>
                  <input
                    type="text"
                    value={newPersonaName}
                    onChange={(e) => setNewPersonaName(e.target.value)}
                    className="w-full px-3 py-2 bg-emerald-50/20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#059469] focus:outline-none text-[#121A15]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={newAge}
                      onChange={(e) => setNewAge(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-emerald-50/20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#059469] focus:outline-none text-[#121A15]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Credit Score (300-850)</label>
                    <input
                      type="number"
                      value={newCreditScore}
                      onChange={(e) => setNewCreditScore(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-emerald-50/20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#059469] focus:outline-none text-[#121A15]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Annual Income ($)</label>
                  <input
                    type="number"
                    value={newIncome}
                    onChange={(e) => setNewIncome(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-emerald-50/20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#059469] focus:outline-none text-[#121A15]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Target Financial Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-emerald-50/20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#059469] focus:outline-none text-[#121A15]"
                  >
                    <option value="savings">High Yield Savings & CDs</option>
                    <option value="checking">Everyday Accounts</option>
                    <option value="credit_card">Credit Cards</option>
                    <option value="mortgage">Home Loans</option>
                    <option value="personal_loan">Personal & Auto Loans</option>
                    <option value="wealth_investment">Portfolios & Wealth</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">Latent Dealbreaker Constraint</label>
                  <input
                    type="text"
                    value={newDealbreaker}
                    onChange={(e) => setNewDealbreaker(e.target.value)}
                    placeholder="e.g. '0% Annual Fee' or 'Rate under 5%'"
                    className="w-full px-3 py-2 bg-emerald-50/20 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#059469] focus:outline-none text-[#121A15]"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreatorModal(false)}
                    className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#059469] text-white font-mono uppercase tracking-wider font-semibold hover:bg-[#047857] shadow-2xs"
                  >
                    Save Persona
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
