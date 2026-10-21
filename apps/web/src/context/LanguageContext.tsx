import React, { createContext, useContext, useState, useEffect } from 'react';

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
  register: string;
  dashboard: string;
  activeNationalIncidents: string;
  districtsMonitored: string;
  verifiedResolutionRate: string;
  potholeResolved: string;
  communitySafety: string;
  manufacturingStandards: string;
  transportCorridors: string;
  digitalVigilance: string;
  compositeScore: string;
  cartogramView: string;
  tableView: string;
  searchStates: string;
  exportCsv: string;
  allPillars: string;
  insufficientData: string;
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
    register: 'Register',
    dashboard: 'Dashboard',
    activeNationalIncidents: 'Active National Reports',
    districtsMonitored: 'Districts Monitored',
    verifiedResolutionRate: 'Verified Resolution Rate',
    potholeResolved: 'Hazard Resolved',
    communitySafety: 'Community Safety',
    manufacturingStandards: 'Manufacturing Standards',
    transportCorridors: 'Transport Corridors',
    digitalVigilance: 'Digital Vigilance',
    compositeScore: 'National Composite Score',
    cartogramView: 'Cartogram Grid',
    tableView: 'Data Table',
    searchStates: 'Search state or UT code...',
    exportCsv: 'Export CSV',
    allPillars: 'All Pillars',
    insufficientData: 'Insufficient Data'
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
    register: 'पंजीकरण करें',
    dashboard: 'डैशबोर्ड',
    activeNationalIncidents: 'सक्रिय राष्ट्रीय रिपोर्टें',
    districtsMonitored: 'निगरानी वाले जिले',
    verifiedResolutionRate: 'सत्यापित समाधान दर',
    potholeResolved: 'समस्या का समाधान हुआ',
    communitySafety: 'सामुदायिक सुरक्षा',
    manufacturingStandards: 'विनिर्माण मानक',
    transportCorridors: 'परिवहन गलियारे',
    digitalVigilance: 'डिजिटल सतर्कता',
    compositeScore: 'राष्ट्रीय समग्र स्कोर',
    cartogramView: 'कार्टोग्राम ग्रिड',
    tableView: 'डेटा तालिका',
    searchStates: 'राज्य या केंद्र शासित प्रदेश खोजें...',
    exportCsv: 'सीएसवी निर्यात करें',
    allPillars: 'सभी स्तंभ',
    insufficientData: 'अपर्याप्त डेटा'
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
    register: 'பதிவு செய்க',
    dashboard: 'டாஷ்போர்டு',
    activeNationalIncidents: 'செயலில் உள்ள தேசிய புகார்கள்',
    districtsMonitored: 'கண்காணிக்கப்படும் மாவட்டங்கள்',
    verifiedResolutionRate: 'சரிபார்க்கப்பட்ட தீர்வு விகிதம்',
    potholeResolved: 'பிரச்சனை தீர்க்கப்பட்டது',
    communitySafety: 'சமூக பாதுகாப்பு',
    manufacturingStandards: 'உற்பத்தி தரநிலைகள்',
    transportCorridors: 'போக்குவரத்து பாதைகள்',
    digitalVigilance: 'டிஜிட்டல் விழிப்புணர்வு',
    compositeScore: 'தேசிய கூட்டு மதிப்பெண்',
    cartogramView: 'கார்ட்டோகிராம் வரைபடம்',
    tableView: 'தரவு அட்டவணை',
    searchStates: 'மாநிலம் அல்லது யூனியன் பிரதேசத்தை தேடுக...',
    exportCsv: 'CSV பதிவிறக்கம்',
    allPillars: 'அனைத்து தூண்கள்',
    insufficientData: 'போதுமான தரவு இல்லை'
  }
};

function applyGoogleTranslation(targetLang: Language) {
  try {
    const isLocal =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const domainStr = isLocal ? '' : `; domain=${window.location.hostname}`;

    if (targetLang === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${domainStr}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
    } else {
      const val = `/en/${targetLang}`;
      document.cookie = `googtrans=${val}; path=/;${domainStr}`;
      document.cookie = `googtrans=${val}; path=/;`;
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = targetLang;
        select.dispatchEvent(new Event('change'));
      }
    }
  } catch (err) {
    console.warn('Translation engine note:', err);
  }
}

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
    applyGoogleTranslation(lang);
  };

  useEffect(() => {
    // If user previously selected Hindi or Tamil, ensure DOM translation re-applies
    if (language !== 'en') {
      const timer = setTimeout(() => {
        applyGoogleTranslation(language);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [language]);

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
