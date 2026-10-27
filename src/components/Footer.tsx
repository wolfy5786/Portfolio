import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 bg-stage text-stage-muted border-t border-stage-line">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">Built by Ankush Makhijani</p>

        <div className="flex gap-5">
          <a
            href="https://github.com/wolfy5786"
            aria-label="GitHub"
            className="hover:text-stage-ink transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ankush-makhijani/"
            aria-label="LinkedIn"
            className="hover:text-stage-ink transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm">© {new Date().getFullYear()} Ankush Makhijani</p>
      </div>
    </footer>
  );
}
