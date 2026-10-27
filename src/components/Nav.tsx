import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#star-projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#profile', label: 'Profile' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stage/80 backdrop-blur-md border-b border-stage-line'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <a href="#" className="font-display text-lg text-stage-ink tracking-tight">
          AM
        </a>

        <ul className="hidden sm:flex items-center gap-6 text-sm text-stage-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-stage-ink transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
