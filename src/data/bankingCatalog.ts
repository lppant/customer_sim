import { BankingProduct } from '../types';

export const BANKING_CATALOG: BankingProduct[] = [
  // ================= CHECKING ACCOUNTS =================
  {
    id: 'chk-01',
    name: 'Apex Free Checking',
    bankName: 'Horizon Federal Bank',
    category: 'checking',
    categoryLabel: 'Checking Accounts',
    headline: 'Zero monthly fees, fee-free nationwide ATMs, and instant mobile deposits.',
    apyOrApr: '0.15% APY',
    rateType: 'APY',
    annualFee: 0,
    minDeposit: 25,
    minCreditScore: 500,
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['No monthly maintenance fee', '55,000+ Fee-Free Allpoint ATMs', 'Early direct deposit (up to 2 days)', 'Free contactless debit card'],
    dealbreakersCovered: ['no_monthly_fee', 'low_minimum_deposit', 'nationwide_atms', 'esg_certified'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      overdraftFee: 0,
      introOffer: '$100 bonus with $1,000 qualifying direct deposit within 60 days'
    },
    description: 'A modern everyday checking account designed for hassle-free everyday transactions with zero maintenance fees and top-tier mobile banking tools.'
  },
  {
    id: 'chk-02',
    name: 'Premier Yield Checking',
    bankName: 'Metropolitan Trust Bank',
    category: 'checking',
    categoryLabel: 'Checking Accounts',
    headline: 'Earn high interest on checking with full branch service and concierge support.',
    apyOrApr: '3.25% APY',
    rateType: 'APY',
    annualFee: 144, // $12/month
    minDeposit: 1000,
    minCreditScore: 640,
    branchAccess: true,
    mobileRating: 4.3,
    esgCertified: false,
    perks: ['3.25% APY on balances up to $25,000', 'Dedicated branch relationship manager', 'Free cashier checks & wire transfers', 'Fee waived with $5,000 avg balance'],
    dealbreakersCovered: ['high_checking_apy', 'branch_relationship', 'wire_transfer_perks'],
    keyTerms: {
      monthlyMaintenanceFee: 12,
      overdraftFee: 35,
      introOffer: '$250 bonus with $5,000 balance maintained for 90 days'
    },
    description: 'Designed for high-liquidity individuals who want active checking balances to generate substantial interest alongside premium in-branch services.'
  },
  {
    id: 'chk-03',
    name: 'NeoGreen Digital Checking',
    bankName: 'Verdant Digital Bank',
    category: 'checking',
    categoryLabel: 'Checking Accounts',
    headline: '100% fossil-fuel free digital checking with round-up tree planting.',
    apyOrApr: '1.20% APY',
    rateType: 'APY',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 450,
    branchAccess: false,
    mobileRating: 4.9,
    esgCertified: true,
    perks: ['100% Fossil-fuel free lending pledge', 'Round-up debit purchases to plant trees', 'Carbon footprint tracker in-app', 'Zero overdraft fees'],
    dealbreakersCovered: ['esg_certified', 'zero_min_deposit', 'no_branch_needed', 'no_overdraft_fees'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      overdraftFee: 0,
      introOffer: 'Plant 25 trees upon first direct deposit'
    },
    description: 'An exclusively digital sustainable checking account ensuring deposits never fund fossil fuels or deforestation.'
  },
  {
    id: 'chk-04',
    name: 'Traditional Standard Checking',
    bankName: 'Heritage State Bank',
    category: 'checking',
    categoryLabel: 'Checking Accounts',
    headline: 'Classic neighborhood banking with 450 regional branches.',
    apyOrApr: '0.01% APY',
    rateType: 'APY',
    annualFee: 120, // $10/month
    minDeposit: 100,
    minCreditScore: 550,
    branchAccess: true,
    mobileRating: 3.8,
    esgCertified: false,
    perks: ['Physical branches in 14 states', 'Safe deposit box discount', 'In-person notary services', 'Paper checks included'],
    dealbreakersCovered: ['physical_branch_priority', 'in_person_notary'],
    keyTerms: {
      monthlyMaintenanceFee: 10,
      overdraftFee: 36,
      introOffer: 'Free first box of custom checks'
    },
    description: 'Traditional banking with extensive brick-and-mortar coverage for customers who value face-to-face teller support.'
  },

  // ================= SAVINGS & CDs =================
  {
    id: 'sav-01',
    name: 'Titan High-Yield Savings',
    bankName: 'Titan Direct Bank',
    category: 'savings',
    categoryLabel: 'High-Yield Savings & CDs',
    headline: 'Industry-leading 5.15% APY with no minimum balance and daily compound interest.',
    apyOrApr: '5.15% APY',
    rateType: 'APY',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 500,
    branchAccess: false,
    mobileRating: 4.7,
    esgCertified: false,
    perks: ['5.15% APY on all balance tiers', 'Zero monthly fees or minimums', 'Automated recurring transfer tools', 'FDIC insured to $250,000'],
    dealbreakersCovered: ['high_savings_apy_5plus', 'zero_min_deposit', 'no_monthly_fee'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      earlyWithdrawalPenalty: 'None (Liquid savings)',
      overdraftFee: 0,
      introOffer: '$200 bonus on $10,000+ deposits within 30 days'
    },
    description: 'An online high-yield savings vehicle maximizing liquid return with no hidden fees or tier restrictions.'
  },
  {
    id: 'sav-02',
    name: 'EcoSave High-Yield Green Deposit',
    bankName: 'Verdant Digital Bank',
    category: 'savings',
    categoryLabel: 'High-Yield Savings & CDs',
    headline: '4.85% APY where 100% of deposits fund solar & wind green bonds.',
    apyOrApr: '4.85% APY',
    rateType: 'APY',
    annualFee: 0,
    minDeposit: 100,
    minCreditScore: 520,
    branchAccess: false,
    mobileRating: 4.9,
    esgCertified: true,
    perks: ['4.85% APY high yield', 'Certified B-Corp & 100% Clean Energy Lending', 'Quarterly ESG impact reports', 'Sub-savings goal buckets'],
    dealbreakersCovered: ['esg_certified', 'high_savings_apy', 'no_monthly_fee'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      earlyWithdrawalPenalty: 'None',
      introOffer: '$50 clean energy matched grant on first $5,000 deposit'
    },
    description: 'A certified ESG high-yield savings account offering competitive returns while strictly funding renewable energy and community housing projects.'
  },
  {
    id: 'sav-03',
    name: '14-Month Guaranteed High-Growth CD',
    bankName: 'Horizon Federal Bank',
    category: 'savings',
    categoryLabel: 'High-Yield Savings & CDs',
    headline: 'Lock in 5.30% APY guaranteed for 14 months with zero market volatility.',
    apyOrApr: '5.30% APY',
    rateType: 'APY',
    annualFee: 0,
    minDeposit: 1000,
    minCreditScore: 500,
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['Guaranteed 5.30% APY fixed rate', 'FDIC insured up to $250k', 'Interest paid monthly or at maturity', 'Branch and online access'],
    dealbreakersCovered: ['fixed_guaranteed_return', 'branch_access', 'low_risk'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      termMonths: 14,
      earlyWithdrawalPenalty: '90 days of simple interest',
      introOffer: 'Bonus 0.10% rate boost for existing checking members'
    },
    description: 'A certificate of deposit designed for conservative savers looking to lock in high interest ahead of anticipated central bank rate cuts.'
  },
  {
    id: 'sav-04',
    name: 'Heritage Traditional Passbook Savings',
    bankName: 'Heritage State Bank',
    category: 'savings',
    categoryLabel: 'High-Yield Savings & CDs',
    headline: 'Branch-based savings with physical passbook and live teller deposits.',
    apyOrApr: '0.40% APY',
    rateType: 'APY',
    annualFee: 60, // $5/month if <$300
    minDeposit: 300,
    minCreditScore: 500,
    branchAccess: true,
    mobileRating: 3.8,
    esgCertified: false,
    perks: ['Physical passbook tracking', 'Full in-branch teller support', 'Combined statement with checking', 'Waived fee with $300 balance'],
    dealbreakersCovered: ['physical_branch_priority', 'passbook_record'],
    keyTerms: {
      monthlyMaintenanceFee: 5,
      earlyWithdrawalPenalty: 'None',
      overdraftFee: 0
    },
    description: 'Classic in-branch savings for conservative depositors wanting tangible physical passbook records.'
  },

  // ================= MORTGAGES & HOME LOANS =================
  {
    id: 'mtg-01',
    name: 'FirstHome Advantage 30-Year Fixed Mortgage',
    bankName: 'Horizon Federal Bank',
    category: 'mortgage',
    categoryLabel: 'Mortgages & Refinancing',
    headline: 'Low 3% down payment, reduced PMI, and $2,500 first-time buyer closing credit.',
    apyOrApr: '6.125% Fixed Rate',
    rateType: 'Fixed Rate',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 620,
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['As low as 3% down payment for first-time buyers', '$2,500 lender closing cost credit', 'No origination fee', 'Rate-lock protection for 90 days'],
    dealbreakersCovered: ['first_time_homebuyer', 'low_down_payment_3pct', 'closing_cost_credit', 'credit_score_620_plus'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      maxLTV: 97,
      introOffer: '$2,500 lender credit toward closing costs'
    },
    description: 'Designed specifically for first-time homebuyers with accessible credit thresholds and significant upfront closing assistance.'
  },
  {
    id: 'mtg-02',
    name: 'EcoHome Solar Rebate Mortgage (30Y Fixed)',
    bankName: 'Verdant Digital Bank',
    category: 'mortgage',
    categoryLabel: 'Mortgages & Refinancing',
    headline: '0.25% interest discount for Energy Star certified homes and solar installations.',
    apyOrApr: '5.875% Fixed Rate',
    rateType: 'Fixed Rate',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 680,
    branchAccess: false,
    mobileRating: 4.9,
    esgCertified: true,
    perks: ['0.25% discount for green certified properties', 'Free home energy audit included', 'Digital-only fast closing in <21 days', 'Zero lender fees'],
    dealbreakersCovered: ['esg_certified', 'low_interest_mortgage_sub6', 'fast_digital_closing'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      maxLTV: 90,
      introOffer: '$1,000 solar panel installation credit'
    },
    description: 'A specialized green mortgage offering reduced fixed interest rates for energy-efficient homes and solar upgrades.'
  },
  {
    id: 'mtg-03',
    name: 'Jumbo Elite Custom Mortgage',
    bankName: 'Metropolitan Trust Bank',
    category: 'mortgage',
    categoryLabel: 'Mortgages & Refinancing',
    headline: 'Financing up to $3.5M with interest-only options and tailored asset underwriting.',
    apyOrApr: '6.375% Fixed Rate',
    rateType: 'Fixed Rate',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 720,
    branchAccess: true,
    mobileRating: 4.3,
    esgCertified: false,
    perks: ['Loan amounts up to $3,500,000', 'Asset depletion underwriting for high-net-worth', 'Dedicated private loan officer', 'Interest-only 10/1 ARM options available'],
    dealbreakersCovered: ['jumbo_loan_above_750k', 'high_net_worth_underwriting', 'credit_score_720_plus'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      maxLTV: 80,
      introOffer: 'Waived appraisal fee ($950 value)'
    },
    description: 'Customized jumbo financing for luxury real estate and complex wealth portfolios requiring tailored underwriting.'
  },
  {
    id: 'mtg-04',
    name: 'Standard Conventional 15-Year Fast-Payoff Loan',
    bankName: 'Heritage State Bank',
    category: 'mortgage',
    categoryLabel: 'Mortgages & Refinancing',
    headline: 'Aggressive equity building with 5.625% APR and massive lifetime interest savings.',
    apyOrApr: '5.625% Fixed Rate',
    rateType: 'Fixed Rate',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 660,
    branchAccess: true,
    mobileRating: 3.8,
    esgCertified: false,
    perks: ['Pay off home in half the time', 'Lowest conventional fixed interest rate', 'Zero prepayment penalties', 'Local servicing with branch officers'],
    dealbreakersCovered: ['15_year_term', 'lowest_lifetime_interest', 'branch_servicing'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      maxLTV: 85
    },
    description: 'Ideal for refinancing or buyers seeking maximum long-term interest savings with higher monthly amortizations.'
  },

  // ================= CREDIT CARDS =================
  {
    id: 'crd-01',
    name: 'Horizon CashBack Unlimited Mastercard',
    bankName: 'Horizon Federal Bank',
    category: 'credit_card',
    categoryLabel: 'Credit Cards',
    headline: 'Unlimited 2% cash back on everything + 0% intro APR for 15 months.',
    apyOrApr: '0% Intro APR (15 mo), then 17.99% - 26.99%',
    rateType: 'APR',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 670,
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['Unlimited 2% cash back on all purchases (1% at swipe, 1% upon payment)', '0% Intro APR on purchases and balance transfers for 15 months', 'Zero annual fee', '$200 cash signup bonus'],
    dealbreakersCovered: ['no_annual_fee', 'flat_2pct_cashback', 'zero_intro_apr_15mo', 'credit_score_good'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      overdraftFee: 0,
      introOffer: '$200 bonus after spending $1,000 in first 90 days',
      cashbackCategories: ['2% Flat on All Purchases']
    },
    description: 'The premier daily driver credit card offering straightforward 2% cash back without category juggling or annual fees.'
  },
  {
    id: 'crd-02',
    name: 'Vanguard Voyager Travel Reserve Visa Infinite',
    bankName: 'Metropolitan Trust Bank',
    category: 'credit_card',
    categoryLabel: 'Credit Cards',
    headline: '5x points on flights/hotels, priority airport lounge access & $300 travel credit.',
    apyOrApr: '21.49% - 28.49% Variable APR',
    rateType: 'APR',
    annualFee: 495,
    minDeposit: 0,
    minCreditScore: 740,
    branchAccess: true,
    mobileRating: 4.6,
    esgCertified: false,
    perks: ['$300 Annual Travel Credit', 'Priority Pass Select Lounge Access (1,300+ lounges)', '5x Points on Travel booked direct', 'Global Entry / TSA PreCheck $100 credit', 'Premium Travel Insurance'],
    dealbreakersCovered: ['travel_lounge_access', 'premium_travel_points', 'credit_score_very_good'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      introOffer: '75,000 bonus points ($1,125 travel value) after spending $4,000 in first 3 months',
      cashbackCategories: ['5x Travel Direct', '3x Dining Worldwide', '1x Other']
    },
    description: 'A heavy-hitting travel rewards card tailored for frequent international flyers and business travelers.'
  },
  {
    id: 'crd-03',
    name: 'StepStone Secured Credit Builder Visa',
    bankName: 'Horizon Federal Bank',
    category: 'credit_card',
    categoryLabel: 'Credit Cards',
    headline: 'Guaranteed approval, credit score building, zero annual fee, refundable deposit.',
    apyOrApr: '22.99% Variable APR',
    rateType: 'APR',
    annualFee: 0,
    minDeposit: 200, // Refundable security deposit
    minCreditScore: 300, // No credit check / bad credit OK
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['No minimum credit score required / Bad credit accepted', 'Reports to all 3 major credit bureaus monthly', 'Automatic graduation review to unsecured card in 6 months', '1% cash back on all purchases'],
    dealbreakersCovered: ['poor_credit_friendly', 'no_annual_fee', 'credit_rebuilding', 'low_security_deposit'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      introOffer: 'Full deposit refund upon 6 consecutive on-time payments',
      cashbackCategories: ['1% All purchases']
    },
    description: 'Designed for students, recent immigrants, or customers rebuilding credit with guaranteed reporting and zero fee penalty.'
  },
  {
    id: 'crd-04',
    name: 'Titan Low-Rate Balance Transfer Card',
    bankName: 'Titan Direct Bank',
    category: 'credit_card',
    categoryLabel: 'Credit Cards',
    headline: '0% Intro APR on balance transfers for 21 months with low ongoing APR.',
    apyOrApr: '0% Intro APR (21 mo), then 13.99% - 21.99%',
    rateType: 'APR',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 650,
    branchAccess: false,
    mobileRating: 4.7,
    esgCertified: false,
    perks: ['0% Intro APR for 21 months on Balance Transfers', 'Lowest ongoing variable APR in market (from 13.99%)', 'Zero annual fee', 'Free FICO score tracker'],
    dealbreakersCovered: ['long_balance_transfer_20plus', 'debt_consolidation', 'no_annual_fee', 'lowest_ongoing_apr'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      introOffer: '3% balance transfer fee (min $5)'
    },
    description: 'An aggressive debt payoff card giving cardholders nearly two full years of zero interest to eliminate high-interest debt.'
  },

  // ================= PERSONAL & AUTO LOANS =================
  {
    id: 'loan-01',
    name: 'DebtShield Consolidation Loan',
    bankName: 'Horizon Federal Bank',
    category: 'personal_loan',
    categoryLabel: 'Personal & Auto Loans',
    headline: 'Consolidate credit cards into a single fixed payment from 7.49% APR with $0 origination fees.',
    apyOrApr: '7.49% - 14.99% Fixed APR',
    rateType: 'APR',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 640,
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['Zero origination fees (Save up to 6%)', 'Direct creditor payoff service', 'Fixed monthly payment over 2-5 years', 'Same-day loan funding'],
    dealbreakersCovered: ['zero_origination_fee', 'debt_consolidation_low_apr', 'fixed_monthly_payment'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      termMonths: 48,
      introOffer: '0.25% autopay discount included'
    },
    description: 'A direct-to-creditor personal loan allowing borrowers to slash credit card APRs in half with zero upfront origination fees.'
  },
  {
    id: 'loan-02',
    name: 'Verdant Clean Energy EV Auto Loan',
    bankName: 'Verdant Digital Bank',
    category: 'personal_loan',
    categoryLabel: 'Personal & Auto Loans',
    headline: '4.75% Fixed APR on new and used Electric Vehicles + free Level 2 home charger rebate.',
    apyOrApr: '4.75% Fixed APR',
    rateType: 'APR',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 660,
    branchAccess: false,
    mobileRating: 4.9,
    esgCertified: true,
    perks: ['Discounted 4.75% EV interest rate', '$500 rebate toward home Level 2 charger installation', 'Terms up to 72 months', '100% digital instant approval'],
    dealbreakersCovered: ['esg_certified', 'ev_loan_low_rate', 'home_charger_rebate'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      termMonths: 60,
      introOffer: '$500 EV charger rebate'
    },
    description: 'Discounted auto financing dedicated to electric vehicles, hybrids, and sustainable transportation.'
  },
  {
    id: 'loan-03',
    name: 'QuickCredit Emergency Cash Personal Loan',
    bankName: 'Heritage State Bank',
    category: 'personal_loan',
    categoryLabel: 'Personal & Auto Loans',
    headline: 'Fast cash funding up to $15,000 for unexpected home/auto repairs with flexible credit review.',
    apyOrApr: '16.99% - 24.99% APR',
    rateType: 'APR',
    annualFee: 0,
    minDeposit: 0,
    minCreditScore: 580,
    branchAccess: true,
    mobileRating: 3.8,
    esgCertified: false,
    perks: ['Instant funds disbursement at branch counter', 'Fair credit accepted (from 580)', 'Loan amounts from $1,000 to $15,000', 'No prepayment penalty'],
    dealbreakersCovered: ['fair_credit_approved', 'instant_cash_need', 'branch_funding'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      termMonths: 24,
      introOffer: '5% origination fee deducted from loan proceeds'
    },
    description: 'Rapid personal loan for urgent unexpected expenses with more accommodating credit score underwriting.'
  },

  // ================= WEALTH & INVESTING =================
  {
    id: 'wlt-01',
    name: 'Verdant ESG Clean Horizon Wealth Portfolio',
    bankName: 'Verdant Digital Bank',
    category: 'wealth_investment',
    categoryLabel: 'Wealth & Investment Portfolios',
    headline: 'Automated robo-portfolio screening out fossil fuels, weapons, and tobacco with 0.20% advisory fee.',
    apyOrApr: '0.20% Expense Ratio',
    rateType: 'Expense Ratio',
    annualFee: 0,
    minDeposit: 500,
    minCreditScore: 500,
    branchAccess: false,
    mobileRating: 4.9,
    esgCertified: true,
    perks: ['100% Strict ESG & Carbon-Neutral Screening', 'Automated tax-loss harvesting', 'Daily algorithmic rebalancing', 'Direct indexing customization'],
    dealbreakersCovered: ['esg_certified', 'low_robo_fee_under_25bps', 'tax_loss_harvesting'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      introOffer: '$0 advisory fees on first $10,000 for 12 months'
    },
    description: 'An intelligent automated investment portfolio aligning market returns with environmental sustainability and corporate governance standards.'
  },
  {
    id: 'wlt-02',
    name: 'Metropolitan Private Wealth & Trust Management',
    bankName: 'Metropolitan Trust Bank',
    category: 'wealth_investment',
    categoryLabel: 'Wealth & Investment Portfolios',
    headline: 'Bespoke fiduciary portfolio management, estate planning, and alternative private equity access.',
    apyOrApr: '0.75% Advisory Fee',
    rateType: 'Expense Ratio',
    annualFee: 0,
    minDeposit: 250000, // $250k min
    minCreditScore: 700,
    branchAccess: true,
    mobileRating: 4.4,
    esgCertified: false,
    perks: ['Dedicated CFP® and CFA® portfolio managers', 'Direct private equity and venture capital deal flow', 'Comprehensive estate & tax structuring', 'Exclusive concierge club invitations'],
    dealbreakersCovered: ['private_fiduciary_advisor', 'high_net_worth_250k_plus', 'estate_planning'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      introOffer: 'Comprehensive complimentary financial plan ($2,500 value)'
    },
    description: 'Tailored private wealth advisory and trust solutions for high-net-worth families and business founders.'
  },
  {
    id: 'wlt-03',
    name: 'Apex Micro-Invest & Core Index Portfolio',
    bankName: 'Horizon Federal Bank',
    category: 'wealth_investment',
    categoryLabel: 'Wealth & Investment Portfolios',
    headline: 'Fractional share investing from $1 with ultra-low-cost total market index funds.',
    apyOrApr: '0.05% Fund Expense Ratio',
    rateType: 'Expense Ratio',
    annualFee: 0,
    minDeposit: 1,
    minCreditScore: 500,
    branchAccess: true,
    mobileRating: 4.8,
    esgCertified: true,
    perks: ['Invest spare change round-ups from checking', 'Zero advisory fee for balances under $10,000', 'Automated recurring $5 micro-investments', 'Fractional shares across US & Global ETFs'],
    dealbreakersCovered: ['zero_min_deposit_1dollar', 'ultra_low_cost_index', 'spare_change_roundups'],
    keyTerms: {
      monthlyMaintenanceFee: 0,
      introOffer: '$20 starter stock bonus on first $50 recurring deposit'
    },
    description: 'Accessible wealth building tool allowing anyone to invest in global index funds with as little as one dollar.'
  }
];
