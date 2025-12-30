import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
    const scrollToWorkExperience = () => {
      const workExpSection = document.getElementById('experience');
      if (workExpSection) {
        workExpSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleContactClick = () => {
      window.location.href = 'mailto:makhijaniankush24@gmail.com';
    };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
            <span className="text-5xl">👋</span>
          </div>
          <h1 className="mb-4">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Ankush Makhijani</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Software Engineer
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            I build systems that are simple to use, smart under the hood, and built to last. Turning ideas into fast, reliable software, that solve real problems. 
            Passionate about clean code, intuitive design, and building products people love.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center mb-8">
          <button onClick={scrollToWorkExperience}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
            View My Work
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={handleContactClick}
          className="px-6 py-3 border border-slate-600 hover:border-slate-400 rounded-lg transition-colors">
            Contact Me
          </button>
        </div>
        
        <div className="flex gap-6 justify-center text-slate-400">
          <a href="https://github.com/wolfy5786" className="hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/ankush-makhijani/" className="hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="makhijaniankush24@gmail.com" className="hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
