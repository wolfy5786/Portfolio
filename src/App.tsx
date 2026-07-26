import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StarProjects } from './components/StarProjects';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Hero />
      <About />
      <StarProjects />
      <Skills />
      <WorkExperience />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}