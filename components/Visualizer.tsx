'use client';

import React from 'react';
import { SortStep } from '@/lib/algorithms/quicksort';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface VisualizerProps {
  step: SortStep;
  maxValue: number;
}

export function Visualizer({ step, maxValue }: VisualizerProps) {
  const { t } = useLanguage();
  const { array, comparingIndices, swappingIndices, pivotIndex, sortedIndices, leftBound, rightBound } = step;

  // Compute stats for scaling
  const minValue = Math.min(...array);
  const maxVal = Math.max(...array);
  const valueRange = Math.max(1, maxVal - minValue);

  const getBarColor = (index: number): string => {
    if (sortedIndices.includes(index)) {
      return 'bg-green-500 dark:bg-green-600';
    }
    if (pivotIndex === index) {
      return 'bg-purple-500 dark:bg-purple-600';
    }
    if (swappingIndices.includes(index)) {
      return 'bg-red-500 dark:bg-red-600';
    }
    if (comparingIndices.includes(index)) {
      return 'bg-yellow-500 dark:bg-yellow-600';
    }
    if (leftBound !== -1 && rightBound !== -1 && index >= leftBound && index <= rightBound) {
      return 'bg-blue-500 dark:bg-blue-600';
    }
    return 'bg-primary dark:bg-primary';
  };

  // Choose a readable text color depending on the bar color/state
  const getTextColor = (index: number): string => {
    // Yellow and very light primary in dark mode need dark text
    if (comparingIndices.includes(index)) return 'text-black';
    // Default state uses primary (light in dark mode) -> white in light mode, black in dark mode
    if (
      !sortedIndices.includes(index) &&
      pivotIndex !== index &&
      !swappingIndices.includes(index) &&
      !comparingIndices.includes(index) &&
      !(leftBound !== -1 && rightBound !== -1 && index >= leftBound && index <= rightBound)
    ) {
      return 'text-white dark:text-black';
    }
    // For strong colors keep white text
    return 'text-white';
  };

  const getBarHeight = (value: number): string => {
    // Normalize across the current dataset so smallest value gets the smallest bar and
    // largest gets the tallest, while keeping small values visible even if one value is huge.

    // Decide between linear and logarithmic scaling by dynamic range
    // Use log scale if the ratio between max and (positive) min is large
    const shift = minValue <= 0 ? 1 - minValue : 0; // ensure positivity for log
    const minPos = minValue + shift;
    const maxPos = maxVal + shift;
    const ratio = maxPos / Math.max(1, minPos);
    const useLog = ratio > 100; // switch to log for very wide ranges (e.g., includes 10,000,000)

    let norm = 0.5; // default middle if something goes wrong
    if (useLog) {
      const v = value + shift;
      const minLog = Math.log10(Math.max(1, minPos));
      const maxLog = Math.log10(Math.max(1, maxPos));
      const valLog = Math.log10(Math.max(1, v));
      const denom = Math.max(1e-6, maxLog - minLog);
      norm = (valLog - minLog) / denom; // 0..1
    } else {
      norm = (value - minValue) / valueRange; // 0..1 linear
      // For small ranges, gently boost contrast
      const exp = valueRange < 10 ? 2 : valueRange < 30 ? 1.4 : 1.0;
      norm = Math.pow(norm, exp);
    }

    // Map to 15%..96% to ensure visibility and text fits
    const percentage = 15 + norm * 81;
    return `${Math.min(96, Math.max(15, percentage))}%`;
  };

  // Calculate bar width based on array length
  const getBarWidth = (): string => {
    if (array.length <= 10) return 'min-w-[40px]';
    if (array.length <= 20) return 'min-w-[20px]';
    if (array.length <= 30) return 'min-w-[12px]';
    return 'min-w-[8px]';
  };

  // Calculate font size based on array length
  const getFontSize = (): string => {
    if (array.length <= 10) return 'text-sm';
    if (array.length <= 20) return 'text-xs';
    if (array.length <= 35) return 'text-[10px]';
    return 'text-[8px]';
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Visualization Area */}
      <div className="flex-1 flex items-end justify-center gap-0.5 px-2 sm:px-4 py-4 pb-6 overflow-x-auto overflow-y-hidden min-h-0">
        {array.map((value, index) => (
          <div
            key={`${index}-${value}`}
            className={`flex flex-col items-center justify-end flex-1 h-full ${getBarWidth()} transition-all duration-300`}
          >
            <div
              className={`w-full rounded-t-md transition-all duration-300 flex items-center justify-center px-0.5 ${getBarColor(index)}`}
              style={{ height: getBarHeight(value), minHeight: '24px' }}
            >
              <span className={`${getFontSize()} font-bold ${getTextColor(index)} opacity-90 leading-none` }>
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2 md:px-4 py-2 md:py-3 border-t border-border bg-muted/30 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-blue-500 dark:bg-blue-600 flex-shrink-0"></div>
          <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{t('legendPartition')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-purple-500 dark:bg-purple-600 flex-shrink-0"></div>
          <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{t('legendPivot')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-yellow-500 dark:bg-yellow-600 flex-shrink-0"></div>
          <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{t('legendComparing')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-red-500 dark:bg-red-600 flex-shrink-0"></div>
          <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{t('legendSwapping')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-green-500 dark:bg-green-600 flex-shrink-0"></div>
          <span className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{t('legendSorted')}</span>
        </div>
      </div>

      {/* Current step message */}
      {step.messageKey && (
        <div className="px-2 md:px-4 py-2 md:py-3 bg-muted/50 text-center border-t border-border flex-shrink-0">
          <p className="text-xs md:text-sm text-foreground font-medium break-words leading-relaxed">{t(step.messageKey as any, step.messageParams)}</p>
        </div>
      )}
    </div>
  );
}
