import type { ReactElement } from 'react';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';
import {
  GraphRagMotif,
  EyeAiMotif,
  BigWriterMotif,
  RagMotif,
  OutboundMotif,
  EventBriteMotif,
  ChaosMotif,
  CricketMotif,
  GraphAnalyticsMotif,
} from './ProjectMotifs';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  Motif: (props: { className?: string }) => ReactElement;
  accent: string;
};

type Category = {
  title: string;
  projects: Project[];
};

const projectCategories: Category[] = [
  {
    title: 'System Engineering',
    projects: [
      {
        id: 'project-graph-analytics',
        title: 'Graph Analytics',
        description:
          'Graph analytics toolkit for exploring structure, relationships, and performance across large connected datasets',
        tags: ['Python', 'Graphs', 'Analytics', 'Systems'],
        githubUrl: 'https://github.com/wolfy5786/graph_analytics',
        Motif: GraphAnalyticsMotif,
        accent: 'text-signal-teal',
      },
    ],
  },
  {
    title: 'Agentic AI',
    projects: [
      {
        id: 'project-codebase-graph-rag',
        title: 'Codebase Graph RAG',
        description:
          'Graph RAG MCP server that ingests codebase repositories and builds a Graph database with vector embeddings and logical relationships',
        tags: ['Python', 'LSP', 'Redis', 'Neo4j', 'FastAPI', 'Supabase'],
        githubUrl: 'https://github.com/wolfy5786/codebase_retrival',
        Motif: GraphRagMotif,
        accent: 'text-signal-violet',
      },
      {
        id: 'project-eye-ai',
        title: 'EYE AI',
        description:
          'An event-driven, serverless situational awareness platform for emergency dispatchers, fusing audio transcription, entity extraction, and multi-camera computer vision to turn high-stress 911 calls into verified, queryable incidents on a map in seconds',
        tags: ['Agentic AI', 'Transcription', 'NLP', 'RAG', 'Redis', 'WebSocket', 'Python'],
        githubUrl: 'https://github.com/wolfy5786/eye',
        Motif: EyeAiMotif,
        accent: 'text-signal-cyan',
      },
      {
        id: 'project-big-writer',
        title: 'Big Writer',
        description:
          'Pushing the limits of AI agents to generate content using light RAG and knowledge graphs',
        tags: ['NLP', 'Python', 'LLM', 'LightRAG'],
        githubUrl: 'https://github.com/wolfy5786/Big_writer',
        Motif: BigWriterMotif,
        accent: 'text-signal-emerald',
      },
      {
        id: 'project-rag',
        title: 'RAG',
        description:
          'Retrieval-augmented Q&A system for slide-style PDFs without selectable text, using vision language models to extract text, tables, and charts, then grounding every answer strictly in the ingested document',
        tags: ['Python', 'Gemini API', 'Postgres', 'pgvector', 'FastAPI', 'RAG'],
        githubUrl: 'https://github.com/wolfy5786/A_RAG',
        Motif: RagMotif,
        accent: 'text-signal-blue',
      },
      {
        id: 'project-outbound-agent',
        title: 'Outbound Agent',
        description:
          'Event-driven microservices platform for autonomous B2B email outreach, coordinating lead discovery, enrichment, and personalized messaging across seven services via a message queue',
        tags: ['Python', 'TypeScript', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes'],
        githubUrl: 'https://github.com/wolfy5786/Autonomous_email_outreach',
        Motif: OutboundMotif,
        accent: 'text-signal-amber',
      },
    ],
  },
  {
    title: 'Full Stack',
    projects: [
      {
        id: 'project-event-brite',
        title: 'Event Brite Platform',
        description:
          'Full-stack microservice application for Event creation and ticketing, easy to scale integrate hosted on AWS',
        tags: ['Java', 'Spring', 'Supabase', 'AWS', 'RabbitMQ', 'Docker'],
        githubUrl: 'https://github.com/gopinathsjsu/team-project-cmpe202-02-spring2026-sharks',
        Motif: EventBriteMotif,
        accent: 'text-signal-blue',
      },
    ],
  },
  {
    title: 'Software Infrastructure and Testing',
    projects: [
      {
        id: 'project-chaos-engineering',
        title: 'Chaos Engineering',
        description:
          'Chaos engineering to test distributed systems by deliberately injecting faults to test real time failures',
        tags: ['Python', 'Kubernetes', 'Software Testing', 'AWS'],
        githubUrl: 'https://github.com/wolfy5786/Cricket_analysis',
        Motif: ChaosMotif,
        accent: 'text-signal-rose',
      },
    ],
  },
  {
    title: 'Big Data',
    projects: [
      {
        id: 'project-cricket-analytics',
        title: 'Cricket Analytics',
        description:
          'This project dives deep into cricket match data using ball-by-ball delivery information to analyze performance trends, uncover scoring patterns, and simulate future deliveries',
        tags: ['Python', 'Power BI', 'Scikit-Learn', 'GDA', 'AWS'],
        githubUrl: 'https://github.com/wolfy5786/Cricket_analysis',
        Motif: CricketMotif,
        accent: 'text-signal-amber',
      },
    ],
  },
];

export function StarProjects() {
  return (
    <section id="star-projects" className="relative py-24 px-4 bg-stage text-stage-ink border-t border-stage-line">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted mb-3">Selected work</p>
          <h2 className="mb-4">Star projects</h2>
          <p className="text-stage-muted max-w-2xl text-lg">
            Highlighting my most innovative and impactful projects across AI, Full Stack, and Big Data domains
          </p>
        </motion.div>

        <div className="space-y-20">
          {projectCategories.map((category) => (
            <div key={category.title} className="space-y-10">
              <div className="flex items-center gap-4">
                <h3 className="text-xl md:text-2xl">{category.title}</h3>
                <div className="flex-1 h-px bg-stage-line" />
              </div>

              <div className="space-y-12">
                {category.projects.map((project, index) => {
                  const Motif = project.Motif;
                  const reverse = index % 2 === 1;

                  return (
                    <motion.article
                      id={project.id}
                      key={project.title}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.55 }}
                      className={`scroll-mt-28 project-target grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                        reverse ? 'lg:[&>*:first-child]:order-2' : ''
                      }`}
                    >
                      <div className="aspect-[12/7] overflow-hidden rounded-sm border border-stage-line bg-stage-elevated">
                        <Motif />
                      </div>

                      <div>
                        <p className={`text-xs tracking-[0.18em] uppercase mb-3 ${project.accent}`}>
                          {category.title}
                        </p>
                        <h3 className="mb-4 text-3xl md:text-4xl">{project.title}</h3>
                        <p className="text-stage-muted mb-6 leading-relaxed">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs tracking-wide border border-stage-line text-stage-muted rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-stage-ink hover:text-signal-cyan transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>View code</span>
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
