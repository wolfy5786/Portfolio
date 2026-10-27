import type { CSSProperties } from 'react';

type ColorFieldProps = {
  className?: string;
  density?: 'sparse' | 'normal';
};

const shards = [
  { className: 'color-field__shard--a bg-signal-blue', style: { top: '12%', left: '8%', width: 28, height: 8, borderRadius: 2 } },
  { className: 'color-field__shard--b bg-signal-cyan', style: { top: '22%', right: '12%', width: 10, height: 10, borderRadius: 999 } },
  { className: 'color-field__shard--c bg-signal-amber', style: { top: '48%', left: '4%', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid var(--signal-amber)', background: 'transparent' } },
  { className: 'color-field__shard--a bg-signal-emerald', style: { bottom: '28%', right: '8%', width: 36, height: 4, borderRadius: 2 } },
  { className: 'color-field__shard--b bg-signal-rose', style: { bottom: '18%', left: '14%', width: 12, height: 12, borderRadius: 2 } },
  { className: 'color-field__shard--c bg-signal-violet', style: { top: '68%', right: '18%', width: 22, height: 6, borderRadius: 999 } },
  { className: 'color-field__shard--a bg-signal-indigo', style: { top: '38%', left: '18%', width: 6, height: 24, borderRadius: 2 } },
  { className: 'color-field__shard--b', style: { bottom: '36%', left: '42%', width: 40, height: 2, background: 'var(--signal-cyan)', opacity: 0.7 } },
] as const;

export function ColorField({ className = '', density = 'normal' }: ColorFieldProps) {
  const items = density === 'sparse' ? shards.filter((_, i) => i % 2 === 0) : shards;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((shard, i) => (
        <span
          key={i}
          className={`color-field__shard ${shard.className}`}
          style={shard.style as CSSProperties}
        />
      ))}
      {/* Soft radial washes for atmosphere */}
      <div
        className="absolute -top-24 -right-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--signal-cyan), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--signal-emerald), transparent 70%)' }}
      />
    </div>
  );
}
