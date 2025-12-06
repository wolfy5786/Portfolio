import { Server, Cloud, BrainCircuit, FlaskConical, Globe, Database as DatabaseIcon, GitBranch } from 'lucide-react';

const skills = [
  {
    icon: Server,
    title: 'Backend Engineering',
    technologies: ['Python', 'JAVA', 'SQL', 'MongoDB', 'PostgreSQL', 'FAST API', 'Django', 'Spring Boot', 'Hibernate', 'Redis'],
  },
  {
    icon: Cloud,
    title: 'Cloud',
    technologies: ['AWS EC2', 'Lambda', 'S3', 'RDS', 'API Gateway', 'CloudWatch', 'GCP', 'Compute Engine', 'Cloud SQL', 'NLP'],
  },
  {
    icon: BrainCircuit,
    title: 'AI, Machine Learning and Analytics',
    technologies: ['N8n', 'LangChain', 'NLP', 'LLM', 'Scikit Learn', 'TensorFlow'],
  },
  {
    icon: FlaskConical,
    title: 'Software Testing',
    technologies: ['JUnit', 'PyUnit', 'Mockito', 'Cucumber', 'Selenium', 'Playwright'],
  },
  {
    icon: Globe,
    title: 'Web Technologies',
    technologies: ['REST APIs', 'GraphQL', 'WebSockets', 'gRPC'],
  },
  {
    icon: DatabaseIcon,
    title: 'Data Engineering',
    technologies: ['Apache Airflow', 'PySpark', 'Power BI', 'Hadoop', 'OLAP', 'OLTP'],
  },
  {
    icon: GitBranch,
    title: 'DevOps',
    technologies: ['GitLab', 'GitHub Actions', 'Docker', 'Jenkins'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Skills & Expertise</h2>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          A comprehensive toolkit for Software Engineering
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 ${
                  index === skills.length - 1 && skills.length % 3 !== 0 ? 'lg:col-start-2' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="text-slate-800">{skill.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full text-sm border border-slate-200 hover:border-blue-200 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
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