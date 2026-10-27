import { useMemo, useState } from 'react';
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
    technologies: ['Python', 'JAVA', 'SQL', 'MongoDB', 'PostgreSQL', 'FAST API', 'Django', 'Spring Boot', 'Hibernate', 'Redis'],
  },
  {
    key: 'cloud',
    icon: Cloud,
    title: 'Cloud',
    short: 'Cloud',
    technologies: ['AWS EC2', 'Lambda', 'S3', 'RDS', 'API Gateway', 'CloudWatch', 'GCP', 'Compute Engine', 'Cloud SQL', 'NLP'],
  },
  {
    key: 'ai',
    icon: BrainCircuit,
    title: 'AI, Machine Learning and Analytics',
    short: 'AI / ML',
    technologies: ['N8n', 'LangChain', 'NLP', 'LLM', 'Scikit Learn', 'TensorFlow'],
  },
  {
    key: 'testing',
    icon: FlaskConical,
    title: 'Software Testing',
    short: 'Testing',
    technologies: ['JUnit', 'PyUnit', 'Mockito', 'Cucumber', 'Selenium', 'Playwright'],
  },
  {
    key: 'web',
    icon: Globe,
    title: 'Web Technologies',
    short: 'Web',
    technologies: ['REST APIs', 'GraphQL', 'WebSockets', 'gRPC'],
  },
  {
    key: 'data',
    icon: DatabaseIcon,
    title: 'Data Engineering',
    short: 'Data',
    technologies: ['Apache Airflow', 'PySpark', 'Power BI', 'Hadoop', 'OLAP', 'OLTP'],
  },
  {
    key: 'devops',
    icon: GitBranch,
    title: 'DevOps',
    short: 'DevOps',
    technologies: ['GitLab', 'GitHub Actions', 'Docker', 'Jenkins'],
  },
] as const;

type ClusterKey = (typeof skillClusters)[number]['key'];

const STYLES: Record<ClusterKey, { hub: string; ring: string; dot: string; line: string; chipBg: string; chipText: string; chipBorder: string }> = {
  backend: {
    hub: 'fill-signal-blue',
    ring: 'stroke-signal-blue',
    dot: 'fill-signal-blue',
    line: 'stroke-signal-blue',
    chipBg: 'bg-signal-blue/15',
    chipText: 'text-signal-blue',
    chipBorder: 'border-signal-blue/30',
  },
  cloud: {
    hub: 'fill-signal-cyan',
    ring: 'stroke-signal-cyan',
    dot: 'fill-signal-cyan',
    line: 'stroke-signal-cyan',
    chipBg: 'bg-signal-cyan/15',
    chipText: 'text-signal-cyan',
    chipBorder: 'border-signal-cyan/30',
  },
  ai: {
    hub: 'fill-signal-violet',
    ring: 'stroke-signal-violet',
    dot: 'fill-signal-violet',
    line: 'stroke-signal-violet',
    chipBg: 'bg-signal-violet/15',
    chipText: 'text-signal-violet',
    chipBorder: 'border-signal-violet/30',
  },
  testing: {
    hub: 'fill-signal-amber',
    ring: 'stroke-signal-amber',
    dot: 'fill-signal-amber',
    line: 'stroke-signal-amber',
    chipBg: 'bg-signal-amber/15',
    chipText: 'text-signal-amber',
    chipBorder: 'border-signal-amber/30',
  },
  web: {
    hub: 'fill-signal-emerald',
    ring: 'stroke-signal-emerald',
    dot: 'fill-signal-emerald',
    line: 'stroke-signal-emerald',
    chipBg: 'bg-signal-emerald/15',
    chipText: 'text-signal-emerald',
    chipBorder: 'border-signal-emerald/30',
  },
  data: {
    hub: 'fill-signal-rose',
    ring: 'stroke-signal-rose',
    dot: 'fill-signal-rose',
    line: 'stroke-signal-rose',
    chipBg: 'bg-signal-rose/15',
    chipText: 'text-signal-rose',
    chipBorder: 'border-signal-rose/30',
  },
  devops: {
    hub: 'fill-signal-indigo',
    ring: 'stroke-signal-indigo',
    dot: 'fill-signal-indigo',
    line: 'stroke-signal-indigo',
    chipBg: 'bg-signal-indigo/15',
    chipText: 'text-signal-indigo',
    chipBorder: 'border-signal-indigo/30',
  },
};

const VIEW = 760;

type SkillsProps = {
  embedded?: boolean;
};

