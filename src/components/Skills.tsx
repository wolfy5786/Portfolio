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

type Vec = { x: number; y: number };

type Drift = {
  phaseX: number;
  phaseY: number;
  ampX: number;
  ampY: number;
  speedX: number;
  speedY: number;
};

const NODE_R = 32;
const VIEW_W = 820;
const VIEW_H = 640;

function buildHomes(): Record<ClusterKey, Vec> {
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  const R = 220;
  const out = {} as Record<ClusterKey, Vec>;

  skillClusters.forEach((cluster, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / skillClusters.length;
    out[cluster.key] = {
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle),
    };
  });

  return out;
}

function buildDrift(): Record<ClusterKey, Drift> {
  const out = {} as Record<ClusterKey, Drift>;
  for (const cluster of skillClusters) {
    out[cluster.key] = {
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      ampX: 10 + Math.random() * 14,
      ampY: 10 + Math.random() * 14,
      speedX: 0.35 + Math.random() * 0.45,
      speedY: 0.3 + Math.random() * 0.5,
    };
  }
  return out;
}

function satellitePos(cx: number, cy: number, index: number, total: number, orbit: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: cx + Math.cos(angle) * orbit,
    y: cy + Math.sin(angle) * orbit,
  };
}

type SkillsProps = {
  embedded?: boolean;
};

