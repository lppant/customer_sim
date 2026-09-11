export type ProductCategory = 
  | 'checking' 
  | 'savings' 
  | 'mortgage' 
  | 'credit_card' 
  | 'personal_loan' 
  | 'wealth_investment';

export interface BankingProduct {
  id: string;
  name: string;
  bankName: string;
  category: ProductCategory;
  categoryLabel: string;
  headline: string;
  apyOrApr: string; // e.g. "5.15% APY" or "14.99% - 24.99% APR"
  rateType: 'APY' | 'APR' | 'Fixed Rate' | 'Expense Ratio';
  annualFee: number;
  minDeposit: number;
  minCreditScore: number;
  branchAccess: boolean;
  mobileRating: number; // 1-5
  esgCertified: boolean;
  perks: string[];
  dealbreakersCovered: string[];
  keyTerms: {
    monthlyMaintenanceFee: number;
    earlyWithdrawalPenalty?: string;
    overdraftFee?: number;
    introOffer?: string;
    cashbackCategories?: string[];
    termMonths?: number;
    maxLTV?: number; // for mortgages
  };
  description: string;
}

export interface PersonaProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  creditTier: 'Poor (<580)' | 'Fair (580-669)' | 'Good (670-739)' | 'Very Good (740-799)' | 'Exceptional (800+)';
  creditScore: number;
  annualIncome: number;
  liquidSavings: number;
  currentDebt: number;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  lifeStage: 'College Student' | 'Young Professional' | 'First-Time Homebuyer' | 'Growing Family' | 'Pre-Retiree' | 'Retiree' | 'Small Business Owner';
  targetCategory: ProductCategory;
  
  // Explicit desires revealed to the companion
  explicitPreferences: string[];
  
  // Latent constraints & dealbreakers (critical for Decision Alignment evaluation)
  latentDealbreakers: {
    rule: string;
    field: keyof BankingProduct | string;
    operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'not_contains';
    value: any;
    explanation: string;
  }[];
  
  // True acceptable products in catalog according to latent dealbreakers
  acceptableProductIds: string[];
  isInfeasible: boolean; // True if NO products in catalog satisfy the persona's dealbreakers
  
  bio: string;
  speechStyle: 'casual_terse' | 'formal_complete' | 'anxious_cautious' | 'demanding_analytical';
}

export type SimulatorPolicy = 'baseline_llm' | 'human_steered' | 'sft_aligned' | 'usergrpo_rl';

export interface DialogTurn {
  turnIndex: number;
  speaker: 'customer' | 'advisor' | 'companion' | 'system';
  utterance: string;
  timestamp: string;
  
  // Reasoning trace & inner monologue (CustomerSim agentic simulation)
  innerMonologue?: {
    intent: string;
    evaluatedProducts?: { productId: string; score: number; satisfiesDealbreakers: boolean; notes: string }[];
    dealbreakerTriggered?: string | null;
    persuasionResistanceScore?: number; // 0.0 to 1.0
    actionDecision: string;
  };
  
  // Tool executions
  toolCall?: {
    toolName: string;
    arguments: Record<string, any>;
    result: any;
  };
  
  // Terminal action if ended
  terminalAction?: 'apply_product' | 'open_account' | 'decline_and_exit' | 'escalate_to_human' | null;
  selectedProductId?: string | null;
}

export interface SimulationTrajectory {
  id: string;
  personaId: string;
  persona: PersonaProfile;
  policy: SimulatorPolicy;
  turns: DialogTurn[];
  status: 'in_progress' | 'completed' | 'abandoned';
  finalAction: 'applied' | 'opened' | 'declined' | 'early_exit' | 'timeout';
  selectedProductId?: string | null;
  
  // Ground truth evaluation
  isDecisionAligned: boolean;
  decisionAlignmentType: 'correct_acceptance' | 'correct_rejection' | 'false_acceptance' | 'false_rejection' | 'early_exit_error';
  
  // Conversational metrics for this trajectory
  firstTurnCriteriaCount: number;
  sentenceCompletenessScore: number;
  lexicalRedundancyScore: number;
  toolFormatErrorCount: number;
  isEarlyExit: boolean;
  
  // UserGRPO Trajectory Rewards
  rewards: {
    rAlign: number; // 0 or 1
    rReason: number; // 0.0 - 1.0 (LLM Judge Persona Coherence)
    rNgram: number; // 0.0 - 1.0 (Linguistic Realism vs Robot)
    rFormat: number; // 0.0 - 1.0
    rLength: number; // 0.0 - 1.0
    totalWeightedReward: number; // 0.0 - 1.0
  };
}

export interface BenchmarkSummary {
  modelName: string;
  policy: SimulatorPolicy;
  totalRollouts: number;
  decisionAlignmentRate: number; // DA (0 - 100%)
  firstTurnCriteriaAvg: number; // Crit.
  sentenceCompletenessPct: number; // %Cpl.
  lexicalRedundancyAvg: number; // Red.
  formatErrorRate: number; // Fmt. %
  earlyExitRate: number; // End. %
  persuasionSusceptibilityRate: number; // % times persuaded into bad product
  categoryBreakdown: Record<ProductCategory, {
    total: number;
    alignmentRate: number;
    criteriaCount: number;
  }>;
}
