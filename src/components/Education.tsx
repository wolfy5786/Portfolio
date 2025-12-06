import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const education = [
  {
    degree: 'Master of Science in Software Engineering',
    institution: 'San Jose State University',
    period: '2025 - 2027',
    description: 'Specialized in Distributed Systems and Artificial Intelligence',
    logo: 'https://www.sjsu.edu/brand/_images/sjsu-logo-primary.png',
    achievements: [
      'Enterprise Software',
      'Distributes Software and Design',
      'Software Testing and QA',
      'Agentic AI'
    ],
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Rutgers University',
    period: '2021 - 2025',
    description: 'Focus on Software Engineering and Algorithims',
    logo: 'https://www.rutgers.edu/themes/custom/rutgers/images/rusig.svg',
    achievements: [
      'GPA: 3.7/4.0',
      'President of IEEE Club',
      'Awarded Chancellor Merit Scholarship of 15,000 USD',
    ],
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    year: '2022',
  },
  {
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    year: '2021',
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Education</h2>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          Academic background and professional certifications
        </p>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="relative bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 overflow-hidden group"
            >
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              
              <div className="relative flex flex-col md:flex-row gap-6">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center p-4 border border-slate-100">
                    <ImageWithFallback
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="mb-2 text-slate-800">{edu.degree}</h3>
                    <p className="text-blue-600 mb-1">{edu.institution}</p>
                    <p className="text-slate-500">{edu.period}</p>
                  </div>
                  
                  <p className="text-slate-600 mb-6">{edu.description}</p>
                  
                  {/* Achievements/Courses */}
                  <div className="flex flex-wrap gap-3">
                    {edu.achievements.map((achievement, achIndex) => (
                      <span 
                        key={achIndex}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* TODO: FUTURE CHANGES - Certifications Section */}
        {/* Uncomment and update with actual certifications when available */}
        {/*
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-blue-600" />
            <h3>Certifications</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <div className="flex items-start gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <h4>{cert.name}</h4>
                </div>
                <p className="text-slate-600 mb-1">{cert.issuer}</p>
                <p className="text-slate-500 text-sm">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}