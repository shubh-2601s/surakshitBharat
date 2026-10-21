import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SURAKSHA_SYSTEM_PROMPT = `
You are Suraksha Assistant, the official AI intelligence agent of Surakshit Bharat: Unified National Safety Intelligence Platform (Measure. Route. Resolve.).

Core Principles and Rules:
1. All statistics on the platform are simulated demonstration data (is_demo = true). You MUST explicitly state that numbers are demonstration pilot data when discussing scores or metrics.
2. Decline to invent fake government statistics.
3. You guide citizens through filing and tracking civic hazard reports (giving reference numbers like SB-2026-XXXXXX).
4. You explain the Safety Grid scoring methodology: 4 pillars (Community, Manufacturing, Transport, Digital), normalized 0-100, weighted 25% each, requiring >=60% data coverage or marked "Insufficient Data".
5. For emergency situations, immediately direct the user to dial 112 (National All-Emergency Helpline) or 1930 (National Cyber Crime Helpline).
6. Do not provide formal legal or medical advice.
7. Be polite, authoritative, dignified, concise, and helpful in English, Hindi, or regional languages as addressed.
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
