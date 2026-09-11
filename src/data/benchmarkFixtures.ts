import { BenchmarkSummary, SimulatorPolicy } from '../types';

export const BENCHMARK_SUMMARIES: BenchmarkSummary[] = [
  {
    modelName: 'Gemma-3-4B + UserGRPO (Proposed)',
    policy: 'usergrpo_rl',
    totalRollouts: 360,
    decisionAlignmentRate: 65.2, // Paper: 0.652
    firstTurnCriteriaAvg: 5.69,
    sentenceCompletenessPct: 97.5,
    lexicalRedundancyAvg: 0.134,
    formatErrorRate: 0.0,
    earlyExitRate: 0.0,
    persuasionSusceptibilityRate: 14.2,
    categoryBreakdown: {
      checking: { total: 60, alignmentRate: 68.3, criteriaCount: 5.5 },
      savings: { total: 60, alignmentRate: 66.7, criteriaCount: 5.8 },
      mortgage: { total: 60, alignmentRate: 65.4, criteriaCount: 5.6 },
      credit_card: { total: 60, alignmentRate: 64.1, criteriaCount: 5.7 },
      personal_loan: { total: 60, alignmentRate: 60.2, criteriaCount: 5.9 },
      wealth_investment: { total: 60, alignmentRate: 76.5, criteriaCount: 5.6 }
    }
  },
  {
    modelName: 'Gemma-3-4B (SFT Aligned)',
    policy: 'sft_aligned',
    totalRollouts: 360,
    decisionAlignmentRate: 63.6, // Paper: 0.636
    firstTurnCriteriaAvg: 5.69,
    sentenceCompletenessPct: 97.0,
    lexicalRedundancyAvg: 0.118,
    formatErrorRate: 0.5,
    earlyExitRate: 0.0,
    persuasionSusceptibilityRate: 18.6,
    categoryBreakdown: {
      checking: { total: 60, alignmentRate: 65.0, criteriaCount: 5.6 },
      savings: { total: 60, alignmentRate: 63.3, criteriaCount: 5.7 },
      mortgage: { total: 60, alignmentRate: 59.3, criteriaCount: 5.8 },
      credit_card: { total: 60, alignmentRate: 62.0, criteriaCount: 5.5 },
      personal_loan: { total: 60, alignmentRate: 57.8, criteriaCount: 5.9 },
      wealth_investment: { total: 60, alignmentRate: 74.2, criteriaCount: 5.6 }
    }
  },
  {
    modelName: 'Gemma-3-4B (Human Stylistic Steered)',
    policy: 'human_steered',
    totalRollouts: 360,
    decisionAlignmentRate: 24.9, // Paper: 0.249 (halves persona adherence!)
    firstTurnCriteriaAvg: 1.81, // Paper: 1.81 (cuts criteria exposure)
    sentenceCompletenessPct: 83.0, // Paper: 0.83 (more human-like fragments)
    lexicalRedundancyAvg: 0.111, // Paper: 0.111
    formatErrorRate: 4.8,
    earlyExitRate: 6.2,
    persuasionSusceptibilityRate: 58.4,
    categoryBreakdown: {
      checking: { total: 60, alignmentRate: 28.3, criteriaCount: 1.9 },
      savings: { total: 60, alignmentRate: 25.0, criteriaCount: 1.7 },
      mortgage: { total: 60, alignmentRate: 21.6, criteriaCount: 1.8 },
      credit_card: { total: 60, alignmentRate: 23.3, criteriaCount: 1.9 },
      personal_loan: { total: 60, alignmentRate: 22.0, criteriaCount: 1.8 },
      wealth_investment: { total: 60, alignmentRate: 29.3, criteriaCount: 1.8 }
    }
  },
  {
    modelName: 'Gemma-3-4B (Baseline Zero-Shot Prompting)',
    policy: 'baseline_llm',
    totalRollouts: 360,
    decisionAlignmentRate: 41.7, // Paper: 0.417
    firstTurnCriteriaAvg: 5.22, // Paper: 5.22 (overdiscloses)
    sentenceCompletenessPct: 93.0, // Paper: 0.93
    lexicalRedundancyAvg: 0.131,
    formatErrorRate: 2.2,
    earlyExitRate: 1.8,
    persuasionSusceptibilityRate: 44.5,
    categoryBreakdown: {
      checking: { total: 60, alignmentRate: 45.0, criteriaCount: 5.1 },
      savings: { total: 60, alignmentRate: 43.3, criteriaCount: 5.3 },
      mortgage: { total: 60, alignmentRate: 38.3, criteriaCount: 5.4 },
      credit_card: { total: 60, alignmentRate: 41.7, criteriaCount: 5.0 },
      personal_loan: { total: 60, alignmentRate: 36.7, criteriaCount: 5.4 },
      wealth_investment: { total: 60, alignmentRate: 45.0, criteriaCount: 5.1 }
    }
  },
  {
    modelName: 'ChatGPT-5.6 (Closed Source State-of-the-Art)',
    policy: 'baseline_llm',
    totalRollouts: 360,
    decisionAlignmentRate: 73.1, // Paper: 0.731
    firstTurnCriteriaAvg: 2.00,
    sentenceCompletenessPct: 91.5,
    lexicalRedundancyAvg: 0.128,
    formatErrorRate: 0.0,
    earlyExitRate: 0.0,
    persuasionSusceptibilityRate: 22.8,
    categoryBreakdown: {
      checking: { total: 60, alignmentRate: 75.0, criteriaCount: 2.1 },
      savings: { total: 60, alignmentRate: 73.3, criteriaCount: 1.9 },
      mortgage: { total: 60, alignmentRate: 64.7, criteriaCount: 2.2 },
      credit_card: { total: 60, alignmentRate: 74.0, criteriaCount: 2.0 },
      personal_loan: { total: 60, alignmentRate: 71.7, criteriaCount: 2.0 },
      wealth_investment: { total: 60, alignmentRate: 80.0, criteriaCount: 1.8 }
    }
  },
  {
    modelName: 'Claude Opus 4.8 (Closed Source State-of-the-Art)',
    policy: 'baseline_llm',
    totalRollouts: 360,
    decisionAlignmentRate: 72.3, // Paper: 0.723
    firstTurnCriteriaAvg: 4.61, // Paper: overdiscloses +1.62 vs human
    sentenceCompletenessPct: 94.0,
    lexicalRedundancyAvg: 0.125,
    formatErrorRate: 1.2,
    earlyExitRate: 0.0,
    persuasionSusceptibilityRate: 21.5,
    categoryBreakdown: {
      checking: { total: 60, alignmentRate: 77.1, criteriaCount: 4.5 },
      savings: { total: 60, alignmentRate: 74.0, criteriaCount: 4.7 },
      mortgage: { total: 60, alignmentRate: 59.3, criteriaCount: 4.8 },
      credit_card: { total: 60, alignmentRate: 72.5, criteriaCount: 4.4 },
      personal_loan: { total: 60, alignmentRate: 70.0, criteriaCount: 4.6 },
      wealth_investment: { total: 60, alignmentRate: 81.0, criteriaCount: 4.7 }
    }
  }
];

export const HUMAN_BENCHMARK_TARGETS = {
  firstTurnCriteria: 2.99, // Paper: Human shoppers average 2.99
  sentenceCompleteness: 0.37, // Paper: Human shoppers use 37% complete sentences (more fragments)
  lexicalRedundancy: 0.095, // Paper: Humans have highest lexical diversity (lowest redundancy)
  decisionAlignment: 100.0
};
