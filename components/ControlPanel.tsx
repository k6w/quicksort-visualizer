'use client';

import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export type SortStatus = 'ready' | 'sorting' | 'paused' | 'complete';

interface ControlPanelProps {
  status: SortStatus;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  comparisons: number;
  swaps: number;
}

export function ControlPanel({
  status,
  currentStep,
  totalSteps,
  speed,
  onStart,
  onPause,
  onResume,
  onNextStep,
  onPrevStep,
  onReset,
  onSpeedChange,
  comparisons,
  swaps,
}: ControlPanelProps) {
  const { t } = useLanguage();

  const getStatusText = () => {
    switch (status) {
      case 'ready':
        return t('statusReady');
      case 'sorting':
        return t('statusSorting');
      case 'paused':
        return t('statusPaused');
      case 'complete':
        return t('statusComplete');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'ready':
        return 'text-blue-600 dark:text-blue-400';
      case 'sorting':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'paused':
        return 'text-orange-600 dark:text-orange-400';
      case 'complete':
        return 'text-green-600 dark:text-green-400';
    }
  };

  // Convert speed (0-100) to delay in ms (2000ms to 50ms)
  const speedToLabel = (speed: number): string => {
    if (speed < 33) return t('speedSlow');
    if (speed < 66) return t('speedMedium');
    return t('speedFast');
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg p-3 md:p-4 space-y-3">
      {/* Status and Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground mb-0.5">{t('status')}</p>
          <p className={`text-xs font-bold ${getStatusColor()}`}>{getStatusText()}</p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground mb-0.5">{t('currentStep')}</p>
          <p className="text-xs font-bold text-foreground">
            {currentStep}/{totalSteps}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground mb-0.5">{t('comparisons')}</p>
          <p className="text-xs font-bold text-foreground">{comparisons}</p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground mb-0.5">{t('swaps')}</p>
          <p className="text-xs font-bold text-foreground">{swaps}</p>
        </div>
      </div>

      {/* Speed Control */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground">{t('animationSpeed')}</label>
          <span className="text-xs text-muted-foreground">{speedToLabel(speed)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Main Controls */}
      <div className="flex flex-wrap gap-2">
        {status === 'ready' && (
          <button
            onClick={onStart}
            disabled={totalSteps === 0}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Play className="h-3.5 w-3.5" />
            {t('start')}
          </button>
        )}

        {status === 'sorting' && (
          <button
            onClick={onPause}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-all duration-200"
          >
            <Pause className="h-3.5 w-3.5" />
            {t('pause')}
          </button>
        )}

        {status === 'paused' && (
          <button
            onClick={onResume}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-200"
          >
            <Play className="h-3.5 w-3.5" />
            {t('resume')}
          </button>
        )}

        {status !== 'sorting' && (
          <>
            <button
              onClick={onPrevStep}
              disabled={currentStep === 0 || totalSteps === 0}
              className="flex items-center justify-center gap-1 py-2.5 px-3 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title={t('prevStep')}
            >
              <SkipBack className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={onNextStep}
              disabled={currentStep >= totalSteps - 1 || totalSteps === 0}
              className="flex items-center justify-center gap-1 py-2.5 px-3 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title={t('nextStep')}
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          </>
        )}

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-1 py-2.5 px-3 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-all duration-200"
          title={t('reset')}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
