import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by Ankush Makhijani
          </p>
          
          <div className="flex gap-6">
            <a href="https://github.com/wolfy5786" className="hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/ankush-makhijani/" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          
          <p className="text-sm">
            © 2025 Ankush Makhijani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
