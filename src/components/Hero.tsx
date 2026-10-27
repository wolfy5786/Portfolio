import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { ColorField } from './ColorField';
import { Skills } from './Skills';

export function Hero() {
  const scrollToWork = () => {
    document.getElementById('star-projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stage text-stage-ink px-4 pt-24 pb-16">
      <ColorField />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-6 items-center">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm tracking-[0.22em] uppercase text-stage-muted mb-5"
          >
            Software Engineer · San Jose
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="mb-6"
          >
            Ankush
            <br />
            Makhijani
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-lg md:text-xl text-stage-muted max-w-xl mx-auto lg:mx-0 mb-10"
          >
            Designing systems that change the world for better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-stage-ink text-stage font-medium hover:opacity-90 transition-opacity"
            >
              Enter the work
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex gap-5 text-stage-muted">
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
              <a
                href="mailto:makhijaniankush24@gmail.com"
                aria-label="Email"
                className="hover:text-stage-ink transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Skills embedded />
        </motion.div>
      </div>
    </section>
  );
}
