'use client';

import { useState, useEffect } from 'react';

type ScoreGaugeProps = {
  value: number;
};

export function ScoreGauge({ value }: ScoreGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setAnimatedValue(value));
    return () => cancelAnimationFrame(animation);
  }, [value]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  const scoreColor =
    value >= 85
      ? 'hsl(var(--primary))'
      : value >= 60
      ? 'hsl(var(--secondary))'
      : 'hsl(var(--destructive))';

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-muted/30"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="url(#scoreGradient)"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
        <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold font-headline"
          style={{ color: scoreColor }}
        >
          {Math.round(animatedValue)}
        </span>
        <span className="text-sm text-muted-foreground">Match Score</span>
      </div>
    </div>
  );
}
