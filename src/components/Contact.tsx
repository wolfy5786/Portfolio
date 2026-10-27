import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ColorField } from './ColorField';

export function Contact() {
  return (
    <section id="contact" className="relative py-28 px-4 bg-stage text-stage-ink overflow-hidden border-t border-stage-line">
      <ColorField density="sparse" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs tracking-[0.22em] uppercase text-stage-muted mb-4">Next chapter</p>
          <h2 className="mb-5">Get in touch</h2>
          <p className="text-xl md:text-2xl text-stage-muted mb-10 max-w-2xl mx-auto">
            Looking for Software Internships for Summer and Fall 2026
          </p>

          <a
            href="mailto:makhijaniankush24@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-stage-ink text-stage text-lg hover:opacity-90 transition-opacity mb-12"
          >
            <Mail className="w-5 h-5" />
            makhijaniankush24@gmail.com
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-stage-muted">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-signal-cyan" />
              <span>+1 (856) 263 1347</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-signal-emerald" />
              <span>San Jose, CA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
