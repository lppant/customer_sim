'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Play, 
  RotateCcw, 
  FastForward, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Sparkles, 
  Zap, 
  ArrowRight
} from 'lucide-react';
import { SEED_PERSONAS } from '@/data/seedPersonas';
import { BANKING_CATALOG } from '@/data/bankingCatalog';
import { SimulatorPolicy, DialogTurn, SimulationTrajectory } from '@/types';
import { generateAdvisorTurn, generateCustomerTurn } from '@/lib/simulationEngine';
import { 
  evaluateDecisionAlignment, 
  calculateFirstTurnCriteria, 
  calculateSentenceCompleteness, 
  calculateLexicalRedundancy, 
  computeTrajectoryRewards 
} from '@/lib/metricsEvaluator';

export default function ArenaPage() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(SEED_PERSONAS[0].id);
  const [selectedPolicy, setSelectedPolicy] = useState<SimulatorPolicy>('usergrpo_rl');
  const [turns, setTurns] = useState<DialogTurn[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showMonologue, setShowMonologue] = useState<boolean>(true);
  const [showToolDrawer, setShowToolDrawer] = useState<boolean>(true);
  const [trajectoryResult, setTrajectoryResult] = useState<SimulationTrajectory | null>(null);

  const currentPersona = SEED_PERSONAS.find(p => p.id === selectedPersonaId) || SEED_PERSONAS[0];

  const resetSimulation = () => {
    setIsPlaying(false);
    setTrajectoryResult(null);
    const initialTurn = generateAdvisorTurn(1, currentPersona, []);
    setTurns([initialTurn]);
    setCurrentTurnIndex(1);
  };

  useEffect(() => {
    resetSimulation();
  }, [selectedPersonaId, selectedPolicy]);

  const stepTurn = () => {
    if (currentTurnIndex >= 6) return;

    const nextIndex = currentTurnIndex + 1;
    let nextTurn: DialogTurn;

    if (nextIndex % 2 === 1) {
      nextTurn = generateAdvisorTurn(nextIndex, currentPersona, turns);
    } else {
      nextTurn = generateCustomerTurn(nextIndex, currentPersona, turns, selectedPolicy);
    }

    const updatedTurns = [...turns, nextTurn];
    setTurns(updatedTurns);
    setCurrentTurnIndex(nextIndex);

    if (nextIndex === 6) {
      finalizeTrajectory(updatedTurns, nextTurn);
    }
  };

  const finalizeTrajectory = (allTurns: DialogTurn[], terminalTurn: DialogTurn) => {
    const finalActionType = terminalTurn.terminalAction === 'apply_product' ? 'applied' : 'declined';
    const selectedProdId = terminalTurn.selectedProductId;

    const da = evaluateDecisionAlignment(currentPersona, selectedProdId, finalActionType);
    const crit = calculateFirstTurnCriteria(allTurns.find(t => t.turnIndex === 2)?.utterance || '');
    const cpl = calculateSentenceCompleteness(allTurns);
    const red = calculateLexicalRedundancy(allTurns);
    const rewards = computeTrajectoryRewards(currentPersona, allTurns, da, selectedPolicy);

    const traj: SimulationTrajectory = {
      id: `sim-${Date.now()}`,
      personaId: currentPersona.id,
      persona: currentPersona,
      policy: selectedPolicy,
      turns: allTurns,
      status: 'completed',
      finalAction: finalActionType,
      selectedProductId: selectedProdId,
      isDecisionAligned: da.isAligned,
      decisionAlignmentType: da.alignmentType,
      firstTurnCriteriaCount: crit,
      sentenceCompletenessScore: cpl,
      lexicalRedundancyScore: red,
      toolFormatErrorCount: 0,
      isEarlyExit: false,
      rewards
    };

    setTrajectoryResult(traj);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTurnIndex < 6) {
      interval = setInterval(() => {
        stepTurn();
      }, 1400);
    } else if (currentTurnIndex >= 6) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTurnIndex, turns]);

  return (
    <div className="editorial-canvas min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#059469] animate-pulse" />
              <span className="font-mono text-[10px] uppercase font-bold text-[#059469] tracking-widest">
                STAGE 02 // DUAL-AGENT ARENA
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#121A15] tracking-tight">
              Interactive Customer Simulation Arena
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Simulating conversational companion interactions, product guidance, and latent constraint tracking.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentTurnIndex >= 6}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all font-semibold ${
                isPlaying
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : currentTurnIndex >= 6
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-[#059469] text-white hover:bg-[#047857] shadow-2xs active:scale-[0.98]'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? 'Pause Auto-Play' : 'Auto Play'}</span>
            </button>

            <button
              onClick={stepTurn}
              disabled={currentTurnIndex >= 6 || isPlaying}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-[#121A15] text-xs font-mono uppercase tracking-wider hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold border border-emerald-200"
            >
              <FastForward className="w-3.5 h-3.5 text-[#059469]" />
              <span>Step Turn ({currentTurnIndex}/6)</span>
            </button>

            <button
              onClick={resetSimulation}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-mono uppercase tracking-wider hover:bg-gray-50 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setShowMonologue(!showMonologue)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all ${
                showMonologue
                  ? 'border-emerald-300 bg-emerald-50 text-[#059469] font-bold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {showMonologue ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Inner Thoughts</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Persona Configuration (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                  Persona Configuration
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-[#059469] font-bold uppercase border border-emerald-200">
                  {currentPersona.lifeStage}
                </span>
              </div>

              {/* Persona Selector */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Select Financial Persona</label>
                <select
                  value={selectedPersonaId}
                  onChange={(e) => setSelectedPersonaId(e.target.value)}
                  className="w-full text-xs font-medium bg-emerald-50/30 border border-gray-200 rounded-xl px-3 py-2 text-[#121A15] focus:outline-none focus:ring-2 focus:ring-[#059469]"
                >
                  {SEED_PERSONAS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.occupation}) — {p.targetCategory.toUpperCase()} {p.isInfeasible ? '⚠️ [Infeasible]' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Policy Selector Buttons */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Simulator Policy Model</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPolicy('usergrpo_rl')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedPolicy === 'usergrpo_rl'
                        ? 'border-[#059469] bg-emerald-50 text-[#059469] ring-1 ring-[#059469]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#059469]" />
                      UserGRPO RL
                    </div>
                    <div className="text-[10px] text-emerald-700/80 mt-0.5">High Alignment</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPolicy('baseline_llm')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedPolicy === 'baseline_llm'
                        ? 'border-[#121A15] bg-[#121A15] text-white ring-1 ring-[#121A15]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-bold text-xs">Baseline LLM</div>
                    <div className="text-[10px] opacity-75 mt-0.5">Zero-shot drift</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPolicy('human_steered')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedPolicy === 'human_steered'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-bold text-xs">Human Steered</div>
                    <div className="text-[10px] text-amber-700/70 mt-0.5">Prompt Casual</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPolicy('sft_aligned')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedPolicy === 'sft_aligned'
                        ? 'border-emerald-300 bg-emerald-100 text-emerald-950 ring-1 ring-emerald-300'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-bold text-xs">SFT Aligned</div>
                    <div className="text-[10px] text-emerald-800/80 mt-0.5">Supervised Tune</div>
                  </button>
                </div>
              </div>

              {/* Persona Dossier Snapshot */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-gray-500 font-mono text-[10px] uppercase font-semibold">FICO Tier</div>
                    <div className="font-bold text-[#121A15] mt-0.5">{currentPersona.creditScore}</div>
                    <div className="text-[10px] text-gray-600">{currentPersona.creditTier}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-gray-500 font-mono text-[10px] uppercase font-semibold">Income / Debt</div>
                    <div className="font-bold text-[#121A15] mt-0.5">${(currentPersona.annualIncome / 1000).toFixed(0)}k/yr</div>
                    <div className="text-[10px] text-gray-600">Debt: ${currentPersona.currentDebt.toLocaleString()}</div>
                  </div>
                </div>

                {/* Latent Dealbreaker Constraints */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#121A15] flex items-center justify-between">
                    <span>Latent Dealbreakers</span>
                    <span className="font-mono text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-bold">
                      {currentPersona.latentDealbreakers.length} Strict Rules
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {currentPersona.latentDealbreakers.map((d, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-red-50/40 border border-red-100 text-xs text-red-950">
                        <div className="font-semibold text-[11px] flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span>{d.rule}</span>
                        </div>
                        <div className="text-[10px] text-red-800 mt-0.5 leading-snug">{d.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acceptable Set */}
                <div className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs">
                  <div className="text-[#121A15] font-mono text-[10px] uppercase font-bold">
                    Ground Truth Acceptable Options
                  </div>
                  {currentPersona.acceptableProductIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {currentPersona.acceptableProductIds.map(id => {
                        const prod = BANKING_CATALOG.find(p => p.id === id);
                        return (
                          <span key={id} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                            {prod?.name || id}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="font-mono text-[10px] text-amber-800 font-bold mt-1">
                      ⚠️ Infeasible Scenario (Simulator MUST decline and abstain)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Conversation Workspace (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs flex flex-col min-h-[580px]">
              {/* Header Bar */}
              <div className="px-6 py-3.5 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#121A15] text-white flex items-center justify-center font-bold text-[10px]">
                      BC
                    </div>
                    <span className="text-xs font-bold text-[#121A15]">Horizon Banking Companion</span>
                  </div>
                  <span className="text-gray-400 font-mono">WITH</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#059469] text-white flex items-center justify-center font-bold text-[10px]">
                      CS
                    </div>
                    <span className="text-xs font-bold text-[#121A15]">
                      {currentPersona.name} ({selectedPolicy.replace('_', ' ').toUpperCase()})
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-gray-500 font-semibold">
                  TURN {currentTurnIndex} / 6
                </span>
              </div>

              {/* Dialogue Feed */}
              <div className="p-6 space-y-5 flex-1 overflow-y-auto max-h-[600px]">
                {turns.map((t) => {
                  const isAdvisor = t.speaker === 'advisor' || t.speaker === 'companion';
                  return (
                    <div
                      key={t.turnIndex}
                      className={`flex flex-col ${isAdvisor ? 'items-start' : 'items-end'} space-y-2`}
                    >
                      {/* Meta Pill */}
                      <div className="flex items-center gap-2 px-1">
                        <span className="font-mono text-[10px] uppercase text-gray-400">
                          Turn {t.turnIndex} · {t.timestamp}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                          isAdvisor ? 'bg-gray-100 text-gray-800' : 'bg-emerald-50 text-[#059469] border border-emerald-200'
                        }`}>
                          {isAdvisor ? 'Banking Companion' : `Simulator (${selectedPolicy})`}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          isAdvisor
                            ? 'bg-[#F9FAF9] text-[#121A15] border border-gray-200 rounded-tl-xs shadow-2xs'
                            : 'bg-[#121A15] text-white rounded-tr-xs shadow-2xs'
                        }`}
                      >
                        {t.utterance}

                        {/* Advisor Tool Invocation Box */}
                        {isAdvisor && t.toolCall && showToolDrawer && (
                          <div className="mt-3 pt-2.5 border-t border-gray-200 text-[11px] font-mono bg-white p-2.5 rounded-xl border border-gray-200 text-[#121A15]">
                            <div className="flex items-center gap-1.5 font-bold text-[#059469] mb-1">
                              <Terminal className="w-3.5 h-3.5 text-[#059469]" />
                              <span>Tool Invocation: {t.toolCall.toolName}()</span>
                            </div>
                            <pre className="text-[10px] text-gray-600 overflow-x-auto">
                              {JSON.stringify(t.toolCall.arguments, null, 2)}
                            </pre>
                          </div>
                        )}

                        {/* Customer Terminal Action Badge */}
                        {!isAdvisor && t.terminalAction && (
                          <div className="mt-3 pt-2 border-t border-white/20 text-xs font-mono">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              <span>Action: {t.terminalAction.toUpperCase()}</span>
                              {t.selectedProductId && <span>(Product: {t.selectedProductId})</span>}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Inner Monologue / Reasoning Trace */}
                      {!isAdvisor && t.innerMonologue && showMonologue && (
                        <div className="max-w-[85%] bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-amber-900 font-bold border-b border-amber-200 pb-1">
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              <span>CustomerSim Latent Reasoning Trace</span>
                            </div>
                            <span>Persuasion Resistance: {(t.innerMonologue.persuasionResistanceScore! * 100).toFixed(0)}%</span>
                          </div>
                          <div className="text-[11px] text-amber-950 font-mono">
                            <strong>Intent:</strong> {t.innerMonologue.intent}
                          </div>
                          {t.innerMonologue.dealbreakerTriggered && (
                            <div className="text-[11px] text-red-900 font-semibold">
                              ⚠️ <strong>Dealbreaker Flag:</strong> {t.innerMonologue.dealbreakerTriggered}
                            </div>
                          )}
                          {t.innerMonologue.evaluatedProducts && t.innerMonologue.evaluatedProducts.length > 0 && (
                            <div className="text-[10px] text-amber-900">
                              <strong>Evaluated:</strong> {t.innerMonologue.evaluatedProducts.map(p => `${p.productId} (Match: ${p.score})`).join(', ')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {currentTurnIndex < 6 && !isPlaying && (
                  <div className="text-center py-4">
                    <button
                      onClick={stepTurn}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-[#059469] border border-emerald-200 text-xs font-mono uppercase tracking-wider hover:bg-emerald-100 transition-all font-bold"
                    >
                      <span>Step Turn ({currentTurnIndex + 1}/6)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Trajectory Outcome Card */}
              {trajectoryResult && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {trajectoryResult.isDecisionAligned ? (
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#059469] flex items-center justify-center shrink-0 shadow-2xs">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
                          <XCircle className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm text-[#121A15]">
                          Decision Alignment: {trajectoryResult.isDecisionAligned ? 'ALIGNED (Passed)' : 'MISALIGNED (Recommendation Drift)'}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          Classification: {trajectoryResult.decisionAlignmentType.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-right shadow-2xs">
                      <div className="text-[10px] font-mono text-gray-500 uppercase">UserGRPO Reward (R_total)</div>
                      <div className="text-xl font-bold font-mono text-[#059469]">
                        {trajectoryResult.rewards.totalWeightedReward.toFixed(3)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                      <div className="text-gray-500 font-mono text-[10px]">R_align (Correctness)</div>
                      <div className="font-bold text-[#121A15] mt-0.5">{trajectoryResult.rewards.rAlign.toFixed(1)}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                      <div className="text-gray-500 font-mono text-[10px]">R_reason (Coherence)</div>
                      <div className="font-bold text-[#121A15] mt-0.5">{trajectoryResult.rewards.rReason.toFixed(2)}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                      <div className="text-gray-500 font-mono text-[10px]">Criteria Dump (Crit.)</div>
                      <div className="font-bold text-[#121A15] mt-0.5">{trajectoryResult.firstTurnCriteriaCount} items</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                      <div className="text-gray-500 font-mono text-[10px]">Formality (%Cpl.)</div>
                      <div className="font-bold text-[#121A15] mt-0.5">{(trajectoryResult.sentenceCompletenessScore * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
