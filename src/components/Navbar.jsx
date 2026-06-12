import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

/** Orden del menú fijo (brief §2.1). */
const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/habitaciones', label: 'Habitaciones' },
  { to: '/gastronomia', label: 'Gastronomía' },
  { to: '/spa', label: 'Spa' },
  { to: '/experiencias', label: 'Experiencias' },
  { to: '/galeria', label: 'Galería' },
  { to: '/contacto', label: 'Contacto' },
];

/**
 * Rutas con hero fotográfico fullscreen donde la navbar inicia
 * transparente (Estado A, brief §5.1). Se ampliará conforme cada
 * página interior reciba su hero; /galeria y /contacto nunca entran.
 */
const HERO_ROUTES = ['/', '/habitaciones', '/gastronomia', '/spa', '/experiencias'];

/** Umbral de scroll (fracción del viewport) para pasar a Estado B. */
const HERO_SCROLL_RATIO = 0.7;

export default function Navbar() {
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.includes(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  /* Estado A (transparente) solo sobre hero y sin scroll; Estado B (sólido)
     en el resto. Con el menú móvil abierto, el panel marino manda. */
  const solid = !hasHero || scrolled;
  const onDark = open || !solid;

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * HERO_SCROLL_RATIO);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Cierra el menú al navegar. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Menú abierto: bloquear scroll del body, cerrar con Escape,
     atrapar el foco dentro del panel (incluido el botón de cierre). */
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstLink = panelRef.current?.querySelector('a');
    firstLink?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = [
        toggleRef.current,
        ...(panelRef.current?.querySelectorAll('a, button') ?? []),
      ].filter(Boolean);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  const desktopLinkClass = ({ isActive }) =>
    [
      'eyebrow relative py-2 transition-colors duration-300',
      /* Subrayado que crece de izquierda a derecha con scale-x (transform,
         no width: animar layout está prohibido — brief §6) */
      'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-dorado after:transition-transform after:duration-300 after:ease-out',
      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
      onDark
        ? isActive
          ? 'text-marfil'
          : 'text-marfil/85 hover:text-marfil'
        : isActive
          ? 'text-marino'
          : 'text-marino/80 hover:text-marino',
    ].join(' ');

  const mobileLinkClass = ({ isActive }) =>
    [
      'flex min-h-[44px] items-center font-display text-3xl font-light transition-colors duration-300',
      isActive ? 'text-dorado' : 'text-marfil hover:text-dorado',
    ].join(' ');

  return (
    <header
      className={[
        /* Estado A↔B (brief §5.1/§6.4): solo background y border-color,
           300ms; la altura es constante, nunca hay salto de layout */
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-out',
        solid && !open
          ? 'border-b border-arena bg-marfil/95 backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-5 sm:px-8"
      >
        <Link
          to="/"
          aria-label="Aurea Vita — Inicio"
          /* Click en el logo: navega a Inicio y sube al tope de la página
             (cubre el caso de estar ya en "/", donde no hay cambio de ruta
             que dispare ScrollToTop). El scroll respeta prefers-reduced-
             motion vía la regla global de scroll-behavior. */
          onClick={() => window.scrollTo(0, 0)}
          className="relative z-50 shrink-0"
        >
          <img
            src="/Logo.svg"
            alt=""
            width="96"
            height="96"
            className={[
              'h-20 w-20 transition-[filter] duration-300',
              onDark ? 'logo-claro' : 'logo-marino',
            ].join(' ')}
          />
        </Link>

        {/* Navegación de escritorio */}
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contacto"
            /* En Estado A (onDark, navbar transparente sobre la foto del
               hero) el anillo global currentColor=marino queda de bajo
               contraste sobre la fotografía; se fuerza marfil. En Estado B
               el botón vive sobre marfil y el anillo marino es correcto. */
            className={[
              'eyebrow inline-flex min-h-[44px] items-center bg-dorado px-6 text-marino transition-colors duration-300 hover:bg-dorado/85',
              onDark ? 'focus-visible:outline-marfil' : '',
            ].join(' ')}
          >
            Reservar
          </Link>
        </div>

        {/* Hamburguesa (móvil) */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú de navegación'}
          className={[
            'relative z-50 flex h-11 w-11 items-center justify-center transition-colors duration-300 lg:hidden',
            onDark ? 'text-marfil' : 'text-marino',
          ].join(' ')}
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Panel móvil fullscreen (brief §2.1: fondo marino, links en serif) */}
      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          className="fixed inset-0 z-40 flex min-h-[100dvh] flex-col bg-marino px-8 pb-10 pt-28 lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={mobileLinkClass}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contacto"
            onClick={closeMenu}
            className="eyebrow mt-auto inline-flex min-h-[48px] w-full items-center justify-center bg-dorado text-marino transition-colors duration-300 hover:bg-dorado/85"
          >
            Reservar
          </Link>
        </div>
      )}
    </header>
  );
}
