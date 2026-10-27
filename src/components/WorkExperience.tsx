import { motion } from 'motion/react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'AceMyTravel',
    period: 'June 2025 - October 2025',
    bullets: [
      'Designed and prototyped a LangChain-based system to turn user prompts and live travel data into itineraries.',
      'Built gRPC services for booking updates, cutting API latency by 70%.',
      'Used Google Cloud NLP for semantic search, improving relevance by 28%.',
      'Deployed containerized services on GCP and collaborated on customer-facing features.',
      'Improved performance with caching, async processing, and reactive design, reducing response times by 19%.',
    ],
    metrics: [
      { value: '70%', label: 'latency cut' },
      { value: '28%', label: 'relevance lift' },
      { value: '19%', label: 'faster responses' },
    ],
  },
  {
    title: 'Research Assistantship',
    company: 'Rutgers, The State University of New Jersey',
    period: 'May 2024 - September 2024',
    bullets: [
      'Developed a faster and more accurate Log1p polynomial approximation for 32-bit floats.',
      'Used linear programming to train polynomials on sampled constraints.',
      'Iteratively tested and retrained models to improve numerical accuracy.',
    ],
    metrics: [],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Simplified IT Solutions',
    period: 'May 2023 - August 2023',
    bullets: [
      'Built and maintained Spring Boot REST services for a scalable web platform.',
      'Applied TDD with JUnit/Mockito to improve code quality and speed up releases.',
      'Validated API–frontend contracts, catching critical issues early.',
    ],
    metrics: [],
  },
];

export function WorkExperience() {
  return (
    <section id="experience" className="py-24 px-4 bg-stage text-stage-ink border-t border-stage-line">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted mb-3">Signal path</p>
          <h2 className="mb-4">Experience</h2>
          <p className="text-stage-muted max-w-2xl text-lg">
            My professional journey and key accomplishments
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-stage-line md:left-1/2 md:-translate-x-px" />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="relative grid md:grid-cols-2 gap-6 md:gap-12"
              >
                <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-signal-cyan ring-4 ring-stage md:left-1/2 md:-translate-x-1/2 z-10" />

                <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}`}>
                  <p className="text-xs tracking-[0.18em] uppercase text-signal-cyan mb-2">{exp.company}</p>
                  <h3 className="mb-1 text-2xl md:text-3xl">{exp.title}</h3>
                  <p className="text-sm text-stage-muted mb-5">{exp.period}</p>

                  {exp.metrics.length > 0 && (
                    <div
                      className={`grid grid-cols-3 gap-3 mb-6 ${
                        index % 2 === 0 ? 'md:ml-auto' : ''
                      } max-w-sm ${index % 2 === 0 ? 'md:mr-0' : ''}`}
                    >
                      {exp.metrics.map((metric) => (
                        <div key={metric.label} className={index % 2 === 0 ? 'md:text-right' : ''}>
                          <p className="font-display text-3xl text-stage-ink leading-none mb-1">{metric.value}</p>
                          <p className="text-[11px] uppercase tracking-wider text-stage-muted">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className={`space-y-2 text-stage-muted text-sm leading-relaxed text-left ${index % 2 === 0 ? 'md:ml-auto' : ''} max-w-md`}>
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-signal-emerald mt-1.5 shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {index % 2 === 0 ? <div className="hidden md:block" /> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
