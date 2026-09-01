import { Routes, Route } from 'react-router-dom';
import { useT } from './i18n/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Habitaciones from './pages/Habitaciones.jsx';
import Gastronomia from './pages/Gastronomia.jsx';
import Spa from './pages/Spa.jsx';
import Experiencias from './pages/Experiencias.jsx';
import Galeria from './pages/Galeria.jsx';
import Contacto from './pages/Contacto.jsx';

export default function App() {
  const t = useT();

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-marfil focus:px-5 focus:py-3 focus:text-marino"
      >
        {t.skipLink}
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/gastronomia" element={<Gastronomia />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
