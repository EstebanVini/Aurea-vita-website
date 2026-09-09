import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../i18n/LanguageContext.jsx';

/*
 * Navegación del pie (copy §9.4, ronda 15 jun §9.2 G3): 6 entradas,
 * IDÉNTICAS al array NAV_LINKS de Navbar.jsx — desde la ronda i18n
 * (31 ago 2026) ambos consumen el MISMO array por idioma de
 * src/i18n/ui.js (`navLinks`), así que la identidad se cumple por
 * construcción. Sin "Gastronomía"; "Wellness" apunta a /spa.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  /* i18n: strings del footer y navegación por idioma (src/i18n/ui.js). */
  const t = useT();
  const NAV_LINKS = t.navLinks;

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
              aria-label={t.footer.logoAria}
              className="inline-block"
            >
              <img
                src="/Logo.svg"
                alt=""
                width="96"
                height="96"
                /* Proporción coherente con el logo de la Navbar (ronda
                   15 jun G1, h-24): el footer no tiene acoplamientos de
                   layout, solo se iguala la escala. Color por defecto del
                   SVG (marfil sobre marino), sin filtro necesario aquí. */
                className="h-24 w-24"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 font-display text-2xl font-light italic text-marfil/85">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label={t.footer.navAria}>
            <h2 className="eyebrow text-dorado">{t.footer.navTitulo}</h2>
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
            <h2 className="eyebrow text-dorado">{t.footer.contactoTitulo}</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-marfil/80">
              <p>
                {t.footer.direccion[0]}
                <br />
                {t.footer.direccion[1]}
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
                  href="mailto:aureavita@consorciorazo.com"
                  className="transition-colors duration-300 hover:text-dorado"
                >
                  aureavita@consorciorazo.com
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter decorativo */}
          <div>
            <h2 className="eyebrow text-dorado">{t.footer.newsletterTitulo}</h2>
            <p className="mt-5 text-sm text-marfil/80">
              {t.footer.newsletterTexto}
            </p>
            <form className="mt-5" onSubmit={onNewsletterSubmit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                {t.footer.newsletterLabel}
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
                  placeholder={t.footer.newsletterPlaceholder}
                  autoComplete="email"
                  /* placeholder marfil/60 (≥4.5:1 sobre marino, AA): el
                     /40 anterior quedaba muy por debajo del contraste.
                     El borde dorado al enfocar es refuerzo decorativo
                     (1.86:1, no es indicador de foco válido); el anillo
                     global :focus-visible (currentColor=marfil, AA) es el
                     indicador real, por eso no se anula con outline-none. */
                  className="min-h-[44px] w-full border border-marfil/25 bg-transparent px-4 text-sm text-marfil placeholder:text-marfil/60 focus:border-dorado"
                />
                <button
                  type="submit"
                  className="eyebrow min-h-[44px] shrink-0 bg-dorado px-5 text-marino transition-colors duration-300 hover:bg-dorado/85"
                >
                  {t.footer.suscribirme}
                </button>
              </div>
              <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
                {status === 'ok' && (
                  <span className="text-marfil/85">
                    {t.footer.newsletterOk}
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-dorado">
                    {t.footer.newsletterError}
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
            {t.footer.legal}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{t.footer.avisoPrivacidad}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{t.footer.terminos}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
