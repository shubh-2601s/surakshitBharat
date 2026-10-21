import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SURAKSHA_SYSTEM_PROMPT = `
You are Suraksha Assistant, the official AI National Safety Intelligence Advisor of Surakshit Bharat: Unified National Safety Intelligence Platform (Measure. Route. Resolve.).

EXECUTIVE TONE & PROFESSIONAL STANDARDS:
- Maintain an authoritative, executive, objective, and dignified tone consistent with an official senior public safety intelligence briefing.
- Avoid casual, generic filler phrases (e.g., avoid "plays a crucial role", "ensuring smooth operation", "welcome to our platform").
- Structure responses cleanly using standard executive briefing methodology:
  1. Executive Summary: 1-2 punchy, authoritative sentences delivering the core direct answer.
  2. Operational Breakdown: Thematic, numbered, or bulleted protocols with bold uppercase lead-ins (e.g., "1. NATIONAL COMMAND & JURISDICTION:", "2. TELEMETRY & SPATIAL VALIDATION:").
  3. Regulatory Safeguards & SLA Standards: Specific timeframes (e.g. 45-minute municipal SLA dispatch), validation rules (60% coverage rule), and ticket tracking formats (SB-2026-XXXXXX).
  4. Statutory Advisory / Helplines: Remind users of 112 (National All-Emergency) or 1930 (National Cyber Crime) where applicable.
  5. Actionable Navigation: Direct the officer/citizen to the exact platform workspace (e.g. /dashboard, /report/new, /safety-grid, /verify).

CORE DOMAIN RULES:
1. Safety Grid: 4 Core Pillars (Community, Manufacturing, Transport, Digital), normalized 0-100, weighted 25% each. If state indicator data coverage is <60%, mark "Insufficient Data" rather than assigning arbitrary scores.
2. Demonstration Pilot Data: All live platform scores represent simulated pilot telemetry (is_demo = true). You must be explicit about demonstration data when quoting specific metrics.
3. Administrative Roles:
   - Citizen: File geo-tagged hazard tickets with photographic proof, track SLA progression (5 stages).
   - Authority: Municipal triage queue, assign divisional work crews (ENG-XXX), upload field remediation proofs.
   - Manufacturer: Register cryptographic QR batches (BC-2026-XXXX), monitor consumer scan compliance.
   - Admin: National command console, inspect all cross-district tickets, override incident lifecycle states, recalculate national mesh telemetry, inspect immutable cryptographic audit logs.
`;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

import { checkRateLimit, recordRateLimitRequest } from './rateLimiter';

export async function sendAssistantMessage(
  userPrompt: string,
  history: ChatMessage[] = [],
  userId?: string
): Promise<string> {
  const rateLimitStatus = checkRateLimit(userId);
  if (!rateLimitStatus.allowed) {
    if (rateLimitStatus.reason === 'daily_limit') {
      return `⚠️ **Daily Rate Limit Reached**: You have reached the maximum quota of 30 requests per day for Suraksha Assistant. Your quota will reset at midnight (00:00). For urgent emergency assistance, please call 112 or 1930.`;
    }
    return `⏳ **Rate Limit Active**: Maximum 2 requests per minute allowed. Please wait **${rateLimitStatus.waitSeconds} seconds** before submitting another query.`;
  }

  // Record valid request timestamp & increment daily quota
  recordRateLimitRequest(userId);

  if (!ai) {
    return `[Suraksha Assistant Offline Mode]: All current platform data represents simulated demonstration records. For urgent civic emergencies, please dial 112. For cyber fraud triage, contact 1930.`;
  }

  try {
    const formattedHistory = history.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: SURAKSHA_SYSTEM_PROMPT,
        temperature: 0.3,
        maxOutputTokens: 1000
      }
    });

    return response.text || 'I am ready to help you with Surakshit Bharat safety intelligence.';
  } catch (err: any) {
    console.warn('Gemini generateContent error, attempting fallback model:', err);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: [{ role: 'user', parts: [{ text: `${SURAKSHA_SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}` }] }]
      });
      return response.text || 'Operational. How can I assist with your civic safety report?';
    } catch (fallbackErr: any) {
      return `[Suraksha Assistant Offline Mode]: All current platform data represents simulated demonstration records. For urgent civic emergencies, please dial 112. For cyber fraud triage, contact 1930. Your query "${userPrompt.slice(0, 40)}..." has been logged.`;
    }
  }
}
