'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { PivotStrategy } from '@/lib/algorithms/quicksort';

interface AdvancedSettingsProps {
  pivotStrategy: PivotStrategy;
  onPivotStrategyChange: (strategy: PivotStrategy) => void;
  disabled: boolean;
}

export function AdvancedSettings({ pivotStrategy, onPivotStrategyChange, disabled }: AdvancedSettingsProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const strategies: { value: PivotStrategy; label: string }[] = [
    { value: 'last', label: t('pivotLast') },
    { value: 'first', label: t('pivotFirst') },
    { value: 'middle', label: t('pivotMiddle') },
    { value: 'random', label: t('pivotRandom') },
  ];

  return (
    <div className="w-full bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{t('advanced')}</span>
        </div>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 py-3 border-t border-border space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">{t('pivotStrategy')}</label>
            <div className="grid grid-cols-2 gap-2">
              {strategies.map((strategy) => (
                <button
                  key={strategy.value}
                  onClick={() => onPivotStrategyChange(strategy.value)}
                  disabled={disabled}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                    pivotStrategy === strategy.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {strategy.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
