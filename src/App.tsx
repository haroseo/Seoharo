import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Communities from './components/Communities';
import Skills from './components/Skills';
import Projects from './components/Projects';
import BusinessCard from './components/BusinessCard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <ProgressBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Communities />
        <Skills />
        <BusinessCard />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
