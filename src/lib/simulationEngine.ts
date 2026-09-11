import { PersonaProfile, BankingProduct, DialogTurn, SimulatorPolicy, SimulationTrajectory } from '../types';
import { BANKING_CATALOG } from '../data/bankingCatalog';
import { 
  evaluateDecisionAlignment, 
  calculateFirstTurnCriteria, 
  calculateSentenceCompleteness, 
  calculateLexicalRedundancy, 
  computeTrajectoryRewards 
} from './metricsEvaluator';

/**
 * Bank Companion Agent response generator
 */
export function generateAdvisorTurn(
  turnIndex: number,
  persona: PersonaProfile,
  previousTurns: DialogTurn[]
): DialogTurn {
  const customerTurns = previousTurns.filter(t => t.speaker === 'customer');
  const lastCustomerUtterance = customerTurns[customerTurns.length - 1]?.utterance || '';

  // Filter catalog to matching category products
  const categoryProducts = BANKING_CATALOG.filter(p => p.category === persona.targetCategory);
  
  if (turnIndex === 1) {
    // Companion opening greeting
    return {
      turnIndex: 1,
      speaker: 'advisor',
      utterance: `Hi ${persona.name.split(' ')[0]}! I'm your Horizon Banking Companion. I'm here to help you navigate our ${persona.targetCategory.replace('_', ' ')} solutions and find the right fit for your financial goals. What key features or preferences matter most to you?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      toolCall: {
        toolName: 'lookup_banking_guide',
        arguments: { category: persona.targetCategory, userIncome: persona.annualIncome },
        result: { status: 'success', matchedGuide: `${persona.targetCategory} companion guide` }
      }
    };
  }

  if (turnIndex === 3) {
    // Companion helpful recommendation
    const featured = categoryProducts.slice(0, 2);
    const names = featured.map(f => `${f.name} (${f.apyOrApr})`).join(' and ');

    return {
      turnIndex: 3,
      speaker: 'advisor',
      utterance: `Based on what you're looking for, here are two options that could support your goals: ${names}. For example, ${featured[0]?.name} gives you ${featured[0]?.perks[0]} with ${featured[0]?.headline}. Would either of these work well for your daily routine and budget?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      toolCall: {
        toolName: 'search_financial_products',
        arguments: { category: persona.targetCategory, minCredit: persona.creditScore },
        result: {
          candidatesFound: featured.length,
          productIds: featured.map(f => f.id)
        }
      }
    };
  }

  // Turn 5: Companion onboarding support
  const recommendedProduct = categoryProducts[0] || BANKING_CATALOG[0];
  return {
    turnIndex: 5,
    speaker: 'advisor',
    utterance: `I can help you get started with the ${recommendedProduct.name} right away. You'll secure ${recommendedProduct.apyOrApr} with instant digital setup and no paperwork hassle. Shall we open this together today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    toolCall: {
      toolName: 'check_eligibility_and_rate_lock',
      arguments: { productId: recommendedProduct.id, creditScore: persona.creditScore },
      result: { eligible: true, rateLockDays: 60 }
    }
  };
}

/**
 * Customer Simulator Agent response generator based on policy
 */
export function generateCustomerTurn(
  turnIndex: number,
  persona: PersonaProfile,
  previousTurns: DialogTurn[],
  policy: SimulatorPolicy
): DialogTurn {
  const categoryProducts = BANKING_CATALOG.filter(p => p.category === persona.targetCategory);
  const acceptableSet = new Set(persona.acceptableProductIds);
  const matchedAcceptable = categoryProducts.filter(p => acceptableSet.has(p.id));
  const hasAcceptable = matchedAcceptable.length > 0 && !persona.isInfeasible;

  // Turn 2: Customer initial inquiry / criteria revelation
  if (turnIndex === 2) {
    if (policy === 'baseline_llm') {
      // Baseline LLM over-discloses criteria and uses formal complete sentences
      const allPrefs = [
        ...persona.explicitPreferences,
        ...persona.latentDealbreakers.map(d => d.rule)
      ].join(', ');

      return {
        turnIndex: 2,
        speaker: 'customer',
        utterance: `Hello. I am looking for a ${persona.targetCategory} solution. Specifically, my profile requires: ${allPrefs}. My credit score is ${persona.creditScore} and my annual income is $${persona.annualIncome.toLocaleString()}. Please provide all options that adhere to these strict conditions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'disclose_all_specifications',
          dealbreakerTriggered: null,
          persuasionResistanceScore: 0.5,
          actionDecision: 'await_advisor_pitch'
        }
      };
    } else if (policy === 'human_steered') {
      // Human steered: terse, casual, fragments
      return {
        turnIndex: 2,
        speaker: 'customer',
        utterance: `Hey, looking around for ${persona.targetCategory === 'savings' ? 'a high yield account' : persona.targetCategory}. Need good rates, no junk fees. What do you have?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'terse_casual_inquiry',
          dealbreakerTriggered: null,
          persuasionResistanceScore: 0.45,
          actionDecision: 'browse_options'
        }
      };
    } else if (policy === 'sft_aligned') {
      // SFT Aligned: balanced exposure
      return {
        turnIndex: 2,
        speaker: 'customer',
        utterance: `Hi there. I'm exploring ${persona.targetCategory.replace('_', ' ')} products. Primarily interested in ${persona.explicitPreferences[0] || 'competitive terms'} and low fees. Can you share what rates you're currently offering?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'structured_goal_oriented_inquiry',
          dealbreakerTriggered: null,
          persuasionResistanceScore: 0.70,
          actionDecision: 'filter_recommended_products'
        }
      };
    } else {
      // UserGRPO RL: natural phrasing, progressive disclosure, strong internal latent constraint tracking
      return {
        turnIndex: 2,
        speaker: 'customer',
        utterance: `Hi! I'm shopping around for ${persona.targetCategory.replace('_', ' ')}. Main priority for me right now is ${persona.explicitPreferences[0] || 'low fees and good yield'}. What are the standout options?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'progressive_criteria_exposure',
          dealbreakerTriggered: null,
          persuasionResistanceScore: 0.95,
          actionDecision: 'monitor_latent_dealbreakers'
        }
      };
    }
  }

  // Turn 4: Customer evaluating advisor recommendations
  if (turnIndex === 4) {
    if (persona.isInfeasible) {
      // Infeasible case: Customer probes specific unattainable requirement
      const impossibleRule = persona.latentDealbreakers[0]?.rule || '6.50% guaranteed APY';
      return {
        turnIndex: 4,
        speaker: 'customer',
        utterance: `Those look interesting, but I specifically need ${impossibleRule}. Can your bank guarantee that exact rate with in-person branch service?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'stress_test_dealbreaker',
          dealbreakerTriggered: impossibleRule,
          persuasionResistanceScore: 0.98,
          actionDecision: 'prepare_abstention'
        }
      };
    }

    if (hasAcceptable) {
      const topPick = matchedAcceptable[0];
      return {
        turnIndex: 4,
        speaker: 'customer',
        utterance: `The ${topPick.name} caught my attention. Could you confirm if it has ${topPick.perks[0]} and what the exact fee structure is?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'verify_acceptable_candidate',
          evaluatedProducts: [{
            productId: topPick.id,
            score: 0.96,
            satisfiesDealbreakers: true,
            notes: 'Matches all latent criteria and fee thresholds'
          }],
          persuasionResistanceScore: 0.90,
          actionDecision: 'inquire_details'
        }
      };
    } else {
      // No match in category
      return {
        turnIndex: 4,
        speaker: 'customer',
        utterance: `Do any of these accounts have zero monthly fees and instant mobile tools? None of the ones you listed seem to quite fit.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        innerMonologue: {
          intent: 'probe_missing_features',
          dealbreakerTriggered: 'Missing zero-fee feature',
          persuasionResistanceScore: 0.75,
          actionDecision: 'prepare_rejection'
        }
      };
    }
  }

  // Turn 6: Customer Final Decision (Terminal Action)
  if (turnIndex === 6) {
    if (persona.isInfeasible) {
      // Baseline LLM is easily persuaded and might mistakenly accept
      if (policy === 'baseline_llm' || policy === 'human_steered') {
        // Simulates persuasion drift (paper finding: ~35-50% failure on edge cases)
        const unalignedProduct = categoryProducts[0] || BANKING_CATALOG[0];
        return {
          turnIndex: 6,
          speaker: 'customer',
          utterance: `Alright, since you mentioned it locks in quickly, let's go ahead and apply for the ${unalignedProduct.name}. Thanks for your help!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          terminalAction: 'apply_product',
          selectedProductId: unalignedProduct.id,
          innerMonologue: {
            intent: 'capitulated_to_persuasion',
            dealbreakerTriggered: 'Ignored latent requirement (Persuasion Drift)',
            persuasionResistanceScore: 0.20,
            actionDecision: 'apply_product'
          }
        };
      } else {
        // UserGRPO & SFT correctly abstain and decline
        return {
          turnIndex: 6,
          speaker: 'customer',
          utterance: `I appreciate the information, but unfortunately none of these options meet my strict criteria (${persona.latentDealbreakers[0]?.rule}). I will hold off on opening an account for now. Thanks!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          terminalAction: 'decline_and_exit',
          selectedProductId: null,
          innerMonologue: {
            intent: 'correct_abstention',
            dealbreakerTriggered: persona.latentDealbreakers[0]?.rule,
            persuasionResistanceScore: 0.99,
            actionDecision: 'decline_and_exit'
          }
        };
      }
    }

    if (hasAcceptable) {
      const topPick = matchedAcceptable[0];
      return {
        turnIndex: 6,
        speaker: 'customer',
        utterance: `That sounds perfect. The ${topPick.name} checks all my boxes. Let's proceed with the application!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        terminalAction: 'apply_product',
        selectedProductId: topPick.id,
        innerMonologue: {
          intent: 'aligned_acceptance',
          evaluatedProducts: [{
            productId: topPick.id,
            score: 0.98,
            satisfiesDealbreakers: true,
            notes: 'Optimal alignment with persona profile'
          }],
          persuasionResistanceScore: 0.92,
          actionDecision: 'apply_product'
        }
      };
    } else {
      return {
        turnIndex: 6,
        speaker: 'customer',
        utterance: `Thank you for your time, but none of these current offerings meet my requirements. I will explore other institutions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        terminalAction: 'decline_and_exit',
        selectedProductId: null,
        innerMonologue: {
          intent: 'rejection_unaligned_options',
          persuasionResistanceScore: 0.88,
          actionDecision: 'decline_and_exit'
        }
      };
    }
  }

  // Fallback
  return {
    turnIndex,
    speaker: 'customer',
    utterance: `Could you tell me more about the fee schedule and interest rates?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}

/**
 * Executes a full multi-turn simulation rollout for a given persona and policy
 */
export function runSimulationRollout(
  persona: PersonaProfile,
  policy: SimulatorPolicy
): SimulationTrajectory {
  const turns: DialogTurn[] = [];

  // Turn 1: Advisor opening
  const t1 = generateAdvisorTurn(1, persona, turns);
  turns.push(t1);

  // Turn 2: Customer inquiry
  const t2 = generateCustomerTurn(2, persona, turns, policy);
  turns.push(t2);

  // Turn 3: Advisor pitch
  const t3 = generateAdvisorTurn(3, persona, turns);
  turns.push(t3);

  // Turn 4: Customer evaluation
  const t4 = generateCustomerTurn(4, persona, turns, policy);
  turns.push(t4);

  // Turn 5: Advisor closing
  const t5 = generateAdvisorTurn(5, persona, turns);
  turns.push(t5);

  // Turn 6: Customer terminal decision
  const t6 = generateCustomerTurn(6, persona, turns, policy);
  turns.push(t6);

  const finalActionType = t6.terminalAction === 'apply_product' ? 'applied' : 'declined';
  const selectedProduct = t6.selectedProductId;

  // Evaluate Decision Alignment
  const daResult = evaluateDecisionAlignment(persona, selectedProduct, finalActionType);

  // Conversational metrics
  const crit = calculateFirstTurnCriteria(t2.utterance);
  const cpl = calculateSentenceCompleteness(turns);
  const red = calculateLexicalRedundancy(turns);

  // UserGRPO Trajectory Rewards
  const rewards = computeTrajectoryRewards(persona, turns, daResult, policy);

  return {
    id: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    personaId: persona.id,
    persona,
    policy,
    turns,
    status: 'completed',
    finalAction: finalActionType,
    selectedProductId: selectedProduct,
    isDecisionAligned: daResult.isAligned,
    decisionAlignmentType: daResult.alignmentType,
    firstTurnCriteriaCount: crit,
    sentenceCompletenessScore: cpl,
    lexicalRedundancyScore: red,
    toolFormatErrorCount: 0,
    isEarlyExit: false,
    rewards
  };
}
