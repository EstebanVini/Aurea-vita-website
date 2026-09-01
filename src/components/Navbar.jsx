import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang, useT } from '../i18n/LanguageContext.jsx';

/*
 * Orden del menú fijo (brief §2.1, ronda 15 jun §9.2 G3): 6 entradas.
 * Sale "Gastronomía" del menú (su contenido vive en la tarjeta
 * "Alimentación Consciente" del Home; la ruta /gastronomia sigue
 * accesible). "Spa" se renombra a "Wellness"; el `to` sigue /spa (D4).
 * i18n (ronda 31 ago 2026): el array vive por idioma en src/i18n/ui.js
 * (`navLinks`) y Navbar y Footer consumen la MISMA fuente vía useT() —
 * la regla "idéntico al de Footer.jsx" se cumple por construcción.
 */

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

  /* i18n: idioma activo + diccionario de UI. NAV_LINKS conserva su
     nombre histórico, pero ya es el array por idioma de ui.js. */
  const { lang, setLang } = useLang();
  const t = useT();
  const NAV_LINKS = t.navLinks;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /* true tras el primer cambio manual de idioma: arma el anuncio
     aria-live sin que se anuncie nada al cargar la página. */
  const [idiomaAnunciado, setIdiomaAnunciado] = useState(false);

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

  /* Cambio de idioma: re-renderiza en sitio — sin navegar, sin recargar
     y sin tocar el scroll — y arma el anuncio aria-live (el texto sale
     del diccionario YA en el idioma nuevo). No cierra el panel móvil:
     cambiar de idioma es configuración, no navegación. */
  const cambiarIdioma = (nuevo) => {
    if (nuevo === lang) return;
    setLang(nuevo);
    setIdiomaAnunciado(true);
  };

  /* Opción del toggle "ES / EN" (ronda 31 ago 2026): texto sobrio con
     la utilidad eyebrow, coherente con los estados A/B de la barra —
     NINGÚN dorado nuevo, el CTA "Reservar" sigue siendo el único botón
     dorado. El idioma activo se resalta con el color pleno y
     aria-pressed; el inactivo baja a /75, clicable y con hover al
     pleno (QA i18n P2: /60 daba 3.48:1 sobre marfil y fallaba AA;
     /75 pasa en los tres fondos y unifica también el panel móvil).
     Cada opción lleva su atributo `lang` y un aria-label con el
     nombre completo del idioma (docs/traduccion_ui_faltante.md
     §Toggle). Touch target de 44×44px mínimo, salvo el ancho en lg
     (36px, QA i18n P1: ahí manda el espacio horizontal; min-h-[44px]
     se conserva siempre). `enPanel` fija los colores claros del panel
     móvil marino, que no dependen del estado A/B. */
  const opcionIdioma = (codigo, aria, enPanel = false) => {
    const activo = lang === codigo;
    const claro = enPanel || onDark;
    return (
      <button
        type="button"
        lang={codigo}
        aria-label={aria}
        aria-pressed={activo}
        onClick={() => cambiarIdioma(codigo)}
        className={[
          'eyebrow flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors duration-300 lg:min-w-[36px] xl:min-w-[44px]',
          claro
            ? activo
              ? 'text-marfil'
              : 'text-marfil/75 hover:text-marfil'
            : activo
              ? 'text-marino'
              : 'text-marino/75 hover:text-marino',
          /* Anillo de foco marfil sobre fondos oscuros (patrón del CTA):
             el currentColor global sería invisible ahí. */
          claro ? 'focus-visible:outline-marfil' : '',
        ].join(' ')}
      >
        {codigo === 'es' ? 'ES' : 'EN'}
      </button>
    );
  };

  const desktopLinkClass = ({ isActive }) =>
    [
      'eyebrow relative whitespace-nowrap py-2 transition-colors duration-300',
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
      {/* Altura de navbar: h-32 (128px), constante en Estado A↔B (la
          transición §5.1 anima solo color/background, nunca altura → sin
          CLS). Punto intermedio (cliente, 15 jun): logo 120px en barra
          128px, más grande que el original sin ocupar tanta pantalla.
          Fuente única de la cascada de altura (ronda 15 jun G1; logo +50%):
          - panel móvil: pt-36 (libra 128px con holgura)
          - Galeria.jsx: sticky top-32 (= 128px) y pt-36/lg:pt-44 del header
          - heros interiores: pt-44 (176px) libran los 128px con aire. */}
      <nav
        aria-label={t.nav.navAria}
        className="mx-auto flex h-32 max-w-[1400px] items-center justify-between px-5 sm:px-8"
      >
        <Link
          to="/"
          aria-label={t.nav.logoAria}
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
            width="120"
            height="120"
            /* Logo más grande (ronda 15 jun G1): 120px (punto intermedio
               elegido por el cliente) dentro del header h-32 (128px) — más
               grande que el original (96px) sin que la barra ocupe tanta
               pantalla. Color por filtro CSS (logo-claro/logo-marino),
               nunca fill. */
            className={[
              'h-[120px] w-[120px] transition-[filter] duration-300',
              onDark ? 'logo-claro' : 'logo-marino',
            ].join(' ')}
          />
        </Link>

        {/* Navegación de escritorio */}
        <div className="hidden items-center lg:flex lg:gap-3 xl:gap-9">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
          {/* Toggle de idioma: junto a los links, antes del CTA. */}
          <div role="group" aria-label={t.toggle.grupoAria} className="flex items-center">
            {opcionIdioma('es', t.toggle.esAria)}
            <span
              aria-hidden="true"
              className={[
                'transition-colors duration-300',
                onDark ? 'text-marfil/40' : 'text-marino/40',
              ].join(' ')}
            >
              /
            </span>
            {opcionIdioma('en', t.toggle.enAria)}
          </div>
          <Link
            to="/contacto"
            /* En Estado A (onDark, navbar transparente sobre la foto del
               hero) el anillo global currentColor=marino queda de bajo
               contraste sobre la fotografía; se fuerza marfil. En Estado B
               el botón vive sobre marfil y el anillo marino es correcto. */
            /* Botón un poco más grande (ronda 15 jun G2): a la escala de
               los CTAs dorados de las bandas finales (min-h-[48px] px-8);
               touch target ≥44px se conserva. Sigue siendo el único CTA
               persistente: no se multiplican dorados en la navbar.
               QA i18n (P1): en lg (1024–1279px) el padding baja a px-5 —
               junto con lg:gap-3 y el toggle a 36px recupera el ancho que
               sumó el toggle de idioma; desde xl vuelve px-8. */
            className={[
              'eyebrow inline-flex min-h-[48px] items-center bg-dorado px-5 text-marino transition-colors duration-300 hover:bg-dorado/85 xl:px-8',
              onDark ? 'focus-visible:outline-marfil' : '',
            ].join(' ')}
          >
            {t.nav.reservar}
          </Link>
        </div>

        {/* Hamburguesa (móvil) */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? t.nav.cerrarMenu : t.nav.abrirMenu}
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
          /* pt-36 (144px): libra la altura de navbar h-32 (128px) con
             holgura (ronda 15 jun G1, cascada de altura; logo 120px). */
          className="fixed inset-0 z-40 flex min-h-[100dvh] flex-col bg-marino px-8 pb-10 pt-36 lg:hidden"
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
          {/* Toggle de idioma del panel: arriba del CTA "Reservar",
              visible sin scroll (mt-auto ancla el par toggle+CTA al
              pie). Cambiar de idioma NO cierra el panel ni navega. */}
          <div
            role="group"
            aria-label={t.toggle.grupoAria}
            className="mt-auto mb-4 flex items-center self-start"
          >
            {opcionIdioma('es', t.toggle.esAria, true)}
            <span aria-hidden="true" className="text-marfil/40">
              /
            </span>
            {opcionIdioma('en', t.toggle.enAria, true)}
          </div>
          <Link
            to="/contacto"
            onClick={closeMenu}
            className="eyebrow inline-flex min-h-[48px] w-full items-center justify-center bg-dorado text-marino transition-colors duration-300 hover:bg-dorado/85"
          >
            {t.nav.reservar}
          </Link>
        </div>
      )}
      {/* Anuncio del cambio de idioma para lectores de pantalla: vacío
          hasta el primer cambio manual (nada se anuncia al cargar). */}
      <span aria-live="polite" className="sr-only">
        {idiomaAnunciado ? t.toggle.cambiado : ''}
      </span>
    </header>
  );
}
