import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkExperience } from './components/WorkExperience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StarProjects } from './components/StarProjects';

export default function App() {
  return (
    <div className="min-h-screen bg-stage text-stage-ink">
      <Nav />
      <Hero />
      <StarProjects />
      <Projects />
      <WorkExperience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
