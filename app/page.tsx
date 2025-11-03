'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { InputPanel } from '@/components/InputPanel';
import { ControlPanel, SortStatus } from '@/components/ControlPanel';
import { Visualizer } from '@/components/Visualizer';
import { AdvancedSettings } from '@/components/AdvancedSettings';
import { LogPanel } from '@/components/LogPanel';
import { QuickSortVisualizer, SortStep, PivotStrategy } from '@/lib/algorithms/quicksort';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [array, setArray] = useState<number[]>([5, 2, 8, 1, 9, 3, 7]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<SortStatus>('ready');
  const [speed, setSpeed] = useState<number>(50); // 0-100 slider
  const [pivotStrategy, setPivotStrategy] = useState<PivotStrategy>('last');
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sorterRef = useRef<QuickSortVisualizer>(new QuickSortVisualizer('last'));

  useEffect(() => {
    // Initialize with default array
    const sorter = sorterRef.current;
    sorter.sort(array);
    const sortSteps = sorter.getSteps();
    setSteps(sortSteps);
    const stats = sorter.getStats();
    setComparisons(stats.comparisons);
    setSwaps(stats.swaps);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Convert speed slider (0-100) to delay (2000ms - 50ms)
  const getDelay = (speedValue: number): number => {
    return Math.round(2000 - (speedValue / 100) * 1950);
  };

  const handleArrayChange = (newArray: number[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setArray(newArray);
    const sorter = sorterRef.current;
    sorter.setPivotStrategy(pivotStrategy);
    sorter.sort(newArray);
    const sortSteps = sorter.getSteps();
    setSteps(sortSteps);
    setCurrentStep(0);
    setStatus('ready');

    const stats = sorter.getStats();
    setComparisons(stats.comparisons);
    setSwaps(stats.swaps);
  };

  const handlePivotStrategyChange = (strategy: PivotStrategy) => {
    if (status === 'sorting') return;
    
    setPivotStrategy(strategy);
    const sorter = sorterRef.current;
    sorter.setPivotStrategy(strategy);
    sorter.sort(array);
    const sortSteps = sorter.getSteps();
    setSteps(sortSteps);
    setCurrentStep(0);
    setStatus('ready');

    const stats = sorter.getStats();
    setComparisons(stats.comparisons);
    setSwaps(stats.swaps);
  };

  const handleStart = () => {
    if (steps.length === 0) return;
    setStatus('sorting');
    playAnimation(0);
  };

  const handlePause = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setStatus('paused');
  };

  const handleResume = () => {
    setStatus('sorting');
    playAnimation(currentStep);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === steps.length - 1) {
        setStatus('complete');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (status === 'complete') {
        setStatus('paused');
      }
    }
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setCurrentStep(0);
    setStatus('ready');
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const playAnimation = (startStep: number) => {
    if (startStep >= steps.length - 1) {
      // Ensure we land on the final, all-green state and stop
      setCurrentStep(steps.length - 1);
      setStatus('complete');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const nextStep = startStep + 1;
    setCurrentStep(nextStep);

    if (nextStep >= steps.length - 1) {
      // Reached final state; keep bars green and do not reset
      setCurrentStep(steps.length - 1);
      setStatus('complete');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      playAnimation(nextStep);
    }, getDelay(speed));
  };

  const maxValue = Math.max(...array, 1);
  const currentStepData = steps[currentStep] || {
    array: array,
    comparingIndices: [],
    swappingIndices: [],
    pivotIndex: -1,
    sortedIndices: [],
    leftBound: -1,
    rightBound: -1,
    messageKey: '',
    messageParams: {},
    kind: 'init' as const,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-3 md:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
                {t('title')}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5 truncate">{t('description')}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-3 md:space-y-4">
            <InputPanel
              onArrayChange={handleArrayChange}
              disabled={status === 'sorting'}
            />
            <ControlPanel
              status={status}
              currentStep={currentStep}
              totalSteps={steps.length}
              speed={speed}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
              comparisons={comparisons}
              swaps={swaps}
            />
            <AdvancedSettings
              pivotStrategy={pivotStrategy}
              onPivotStrategyChange={handlePivotStrategyChange}
              disabled={status === 'sorting'}
            />
          </div>

          {/* Right Column - Visualizer */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden h-[500px] md:h-[600px] lg:h-[700px] flex flex-col">
              <div className="flex-1 min-h-0">
                <Visualizer step={currentStepData} maxValue={maxValue} />
              </div>
              <LogPanel steps={steps} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 md:mt-12">
        <div className="container mx-auto px-3 md:px-4 py-4 md:py-6">
          <p className="text-center text-xs md:text-sm text-muted-foreground">
            {t('footerText')}
          </p>
        </div>
      </footer>
    </div>
  );
}