export function Skills({ embedded = false }: SkillsProps) {
  const [hovered, setHovered] = useState<ClusterKey | null>(null);
  const [pinned, setPinned] = useState<ClusterKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState<ClusterKey | null>(null);
  const focusKey = pinned ?? hovered;

  const layout = useMemo(() => {
    const centerX = VIEW / 2;
    const centerY = VIEW / 2;
    const R = 225;
    const N = skillClusters.length;

    return skillClusters.map((cluster, i) => {
      const angle = -Math.PI / 2 + i * ((2 * Math.PI) / N);
      const cx = centerX + R * Math.cos(angle);
      const cy = centerY + R * Math.sin(angle);
      const rSat = 40 + Math.min(cluster.technologies.length, 10) * 5;

      const nodes = cluster.technologies.map((label, j) => {
        const a = -Math.PI / 2 + j * ((2 * Math.PI) / cluster.technologies.length);
        const ux = Math.cos(a);
        const uy = Math.sin(a);
        return {
          label,
          x: cx + rSat * ux,
          y: cy + rSat * uy,
          labelX: cx + (rSat + 12) * ux,
          labelY: cy + (rSat + 12) * uy + 3,
          anchor: ux > 0.2 ? 'start' : ux < -0.2 ? 'end' : 'middle',
        };
      });

      return { ...cluster, cx, cy, nodes };
    });
  }, []);

  const toggle = (key: ClusterKey) => setPinned((prev) => (prev === key ? null : key));

  const graph = (
    <>
      <div className="hidden md:block">
        <p className="text-center text-xs text-stage-muted mb-4 tracking-wide uppercase">
          Hover to preview · click to pin
        </p>
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="w-full max-w-xl mx-auto lg:max-w-2xl"
          style={{ overflow: 'visible' }}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setPinned(null)}
        >
          {layout.map((cluster) => {
            const Icon = cluster.icon;
            const s = STYLES[cluster.key];
            const isFocused = focusKey === cluster.key;
            const isDimmed = focusKey !== null && !isFocused;
            const hubR = isFocused ? 28 : 24;

            return (
              <g
                key={cluster.key}
                onMouseLeave={() => setHovered((prev) => (prev === cluster.key ? null : prev))}
                className={`transition-opacity duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
              >
                {cluster.nodes.map((node) => (
                  <line
                    key={node.label}
                    x1={cluster.cx}
                    y1={cluster.cy}
                    x2={node.x}
                    y2={node.y}
                    className={`${s.line} transition-all duration-300`}
                    strokeWidth={isFocused ? 1.6 : 1}
                    style={{ opacity: isFocused ? 0.85 : 0.3 }}
                  />
                ))}

                {cluster.nodes.map((node) => (
                  <g
                    key={node.label}
                    onMouseEnter={() => setHovered(cluster.key)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(cluster.key);
                    }}
                    className="cursor-pointer"
                  >
                    <title>{node.label}</title>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isFocused ? 5 : 3.5}
                      strokeWidth={1.5}
                      className={`${s.dot} stroke-stage transition-all duration-300`}
                    />
                    <text
                      x={node.labelX}
                      y={node.labelY}
                      textAnchor={node.anchor}
                      style={{ fontSize: 11 }}
                      className={`fill-stage-ink pointer-events-none select-none transition-opacity duration-200 ${
                        isFocused ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}

                <g
                  onMouseEnter={() => setHovered(cluster.key)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(cluster.key);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(cluster.key);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={cluster.title}
                  aria-pressed={pinned === cluster.key}
                  className="cursor-pointer focus:outline-none"
                >
                  <title>{cluster.title}</title>
                  <circle
                    cx={cluster.cx}
                    cy={cluster.cy}
                    r={32}
                    strokeWidth={2}
                    className={`${s.ring} fill-none transition-opacity duration-300 ${
                      isFocused ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <circle
                    cx={cluster.cx}
                    cy={cluster.cy}
                    r={hubR}
                    strokeWidth={3}
                    className={`${s.hub} stroke-stage transition-all duration-300`}
                  />
                  <foreignObject x={cluster.cx - 10} y={cluster.cy - 10} width={20} height={20} className="pointer-events-none">
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </foreignObject>
                  <text
                    x={cluster.cx}
                    y={cluster.cy + hubR + 16}
                    textAnchor="middle"
                    style={{ fontSize: 12, fontWeight: 600 }}
                    className="fill-stage-ink transition-all duration-300"
                  >
                    {cluster.short}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="md:hidden space-y-2">
        {skillClusters.map((cluster) => {
          const Icon = cluster.icon;
          const s = STYLES[cluster.key];
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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${s.chipBg}`}>
                  <Icon className={`w-5 h-5 ${s.chipText}`} />
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
                        className={`px-3 py-1 rounded-full text-sm border ${s.chipBg} ${s.chipText} ${s.chipBorder}`}
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
    </>
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
