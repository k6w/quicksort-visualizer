'use client';

import React from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { Language } from '@/lib/i18n';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 rounded-full bg-muted p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ro')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          language === 'ro'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        RO
      </button>
    </div>
  );
}
