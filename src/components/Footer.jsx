import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/habitaciones', label: 'Habitaciones' },
  { to: '/gastronomia', label: 'Gastronomía' },
  { to: '/spa', label: 'Spa' },
  { to: '/experiencias', label: 'Experiencias' },
  { to: '/galeria', label: 'Galería' },
  { to: '/contacto', label: 'Contacto' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'ok' | 'error'

  const onNewsletterSubmit = (event) => {
    event.preventDefault();
    if (EMAIL_PATTERN.test(email.trim())) {
      setStatus('ok');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-marino text-marfil">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr_1.2fr] lg:gap-10">
          {/* Marca */}
          <div>
            <Link
              to="/"
              aria-label="Aurea Vita — Inicio"
              className="inline-block"
            >
              <img
                src="/Logo.svg"
                alt=""
                width="96"
                height="96"
                className="h-20 w-20"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 font-display text-2xl font-light italic text-marfil/85">
              Donde el día baja la voz.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <h2 className="eyebrow text-dorado">Navegación</h2>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block py-0.5 text-sm text-marfil/80 transition-colors duration-300 hover:text-dorado"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h2 className="eyebrow text-dorado">Contacto</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-marfil/80">
              <p>
                Av. Escénica 1200, Lomas del Pacífico
                <br />
                Acapulco de Juárez, Guerrero, México
              </p>
              <p>
                <a
                  href="tel:+527444820136"
                  className="transition-colors duration-300 hover:text-dorado"
                >
                  +52 744 482 0136
                </a>
              </p>
              <p>
                <a
                  href="mailto:reservaciones@aureavita.mx"
                  className="transition-colors duration-300 hover:text-dorado"
                >
                  reservaciones@aureavita.mx
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter decorativo */}
          <div>
            <h2 className="eyebrow text-dorado">Cartas desde la costa</h2>
            <p className="mt-5 text-sm text-marfil/80">
              Una carta al mes: temporada, mesa y mareas. Nada más.
            </p>
            <form className="mt-5" onSubmit={onNewsletterSubmit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico para recibir las cartas
              </label>
              <div className="flex">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setStatus(null);
                  }}
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                  className="min-h-[44px] w-full border border-marfil/25 bg-transparent px-4 text-sm text-marfil placeholder:text-marfil/40 focus:border-dorado focus:outline-none"
                />
                <button
                  type="submit"
                  className="eyebrow min-h-[44px] shrink-0 bg-dorado px-5 text-marino transition-colors duration-300 hover:bg-dorado/85"
                >
                  Suscribirme
                </button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
                {status === 'ok' && (
                  <span className="text-marfil/85">
                    Listo. La próxima carta llegará a tu correo.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-dorado">
                    Revisa tu correo: parece incompleto.
                  </span>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Línea legal */}
        <div className="mt-14 border-t border-marfil/10 pt-7">
          {/* marfil/60, no /55: a 12px el /55 daba 4.43:1 sobre marino,
              justo bajo el 4.5:1 de WCAG AA */}
          <p className="text-xs leading-relaxed text-marfil/60">
            © 2026 Aurea Vita. Hotel ficticio creado con fines de demostración;
            las fotografías son de dominio público.
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>Aviso de privacidad</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>Términos de estancia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
