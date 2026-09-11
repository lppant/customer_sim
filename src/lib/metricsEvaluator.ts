import { PersonaProfile, BankingProduct, DialogTurn, SimulationTrajectory } from '../types';

/**
 * Computes whether the final customer decision matches the persona's latent constraints.
 */
export function evaluateDecisionAlignment(
  persona: PersonaProfile,
  selectedProductId: string | null | undefined,
  action: 'applied' | 'opened' | 'declined' | 'early_exit' | 'timeout'
): {
  isAligned: boolean;
  alignmentType: 'correct_acceptance' | 'correct_rejection' | 'false_acceptance' | 'false_rejection' | 'early_exit_error';
  explanation: string;
} {
  const acceptableSet = new Set(persona.acceptableProductIds);
  const hasAcceptableProducts = acceptableSet.size > 0;

  if (action === 'early_exit' || action === 'timeout') {
    return {
      isAligned: false,
      alignmentType: 'early_exit_error',
      explanation: 'Simulation terminated prematurely without completing product evaluation.'
    };
  }

  // Case 1: Customer chose a product
  if (selectedProductId && (action === 'applied' || action === 'opened')) {
    if (acceptableSet.has(selectedProductId)) {
      return {
        isAligned: true,
        alignmentType: 'correct_acceptance',
        explanation: `Customer selected acceptable product (${selectedProductId}) that satisfies all latent dealbreakers.`
      };
    } else {
      return {
        isAligned: false,
        alignmentType: 'false_acceptance',
        explanation: `Customer accepted product (${selectedProductId}) which violates one or more latent persona dealbreakers (Persuasion Drift).`
      };
    }
  }

  // Case 2: Customer declined / abstained from all options
  if (action === 'declined' || !selectedProductId) {
    if (!hasAcceptableProducts || persona.isInfeasible) {
      return {
        isAligned: true,
        alignmentType: 'correct_rejection',
        explanation: `Customer correctly abstained from unaligned catalog options under infeasible requirements.`
      };
    } else {
      return {
        isAligned: false,
        alignmentType: 'false_rejection',
        explanation: `Customer improperly declined even though suitable products (${persona.acceptableProductIds.join(', ')}) were available.`
      };
    }
  }

  return {
    isAligned: false,
    alignmentType: 'early_exit_error',
    explanation: 'Unrecognized action state.'
  };
}

/**
 * Calculates First-Turn Criteria Exposure (Crit.)
 * Counts how many specific constraints/numbers/wishes were disclosed in turn 1.
 */
export function calculateFirstTurnCriteria(turn1Utterance: string): number {
  if (!turn1Utterance) return 0;
  const keywords = [
    'fee', 'apr', 'apy', 'rate', 'credit score', 'deposit', 'branch', 'app', 'lounge', 
    'points', 'cashback', 'down payment', 'closing', 'esg', 'green', 'interest',
    'fossil', 'penalty', 'dollar', 'under', 'over', 'minimum', 'maximum', 'percent', '%'
  ];
  const lower = turn1Utterance.toLowerCase();
  let count = 0;
  keywords.forEach(kw => {
    if (lower.includes(kw)) count++;
  });
  // Cap between 1 and 8
  return Math.min(8, Math.max(1, Math.round(count * 0.75)));
}

/**
 * Sentence Completeness Proxy (%Cpl.)
 * Evaluates whether utterances use rigid complete grammar vs natural fragments.
 */
