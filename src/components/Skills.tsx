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
    hub: 'fill-blue-500',
    ring: 'stroke-blue-400 dark:stroke-blue-500',
    dot: 'fill-blue-500 dark:fill-blue-400',
    line: 'stroke-blue-400 dark:stroke-blue-500',
    chipBg: 'bg-blue-50 dark:bg-blue-950/40',
    chipText: 'text-blue-700 dark:text-blue-300',
    chipBorder: 'border-blue-200 dark:border-blue-800',
  },
  cloud: {
    hub: 'fill-cyan-500',
    ring: 'stroke-cyan-400 dark:stroke-cyan-500',
    dot: 'fill-cyan-500 dark:fill-cyan-400',
    line: 'stroke-cyan-400 dark:stroke-cyan-500',
    chipBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    chipText: 'text-cyan-700 dark:text-cyan-300',
    chipBorder: 'border-cyan-200 dark:border-cyan-800',
  },
  ai: {
    hub: 'fill-violet-500',
    ring: 'stroke-violet-400 dark:stroke-violet-500',
    dot: 'fill-violet-500 dark:fill-violet-400',
    line: 'stroke-violet-400 dark:stroke-violet-500',
    chipBg: 'bg-violet-50 dark:bg-violet-950/40',
    chipText: 'text-violet-700 dark:text-violet-300',
    chipBorder: 'border-violet-200 dark:border-violet-800',
  },
  testing: {
    hub: 'fill-amber-500',
    ring: 'stroke-amber-400 dark:stroke-amber-500',
    dot: 'fill-amber-500 dark:fill-amber-400',
    line: 'stroke-amber-400 dark:stroke-amber-500',
    chipBg: 'bg-amber-50 dark:bg-amber-950/40',
    chipText: 'text-amber-700 dark:text-amber-300',
    chipBorder: 'border-amber-200 dark:border-amber-800',
  },
  web: {
    hub: 'fill-emerald-500',
    ring: 'stroke-emerald-400 dark:stroke-emerald-500',
    dot: 'fill-emerald-500 dark:fill-emerald-400',
    line: 'stroke-emerald-400 dark:stroke-emerald-500',
    chipBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    chipText: 'text-emerald-700 dark:text-emerald-300',
    chipBorder: 'border-emerald-200 dark:border-emerald-800',
  },
  data: {
    hub: 'fill-rose-500',
    ring: 'stroke-rose-400 dark:stroke-rose-500',
    dot: 'fill-rose-500 dark:fill-rose-400',
    line: 'stroke-rose-400 dark:stroke-rose-500',
    chipBg: 'bg-rose-50 dark:bg-rose-950/40',
    chipText: 'text-rose-700 dark:text-rose-300',
    chipBorder: 'border-rose-200 dark:border-rose-800',
  },
  devops: {
    hub: 'fill-indigo-500',
    ring: 'stroke-indigo-400 dark:stroke-indigo-500',
    dot: 'fill-indigo-500 dark:fill-indigo-400',
    line: 'stroke-indigo-400 dark:stroke-indigo-500',
    chipBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    chipText: 'text-indigo-700 dark:text-indigo-300',
    chipBorder: 'border-indigo-200 dark:border-indigo-800',
  },
};

const VIEW = 760;

export function Skills() {
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

  return (
    <section id="skills" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Skills & Expertise</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-2 max-w-2xl mx-auto">
          A comprehensive toolkit for Software Engineering
        </p>
        <p className="hidden md:block text-center text-xs text-slate-400 dark:text-slate-500 mb-10">
          Hover to preview a cluster &middot; click to pin it
        </p>

        {/* Desktop / tablet: interactive node graph */}
        <div className="hidden md:block">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="w-full max-w-3xl mx-auto"
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
                        className={`${s.dot} stroke-slate-50 dark:stroke-slate-900 transition-all duration-300`}
                      />
                      <text
                        x={node.labelX}
                        y={node.labelY}
                        textAnchor={node.anchor}
                        style={{ fontSize: 11 }}
                        className={`fill-slate-600 dark:fill-slate-300 pointer-events-none select-none transition-opacity duration-200 ${
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
                      className={`${s.hub} stroke-slate-50 dark:stroke-slate-900 transition-all duration-300`}
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
                      className="fill-slate-700 dark:fill-slate-200 transition-all duration-300"
                    >
                      {cluster.short}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile: interactive accordion */}
        <div className="md:hidden space-y-3">
          {skillClusters.map((cluster) => {
            const Icon = cluster.icon;
            const s = STYLES[cluster.key];
            const isOpen = mobileOpen === cluster.key;

            return (
              <div
                key={cluster.key}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setMobileOpen(isOpen ? null : cluster.key)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${s.chipBg}`}>
                    <Icon className={`w-5 h-5 ${s.chipText}`} />
                  </div>
                  <span className="flex-1 text-slate-800 dark:text-slate-200">{cluster.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
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
      </div>
    </section>
  );
}
