'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Check, 
  Leaf, 
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { BANKING_CATALOG } from '@/data/bankingCatalog';
import { BankingProduct } from '@/types';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [esgFilter, setEsgFilter] = useState<boolean>(false);
  const [zeroFeeFilter, setZeroFeeFilter] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<BankingProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Products', count: BANKING_CATALOG.length },
    { id: 'checking', label: 'Everyday Accounts', count: BANKING_CATALOG.filter(p => p.category === 'checking').length },
    { id: 'savings', label: 'Savings & CDs', count: BANKING_CATALOG.filter(p => p.category === 'savings').length },
    { id: 'mortgage', label: 'Home Loans', count: BANKING_CATALOG.filter(p => p.category === 'mortgage').length },
    { id: 'credit_card', label: 'Credit Cards', count: BANKING_CATALOG.filter(p => p.category === 'credit_card').length },
    { id: 'personal_loan', label: 'Personal & Auto Loans', count: BANKING_CATALOG.filter(p => p.category === 'personal_loan').length },
    { id: 'wealth_investment', label: 'Portfolios & Wealth', count: BANKING_CATALOG.filter(p => p.category === 'wealth_investment').length },
  ];

  const filteredProducts = BANKING_CATALOG.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (esgFilter && !p.esgCertified) return false;
    if (zeroFeeFilter && p.annualFee > 0) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBank = p.bankName.toLowerCase().includes(q);
      const matchPerk = p.perks.some(perk => perk.toLowerCase().includes(q));
      if (!matchName && !matchBank && !matchPerk) return false;
    }
    return true;
  });

  return (
    <div className="editorial-canvas min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059469] font-mono text-xs uppercase tracking-wider mb-2 font-bold border border-emerald-200">
              <Layers className="w-3.5 h-3.5 text-[#059469]" />
              <span>Curated Product Registry · Ground Truth Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#121A15] tracking-tight">
              Retail Banking Catalog
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Structured attribute schemas across 6 financial categories used to evaluate customer simulator decision alignment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100 text-right">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Total Catalog Items</div>
              <div className="text-xl font-bold text-[#059469]">{BANKING_CATALOG.length} Products</div>
            </div>
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-4">
          {/* Category Pill Navigation */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-[#059469] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/20 text-white font-bold' : 'bg-emerald-50 text-[#059469]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name, bank, or perk (e.g. '0% APR', 'cashback', 'solar')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-emerald-50/20 border border-gray-200 rounded-xl text-[#121A15] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#059469]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEsgFilter(!esgFilter)}
                className={`px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border flex items-center gap-1.5 transition-all ${
                  esgFilter
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-950 font-bold'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>ESG Certified</span>
              </button>

              <button
                onClick={() => setZeroFeeFilter(!zeroFeeFilter)}
                className={`px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border flex items-center gap-1.5 transition-all ${
                  zeroFeeFilter
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-950 font-bold'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-gray-600" />
                <span>$0 Annual Fee</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xs transition-all group"
            >
              <div className="space-y-4">
                {/* Card Top Meta */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      {p.bankName}
                    </span>
                    <h3 className="text-base font-bold text-[#121A15] group-hover:text-[#059469] transition-colors mt-0.5">
                      {p.name}
                    </h3>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 text-[#059469] font-mono text-xs font-bold border border-emerald-100">
                    {p.apyOrApr}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {p.headline}
                </p>

                {/* Definition List */}
                <dl className="divide-y divide-gray-100 border-y border-gray-100 py-1 text-xs">
                  <div className="flex justify-between py-1.5">
                    <dt className="text-gray-500 font-mono text-[10px] uppercase">Annual Fee</dt>
                    <dd className="font-semibold text-[#121A15]">{p.annualFee === 0 ? '$0 (Free)' : `$${p.annualFee}/yr`}</dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-gray-500 font-mono text-[10px] uppercase">Min Deposit / Balance</dt>
                    <dd className="font-semibold text-[#121A15]">${p.minDeposit.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-gray-500 font-mono text-[10px] uppercase">Min Credit Tier</dt>
                    <dd className="font-semibold text-[#121A15]">{p.minCreditScore}+ FICO</dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-gray-500 font-mono text-[10px] uppercase">Branch Access</dt>
                    <dd className="font-semibold text-[#121A15]">{p.branchAccess ? 'In-Branch & Online' : 'Digital Only'}</dd>
                  </div>
                </dl>

                {/* Perks List */}
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-gray-400 font-semibold">Key Highlights</div>
                  <ul className="space-y-1">
                    {p.perks.slice(0, 2).map((perk, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#059469] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                {p.esgCertified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                    <Leaf className="w-3 h-3 text-emerald-600" />
                    ESG Clean
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-gray-400">Standard Tier</span>
                )}

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#059469] hover:underline"
                >
                  <span>Inspect Terms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase text-gray-500 tracking-wider">
                    {selectedProduct.bankName} · {selectedProduct.categoryLabel}
                  </span>
                  <h2 className="text-xl font-bold text-[#121A15] mt-0.5">
                    {selectedProduct.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100">
                  <div className="font-mono text-xs uppercase text-[#059469] font-bold">Featured Rate / Yield</div>
                  <div className="text-2xl font-bold text-[#059469] mt-1">{selectedProduct.apyOrApr}</div>
                  {selectedProduct.keyTerms.introOffer && (
                    <div className="text-xs text-gray-700 mt-1 font-medium">
                      Offer: {selectedProduct.keyTerms.introOffer}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-gray-700 font-bold mb-2">All Included Features & Perks</h4>
                  <ul className="space-y-1.5">
                    {selectedProduct.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#059469]" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase text-gray-700 font-bold mb-2">Dealbreaker Tag Map (Ground Truth)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.dealbreakersCovered.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2.5 py-0.5 bg-emerald-50 text-[#059469] rounded-full border border-emerald-200 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#059469] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#047857] shadow-2xs font-semibold"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