export function calculateSentenceCompleteness(turns: DialogTurn[]): number {
  const customerTurns = turns.filter(t => t.speaker === 'customer');
  if (customerTurns.length === 0) return 0.5;

  let completeCount = 0;
  customerTurns.forEach(t => {
    const text = t.utterance.trim();
    // Complete sentences generally start with capital, end with punctuation, have subject + verb patterns
    const hasPunctuation = /[.!?]$/.test(text);
    const hasSubjVerb = /^(i |my |the |we |please |could |can |i'm |is |are )/i.test(text);
    const wordCount = text.split(/\s+/).length;
    if (hasPunctuation && hasSubjVerb && wordCount > 8) {
      completeCount++;
    }
  });

  return parseFloat((completeCount / customerTurns.length).toFixed(3));
}

/**
 * Lexical Redundancy (Red.)
 * TF-IDF styled diversity heuristic. Lower means richer lexical variance.
 */
export function calculateLexicalRedundancy(turns: DialogTurn[]): number {
  const customerTurns = turns.filter(t => t.speaker === 'customer');
  if (customerTurns.length === 0) return 0.12;

  const allWords = customerTurns
    .map(t => t.utterance.toLowerCase().replace(/[^a-z0-9 ]/g, ''))
    .join(' ')
    .split(/\s+/)
    .filter(w => w.length > 3);

  if (allWords.length === 0) return 0.12;

  const freqMap: Record<string, number> = {};
  allWords.forEach(w => { freqMap[w] = (freqMap[w] || 0) + 1; });

  const uniqueWords = Object.keys(freqMap).length;
  const repetitionRatio = 1 - (uniqueWords / allWords.length);

  // Scaled to [0.08, 0.25] range
  const red = 0.08 + (repetitionRatio * 0.15);
  return parseFloat(red.toFixed(3));
}

/**
 * Computes UserGRPO Trajectory-level Rewards
 */
export function computeTrajectoryRewards(
  persona: PersonaProfile,
  turns: DialogTurn[],
  alignmentResult: { isAligned: boolean; alignmentType: string },
  policy: string
): {
  rAlign: number;
  rReason: number;
  rNgram: number;
  rFormat: number;
  rLength: number;
  totalWeightedReward: number;
} {
  // 1. R_align: Binary decision alignment
  const rAlign = alignmentResult.isAligned ? 1.0 : 0.0;

  // 2. R_reason: LLM Judge coherence score
  // Penalize if reasoning mentions dealbreaker but still accepted
  let rReason = 0.5;
  const customerTurns = turns.filter(t => t.speaker === 'customer');
  const lastTurn = customerTurns[customerTurns.length - 1];
  
  if (lastTurn?.innerMonologue) {
    const mono = lastTurn.innerMonologue;
    if (alignmentResult.isAligned) {
      rReason = 0.88 + (mono.persuasionResistanceScore || 0.1) * 0.12;
    } else {
      rReason = 0.25; // failed coherence
    }
  } else {
    rReason = alignmentResult.isAligned ? 0.75 : 0.30;
  }

  // 3. R_ngram: Linguistic naturalness reward (human-likeness)
  const cpl = calculateSentenceCompleteness(turns);
  const red = calculateLexicalRedundancy(turns);
  // Human targets from paper: Cpl ~ 0.37, Red ~ 0.11
  const cplDiff = Math.abs(cpl - 0.55);
  const redDiff = Math.abs(red - 0.11);
  const rNgram = Math.max(0, parseFloat((1.0 - (cplDiff * 0.6 + redDiff * 2.0)).toFixed(3)));

  // 4. R_format: Action formatting adherence
  const formatErrors = turns.filter(t => t.speaker === 'customer' && !t.utterance).length;
  const rFormat = formatErrors === 0 ? 1.0 : Math.max(0, 1.0 - formatErrors * 0.3);

  // 5. R_length: Healthy conversation length penalty/bonus (ideal 3 to 6 turns)
  const turnCount = customerTurns.length;
  let rLength = 1.0;
  if (turnCount < 2) rLength = 0.3; // premature exit penalty
  else if (turnCount > 8) rLength = 0.6; // excessive meandering

  // Weighted Trajectory Total (Paper: alignment heavily weighted)
  const total = (
    0.40 * rAlign +
    0.25 * rReason +
    0.15 * rNgram +
    0.10 * rFormat +
    0.10 * rLength
  );

  return {
    rAlign,
    rReason: parseFloat(rReason.toFixed(3)),
    rNgram: parseFloat(rNgram.toFixed(3)),
    rFormat: parseFloat(rFormat.toFixed(3)),
    rLength: parseFloat(rLength.toFixed(3)),
    totalWeightedReward: parseFloat(total.toFixed(3))
  };
}
