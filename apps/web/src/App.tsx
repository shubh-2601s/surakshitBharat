import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { SafetyGridPage } from './pages/SafetyGridPage';
import { TransportPage } from './pages/TransportPage';
import { DigitalSafetyPage } from './pages/DigitalSafetyPage';
import { ManufacturersPage } from './pages/ManufacturersPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { ReportHazardPage } from './pages/ReportHazardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssistantPage } from './pages/AssistantPage';
import { Bot, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-paper dark:bg-ink text-ink dark:text-paper selection:bg-saffron selection:text-white transition-colors">
      <Header />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/safety-grid" element={<SafetyGridPage />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/digital-safety" element={<DigitalSafetyPage />} />
          <Route path="/manufacturers" element={<ManufacturersPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/report/new" element={<ReportHazardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Suraksha Assistant Widget Button */}
      <Link
        to="/assistant"
        aria-label="Open Suraksha Assistant AI"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-navy text-white dark:bg-paper-card dark:text-ink font-mono text-xs font-bold border border-hairline border-saffron/50 shadow-2xl hover:scale-105 hover:shadow-control-room transition-all group"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron"></span>
        </span>
        <Bot className="w-4 h-4 text-saffron group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Suraksha Assistant</span>
      </Link>
    </div>
  );
};

export default App;
