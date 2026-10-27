import type { ReactNode } from 'react';

type MotifProps = {
  className?: string;
};

function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 480 280" className={`w-full h-full ${className}`} aria-hidden="true">
      <rect width="480" height="280" fill="var(--stage-elevated)" />
      {children}
    </svg>
  );
}

export function GraphRagMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <circle cx="120" cy="140" r="18" fill="var(--signal-violet)" />
      <circle cx="240" cy="80" r="14" fill="var(--signal-cyan)" />
      <circle cx="240" cy="200" r="14" fill="var(--signal-emerald)" />
      <circle cx="360" cy="140" r="18" fill="var(--signal-blue)" />
      <circle cx="300" cy="120" r="8" fill="var(--signal-amber)" />
      <circle cx="180" cy="170" r="8" fill="var(--signal-rose)" />
      <path d="M138 140 L222 88 M138 140 L222 192 M254 88 L342 140 M254 192 L342 140 M254 88 L254 192 M292 120 L342 140 M188 170 L222 192" stroke="var(--stage-ink)" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <path d="M80 230 H400" stroke="var(--stage-line)" strokeWidth="1" />
      <rect x="90" y="220" width="40" height="6" rx="2" fill="var(--signal-violet)" opacity="0.7" />
      <rect x="150" y="220" width="70" height="6" rx="2" fill="var(--signal-cyan)" opacity="0.5" />
      <rect x="240" y="220" width="55" height="6" rx="2" fill="var(--signal-emerald)" opacity="0.5" />
    </Frame>
  );
}

export function EyeAiMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <rect x="40" y="40" width="160" height="100" rx="8" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" />
      <rect x="60" y="55" width="50" height="35" rx="3" fill="var(--signal-cyan)" opacity="0.35" />
      <rect x="120" y="55" width="50" height="35" rx="3" fill="var(--signal-blue)" opacity="0.35" />
      <rect x="60" y="100" width="110" height="25" rx="3" fill="var(--signal-emerald)" opacity="0.25" />
      <circle cx="320" cy="120" r="55" fill="none" stroke="var(--signal-rose)" strokeWidth="2" />
      <circle cx="320" cy="120" r="22" fill="var(--signal-rose)" opacity="0.5" />
      <path d="M200 90 Q250 60 280 95" stroke="var(--signal-amber)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <path d="M80 200 L160 240 L280 190 L400 230" stroke="var(--stage-ink)" strokeOpacity="0.4" strokeWidth="2" fill="none" />
      <circle cx="160" cy="240" r="5" fill="var(--signal-amber)" />
      <circle cx="280" cy="190" r="5" fill="var(--signal-emerald)" />
    </Frame>
  );
}

export function BigWriterMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <rect x="70" y="50" width="120" height="160" rx="6" fill="var(--stage)" stroke="var(--signal-violet)" strokeWidth="2" />
      <rect x="90" y="70" width="80" height="8" rx="2" fill="var(--signal-violet)" opacity="0.6" />
      <rect x="90" y="90" width="65" height="6" rx="2" fill="var(--stage-ink)" opacity="0.25" />
      <rect x="90" y="105" width="75" height="6" rx="2" fill="var(--stage-ink)" opacity="0.2" />
      <rect x="90" y="120" width="55" height="6" rx="2" fill="var(--stage-ink)" opacity="0.2" />
      <circle cx="300" cy="100" r="40" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" />
      <circle cx="340" cy="150" r="28" fill="none" stroke="var(--signal-emerald)" strokeWidth="2" />
      <circle cx="270" cy="170" r="22" fill="none" stroke="var(--signal-amber)" strokeWidth="2" />
      <path d="M190 120 L250 110" stroke="var(--stage-ink)" strokeOpacity="0.3" strokeWidth="2" />
    </Frame>
  );
}

export function RagMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <rect x="60" y="55" width="100" height="130" rx="4" fill="var(--stage)" stroke="var(--signal-blue)" strokeWidth="2" transform="rotate(-6 110 120)" />
      <rect x="95" y="45" width="100" height="130" rx="4" fill="var(--stage)" stroke="var(--signal-cyan)" strokeWidth="2" />
      <rect x="130" y="60" width="100" height="130" rx="4" fill="var(--stage)" stroke="var(--signal-emerald)" strokeWidth="2" transform="rotate(5 180 125)" />
      <path d="M260 100 H340 V160 H260 Z" fill="none" stroke="var(--signal-amber)" strokeWidth="2" />
      <circle cx="380" cy="130" r="28" fill="var(--signal-violet)" opacity="0.4" />
      <path d="M340 130 H352" stroke="var(--stage-ink)" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="150" y="80" width="50" height="6" rx="2" fill="var(--stage-ink)" opacity="0.2" />
      <rect x="150" y="95" width="40" height="6" rx="2" fill="var(--stage-ink)" opacity="0.15" />
    </Frame>
  );
}

