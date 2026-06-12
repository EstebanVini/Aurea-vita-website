import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Devuelve la ventana al inicio en cada cambio de ruta.
 * Salto instantáneo (no smooth): cambiar de página no es un scroll,
 * es una página nueva.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
