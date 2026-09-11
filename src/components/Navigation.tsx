'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  Layers, 
  Users, 
  Activity, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  Building2,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const primaryNav = [
    { href: '/', label: 'Overview', icon: Building2 },
    { href: '/arena', label: 'Simulation Arena', icon: Bot, badge: 'Live' },
    { href: '/catalog', label: 'Catalog Registry', icon: Layers, count: '18' },
    { href: '/personas', label: 'Persona Profiles', icon: Users, count: '8' },
  ];

  const evalNav = [
    { href: '/benchmark', label: 'Benchmark Matrix', icon: Activity },
    { href: '/usergrpo', label: 'UserGRPO RL Lab', icon: Zap, highlight: true },
    { href: '/analytics', label: 'Drift & Analytics', icon: BarChart3 },
  ];

  const renderNavLinks = () => (
    <div className="flex flex-col justify-between h-full p-4 space-y-6">
      {/* Brand & Workspace */}
      <div className="space-y-4">
        <Link href="/" className="flex items-center gap-2.5 px-2 py-1 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#059469] to-[#0D5C3A] text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:from-[#047857] group-hover:to-[#064E3B] transition-all">
            CS
          </div>
          <div>
            <div className="font-bold text-[#121A15] tracking-tight text-sm flex items-center gap-1.5">
              CustomerSim
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-50 text-[#059469] border border-emerald-200 font-bold">
                Banking
              </span>
            </div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
              Persona Simulator
            </div>
          </div>
        </Link>

        {/* Quick Launch Arena Button */}
        <Link
          href="/arena"
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#059469] text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-xs hover:bg-[#047857] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span>Launch Arena</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 opacity-80" />
        </Link>

        {/* Navigation Section 1: Core Workspace */}
        <div className="space-y-1">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase text-gray-400 font-bold tracking-widest">
            Workspace
          </div>
          {primaryNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs tracking-tight transition-all font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-[#059469] font-bold shadow-2xs border border-emerald-200/80'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#059469]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-semibold">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Navigation Section 2: Evaluation & Alignment */}
        <div className="space-y-1 pt-2 border-t border-gray-100">
          <div className="px-2 pb-1 font-mono text-[10px] uppercase text-gray-400 font-bold tracking-widest">
            Alignment & Eval
          </div>
          {evalNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs tracking-tight transition-all font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-[#059469] font-bold shadow-2xs border border-emerald-200/80'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#059469]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#059469] text-white font-bold uppercase">
                    RL
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Telemetry & Status Card */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="p-3 bg-[#F9FAF9] rounded-xl border border-gray-200 space-y-2 text-[11px]">
          <div className="flex items-center justify-between font-mono">
            <span className="text-gray-400 text-[10px] uppercase font-semibold">Engine Status</span>
            <span className="flex items-center gap-1 text-[#059469] font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059469] animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="text-[10px] text-gray-700 font-mono">
            Policy: <strong className="text-[#121A15]">UserGRPO</strong> (65.2% DA)
          </div>
        </div>

        <a
          href="https://arxiv.org/html/2605.08334v2"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-2 py-1 text-[11px] text-gray-500 hover:text-gray-900 font-mono transition-colors"
        >
          <span>arXiv:2605.08334</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#059469] text-white flex items-center justify-center font-bold text-xs">
            CS
          </div>
          <span className="font-bold text-sm text-[#121A15]">CustomerSim Banking</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-xs flex">
          <div className="w-64 bg-white h-full shadow-2xl border-r border-gray-200">
            {renderNavLinks()}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 bg-white border-r border-gray-200 shrink-0 overflow-y-auto shadow-xs">
        {renderNavLinks()}
      </aside>
    </>
  );
};
