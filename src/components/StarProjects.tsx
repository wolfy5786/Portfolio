import { Github, Sparkles, Code, Database } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projectCategories = [
  {
    icon: Sparkles,
    title: 'Agentic AI',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    projects: [
      {
        title: 'Codebase Graph RAG',
        description: 'Graph RAG MCP server that ingest codebase repositories and builds a Graph database with vector embeddings and logical relatioships ',
        image: './images/visualisation.jpeg',
        tags: ['Python', 'LSP', 'Reddis', 'Neo4j', 'FastAPI','Supabase'],
        githubUrl: 'https://github.com/wolfy5786/codebase_retrival',
      },
      {
        title: 'EYE AI',
        description: 'Multi-agent system for intelligent customer service with context-aware responses, ticket routing, and sentiment analysis',
        image: './images/graph.png',
        tags: ['Agentic AI','Transcription', 'NLP', 'RAG', 'Redis', 'WebSocket', 'Python'],
        githubUrl: 'https://github.com/wolfy5786/eye',
      },
      {
        title: 'Big Writer',
        description: 'pushing the limits of AI agents to generate content using light RAG and knowlwdge graphs',
        image: './images/codes.jpeg',
        tags: ['NLP', 'Python', 'LLM', 'LightRAG'],
        githubUrl: 'https://github.com/wolfy5786/Big_writer',
      },
    ],
  },
  {
    icon: Code,
    title: 'Full Stack',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    projects: [
      {
        title: 'Event Brite Platform',
        description: 'Full-stack microservice application for Event creation and ticketing, easy to scale integrate hosted on AWS',
        image: './images/code.jpeg',
        tags: ['Java', 'Spring', 'Supabase', 'AWS', 'RabbitMQ', 'Docker'],
        githubUrl: 'https://github.com/gopinathsjsu/team-project-cmpe202-02-spring2026-sharks',
      },
    ],
  },
  {
    icon: Code,
    title: 'Software Infrastructure and Testing',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    projects: [
      {
        title: 'Chaos Engineering',
        description: 'Chaos engieering to test distrubted systems by delibrately injecting faults to test real time failures',
        image: './images/eng.jpeg',
        tags: ['Python', 'Kubernetes', 'Software Testing ', 'AWS'],
        githubUrl: 'https://github.com/wolfy5786/Cricket_analysis',
      },
    ],
  },
  {
    icon: Database,
    title: 'Big Data',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    projects: [
      {
        title: 'Cricket Analytics',
        description: 'This project dives deep into cricket match data using ball-by-ball delivery information to analyze performance trends, uncover scoring patterns, and simulate future deliveries',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWclMjBkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzU5NDE4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Python', 'Power BI', 'Scikit-Learn ', 'GDA', 'AWS'],
        githubUrl: 'https://github.com/wolfy5786/Cricket_analysis',
      },
    ],
  },
];

export function StarProjects() {
  return (
    <section id="star-projects" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-6 text-5xl">My Star Projects</h2>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto text-xl">
          Highlighting my most innovative and impactful projects across AI, Full Stack, and Big Data domains
        </p>

        <div className="space-y-16">
          {projectCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className={category.color}>{category.title}</h3>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.projects.map((project, projectIndex) => (
                    <div
                      key={projectIndex}
                      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 ${category.borderColor} hover:scale-105`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <h4 className="mb-2 text-lg">{project.title}</h4>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={project.githubUrl}
                          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}