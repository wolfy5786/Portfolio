import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export function CurrentlyWorking() {
  return (
    <section id="working-on" className="py-20 px-4 bg-stage text-stage-ink border-t border-stage-line">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted mb-3">In flight</p>
          <h2 className="mb-10">Currently working on</h2>

          <div className="border border-stage-line bg-stage-elevated/40 px-6 py-8 md:px-10 md:py-10">
            <p className="text-xs tracking-[0.18em] uppercase text-signal-teal mb-3">Research · Open source</p>
            <h3 className="text-2xl md:text-3xl mb-4 max-w-3xl">
              Model compression for embedded systems for prosthetics applications
            </h3>
            <p className="text-stage-muted text-lg mb-3 max-w-2xl">
              Work in progress — reach out to share an idea or contribute.
            </p>
            <p className="text-sm text-stage-muted mb-8 max-w-2xl">
              All work for this project will be open source and under a free license.
            </p>

            <a
              href="mailto:makhijaniankush24@gmail.com?subject=Model%20compression%20for%20prosthetics%20—%20collaborate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stage-ink text-stage hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Reach out
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
