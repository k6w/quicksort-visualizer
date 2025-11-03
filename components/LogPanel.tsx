'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { SortStep } from '@/lib/algorithms/quicksort';

interface LogPanelProps {
  steps: SortStep[];
  currentStep: number;
}

const kindStyles: Record<string, { label: string; bg: string; fg: string }> = {
  'init': { label: 'Init', bg: 'bg-zinc-700', fg: 'text-zinc-50' },
  'partition-bounds': { label: 'Partition', bg: 'bg-blue-600', fg: 'text-white' },
  'select-pivot': { label: 'Pivot', bg: 'bg-purple-600', fg: 'text-white' },
  'move-pivot-end': { label: 'Pivot→end', bg: 'bg-purple-700', fg: 'text-white' },
  'compare': { label: 'Compare', bg: 'bg-yellow-600', fg: 'text-black' },
  'swap': { label: 'Swap', bg: 'bg-red-600', fg: 'text-white' },
  'after-swap': { label: 'After swap', bg: 'bg-red-700', fg: 'text-white' },
  'place-pivot': { label: 'Place pivot', bg: 'bg-purple-500', fg: 'text-white' },
  'pivot-correct': { label: 'Pivot ok', bg: 'bg-green-600', fg: 'text-white' },
  'single-sorted': { label: 'Single sorted', bg: 'bg-green-700', fg: 'text-white' },
  'sorted-all': { label: 'Sorted', bg: 'bg-green-600', fg: 'text-white' },
};

export function LogPanel({ steps, currentStep }: LogPanelProps) {
  const { t } = useLanguage();
  const visibleSteps = useMemo(() => steps.slice(0, Math.max(0, currentStep + 1)), [steps, currentStep]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // auto-scroll to bottom on new step
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleSteps.length]);

  useEffect(() => {
    // also log to console with colors
    if (visibleSteps.length === 0) return;
    const s = visibleSteps[visibleSteps.length - 1];
    const style = 'padding:2px 6px;border-radius:6px;background:#1f2937;color:#fff';
    const k = kindStyles[s.kind] || { label: s.kind, bg: 'bg-zinc-700', fg: 'text-zinc-50' };
    // eslint-disable-next-line no-console
    console.log(`%c[${k.label}]`, style, t(s.messageKey as any, s.messageParams));
  }, [visibleSteps.length, t]);

  return (
    <div className="border-t border-border bg-muted/30 flex flex-col max-h-[30%] min-h-[120px]">
      <div className="flex items-center justify-between px-3 py-2 flex-shrink-0 border-b border-border/50">
        <span className="text-xs font-medium text-muted-foreground">{t('logs')}</span>
        <span className="text-[10px] text-muted-foreground">{visibleSteps.length} steps</span>
      </div>
      <div className="flex-1 overflow-auto px-3 py-2 space-y-1 min-h-0">
        {visibleSteps.map((s, i) => {
          const ks = kindStyles[s.kind] || { label: s.kind, bg: 'bg-zinc-700', fg: 'text-zinc-50' };
          return (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={`mt-0.5 inline-flex items-center rounded px-1.5 py-0.5 text-[10px] whitespace-nowrap ${ks.bg} ${ks.fg}`}>{ks.label}</span>
              <span className="text-foreground/90 break-words flex-1 leading-relaxed">
                {t(s.messageKey as any, s.messageParams)}
              </span>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    </div>
  );
}
