export type ProjectTarget = {
  id: string;
  title: string;
  tags: string[];
  keywords?: string[];
};

/** Targets used by the skills graph to scroll to the best-matching project. */
export const projectTargets: ProjectTarget[] = [
  {
    id: 'project-graph-analytics',
    title: 'Graph Analytics',
    tags: ['Python', 'Graphs', 'Analytics', 'Systems', 'GPU', 'MPI', 'OpenMP', 'SIMD'],
    keywords: ['Performance optimization', 'System Engineering'],
  },
  {
    id: 'project-codebase-graph-rag',
    title: 'Codebase Graph RAG',
    tags: ['Python', 'LSP', 'Redis', 'Neo4j', 'FastAPI', 'Supabase', 'MCP', 'RAG'],
    keywords: ['LangChain', 'LangGraph', 'LLM', 'Agentic AI', 'GraphQL'],
  },
  {
    id: 'project-eye-ai',
    title: 'EYE AI',
    tags: ['Agentic AI', 'Transcription', 'NLP', 'RAG', 'Redis', 'WebSocket', 'Python'],
    keywords: ['LLM', 'Workflow automation', 'N8n'],
  },
  {
    id: 'project-big-writer',
    title: 'Big Writer',
    tags: ['NLP', 'Python', 'LLM', 'LightRAG'],
    keywords: ['RAG', 'LangChain'],
  },
  {
    id: 'project-rag',
    title: 'RAG',
    tags: ['Python', 'Gemini API', 'Postgres', 'pgvector', 'FastAPI', 'RAG'],
    keywords: ['LLM', 'NLP'],
  },
  {
    id: 'project-outbound-agent',
    title: 'Outbound Agent',
    tags: ['Python', 'TypeScript', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes'],
    keywords: ['Agentic AI', 'Workflow automation', 'N8n'],
  },
  {
    id: 'project-event-brite',
    title: 'Event Brite Platform',
    tags: ['Java', 'Spring', 'Supabase', 'AWS', 'RabbitMQ', 'Docker'],
    keywords: ['Spring Boot', 'JAVA', 'AWS EC2', 'REST APIs', 'Hibernate'],
  },
  {
    id: 'project-chaos-engineering',
    title: 'Chaos Engineering',
    tags: ['Python', 'Kubernetes', 'Software Testing', 'AWS'],
    keywords: ['JUnit', 'PyUnit', 'Mockito', 'Cucumber', 'Selenium', 'Playwright'],
  },
  {
    id: 'project-cricket-analytics',
    title: 'Cricket Analytics',
    tags: ['Python', 'Power BI', 'Scikit-Learn', 'GDA', 'AWS'],
    keywords: ['Scikit Learn', 'PowerBI', 'OLAP', 'OLTP', 'PySpark', 'Hadoop', 'Apache Airflow', 'Analytics'],
  },
  {
    id: 'project-boost',
    title: 'Boost',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'PyUnit', 'Docker', 'Jenkins', 'Linux'],
    keywords: ['Software Testing', 'JUnit', 'Mockito', 'Cucumber', 'Selenium', 'Playwright', 'GitHub Actions', 'GitLab'],
  },
  {
    id: 'project-online-poker',
    title: 'Online Multiplayer Poker',
    tags: ['Python', 'Redis', 'Django'],
    keywords: ['WebSockets', 'REST APIs'],
  },
  {
    id: 'project-piggyback',
    title: 'Piggyback',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'Docker'],
    keywords: ['JAVA', 'Hibernate', 'REST APIs', 'gRPC', 'SQL'],
  },
  {
    id: 'project-next-play',
    title: 'Next Play',
    tags: ['TypeScript', 'Node.js', 'AWS EC2'],
    keywords: ['GraphQL', 'REST APIs'],
  },
  {
    id: 'project-web-crawler',
    title: 'Web Crawler',
    tags: ['Python', 'curl', 'Linux', 'C'],
    keywords: ['Performance optimization'],
  },
  {
    id: 'working-on',
    title: 'Model compression for embedded systems for prosthetics applications',
    tags: ['CUDA', 'PyTorch', 'TensorFlow', 'GPU', 'SIMD', 'Performance optimization', 'Embedded', 'Machine Learning'],
    keywords: ['Scikit Learn', 'System Engineering', 'OpenMP', 'MPI', 'ML'],
  },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

const ALIASES: Record<string, string[]> = {
  java: ['java'],
  fastapi: ['fastapi', 'fast api'],
  postgresql: ['postgresql', 'postgres', 'postgressql'],
  redis: ['redis', 'reddis'],
  scikitlearn: ['scikitlearn', 'sklearn'],
  powerbi: ['powerbi', 'power bi'],
  springboot: ['springboot', 'spring'],
  awsec2: ['awsec2', 'ec2', 'aws'],
  restapis: ['restapis', 'rest', 'restapi'],
  githubactions: ['githubactions', 'github'],
  softwaretesting: ['softwaretesting', 'testing'],
  machinelearning: ['machinelearning', 'ml'],
  artificialintelligence: ['artificialintelligence', 'ai'],
};

function expandToken(token: string): string[] {
  const n = normalize(token);
  for (const [canonical, aliases] of Object.entries(ALIASES)) {
    if (aliases.some((a) => normalize(a) === n) || canonical === n) {
      return [canonical, ...aliases.map(normalize)];
    }
  }
  return [n];
}

function tokensOverlap(a: string, b: string) {
  const left = expandToken(a);
  const right = expandToken(b);
  return left.some((l) =>
    right.some((r) => l === r || (l.length > 3 && r.includes(l)) || (r.length > 3 && l.includes(r))),
  );
}

function scoreProject(skill: string, project: ProjectTarget, clusterKeywords: string[]) {
  let score = 0;
  const tags = project.tags;
  const keywords = project.keywords ?? [];
  let directHit = false;

  for (const tag of tags) {
    if (tokensOverlap(skill, tag)) {
      score += 40;
      directHit = true;
    }
  }
  if (tokensOverlap(skill, project.title)) {
    score += 25;
    directHit = true;
  }
  for (const keyword of keywords) {
    if (tokensOverlap(skill, keyword)) {
      score += 18;
      directHit = true;
    }
  }

  // Soft cluster context only when the skill itself didn't hit this project
  if (!directHit) {
    for (const keyword of clusterKeywords) {
      for (const tag of tags) {
        if (tokensOverlap(keyword, tag)) score += 2;
      }
      for (const item of keywords) {
        if (tokensOverlap(keyword, item)) score += 1;
      }
    }
  }

  return score;
}

export function findBestProjectId(skill: string, clusterKeywords: string[] = []): string | null {
  let bestId: string | null = null;
  let bestScore = 0;

  for (const project of projectTargets) {
    const score = scoreProject(skill, project, clusterKeywords);
    if (score > bestScore) {
      bestScore = score;
      bestId = project.id;
    }
  }

  return bestScore > 0 ? bestId : null;
}

export function scrollToProject(projectId: string) {
  const el = document.getElementById(projectId);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('project-flash');
  window.setTimeout(() => el.classList.remove('project-flash'), 1600);
}
