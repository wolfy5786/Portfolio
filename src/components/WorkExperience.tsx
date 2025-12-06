import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'AceMyTravel',
    period: 'June 2025 - Octboer 2025',
    description: `• Designed and prototyped a LangChain-based system to turn user prompts and live travel data into itineraries.
• Built gRPC services for booking updates, cutting API latency by 70%.
• Used Google Cloud NLP for semantic search, improving relevance by 28%.
• Deployed containerized services on GCP and collaborated on customer-facing features.
• Improved performance with caching, async processing, and reactive design, reducing response times by 19%.`,
  },
  {
    title: 'Research Assistantship',
    company: 'Rutgers, The State University of New Jersey',
    period: 'May 2024 - September 2024',
    description: `• Developed a faster and more accurate Log1p polynomial approximation for 32-bit floats.
• Used linear programming to train polynomials on sampled constraints.
• Iteratively tested and retrained models to improve numerical accuracy.`,
  },
  {
    title: 'Software Engineer Intern',
    company: 'Simplified IT Solutions',
    period: 'May 2023 - August 2023',
    description: `• Built and maintained Spring Boot REST services for a scalable web platform.
• Applied TDD with JUnit/Mockito to improve code quality and speed up releases.
• Validated API–frontend contracts, catching critical issues early.`,
  },
];

export function WorkExperience() {
  return (
    <section id="experience" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Work Experience</h2>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          My professional journey and key accomplishments
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white z-10"></div>
                
                {/* Content */}
                <div className={index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{exp.company}</span>
                    </div>
                    <h3 className="mb-2">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>

                    {/* FIX: Force bullets to align left */}
                    <div className="text-slate-600 mb-4 space-y-1 text-left">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="text-left">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block"></div>
                ) : (
                  <div className="hidden md:block md:col-start-1 md:row-start-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
