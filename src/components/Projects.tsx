import { Github } from 'lucide-react';

const projects = [
  {
    id: 'project-boost',
    title: 'Boost',
    description: 'Automated Software Testing and QA',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'PyUnit', 'Docker', 'Jenkins', 'Linux'],
    githubUrl: 'https://github.com/wolfy5786/boost',
  },
  {
    id: 'project-online-poker',
    title: 'Online Multiplayer Poker',
    description: 'Web Based Online Multiplayer Poker',
    tags: ['Python', 'Redis', 'Django'],
    githubUrl: 'https://github.com/wolfy5786/Online_Poker',
  },
  {
    id: 'project-piggyback',
    title: 'Piggyback',
    description: 'Cab Booking REST Service',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS EC2', 'Docker'],
    githubUrl: 'https://github.com/wolfy5786/piggy_back',
  },
  {
    id: 'project-cricket-sim',
    title: 'Cricket Analytics and Simulation',
    description: 'Test Cricket Analytics and Simulation',
    tags: ['Python', 'Gaussian Discriminant Analysis', 'PowerBI'],
    githubUrl: 'https://github.com/wolfy5786/Cricket_analysis',
  },
  {
    id: 'project-next-play',
    title: 'Next Play',
    description: 'Game Recommendation System',
    tags: ['TypeScript', 'Node.js', 'AWS EC2'],
    githubUrl: 'https://github.com/wolfy5786/NextPlay',
  },
  {
    id: 'project-web-crawler',
    title: 'Web Crawler',
    description: 'Breadth First Search on Website to mine Data',
    tags: ['Python', 'curl', 'Linux', 'C'],
    githubUrl: 'https://github.com/wolfy5786/WebCrawler',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-stage text-stage-ink border-t border-stage-line">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted mb-3">Also building</p>
          <h2 className="text-3xl md:text-4xl">Other projects</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((project) => (
            <a
              id={project.id}
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="project-target scroll-mt-28 snap-start shrink-0 w-[280px] sm:w-[300px] p-5 border border-stage-line rounded-sm bg-stage-elevated/40 hover:bg-stage-elevated transition-colors group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-xl leading-tight">{project.title}</h3>
                <Github className="w-4 h-4 text-stage-muted group-hover:text-stage-ink transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-stage-muted mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-[11px] text-stage-muted border border-stage-line px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
