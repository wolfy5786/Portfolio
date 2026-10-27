import { useEffect, useRef, useState, useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import {
  Server,
  Cloud,
  BrainCircuit,
  LineChart,
  FlaskConical,
  Globe,
  Database as DatabaseIcon,
  GitBranch,
  Cpu,
  ChevronDown,
} from 'lucide-react';
import { findBestProjectId, scrollToProject } from '../data/projectTargets';

function sorted(list: string[]) {
  return [...list].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

const skillClusters = [
  {
    key: 'backend',
    icon: Server,
    title: 'Backend Engineering',
    short: 'Backend',
    color: 'var(--signal-blue)',
    technologies: sorted([
      'Python',
      'JAVA',
      'SQL',
      'MongoDB',
      'PostgreSQL',
      'FAST API',
      'Django',
      'Spring Boot',
      'Hibernate',
      'Redis',
    ]),
  },
  {
    key: 'cloud',
    icon: Cloud,
    title: 'Cloud',
    short: 'Cloud',
    color: 'var(--signal-cyan)',
    technologies: sorted([
      'AWS EC2',
      'Lambda',
      'S3',
      'RDS',
      'API Gateway',
      'CloudWatch',
      'GCP',
      'Compute Engine',
      'Cloud SQL',
    ]),
  },
  {
    key: 'ai',
    icon: BrainCircuit,
    title: 'Artificial Intelligence',
    short: 'AI',
    color: 'var(--signal-violet)',
    technologies: sorted([
      'Agentic AI',
      'LangChain',
      'LangGraph',
      'LLM',
      'MCP',
      'N8n',
      'NLP',
      'RAG',
      'Workflow automation',
    ]),
  },
  {
    key: 'ml',
    icon: LineChart,
    title: 'Machine Learning',
    short: 'ML',
    color: 'var(--signal-orange)',
    technologies: sorted(['CUDA', 'PyTorch', 'Scikit Learn', 'TensorFlow']),
  },
  {
    key: 'systems',
    icon: Cpu,
    title: 'System Engineering',
    short: 'Systems',
    color: 'var(--signal-teal)',
    technologies: sorted(['GPU', 'MPI', 'OpenMP', 'Performance optimization', 'SIMD']),
  },
  {
    key: 'testing',
    icon: FlaskConical,
    title: 'Software Testing',
    short: 'Testing',
    color: 'var(--signal-amber)',
    technologies: sorted(['JUnit', 'PyUnit', 'Mockito', 'Cucumber', 'Selenium', 'Playwright']),
  },
  {
    key: 'web',
    icon: Globe,
    title: 'Web Technologies',
    short: 'Web',
    color: 'var(--signal-emerald)',
    technologies: sorted(['REST APIs', 'GraphQL', 'WebSockets', 'gRPC']),
  },
  {
    key: 'data',
    icon: DatabaseIcon,
    title: 'Data Engineering',
    short: 'Data',
    color: 'var(--signal-rose)',
    technologies: sorted(['Apache Airflow', 'PySpark', 'Power BI', 'Hadoop', 'OLAP', 'OLTP']),
  },
  {
    key: 'devops',
    icon: GitBranch,
    title: 'DevOps',
    short: 'DevOps',
    color: 'var(--signal-indigo)',
    technologies: sorted(['GitLab', 'GitHub Actions', 'Docker', 'Jenkins']),
  },
] as const;

type ClusterKey = (typeof skillClusters)[number]['key'];
type NodeId = ClusterKey | `tech:${ClusterKey}:${string}`;

type Vec = { x: number; y: number };

type Drift = {
  phaseX: number;
  phaseY: number;
  ampX: number;
  ampY: number;
  speedX: number;
  speedY: number;
};

const HUB_R = 28;
const SUB_R = 11;
const VIEW_W = 860;
const VIEW_H = 680;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function techId(cluster: ClusterKey, tech: string): NodeId {
  return `tech:${cluster}:${tech}`;
}

function buildInitialHomes(): Record<string, Vec> {
  const rand = mulberry32(42);
  const homes: Record<string, Vec> = {};
  const placed: Vec[] = [];

  const place = (id: string, pad: number, prefer?: Vec) => {
    let best: Vec | null = null;
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 40; attempt++) {
      const candidate = prefer
        ? {
            x: prefer.x + (rand() - 0.5) * 220,
            y: prefer.y + (rand() - 0.5) * 220,
          }
        : {
            x: pad + rand() * (VIEW_W - pad * 2),
            y: pad + rand() * (VIEW_H - pad * 2),
          };

      candidate.x = Math.min(VIEW_W - pad, Math.max(pad, candidate.x));
      candidate.y = Math.min(VIEW_H - pad, Math.max(pad, candidate.y));

      let minDist = Infinity;
      for (const p of placed) {
        const d = Math.hypot(candidate.x - p.x, candidate.y - p.y);
        minDist = Math.min(minDist, d);
      }

      // Prefer some overlap / tangle: reward modest distances, not large clearances
      const score = minDist < 18 ? minDist * 0.2 : Math.min(minDist, 70);
      if (score > bestScore) {
        bestScore = score;
        best = candidate;
      }
    }

    const pos = best ?? { x: VIEW_W / 2, y: VIEW_H / 2 };
    homes[id] = pos;
    placed.push(pos);
  };

  for (const cluster of skillClusters) {
    place(cluster.key, HUB_R + 8);
  }

  for (const cluster of skillClusters) {
    const hub = homes[cluster.key];
    for (const tech of cluster.technologies) {
      place(techId(cluster.key, tech), SUB_R + 4, hub);
    }
  }

  return homes;
}

function buildDrift(ids: string[]): Record<string, Drift> {
  const rand = mulberry32(99);
  const out: Record<string, Drift> = {};
  for (const id of ids) {
    const isHub = !id.startsWith('tech:');
    out[id] = {
      phaseX: rand() * Math.PI * 2,
      phaseY: rand() * Math.PI * 2,
      ampX: (isHub ? 14 : 18) + rand() * (isHub ? 18 : 28),
      ampY: (isHub ? 14 : 18) + rand() * (isHub ? 18 : 28),
      speedX: 0.25 + rand() * 0.55,
      speedY: 0.22 + rand() * 0.6,
    };
  }
  return out;
}

type SkillsProps = {
  embedded?: boolean;
};

export function Skills({ embedded = false }: SkillsProps) {
  const homesRef = useRef(buildInitialHomes());
  const allIdsRef = useRef(Object.keys(homesRef.current));
  const driftRef = useRef(buildDrift(allIdsRef.current));
  const [positions, setPositions] = useState<Record<string, Vec>>(() => ({ ...homesRef.current }));
  const [hoveredCluster, setHoveredCluster] = useState<ClusterKey | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<ClusterKey | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const positionsRef = useRef(positions);
  const draggingRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);
  const pendingClickRef = useRef<{ clusterKey: ClusterKey; skillLabel?: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(performance.now());

  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = (now: number) => {
      const t = (now - t0Ref.current) / 1000;
      const next = { ...positionsRef.current };
      let changed = false;

      for (const id of allIdsRef.current) {
        if (draggingRef.current === id) continue;
        const home = homesRef.current[id];
        const d = driftRef.current[id];
        if (!home || !d) continue;

        const x = home.x + Math.sin(t * d.speedX + d.phaseX) * d.ampX;
        const y = home.y + Math.cos(t * d.speedY + d.phaseY) * d.ampY;
        const prev = next[id];
        if (!prev || Math.abs(x - prev.x) > 0.04 || Math.abs(y - prev.y) > 0.04) {
          next[id] = { x, y };
          changed = true;
        }
      }

      if (changed) {
        positionsRef.current = next;
        setPositions(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  const clientToSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }, []);

  const clamp = (x: number, y: number, r: number) => ({
    x: Math.min(VIEW_W - r, Math.max(r, x)),
    y: Math.min(VIEW_H - r, Math.max(r, y)),
  });

  const onNodePointerDown = (
    id: string,
    e: ReactPointerEvent<SVGGElement>,
    clickMeta: { clusterKey: ClusterKey; skillLabel?: string },
  ) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const local = clientToSvg(e.clientX, e.clientY);
    const pos = positionsRef.current[id];
    dragOffsetRef.current = { x: local.x - pos.x, y: local.y - pos.y };
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    didDragRef.current = false;
    pendingClickRef.current = clickMeta;
    draggingRef.current = id;
    setDragging(id);
  };

  const onSvgPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const id = draggingRef.current;
    if (!id) return;

    const moved = Math.hypot(e.clientX - pointerStartRef.current.x, e.clientY - pointerStartRef.current.y);
    if (moved > 5) didDragRef.current = true;

    const local = clientToSvg(e.clientX, e.clientY);
    const r = id.startsWith('tech:') ? SUB_R : HUB_R;
    const nextPos = clamp(local.x - dragOffsetRef.current.x, local.y - dragOffsetRef.current.y, r);
    homesRef.current[id] = nextPos;
    const next = { ...positionsRef.current, [id]: nextPos };
    positionsRef.current = next;
    setPositions(next);
  };

  const navigateForSkill = (skill: string, clusterKey: ClusterKey) => {
    const cluster = skillClusters.find((c) => c.key === clusterKey);
    const projectId = findBestProjectId(skill, cluster ? [...cluster.technologies] : []);
    if (projectId) scrollToProject(projectId);
  };

  const endDrag = (e: ReactPointerEvent) => {
    const key = draggingRef.current;
    if (!key) return;

    const pos = positionsRef.current[key];
    homesRef.current[key] = { ...pos };
    draggingRef.current = null;
    setDragging(null);

    try {
      (e.currentTarget as Element)?.releasePointerCapture?.(e.pointerId);
    } catch {
      /* already released */
    }

    const wasClick = !didDragRef.current;
    const pending = pendingClickRef.current;
    pendingClickRef.current = null;

    if (wasClick && pending) {
      if (pending.skillLabel) {
        navigateForSkill(pending.skillLabel, pending.clusterKey);
      } else {
        const cluster = skillClusters.find((c) => c.key === pending.clusterKey);
        if (cluster) navigateForSkill(cluster.title, pending.clusterKey);
      }
    }
  };

  const edges: Array<[ClusterKey, ClusterKey]> = [];
  for (let i = 0; i < skillClusters.length; i++) {
    for (let j = i + 1; j < skillClusters.length; j++) {
      edges.push([skillClusters[i].key, skillClusters[j].key]);
    }
  }

  const focus = hoveredCluster;

  const graph = (
    <div className="relative w-full">
      <p className="hidden md:block text-center text-xs text-stage-muted mb-3 tracking-wide uppercase">
        Drag to tangle · hover to highlight · click a skill to jump to a project
      </p>

      <div className="hidden md:block relative w-full aspect-[860/680] max-h-[min(680px,74vh)]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-full touch-none select-none"
          style={{ overflow: 'visible' }}
          onPointerMove={onSvgPointerMove}
          onPointerUp={(e) => endDrag(e)}
          onPointerCancel={(e) => endDrag(e)}
          onPointerLeave={() => {
            if (!draggingRef.current) {
              setHoveredCluster(null);
              setHoveredTech(null);
            }
          }}
        >
          <defs>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="metal-green" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#e8fff2" />
              <stop offset="22%" stopColor="#7dffb0" />
              <stop offset="48%" stopColor="#22c55e" />
              <stop offset="78%" stopColor="#0f7a42" />
              <stop offset="100%" stopColor="#05301a" />
            </radialGradient>

            <radialGradient id="metal-green-spec" cx="30%" cy="26%" r="40%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {skillClusters.map((cluster) => (
              <radialGradient key={`grad-${cluster.key}`} id={`metal-${cluster.key}`} cx="32%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="28%" stopColor={cluster.color} stopOpacity="0.95" />
                <stop offset="70%" stopColor={cluster.color} stopOpacity="1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
              </radialGradient>
            ))}
          </defs>

          {edges.map(([a, b]) => {
            const na = positions[a];
            const nb = positions[b];
            if (!na || !nb) return null;
            const involved = focus === a || focus === b;
            const dimmed = focus !== null && !involved;
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="var(--stage-ink)"
                strokeOpacity={dimmed ? 0.03 : involved ? 0.28 : 0.08}
                strokeWidth={involved ? 1.5 : 1}
              />
            );
          })}

          {skillClusters.map((cluster) => {
            const hub = positions[cluster.key];
            if (!hub) return null;
            const isFocus = focus === cluster.key;
            const muted = focus !== null && !isFocus;

            return (
              <g key={`links-${cluster.key}`}>
                {cluster.technologies.map((tech) => {
                  const id = techId(cluster.key, tech);
                  const sat = positions[id];
                  if (!sat) return null;
                  return (
                    <line
                      key={`link-${id}`}
                      x1={hub.x}
                      y1={hub.y}
                      x2={sat.x}
                      y2={sat.y}
                      stroke={isFocus ? cluster.color : 'var(--stage-ink)'}
                      strokeOpacity={muted ? 0.04 : isFocus ? 0.45 : 0.12}
                      strokeWidth={isFocus ? 1.2 : 0.7}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Subnodes: smaller metallic balls; green when idle */}
          {skillClusters.map((cluster) => {
            const isFocus = focus === cluster.key;
            const muted = focus !== null && !isFocus;

            return cluster.technologies.map((tech) => {
              const id = techId(cluster.key, tech);
              const pos = positions[id];
              if (!pos) return null;
              const techFocused = isFocus || hoveredTech === id;
              const r = techFocused ? SUB_R + 2 : SUB_R;

              return (
                <g
                  key={id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  opacity={muted ? 0.18 : 1}
                  onPointerDown={(e) => onNodePointerDown(id, e, { clusterKey: cluster.key, skillLabel: tech })}
                  onPointerEnter={() => {
                    if (!draggingRef.current) {
                      setHoveredCluster(cluster.key);
                      setHoveredTech(id);
                    }
                  }}
                  onPointerLeave={() => {
                    if (!draggingRef.current) setHoveredTech(null);
                  }}
                  className={`${dragging === id ? 'cursor-grabbing' : 'cursor-pointer'} transition-opacity duration-200`}
                  style={{ touchAction: 'none' }}
                >
                  <title>{tech} — click to open a matching project</title>
                  <circle r={r + 6} fill="transparent" />
                  <circle
                    r={r}
                    fill={techFocused ? `url(#metal-${cluster.key})` : 'url(#metal-green)'}
                    stroke={techFocused ? cluster.color : '#86efac'}
                    strokeWidth={techFocused ? 1.6 : 1}
                    filter={techFocused ? 'url(#node-glow)' : undefined}
                  />
                  <circle r={r * 0.55} fill="url(#metal-green-spec)" className="pointer-events-none" />
                  <text
                    y={r + 12}
                    textAnchor="middle"
                    style={{ fontSize: techFocused ? 10 : 8, fontWeight: techFocused ? 600 : 500 }}
                    fill="var(--stage-ink)"
                    fillOpacity={techFocused ? 1 : 0}
                    className="pointer-events-none select-none transition-opacity"
                  >
                    {tech}
                  </text>
                </g>
              );
            });
          })}

          {skillClusters.map((cluster) => {
            const pos = positions[cluster.key];
            if (!pos) return null;
            const Icon = cluster.icon;
            const isFocus = focus === cluster.key;
            const isDragging = dragging === cluster.key;
            const dimmed = focus !== null && !isFocus;
            const r = isFocus || isDragging ? HUB_R + 2 : HUB_R;

            return (
              <g
                key={cluster.key}
                transform={`translate(${pos.x}, ${pos.y})`}
                onPointerDown={(e) => onNodePointerDown(cluster.key, e, { clusterKey: cluster.key })}
                onPointerEnter={() => {
                  if (!draggingRef.current) setHoveredCluster(cluster.key);
                }}
                className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
                  dimmed ? 'opacity-35' : 'opacity-100'
                } transition-opacity duration-200`}
                style={{ touchAction: 'none' }}
              >
                <title>{cluster.title} — click to open a matching project</title>
                <circle r={HUB_R + 10} fill="transparent" />
                <circle
                  r={r}
                  fill={`url(#metal-${cluster.key})`}
                  stroke={cluster.color}
                  strokeWidth={isFocus || isDragging ? 2.4 : 1.5}
                  filter={isFocus ? 'url(#node-glow)' : undefined}
                />
                <circle r={r * 0.42} fill="url(#metal-green-spec)" className="pointer-events-none" />
                <foreignObject x={-9} y={-9} width={18} height={18} className="pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white drop-shadow" />
                  </div>
                </foreignObject>
                <text
                  y={HUB_R + 14}
                  textAnchor="middle"
                  style={{ fontSize: 11, fontWeight: 600 }}
                  fill="var(--stage-ink)"
                  className="pointer-events-none select-none"
                >
                  {cluster.short}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="md:hidden space-y-2">
        <p className="text-center text-xs text-stage-muted mb-3 tracking-wide uppercase">
          Tap a skill to open a matching project
        </p>
        {skillClusters.map((cluster) => {
          const Icon = cluster.icon;
          const isOpen = mobileOpen === cluster.key;

          return (
            <div
              key={cluster.key}
              className="rounded-xl border border-stage-line bg-stage-elevated/60 overflow-hidden"
            >
              <button
                onClick={() => setMobileOpen(isOpen ? null : cluster.key)}
                className="w-full flex items-center gap-3 p-4 text-left"
                aria-expanded={isOpen}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: cluster.color }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="flex-1 text-stage-ink">{cluster.title}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stage-muted transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-2 px-4 pb-4">
                    {cluster.technologies.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => navigateForSkill(tech, cluster.key)}
                        className="px-3 py-1 rounded-full text-sm border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (embedded) {
    return <div className="w-full">{graph}</div>;
  }

  return (
    <section id="skills" className="py-20 px-4 bg-stage">
      <div className="max-w-6xl mx-auto">{graph}</div>
    </section>
  );
}
