
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

// Define available languages
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'ar' | 'ru' | 'pt' | 'it' | 'nl' | 'hi';

// Type for the translations structure
export type TranslationKeys = typeof translations.en;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
};

const defaultLanguage: Language = 'en';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key) => key as string,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    // Try to get language from localStorage on mount
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (browserLang && Object.keys(translations).includes(browserLang)) {
        setLanguageState(browserLang);
        localStorage.setItem('preferredLanguage', browserLang);
      }
    }
    
    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', language);
  }, []);

  useEffect(() => {
    // Update HTML lang attribute whenever language changes
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Translation function
  const t = (key: keyof TranslationKeys): string => {
    const currentTranslations = translations[language];
    return currentTranslations?.[key] || translations.en[key] || key as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