export function OutboundMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <circle cx="80" cy="140" r="16" fill="var(--signal-blue)" />
      <circle cx="170" cy="90" r="12" fill="var(--signal-cyan)" />
      <circle cx="170" cy="190" r="12" fill="var(--signal-emerald)" />
      <circle cx="270" cy="140" r="16" fill="var(--signal-amber)" />
      <circle cx="360" cy="100" r="12" fill="var(--signal-rose)" />
      <circle cx="360" cy="180" r="12" fill="var(--signal-violet)" />
      <path d="M96 140 H154 M96 140 Q130 140 158 98 M96 140 Q130 140 158 182 M186 98 Q220 100 254 132 M186 182 Q220 180 254 148 M286 140 Q320 120 348 108 M286 140 Q320 160 348 172" stroke="var(--stage-ink)" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <path d="M250 70 L270 55 L290 70 L270 85 Z" fill="var(--signal-amber)" opacity="0.7" />
    </Frame>
  );
}

export function EventBriteMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <rect x="50" y="70" width="90" height="60" rx="8" fill="var(--signal-blue)" opacity="0.35" stroke="var(--signal-blue)" strokeWidth="2" />
      <rect x="170" y="70" width="90" height="60" rx="8" fill="var(--signal-cyan)" opacity="0.35" stroke="var(--signal-cyan)" strokeWidth="2" />
      <rect x="290" y="70" width="90" height="60" rx="8" fill="var(--signal-emerald)" opacity="0.35" stroke="var(--signal-emerald)" strokeWidth="2" />
      <rect x="110" y="160" width="90" height="60" rx="8" fill="var(--signal-amber)" opacity="0.35" stroke="var(--signal-amber)" strokeWidth="2" />
      <rect x="230" y="160" width="90" height="60" rx="8" fill="var(--signal-violet)" opacity="0.35" stroke="var(--signal-violet)" strokeWidth="2" />
      <path d="M95 130 V160 M215 130 V160 M335 130 V190 M155 160 H200 M275 160 H290" stroke="var(--stage-ink)" strokeOpacity="0.3" strokeWidth="2" />
    </Frame>
  );
}

export function ChaosMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <circle cx="120" cy="140" r="30" fill="none" stroke="var(--signal-emerald)" strokeWidth="2" />
      <circle cx="240" cy="140" r="30" fill="none" stroke="var(--signal-cyan)" strokeWidth="2" />
      <circle cx="360" cy="140" r="30" fill="none" stroke="var(--signal-blue)" strokeWidth="2" />
      <path d="M150 140 H210 M270 140 H330" stroke="var(--stage-ink)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 4" />
      <path d="M220 100 L240 70 L260 100" fill="var(--signal-rose)" />
      <path d="M230 175 L250 220 L270 175" fill="none" stroke="var(--signal-amber)" strokeWidth="3" />
      <circle cx="240" cy="140" r="6" fill="var(--signal-rose)" />
    </Frame>
  );
}

export function CricketMotif({ className }: MotifProps) {
  return (
    <Frame className={className}>
      <path d="M40 200 L100 160 L160 175 L220 90 L280 130 L340 70 L440 110" fill="none" stroke="var(--signal-amber)" strokeWidth="3" />
      <path d="M40 220 H440" stroke="var(--stage-line)" strokeWidth="1" />
      <path d="M40 60 V220 M40 60 H50" stroke="var(--stage-ink)" strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="220" cy="90" r="6" fill="var(--signal-cyan)" />
      <circle cx="340" cy="70" r="6" fill="var(--signal-emerald)" />
      <rect x="300" y="160" width="100" height="50" rx="6" fill="var(--stage)" stroke="var(--signal-blue)" strokeWidth="2" />
      <rect x="315" y="175" width="40" height="6" rx="2" fill="var(--signal-blue)" opacity="0.5" />
      <rect x="315" y="188" width="70" height="6" rx="2" fill="var(--stage-ink)" opacity="0.2" />
    </Frame>
  );
}
