import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkExperience } from './components/WorkExperience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CurrentlyWorking } from './components/CurrentlyWorking';
import { StarProjects } from './components/StarProjects';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <CurrentlyWorking />
      <StarProjects />
      <Projects />
      <WorkExperience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
