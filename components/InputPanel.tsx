'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shuffle } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface InputPanelProps {
  onArrayChange: (array: number[]) => void;
  disabled: boolean;
}

export function InputPanel({ onArrayChange, disabled }: InputPanelProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState('5, 2, 8, 1, 9, 3, 7');
  const [arraySize, setArraySize] = useState(10);
  const [error, setError] = useState('');
  // Track the last emitted normalized array to avoid re-emitting the same data
  const lastEmittedRef = useRef<string | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    setError('');
  };

  // Live update the visualizer as the input changes (debounced)
  useEffect(() => {
    if (disabled) return; // don't live-update while sorting

    const timer = setTimeout(() => {
      try {
        const numbers = input
          .split(/[,\s]+/)
          .filter((s) => s.trim() !== '')
          .map((s) => {
            const num = parseFloat(s.trim());
            if (isNaN(num)) throw new Error('Invalid number');
            return Math.round(num);
          });

        if (numbers.length === 0) {
          setError('');
          return; // empty input – don't update yet
        }

        if (numbers.length < 2) {
          setError(t('errorMinValues'));
          return;
        }

        if (numbers.length > 50) {
          setError(t('errorMaxValues'));
          return;
        }

        setError('');
        const normalized = numbers.join(',');
        if (lastEmittedRef.current === normalized) {
          // same content as last time; avoid redundant re-emit that would reset UI
          return;
        }
        lastEmittedRef.current = normalized;
        onArrayChange(numbers);
      } catch (err) {
        setError(t('errorInvalidInput'));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, disabled, onArrayChange, t]);

  const handleArraySizeChange = (value: string) => {
    // Allow empty or incomplete input while typing
    if (value === '' || value === '0') {
      setArraySize(2);
      return;
    }
    const num = parseInt(value);
    if (isNaN(num)) {
      setArraySize(2);
      return;
    }
    // Don't clamp while typing - just set the value
    setArraySize(num);
  };

  const handleArraySizeBlur = () => {
    // Clamp to valid range when user finishes typing (on blur)
    const clampedValue = Math.max(2, Math.min(50, arraySize));
    setArraySize(clampedValue);
  };

  const handleGenerateRandom = () => {
    const randomArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    const randomString = randomArray.join(', ');
    setInput(randomString);
    setError('');
    lastEmittedRef.current = randomArray.join(',');
    onArrayChange(randomArray);
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg p-3 md:p-4 space-y-3">
      <div className="space-y-1.5">
        <label htmlFor="array-input" className="text-xs font-medium text-foreground">
          {t('inputLabel')}
        </label>
        <input
          id="array-input"
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={disabled}
          placeholder={t('inputPlaceholder')}
          className="w-full px-3 py-2 text-sm bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <label htmlFor="array-size" className="text-xs text-muted-foreground whitespace-nowrap">{t('arraySize')}:</label>
          <input
            id="array-size"
            type="number"
            min="2"
            max="50"
            value={arraySize}
            onChange={(e) => handleArraySizeChange(e.target.value)}
            onBlur={handleArraySizeBlur}
            disabled={disabled}
            className="w-16 px-2 py-2 text-sm bg-background border border-input rounded-lg text-foreground text-center focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
        </div>

        <button
          onClick={handleGenerateRandom}
          disabled={disabled}
          className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
        >
          <Shuffle className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{t('generateRandom')}</span>
        </button>
      </div>
    </div>
  );
}
