import { PersonaProfile } from '../types';

export const SEED_PERSONAS: PersonaProfile[] = [
  // ================= 1. YOUNG PROFESSIONAL / HIGH SAVINGS =================
  {
    id: 'per-01',
    name: 'Maya Lin',
    age: 27,
    occupation: 'UX Design Lead',
    creditTier: 'Very Good (740-799)',
    creditScore: 765,
    annualIncome: 115000,
    liquidSavings: 42000,
    currentDebt: 8000,
    riskTolerance: 'Moderate',
    lifeStage: 'Young Professional',
    targetCategory: 'savings',
    explicitPreferences: [
      'Looking for a high interest savings account for emergency fund',
      'Prefers high mobile app rating (>4.5 stars)',
      'Wants $0 monthly maintenance fee'
    ],
    latentDealbreakers: [
      {
        rule: 'APY must be at least 4.50%',
        field: 'apyOrApr',
        operator: 'gte',
        value: 4.50,
        explanation: 'Refuses low interest rates because emergency fund is $40k+'
      },
      {
        rule: 'Annual fee must be $0',
        field: 'annualFee',
        operator: 'eq',
        value: 0,
        explanation: 'Will never pay fees for holding savings'
      },
      {
        rule: 'Mobile rating must be >= 4.5',
        field: 'mobileRating',
        operator: 'gte',
        value: 4.5,
        explanation: '100% digital user who hates buggy bank apps'
      }
    ],
    acceptableProductIds: ['sav-01', 'sav-02'], // Titan High-Yield (5.15%), EcoSave (4.85%)
    isInfeasible: false,
    bio: 'Maya is a 27-year-old UX designer in tech with $42,000 sitting in a big-bank checking account earning 0.01%. She wants maximum interest yield without monthly fees and expects a smooth mobile experience.',
    speechStyle: 'casual_terse'
  },

  // ================= 2. FIRST-TIME HOMEBUYER =================
  {
    id: 'per-02',
    name: 'Marcus Vance',
    age: 32,
    occupation: 'High School Chemistry Teacher',
    creditTier: 'Fair (580-669)',
    creditScore: 645,
    annualIncome: 68000,
    liquidSavings: 18000,
    currentDebt: 12000,
    riskTolerance: 'Conservative',
    lifeStage: 'First-Time Homebuyer',
    targetCategory: 'mortgage',
    explicitPreferences: [
      'Looking to buy first home priced around $320,000',
      'Has limited down payment savings (under $15,000)',
      'Needs closing cost assistance or low down payment mortgage'
    ],
    latentDealbreakers: [
      {
        rule: 'Minimum down payment must be <= 5% (maxLTV >= 95%)',
        field: 'keyTerms.maxLTV',
        operator: 'gte',
        value: 95,
        explanation: 'Only has $15,000 saved, so cannot afford a 10% or 20% down loan'
      },
      {
        rule: 'Must accept credit score of 645 or below',
        field: 'minCreditScore',
        operator: 'lte',
        value: 645,
        explanation: 'Credit score is 645 from student loans'
      }
    ],
    acceptableProductIds: ['mtg-01'], // FirstHome Advantage (3% down, 620 min score)
    isInfeasible: false,
    bio: 'Marcus is a teacher buying his first home with his partner. Because most of their savings went toward rent and student debt, they require a mortgage that allows 3-5% down and gives closing cost credits.',
    speechStyle: 'anxious_cautious'
  },

  // ================= 3. DEBT CONSOLIDATOR =================
  {
    id: 'per-03',
    name: 'Carlos Mendez',
    age: 39,
    occupation: 'Logistics Supervisor',
    creditTier: 'Good (670-739)',
    creditScore: 685,
    annualIncome: 74000,
    liquidSavings: 5000,
    currentDebt: 24000, // Credit card debt at 24% APR
    riskTolerance: 'Conservative',
    lifeStage: 'Growing Family',
    targetCategory: 'credit_card',
    explicitPreferences: [
      'Wants to stop paying 24% interest on credit card balances',
      'Looking for a 0% balance transfer card or low rate option',
      'No annual fee'
    ],
    latentDealbreakers: [
      {
        rule: '0% Intro Balance Transfer period must be at least 15 months',
        field: 'dealbreakersCovered',
        operator: 'contains',
        value: 'zero_intro_apr_15mo',
        explanation: 'Needs at least 15-21 months to pay down $24,000 principal'
      },
      {
        rule: 'Annual fee must be $0',
        field: 'annualFee',
        operator: 'eq',
        value: 0,
        explanation: 'Cannot afford additional recurring fee burdens'
      }
    ],
    acceptableProductIds: ['crd-01', 'crd-04'], // Horizon CashBack (15 mo 0%) & Titan Low-Rate (21 mo 0%)
    isInfeasible: false,
    bio: 'Carlos accumulated $24,000 in credit card debt during home repairs. He is bleeding $480/month in interest alone and is looking for a long 0% APR balance transfer card to pay down the balance aggressively.',
    speechStyle: 'demanding_analytical'
  },

  // ================= 4. ESG & SUSTAINABILITY FOCUSED =================
  {
    id: 'per-04',
    name: 'Elena Rostova',
    age: 29,
    occupation: 'Environmental Policy Analyst',
    creditTier: 'Very Good (740-799)',
    creditScore: 780,
    annualIncome: 92000,
    liquidSavings: 35000,
    currentDebt: 0,
    riskTolerance: 'Moderate',
    lifeStage: 'Young Professional',
    targetCategory: 'checking',
    explicitPreferences: [
      'Wants a day-to-day checking account with good digital tools',
      'Cares deeply about ethical, fossil-fuel-free banking',
      'No monthly fees'
    ],
    latentDealbreakers: [
      {
        rule: 'Bank/Product must be 100% ESG & Fossil-Fuel Free Certified',
        field: 'esgCertified',
        operator: 'eq',
        value: true,
        explanation: 'Under no circumstances will deposits be placed in banks financing oil/gas pipelines'
      },
      {
        rule: 'Monthly maintenance fee must be $0',
        field: 'annualFee',
        operator: 'eq',
        value: 0,
        explanation: 'Prefers modern transparent fee structures'
      }
    ],
    acceptableProductIds: ['chk-01', 'chk-03'], // Apex Free (ESG certified) & NeoGreen Digital Checking
    isInfeasible: false,
    bio: 'Elena works in climate policy and wants her money aligned with her values. She strictly audits banks to ensure deposits do not fund fossil fuel projects.',
    speechStyle: 'formal_complete'
  },

  // ================= 5. COLLEGE STUDENT / REBUILDER (INSUFFICIENT CREDIT) =================
  {
    id: 'per-05',
    name: 'Jordan Rivera',
    age: 20,
    occupation: 'Undergraduate Student & Barista',
    creditTier: 'Poor (<580)',
    creditScore: 540,
    annualIncome: 22000,
    liquidSavings: 800,
    currentDebt: 1500,
    riskTolerance: 'Conservative',
    lifeStage: 'College Student',
    targetCategory: 'credit_card',
    explicitPreferences: [
      'Needs a first credit card to start building credit score',
      'Low income / poor credit history',
      'Wants $0 annual fee'
    ],
    latentDealbreakers: [
      {
        rule: 'Product must accept credit scores <= 540',
        field: 'minCreditScore',
        operator: 'lte',
        value: 540,
        explanation: 'Has thin credit history / missed payments in past'
      },
      {
        rule: 'Annual fee must be $0',
        field: 'annualFee',
        operator: 'eq',
        value: 0,
        explanation: 'Student on tight budget cannot pay an annual membership fee'
      }
    ],
    acceptableProductIds: ['crd-03'], // StepStone Secured Credit Builder (min score 300, $0 fee)
    isInfeasible: false,
    bio: 'Jordan is a 20-year-old student who was previously rejected for conventional credit cards. They need a builder card that reports to credit bureaus without charging high annual predatory fees.',
    speechStyle: 'casual_terse'
  },

  // ================= 6. INFEASIBLE PERSONA (TESTING REJECTION & ABSTENTION) =================
  {
    id: 'per-06',
    name: 'Arthur Pendelton',
    age: 68,
    occupation: 'Retired Aerospace Engineer',
    creditTier: 'Exceptional (800+)',
    creditScore: 820,
    annualIncome: 140000,
    liquidSavings: 350000,
    currentDebt: 0,
    riskTolerance: 'Conservative',
    lifeStage: 'Retiree',
    targetCategory: 'savings',
    explicitPreferences: [
      'Wants a guaranteed CD or fixed deposit',
      'Expects at least 6.50% APY guaranteed for 3 years',
      'Requires in-person branch teller service and physical paper certificates'
    ],
    latentDealbreakers: [
      {
        rule: 'Guaranteed APY must be >= 6.50%',
        field: 'apyOrApr',
        operator: 'gte',
        value: 6.50,
        explanation: 'Refuses any deposit offering less than 6.50% APY'
      },
      {
        rule: 'Must have in-branch teller access',
        field: 'branchAccess',
        operator: 'eq',
        value: true,
        explanation: 'Refuses online-only banks'
      }
    ],
    acceptableProductIds: [], // INFEASIBLE: Catalog top CD is 5.30%, so Arthur MUST decline and abstain.
    isInfeasible: true,
    bio: 'Arthur is an exacting retiree holding $350k. He demands an unrealistic 6.50% APY in a 3-year brick-and-mortar CD. A faithful customer simulator MUST recognize that no catalog product meets this threshold and decline all offers.',
    speechStyle: 'demanding_analytical'
  },

  // ================= 7. FREQUENT TRAVELER / LUXURY SEEKER =================
  {
    id: 'per-07',
    name: 'Dr. Sophia Sterling',
    age: 44,
    occupation: 'Chief of Surgery',
    creditTier: 'Exceptional (800+)',
    creditScore: 815,
    annualIncome: 420000,
    liquidSavings: 180000,
    currentDebt: 0,
    riskTolerance: 'Moderate',
    lifeStage: 'Pre-Retiree',
    targetCategory: 'credit_card',
    explicitPreferences: [
      'Travels internationally 6+ times per year',
      'Wants unlimited VIP airport lounge access and 5x travel points',
      'Willing to pay a premium annual fee if value exceeds $1,000/yr'
    ],
    latentDealbreakers: [
      {
        rule: 'Must include VIP Airport Lounge Access (Priority Pass / Centurion)',
        field: 'dealbreakersCovered',
        operator: 'contains',
        value: 'travel_lounge_access',
        explanation: 'Spends 50+ hours/year in airports and requires lounge access'
      },
      {
        rule: 'Travel point multiplier must be at least 4x on direct airfare',
        field: 'perks',
        operator: 'contains',
        value: '5x Points on Travel booked direct',
        explanation: 'High monthly airline spend requires top-tier rewards'
      }
    ],
    acceptableProductIds: ['crd-02'], // Vanguard Voyager Travel Reserve ($495 fee, Priority Pass, 5x)
    isInfeasible: false,
    bio: 'Sophia is a high-earning surgeon who flies business class globally. She is happy to pay a $495 annual fee in exchange for lounge privileges and premium travel insurance.',
    speechStyle: 'formal_complete'
  },

  // ================= 8. SUSTAINABLE EV CAR BUYER =================
  {
    id: 'per-08',
    name: 'Tariq Al-Mansoor',
    age: 35,
    occupation: 'Software Architect',
    creditTier: 'Very Good (740-799)',
    creditScore: 755,
    annualIncome: 145000,
    liquidSavings: 30000,
    currentDebt: 4000,
    riskTolerance: 'Moderate',
    lifeStage: 'Young Professional',
    targetCategory: 'personal_loan',
    explicitPreferences: [
      'Purchasing a new Electric Vehicle ($48,000)',
      'Looking for specialized EV loan rates below 5.0% APR',
      'Wants 100% digital paperwork and green lender'
    ],
    latentDealbreakers: [
      {
        rule: 'Fixed interest APR must be <= 5.0%',
        field: 'apyOrApr',
        operator: 'lte',
        value: 5.0,
        explanation: 'Will only finance if EV rate is strictly below 5.0%'
      },
      {
        rule: 'Lender must be ESG certified',
        field: 'esgCertified',
        operator: 'eq',
        value: true,
        explanation: 'Purchasing an EV to reduce emissions, insists on ethical lender'
      }
    ],
    acceptableProductIds: ['loan-02'], // Verdant Clean Energy EV Auto Loan (4.75% Fixed APR, ESG)
    isInfeasible: false,
    bio: 'Tariq is an engineer purchasing an EV. He insists on a competitive green auto loan under 5% APR from an ESG-certified digital bank.',
    speechStyle: 'casual_terse'
  }
];
