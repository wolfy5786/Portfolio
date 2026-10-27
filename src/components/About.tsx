import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const education = [
  {
    degree: 'Master of Science in Software Engineering',
    institution: 'San Jose State University',
    period: '2025 - 2027',
    description: 'Specialized in Distributed Systems and Artificial Intelligence',
    logo: './images/SJSU.jpg',
    achievements: [
      'Enterprise Software',
      'Distributed Software and Design',
      'Software Testing and QA',
      'Agentic AI',
    ],
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Rutgers University',
    period: '2021 - 2025',
    description: 'Focus on Software Engineering and Algorithms',
    logo: './images/Rutgers.jpg',
    achievements: [
      'GPA: 3.7/4.0',
      'President of IEEE Club',
      'Awarded Chancellor Merit Scholarship of 15,000 USD',
    ],
  },
];

export function About() {
  return (
    <section id="profile" className="py-24 px-4 bg-stage text-stage-ink border-t border-stage-line">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted mb-3">Profile</p>
          <h2 className="mb-4">About me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0 overflow-hidden rounded-sm border border-stage-line"
          >
            <ImageWithFallback
              src="./images/ANKUSHIMAGE.jpg"
              alt="Ankush Makhijani"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h3 className="mb-5 text-3xl">Building digital experiences that matter</h3>
            <p className="text-stage-muted mb-4 max-w-2xl">
              With over a year of experience in Software Engineering, I specialize in Designing and implementing
              Backend Systems that are Reliable, Secure, Scalable and can be integrated easily.
            </p>
            <p className="text-stage-muted mb-8 max-w-2xl">
              I enjoy learning how systems work behind the scenes, improving my craft, and taking on projects that help me grow.
              I&apos;m passionate about continuous learning, good engineering practices, and creating software that actually helps people.
            </p>

            <a
              href="./pdfs/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stage-ink text-stage hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>
        </div>

        <div className="space-y-8">
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted">Education</p>
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="grid sm:grid-cols-[88px_1fr] gap-5 items-start border-t border-stage-line pt-8"
            >
              <div className="w-20 h-20 bg-stage-elevated border border-stage-line rounded-sm p-2 flex items-center justify-center">
                <ImageWithFallback
                  src={edu.logo}
                  alt={`${edu.institution} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-2xl mb-1">{edu.degree}</h3>
                <p className="text-signal-cyan mb-1">{edu.institution}</p>
                <p className="text-sm text-stage-muted mb-3">{edu.period}</p>
                <p className="text-stage-muted mb-4">{edu.description}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="px-3 py-1.5 text-sm border border-stage-line text-stage-muted rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
