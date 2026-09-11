# CustomerSim (Retail Banking) — Implementation Walkthrough

We have successfully built and launched the **CustomerSim Retail Banking Web Application**, implementing the core methodology, benchmark, and UserGRPO reinforcement learning alignment framework from the paper: [CustomerSim: Benchmarking and Aligning Multimodal Language Models as Retail User Simulators (arXiv:2605.08334)](https://arxiv.org/html/2605.08334v2), fully styled with the design language and UX principles of [Frase.io](https://www.frase.io/).

---

## 1. Summary of Completed Modules

### 🏛️ Retail Banking Catalog & Structured Inventory (`/catalog`)
- **6 Financial Categories**: Checking & Everyday, High-Yield Savings & CDs, Residential Mortgages & Refinancing, Credit Cards (Cashback, Travel, Secured/Rebuilder), Personal & Auto Loans, Wealth & Investment Portfolios.
- **Structured Schemas**: Interest rates / APYs, APR ranges, annual maintenance fees, minimum deposit thresholds, FICO credit tier requirements, branch accessibility, ESG clean energy certification, and fine-print dealbreakers.
- **Interactive Inspector**: Deep inspection drawer with terms, criteria mappings, and real-time category filtering.

### 👤 Financial Persona Registry & Generator (`/personas`)
- **Realistic Ground-Truth Profiles**: Curated personas (Maya Lin, Marcus Vance, Carlos Mendez, Arthur Pendelton, Sophia Sterling, Tariq Al-Mansoor, Jordan Rivera) covering diverse demographics, income levels, and credit tiers.
- **Latent Dealbreakers & Infeasible Scenarios**: Explicit wishes vs hidden dealbreakers to test whether the simulator correctly rejects unsuitable products or abstains from non-viable offerings.
- **Interactive Persona Synthesizer**: Modal to construct custom banking profiles and compute acceptable product sets in real time.

### 🤖 Dual-Agent Live Interactive Arena (`/arena`)
- **Real-Time Turn-by-Turn Simulation**: Customer Simulator agent interacts with a Bank Advisor agent over 6 dialog turns.
- **Simulator Policy Selector**: Compare **Baseline Zero-Shot LLM**, **Human Stylistic Steered**, **SFT Supervised**, and **UserGRPO RL**.
- **Inner Monologue & Reasoning Trace**: Real-time visualization of customer latent state, dealbreaker triggers, candidate product evaluations, and persuasion resistance scores.
- **Tool Execution Records**: Live inspector for tools called by the sales agent (`lookup_banking_guide`, `search_financial_products`, `check_eligibility`).
- **Instant Decision Alignment Verification**: Verifiable classification into `correct_acceptance`, `correct_rejection`, `false_acceptance` (persuasion drift), or `false_rejection`.

### 📊 Batch Benchmark Matrix (`/benchmark`)
- **Multi-Model Comparison**: ChatGPT-5.6, Claude Opus 4.8, Gemma-3 4B Base, Gemma-3 Human Steered, Gemma-3 SFT, and Gemma-3 + UserGRPO.
- **Paper Metrics**:
  - **Decision Alignment ($DA\%$)**: Measures constraint satisfaction.
  - **First-Turn Criteria Exposure ($Crit.$)**: Quantifies opening turn criteria dumping.
  - **Sentence Completeness ($\%Cpl.$)**: Formality vs human-like fragments.
  - **Lexical Redundancy ($Red.$)**: Vocabulary diversity.
  - **Format Errors & Persuasion Drift Rates**.
- **Live Batch Runner**: Interactive batch execution across 32 scenario rollouts.

### ⚡ UserGRPO Trajectory & Reward Lab (`/usergrpo`)
- **Multi-Objective Trajectory Rewards**: Detailed breakdown of $R_{\text{align}}$ (binary decision check), $R_{\text{reason}}$ (LLM judge coherence), $R_{\text{ngram}}$ (linguistic realism), and auxiliary format/length penalties.
- **Interactive Reward Weight Tuner**: Adjust $\alpha_{\text{align}}$, $\alpha_{\text{reason}}$, and $\alpha_{\text{ngram}}$ dynamically.
- **Side-by-Side Deep Transcripts**: Directly compare Baseline vs UserGRPO dialogues on challenging edge-case personas.

### 📈 Persuasion Susceptibility Matrix (`/analytics`)
- **Drift Analysis**: Breakdown of where standard LLMs fail under sales pressure (hidden fees, APR caps, branch requirements).
- **Data Export**: One-click benchmark report export in JSON.

---

## 2. Design System & Aesthetics (Frase.io)

- **Forest Green Identity**: `#059469` primary actions, `#0D5C3A` deep forest, `#ECFDF5` background tints.
- **Ink Black & Monospace Details**: `#121A15` text headings with `font-mono text-xs uppercase tracking-[0.14em]` badges.
- **Warm Opportunity Amber**: `#D9890F` badges highlighting edge cases and key findings.
- **Clean Elevated Cards**: Crisp borders (`#E5E7EB`), refined drop shadows, definition lists (`<dl>`, `<dt>`, `<dd>`), and sticky multi-stage navigation bar.

---

## 3. Verification & Build Status

- ✅ **Build Validation**: Executed `npm run build` with zero TypeScript or compilation errors. All 7 routes prerendered cleanly.
- ✅ **Dev Server Active**: Running at `http://localhost:3000`.
- ✅ **Mathematical Consistency**: Metric calculations ($DA$, $Crit.$, $\%Cpl.$, $R_{\text{total}}$) strictly adhere to Section 2.3 and Section 3 of arXiv:2605.08334.
