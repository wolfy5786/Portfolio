import { useEffect, useRef, useState, useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import {
  Server,
  Cloud,
  BrainCircuit,
  FlaskConical,
  Globe,
  Database as DatabaseIcon,
  GitBranch,
  ChevronDown,
} from 'lucide-react';

const skillClusters = [
  {
    key: 'backend',
    icon: Server,
    title: 'Backend Engineering',
    short: 'Backend',
    color: 'var(--signal-blue)',
    technologies: ['Python', 'JAVA', 'SQL', 'MongoDB', 'PostgreSQL', 'FAST API', 'Django', 'Spring Boot', 'Hibernate', 'Redis'],
  },
  {
    key: 'cloud',
    icon: Cloud,
    title: 'Cloud',
    short: 'Cloud',
    color: 'var(--signal-cyan)',
    technologies: ['AWS EC2', 'Lambda', 'S3', 'RDS', 'API Gateway', 'CloudWatch', 'GCP', 'Compute Engine', 'Cloud SQL'],
  },
  {
    key: 'ai',
    icon: BrainCircuit,
    title: 'AI, Machine Learning and Analytics',
    short: 'AI / ML',
    color: 'var(--signal-violet)',
    technologies: ['N8n', 'LangChain', 'NLP', 'LLM', 'Scikit Learn', 'TensorFlow'],
  },
  {
    key: 'testing',
    icon: FlaskConical,
    title: 'Software Testing',
    short: 'Testing',
    color: 'var(--signal-amber)',
    technologies: ['JUnit', 'PyUnit', 'Mockito', 'Cucumber', 'Selenium', 'Playwright'],
  },
  {
    key: 'web',
    icon: Globe,
    title: 'Web Technologies',
    short: 'Web',
    color: 'var(--signal-emerald)',
    technologies: ['REST APIs', 'GraphQL', 'WebSockets', 'gRPC'],
  },
  {
    key: 'data',
    icon: DatabaseIcon,
    title: 'Data Engineering',
    short: 'Data',
    color: 'var(--signal-rose)',
    technologies: ['Apache Airflow', 'PySpark', 'Power BI', 'Hadoop', 'OLAP', 'OLTP'],
  },
  {
    key: 'devops',
    icon: GitBranch,
    title: 'DevOps',
    short: 'DevOps',
    color: 'var(--signal-indigo)',
    technologies: ['GitLab', 'GitHub Actions', 'Docker', 'Jenkins'],
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

const NODE_R = 36;
const VIEW_W = 720;
const VIEW_H = 560;

function buildHomes(): Record<ClusterKey, Vec> {
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  const R = 195;
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
      ampX: 12 + Math.random() * 16,
      ampY: 12 + Math.random() * 16,
      speedX: 0.4 + Math.random() * 0.5,
      speedY: 0.35 + Math.random() * 0.55,
    };
  }
  return out;
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

    // Update home immediately so float continues from here after release
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
  const focusCluster = focus ? skillClusters.find((c) => c.key === focus) : null;
  const focusPos = focus ? positions[focus] : null;

  const graph = (
    <div className="relative w-full">
      <p className="hidden md:block text-center text-xs text-stage-muted mb-3 tracking-wide uppercase">
        Drag nodes · hover for subskills
      </p>

      <div className="hidden md:block relative w-full aspect-[720/560] max-h-[min(560px,70vh)]">
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
                strokeOpacity={dimmed ? 0.04 : involved ? 0.3 : 0.14}
                strokeWidth={involved ? 1.6 : 1}
              />
            );
          })}

          {focusCluster && focusPos && (
            <g className="pointer-events-none">
              {focusCluster.technologies.map((tech, i) => {
                const n = focusCluster.technologies.length;
                const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
                const orbit = 82 + (n > 7 ? 10 : 0);
                const sx = focusPos.x + Math.cos(angle) * orbit;
                const sy = focusPos.y + Math.sin(angle) * orbit;
                const labelW = Math.min(124, 10 + tech.length * 6.4);

                return (
                  <g key={tech}>
                    <line
                      x1={focusPos.x}
                      y1={focusPos.y}
                      x2={sx}
                      y2={sy}
                      stroke={focusCluster.color}
                      strokeOpacity={0.5}
                      strokeWidth={1.2}
                    />
                    <rect
                      x={sx - labelW / 2}
                      y={sy - 11}
                      width={labelW}
                      height={22}
                      rx={11}
                      fill="var(--stage-elevated)"
                      stroke={focusCluster.color}
                      strokeOpacity={0.6}
                      strokeWidth={1}
                    />
                    <text
                      x={sx}
                      y={sy + 4}
                      textAnchor="middle"
                      style={{ fontSize: 10, fontWeight: 500 }}
                      fill="var(--stage-ink)"
                    >
                      {tech}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

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
                  dimmed ? 'opacity-25' : 'opacity-100'
                } transition-opacity duration-200`}
                style={{ touchAction: 'none' }}
              >
                {/* Larger hit target */}
                <circle r={NODE_R + 8} fill="transparent" />
                <circle
                  r={isFocus || isDragging ? NODE_R + 4 : NODE_R}
                  fill={cluster.color}
                  fillOpacity={0.18}
                  stroke={cluster.color}
                  strokeWidth={isFocus || isDragging ? 2.5 : 1.5}
                  filter={isFocus ? 'url(#node-glow)' : undefined}
                />
                <circle r={22} fill={cluster.color} />
                <foreignObject x={-10} y={-10} width={20} height={20} className="pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </foreignObject>
                <text
                  y={NODE_R + 16}
                  textAnchor="middle"
                  style={{ fontSize: 12, fontWeight: 600 }}
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