export function Skills({ embedded = false }: SkillsProps) {
  const homesRef = useRef(buildHomes());
  const driftRef = useRef(buildDrift());
  const [positions, setPositions] = useState<Record<ClusterKey, Vec>>(() => ({ ...homesRef.current }));
  const [hovered, setHovered] = useState<ClusterKey | null>(null);
  const [dragging, setDragging] = useState<ClusterKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState<ClusterKey | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const positionsRef = useRef(positions);
  const draggingRef = useRef<ClusterKey | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
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

      for (const cluster of skillClusters) {
        const key = cluster.key;
        if (draggingRef.current === key) continue;

        const home = homesRef.current[key];
        const d = driftRef.current[key];
        const x = home.x + Math.sin(t * d.speedX + d.phaseX) * d.ampX;
        const y = home.y + Math.cos(t * d.speedY + d.phaseY) * d.ampY;
        const prev = next[key];
        if (!prev || Math.abs(x - prev.x) > 0.04 || Math.abs(y - prev.y) > 0.04) {
          next[key] = { x, y };
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

  const clamp = (x: number, y: number) => ({
    x: Math.min(VIEW_W - NODE_R, Math.max(NODE_R, x)),
    y: Math.min(VIEW_H - NODE_R, Math.max(NODE_R, y)),
  });

  const onNodePointerDown = (key: ClusterKey, e: ReactPointerEvent<SVGGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const local = clientToSvg(e.clientX, e.clientY);
    const pos = positionsRef.current[key];
    dragOffsetRef.current = { x: local.x - pos.x, y: local.y - pos.y };
    setDragging(key);
    setHovered(key);
  };

  const onSvgPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const key = draggingRef.current;
    if (!key) return;
    const local = clientToSvg(e.clientX, e.clientY);
    const nextPos = clamp(local.x - dragOffsetRef.current.x, local.y - dragOffsetRef.current.y);
    homesRef.current[key] = nextPos;
    const next = { ...positionsRef.current, [key]: nextPos };
    positionsRef.current = next;
    setPositions(next);
  };

  const endDrag = (e: ReactPointerEvent) => {
    const key = draggingRef.current;
    if (!key) return;
    const pos = positionsRef.current[key];
    homesRef.current[key] = { ...pos };
    try {
      (e.target as Element)?.releasePointerCapture?.(e.pointerId);
    } catch {
      /* already released */
    }
    setDragging(null);
  };

  const edges: Array<[ClusterKey, ClusterKey]> = [];
  for (let i = 0; i < skillClusters.length; i++) {
    for (let j = i + 1; j < skillClusters.length; j++) {
      edges.push([skillClusters[i].key, skillClusters[j].key]);
    }
  }

  const focus = hovered;

  const graph = (
    <div className="relative w-full">
      <p className="hidden md:block text-center text-xs text-stage-muted mb-3 tracking-wide uppercase">
        Drag nodes · hover to highlight subskills
      </p>

      <div className="hidden md:block relative w-full aspect-[820/640] max-h-[min(640px,72vh)]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-full touch-none select-none"
          style={{ overflow: 'visible' }}
          onPointerMove={onSvgPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => {
            if (!draggingRef.current) setHovered(null);
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
                strokeOpacity={dimmed ? 0.03 : involved ? 0.28 : 0.1}
                strokeWidth={involved ? 1.5 : 1}
              />
            );
          })}

          {/* Subnodes always visible; highlight only on hover */}
          {skillClusters.map((cluster) => {
            const pos = positions[cluster.key];
            if (!pos) return null;
            const isFocus = focus === cluster.key;
            const muted = focus !== null && !isFocus;
            const n = cluster.technologies.length;
            const orbit = 70 + Math.min(n, 8) * 2;

            return (
              <g key={`subs-${cluster.key}`} className="pointer-events-none">
                {cluster.technologies.map((tech, i) => {
                  const sat = satellitePos(pos.x, pos.y, i, n, orbit);
                  const labelW = Math.min(118, 8 + tech.length * 5.8);

                  return (
                    <g key={tech} opacity={muted ? 0.12 : isFocus ? 1 : 0.38}>
                      <line
                        x1={pos.x}
                        y1={pos.y}
                        x2={sat.x}
                        y2={sat.y}
                        stroke={cluster.color}
                        strokeOpacity={isFocus ? 0.55 : 0.25}
                        strokeWidth={isFocus ? 1.3 : 0.8}
                      />
                      <circle
                        cx={sat.x}
                        cy={sat.y}
                        r={isFocus ? 4.5 : 3}
                        fill={cluster.color}
                        fillOpacity={isFocus ? 1 : 0.55}
                      />
                      <rect
                        x={sat.x - labelW / 2}
                        y={sat.y - (isFocus ? 12 : 10)}
                        width={labelW}
                        height={isFocus ? 22 : 18}
                        rx={isFocus ? 11 : 9}
                        fill="var(--stage-elevated)"
                        stroke={cluster.color}
                        strokeOpacity={isFocus ? 0.7 : 0.2}
                        strokeWidth={isFocus ? 1.2 : 0.6}
                      />
                      <text
                        x={sat.x}
                        y={sat.y + (isFocus ? 4 : 3)}
                        textAnchor="middle"
                        style={{ fontSize: isFocus ? 10 : 8, fontWeight: isFocus ? 600 : 400 }}
                        fill="var(--stage-ink)"
                        fillOpacity={isFocus ? 1 : 0.55}
                      >
                        {tech}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {skillClusters.map((cluster) => {
            const pos = positions[cluster.key];
            if (!pos) return null;
            const Icon = cluster.icon;
            const isFocus = focus === cluster.key;
            const isDragging = dragging === cluster.key;
            const dimmed = focus !== null && !isFocus;

            return (
              <g
                key={cluster.key}
                transform={`translate(${pos.x}, ${pos.y})`}
                onPointerDown={(e) => onNodePointerDown(cluster.key, e)}
                onPointerEnter={() => {
                  if (!draggingRef.current) setHovered(cluster.key);
                }}
                className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
                  dimmed ? 'opacity-35' : 'opacity-100'
                } transition-opacity duration-200`}
                style={{ touchAction: 'none' }}
              >
                <circle r={NODE_R + 10} fill="transparent" />
                <circle
                  r={isFocus || isDragging ? NODE_R + 3 : NODE_R}
                  fill={cluster.color}
                  fillOpacity={0.18}
                  stroke={cluster.color}
                  strokeWidth={isFocus || isDragging ? 2.5 : 1.5}
                  filter={isFocus ? 'url(#node-glow)' : undefined}
                />
                <circle r={20} fill={cluster.color} />
                <foreignObject x={-9} y={-9} width={18} height={18} className="pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </foreignObject>
                <text
                  y={NODE_R + 14}
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
        <p className="text-center text-xs text-stage-muted mb-3 tracking-wide uppercase">Tap a cluster</p>
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
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm border border-stage-line text-stage-muted"
                      >
                        {tech}
                      </span>
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
