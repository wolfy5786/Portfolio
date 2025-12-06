import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'Poseidon',
    description: 'Automated Software Testing and QA',
    image: 'https://images.unsplash.com/photo-1763568258244-9d5aa9c3ce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMHRlc3RpbmclMjBhdXRvbWF0aW9uJTIwY29kZXxlbnwxfHx8fDE3NjUwMDQ5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Python', 'FastAPI', 'PostgreSQL','PyUint','Docker','Jenkins', 'Linux'],
    liveUrl: '#',
    githubUrl: 'https://github.com/wolfy5786/Poseidon',
  },
  {
    title: 'Onilne Multiplayer Poker',
    description: 'Web Based Online Multiplayer Poker',
    image: 'https://images.unsplash.com/photo-1560327317-031f46d0e995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlciUyMGNhcmRzJTIwZ2FtZXxlbnwxfHx8fDE3NjUwMDQ5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Python', 'Reddis', 'Django'],
    liveUrl: '#',
    githubUrl: 'https://github.com/wolfy5786/Online_Poker',
  },
  {
    title: 'Piggyback',
    description: 'Cab Booking REST Service',
    image: 'https://images.unsplash.com/photo-1619933557175-9168d5209fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXhpJTIwY2FiJTIwcmlkZXxlbnwxfHx8fDE3NjUwMDQ5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Java', 'Spring Boot', 'PostgresSQL','AWS EC2','Docker'],
    liveUrl: '#',
    githubUrl: 'https://github.com/wolfy5786/piggy_back',
  },
  {
    title: 'Cricket Analytics and Simulation',
    description: 'Test Cricket Analytics and Simulation',
    image: 'https://images.unsplash.com/photo-1635127725453-5f6ad32cbf92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwc3BvcnQlMjBzdGFkaXVtfGVufDF8fHx8MTc2NTAwNDkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Python', 'Gausian Discriminant Analysis','PowerBI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/wolfy5786/Cricket_analysis',
  },
  {
    title: 'Next Play',
    description: 'Game Recommendation System',
    image: 'https://images.unsplash.com/photo-1644571580854-114d7d8fa383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwY29uc29sZXxlbnwxfHx8fDE3NjUwMDQ5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['TypeScript', 'Node.js','AWS EC2'],
    liveUrl: '#',
    githubUrl: 'https://github.com/wolfy5786/NextPlay',
  },
    {
    title: 'Web Crawler',
    description: 'Breadth First Search on Website to mine Data',
    image: 'https://images.unsplash.com/photo-1605116188625-8522bf02d10f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBjcmF3bGVyJTIwbmV0d29ya3xlbnwxfHx8fDE3NjUwMDQ5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Python','curl', 'Linux', 'C'],
    liveUrl: '#',
    githubUrl: 'https://github.com/wolfy5786/WebCrawler',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Featured Projects</h2>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          A selection of my recent work that showcases my skills and experience
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-200"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}