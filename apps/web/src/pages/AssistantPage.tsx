import React, { useState } from 'react';
import { Bot, Lock, Send, ShieldAlert, Sparkles, MessageSquare, AlertCircle, Copy, RotateCcw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendAssistantMessage, ChatMessage } from '../services/gemini';

export const AssistantPage: React.FC = () => {
  const { isAuthenticated, signInAsDemo } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      role: 'assistant',
      content:
        'Namaste! I am your **Suraksha Assistant**, powered by Gemini AI. I can look up incident references (e.g. `SB-2026-00412`), explain our 4-pillar Safety Grid scoring weights, or guide you through emergency reporting. Please note all platform statistics reflect **demonstration pilot data**.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await sendAssistantMessage(prompt, messages);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      role: 'assistant',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* India Gate Dusk Ambient Background - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/india-gate-hero.jpg"
          alt="Suraksha Assistant Intelligence Background"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="border-b border-hairline border-paper-border dark:border-ink-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-saffron" />
              <span>Phase 5 • National AI Grounded Intelligence</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
                DEMO DATA
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
              Suraksha Assistant (Gemini AI)
            </h1>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Context-grounded civic safety assistant. Look up hazard tickets, explore scoring methodology,
              or obtain verified helpline guidance.
            </p>
          </div>

          {isAuthenticated && (
            <button
              onClick={() =>
                setMessages([
                  {
                    id: 'msg-fresh',
                    role: 'assistant',
                    content: 'Session refreshed. How may I assist with your civic safety inquiries?',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ])
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper font-mono text-xs self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Session</span>
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          /* Mandatory signed-in gating from Section 9 */
          <div className="p-8 sm:p-12 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border text-center max-w-xl mx-auto shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-saffron/15 text-saffron mx-auto flex items-center justify-center mb-6 border border-saffron/30">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-3">
              Sign In Required for Suraksha Assistant
            </h3>

            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              In accordance with national security safeguards and per-user token quotas, Suraksha
              Assistant is restricted to authenticated users. All conversation sessions are end-to-end
              encrypted and scoped solely to your verified reports.
            </p>

            <div className="p-3.5 rounded-xl bg-signalred/10 border border-signalred/30 text-xs font-mono text-signalred mb-8 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Emergency Notice: In life-safety situations, dial 112 immediately.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold shadow-sm transition-all"
              >
                Sign In to Activate Assistant
              </Link>
              <button
                onClick={() => signInAsDemo('citizen')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-paper"
              >
                1-Click Demo Citizen Login
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Interactive Chat Session */
          <div className="rounded-3xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card/90 dark:bg-ink-card/90 p-6 shadow-2xl font-mono text-xs backdrop-blur-md flex flex-col min-h-[520px]">
            {/* Messages Thread */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-6 pr-2 max-h-[460px]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-[85%] border leading-relaxed font-sans text-sm ${
                      m.role === 'user'
                        ? 'bg-saffron text-ink font-medium border-saffron'
                        : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-800 dark:text-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1 px-1 font-mono">
                    <span>{m.timestamp}</span>
                    {m.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(m.content, m.id)}
                        className="hover:text-saffron flex items-center gap-0.5"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-indiagreen" />
                            <span className="text-indiagreen">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-saffron p-3 rounded-xl bg-saffron/10 border border-saffron/30 w-fit">
                  <span className="w-2 h-2 rounded-full bg-saffron animate-ping" />
                  <span className="font-mono text-xs">Suraksha AI is reasoning...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompts Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 font-mono text-[11px]">
              <span className="text-neutral-400 shrink-0">Try asking:</span>
              <button
                onClick={() => handleSend('How is the Safety Grid composite score calculated?')}
                className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300 shrink-0"
              >
                Explain Safety Grid weights
              </button>
              <button
                onClick={() => handleSend('What should I do if I receive a fake electricity bill SMS?')}
                className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-[#4C5BD4] text-neutral-600 dark:text-neutral-300 shrink-0"
              >
                Cyber fraud helpline (1930)
              </button>
              <button
                onClick={() => handleSend('Status lookup for ticket SB-2026-00412')}
                className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300 shrink-0"
              >
                Check ticket SB-2026-00412
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about civic hazards, tracking numbers, or platform methodology..."
                className="w-full p-3.5 pr-14 rounded-2xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans text-sm shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-saffron text-ink hover:bg-saffron-muted disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
