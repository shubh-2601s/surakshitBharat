import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'ta';

interface Translations {
  tagline: string;
  measureRouteResolve: string;
  demoDataBadge: string;
  reportHazard: string;
  safetyGrid: string;
  manufacturers: string;
  transportSafety: string;
  digitalSafety: string;
  methodology: string;
  signIn: string;
  activeNationalIncidents: string;
  districtsMonitored: string;
  verifiedResolutionRate: string;
  potholeResolved: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    tagline: 'Measure. Route. Resolve.',
    measureRouteResolve: 'Unified National Safety Intelligence Platform',
    demoDataBadge: 'DEMO DATA',
    reportHazard: 'Report Hazard',
    safetyGrid: 'Safety Grid',
    manufacturers: 'Local Manufacturing',
    transportSafety: 'Transport Safety',
    digitalSafety: 'Digital Safety',
    methodology: 'Methodology',
    signIn: 'Sign In',
    activeNationalIncidents: 'Active National Reports',
    districtsMonitored: 'Districts Monitored',
    verifiedResolutionRate: 'Verified Resolution Rate',
    potholeResolved: 'Hazard Resolved'
  },
  hi: {
    tagline: 'मापें। मार्ग तय करें। समाधान करें।',
    measureRouteResolve: 'एकीकृत राष्ट्रीय सुरक्षा आसूचना मंच',
    demoDataBadge: 'डेमो डेटा',
    reportHazard: 'खतरे की रिपोर्ट करें',
    safetyGrid: 'सुरक्षा ग्रिड',
    manufacturers: 'स्थानीय विनिर्माण',
    transportSafety: 'परिवहन सुरक्षा',
    digitalSafety: 'डिजिटल सुरक्षा',
    methodology: 'कार्यप्रणाली',
    signIn: 'साइन इन करें',
    activeNationalIncidents: 'सक्रिय राष्ट्रीय रिपोर्टें',
    districtsMonitored: 'निगरानी वाले जिले',
    verifiedResolutionRate: 'सत्यापित समाधान दर',
    potholeResolved: 'समस्या का समाधान हुआ'
  },
  ta: {
    tagline: 'அளவிடு. வழிநடத்து. தீர்வு காண்.',
    measureRouteResolve: 'ஒருங்கிணைந்த தேசிய பாதுகாப்பு நுண்ணறிவு தளம்',
    demoDataBadge: 'மாதிரி தரவு',
    reportHazard: 'ஆபத்தை புகாரளி',
    safetyGrid: 'பாதுகாப்பு கட்டமைப்பு',
    manufacturers: 'உள்ளூர் உற்பத்தி',
    transportSafety: 'போக்குவரத்து பாதுகாப்பு',
    digitalSafety: 'டிஜிட்டல் பாதுகாப்பு',
    methodology: 'முறைமை',
    signIn: 'உள்நுழைக',
    activeNationalIncidents: 'செயலில் உள்ள தேசிய புகார்கள்',
    districtsMonitored: 'கண்காணிக்கப்படும் மாவட்டங்கள்',
    verifiedResolutionRate: 'சரிபார்க்கப்பட்ட தீர்வு விகிதம்',
    potholeResolved: 'பிரச்சனை தீர்க்கப்பட்டது'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sb_lang') as Language;
    return saved && ['en', 'hi', 'ta'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sb_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
