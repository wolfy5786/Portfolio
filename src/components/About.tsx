import { ImageWithFallback } from './figma/ImageWithFallback';
import { Download } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-16">About Me</h2>
        
        <div className="flex flex-col items-center">
          <div className="mb-12">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-slate-100">
              <ImageWithFallback
                src="./images/ANKUSHIMAGE.jpg"
                alt="Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="max-w-3xl text-center">
            <h3 className="mb-6">Building digital experiences that matter</h3>
            <p className="text-slate-600 mb-4 text-justify">
              With over a year of experience in Software Engineering, I specialize in Designing and implementing
              Backend Systems that are Reliable, Secure, Scalable and can be integrated easily.
            </p>
            <p className="text-slate-600 mb-8 text-justify">
              Hi! I'm a Software Engineer who loves building useful things with clean code.
              I enjoy learning how systems work behind the scenes, improving my craft, and taking on projects that help me grow. 
              I'm passionate about continuous learning, good engineering practices, and creating software that actually helps people.
            </p>
            
            <a 
              href="./pdfs/resume.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg mb-8"
            >
              <Download className="w-5 h-5" />
              Resume
            </a>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-blue-600 mx-auto mb-3"></div>
                <p className="text-slate-800 mb-1">Location</p>
                <p className="text-slate-600">San Jose, CA</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-blue-600 mx-auto mb-3"></div>
                <p className="text-slate-800 mb-1">Email</p>
                <p className="text-slate-600">makhijaniankush24@gmail.com</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="w-3 h-3 rounded-full bg-blue-600 mx-auto mb-3"></div>
                <p className="text-slate-800 mb-1">Experience</p>
                <p className="text-slate-600"> 1 Year Professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}