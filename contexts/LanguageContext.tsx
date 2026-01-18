import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, Language } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'fr' || savedLang === 'ar')) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language to local storage and update document direction
  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (path: string, params?: Record<string, string | number>) => {
      // 1. Try resolving path in the language-specific tree (e.g. en.landing.title)
      const keys = path.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }

      // 2. If not found, try resolving in the root-level tree (e.g. admin.title.en)
      if (!value) {
        value = translations;
        for (const k of keys) {
           if (value && typeof value === 'object' && k in value) {
             value = value[k];
           } else {
             value = undefined;
             break;
           }
        }
        // check if leaf has language key
        if (value && typeof value === 'object' && language in value) {
           value = value[language];
        }
      }

      // 3. Cast to string, return path if failed
      let result = (typeof value === 'string') ? value : path;

      // 4. Interpolate params {0}, {name}, etc.
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
           result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
        });
      }

      return result;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
