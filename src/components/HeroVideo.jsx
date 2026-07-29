import { useCallback, useEffect, useRef, useState } from 'react';

/* Clips definitivos del hero del Home (ronda fotos cliente jul 2026):
   secuencia infinita 01 → 02 → 01 → … Cada <video> mantiene su src fijo
   durante toda la vida del componente; el secuenciador solo alterna
   cuál es el "activo". QA video hero (P2): existe rendition móvil
   960×540 de cada clip — el par se elige UNA sola vez al montar con
   matchMedia (sin live-switching: cambiar de par a mitad de bucle
   reiniciaría la secuencia y no lo vale por un resize). */
const CLIPS_ESCRITORIO = ['/videos/hero_01.mp4', '/videos/hero_02.mp4'];
const CLIPS_MOVIL = [
  '/videos/hero_01_movil.mp4',
  '/videos/hero_02_movil.mp4',
];

/* < md de Tailwind (min-width: 768px), el mismo corte que ya usa el
   resto del hero. */
const MEDIA_MOVIL = '(max-width: 767px)';

/* Primer frame del clip 01, 1920w (sirve para ambas renditions): es el
   LCP del Home en modo motion (Home inyecta su <link rel="preload">).
   Como el clip 01 abre exactamente en este frame, el fade-in del video
   sobre el poster es invisible. */
const POSTER = '/videos/hero_poster.jpeg';

/* Fundido de 700ms, dentro de la ventana 0.5–0.8s acordada. QA video
   hero (P3): el crossfade es DIRECCIONAL para que el poster nunca
   sangre a mitad de mezcla (con dos fades simétricos, en el punto medio
   ambos clips van a ~50% y el fondo asoma ~25%): el clip 01 — base del
   stack — queda opaco permanente una vez listo, y SOLO la opacidad del
   clip 02 (encima por orden del DOM) anima: entra fundiéndose sobre el
   01 congelado en su último frame, y sale revelando al 01 ya
   reproduciendo debajo. */
const CROSSFADE = 'transition-opacity duration-700 ease-in-out';

/** Iconos lineales del control de pausa (sin emojis; brief: SVG
 *  primitivos, mismo trazo 1.25 que ArrowIcon de Home). aria-hidden:
 *  el aria-label del botón lleva la semántica. */
function IconoPausa() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <line x1="4" y1="1" x2="4" y2="15" />
      <line x1="10" y1="1" x2="10" y2="15" />
    </svg>
  );
}

function IconoPlay() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 1.5 12 8 3.5 14.5Z" />
    </svg>
  );
}

/**
 * Fondo de video del hero del Home (ronda fotos cliente jul 2026).
 * Reemplaza a la foto aérea estática SOLO en modo motion: con
 * prefers-reduced-motion Home ni siquiera monta este componente y
 * conserva aereas_11 estática (brief §6: nada se mueve si el usuario
 * pidió que nada se mueva).
 *
 * Estructura del stack (todo absolute inset-0 object-cover; los scrims
 * y el texto del hero viven en Home y quedan encima por orden de
 * pintura):
 *   1. Poster (img, LCP): pinta de inmediato — nunca un hueco marino.
 *   2. clip 01 y clip 02: nacen en opacity-0; el 01 sube cuando de
 *      verdad reproduce ('playing') y se queda opaco; el 02 anima su
 *      opacidad en ambas direcciones (crossfade direccional, arriba).
 *
 * Control de pausa (QA P1 — WCAG 2.2.2 Pause, Stop, Hide, nivel A):
 * movimiento automático > 5s en paralelo con contenido exige un control
 * EN la página; prefers-reduced-motion no basta formalmente. El botón
 * de la esquina pausa/reanuda el bucle y su pausa MANDA sobre el
 * observer y visibilitychange (no lo re-arrancan). Doble servicio:
 * cuando el autoplay está bloqueado (iOS Low Power Mode), el botón
 * muestra "reproducir" y el gesto del usuario autoriza el play() manual
 * — antes ese caso dejaba el poster sin forma de ver el video.
 *
 * Accesibilidad: los videos son decorativos (sin audio, sin controles)
 * → aria-hidden; la información de la escena vive en el alt del poster.
 *
 * Red (QA P2): el clip 02 monta con preload="none" — sus MB no compiten
 * con el LCP ni se descargan si el autoplay está bloqueado — y se
 * promueve a descarga completa en el primer 'playing' real del bucle
 * (quedan ~8s de clip 01 de margen). En < md se sirven las renditions
 * móviles 960×540.
 *
 * Robustez:
 * - Autoplay bloqueado: 'playing' nunca dispara, `listo` queda false,
 *   el poster permanece y el botón ofrece el arranque manual.
 * - Error de red/decode del clip visible: `fallo` desmonta videos y
 *   botón (corta también las descargas) y queda el poster.
 * - Error del clip en espera: al terminar el activo, su play() falla y
 *   se degrada a loopear el clip actual.
 * - StrictMode-safe: los efectos limpian observer/listener y toda
 *   promesa de play() lleva catch (el pause() que interrumpe un play()
 *   pendiente rechaza con AbortError — esperado e inofensivo).
 *
 * Perf (bucle infinito ≠ batería infinita): IntersectionObserver +
 * visibilitychange pausan el clip activo cuando el hero sale del
 * viewport o la pestaña se oculta, y lo reanudan al volver. Si el clip
 * justo terminó estando oculto, el avance quedó pendiente y
 * sincronizar() lo retoma (caso `ended`).
 */
export default function HeroVideo() {
  /* Marco observado por el IntersectionObserver (envuelve el stack). */
  const marcoRef = useRef(null);
  const videoRefs = useRef([]);

  /* Rendition según viewport, decidida una sola vez al montar (QA P2).
     Inicializador perezoso: corre en el primer render y nunca más. */
  const [clips] = useState(() =>
    window.matchMedia(MEDIA_MOVIL).matches ? CLIPS_MOVIL : CLIPS_ESCRITORIO,
  );

  /* Índice del clip activo. El estado pinta la opacidad; el ref espejo
     (activoRef) da el valor fresco a listeners/promesas sin re-suscribir
     los efectos en cada cambio de clip. */
  const [activo, setActivo] = useState(0);
  const activoRef = useRef(0);

  /* true solo cuando hero en viewport Y pestaña visible. */
  const visibleRef = useRef(true);

  /* Primer 'playing' real → fade-in del video sobre el poster. */
  const [listo, setListo] = useState(false);

  /* Error del clip visible → solo poster (videos y botón se desmontan). */
  const [fallo, setFallo] = useState(false);

  /* Pausa manual (QA P1): estado para pintar el botón; ref espejo para
     que listeners y promesas lean el valor fresco. Se escriben juntos
     en el handler (los handlers no se duplican en StrictMode). */
  const [pausadoManual, setPausadoManual] = useState(false);
  const pausadoManualRef = useRef(false);

  /* Promoción de la descarga del clip 02, una sola vez (QA P2). */
  const clip2PromovidoRef = useRef(false);

  useEffect(() => {
    activoRef.current = activo;
  }, [activo]);

  /* Avanza el bucle: arranca el clip siguiente y, SOLO cuando su play()
     resuelve (ya reproduce de verdad), cambia `activo` para disparar el
     crossfade — así el frame viejo nunca se funde hacia un video que
     aún no pinta. useCallback: identidad estable (clips no cambia tras
     montar) para declararla como dependencia del efecto de visibilidad. */
  const avanzar = useCallback(
    (indice) => {
      /* Sin avance si: eco de un clip ya retirado (guard teórico), hero
         fuera de pantalla (sincronizar() lo retomará al volver — caso
         `ended`) o pausa manual del usuario (QA P1: la pausa manda; el
         botón reanuda vía este mismo camino). */
      if (
        indice !== activoRef.current ||
        !visibleRef.current ||
        pausadoManualRef.current
      )
        return;
      const siguiente = (indice + 1) % clips.length;
      const video = videoRefs.current[siguiente];
      if (!video) return;
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          /* QA (P3): si el hero dejó de ser visible o el usuario pausó
             mientras el play() arrancaba, pausar de inmediato — cierra
             la ventana de reproducción oculta (hasta 15s del clip 02).
             El puntero SÍ avanza: sincronizar() o el botón reanudan
             este mismo clip al volver. */
          if (!visibleRef.current || pausadoManualRef.current)
            video.pause();
          setActivo(siguiente);
        })
        .catch(() => {
          /* El siguiente no pudo arrancar (descarga incompleta,
             decode): degradar a loop del clip actual — la escena sigue
             viva. */
          const actual = videoRefs.current[indice];
          if (!actual) return;
          actual.currentTime = 0;
          actual.play().catch(() => {});
        });
    },
    [clips],
  );

  /* Pausa/reanudación según viewport y visibilidad de la pestaña. */
  useEffect(() => {
    if (fallo) return undefined;
    const marco = marcoRef.current;
    if (!marco) return undefined;

    const sincronizar = () => {
      /* La pausa manual manda (QA P1): ni reanudar ni avanzar. El video
         ya está pausado, así que tampoco hay nada que pausar aquí. */
      if (pausadoManualRef.current) return;
      const video = videoRefs.current[activoRef.current];
      if (!video) return;
      if (visibleRef.current) {
        /* Activo en `ended` = el avance quedó pendiente mientras el
           hero estaba oculto → retomarlo; si no, reanudar sin más. */
        if (video.ended) {
          avanzar(activoRef.current);
        } else {
          video.play().catch(() => {});
        }
      } else {
        video.pause();
      }
    };

    let enViewport = true;
    const observer = new IntersectionObserver(
      ([entrada]) => {
        enViewport = entrada.isIntersecting;
        visibleRef.current = enViewport && !document.hidden;
        sincronizar();
      },
      { threshold: 0 },
    );

    /* visibilitychange no conoce el estado del IO; se recompone desde
       la última lectura de enViewport (closure) en cada evento. */
    const alVisibilitychange = () => {
      visibleRef.current = enViewport && !document.hidden;
      sincronizar();
    };

    observer.observe(marco);
    document.addEventListener('visibilitychange', alVisibilitychange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', alVisibilitychange);
    };
  }, [fallo, avanzar]);

  const alReproducir = () => {
    setListo(true);
    /* QA (P2): promover la descarga del clip 02 en el primer 'playing'
       real — nunca antes (no compite con el LCP y, si el autoplay está
       bloqueado, sus MB no se bajan en vano). Cambiar preload a solas
       no dispara la descarga: load() la arranca. Una sola vez (ref, no
       estado: es un handler de evento, StrictMode no lo duplica). */
    if (!clip2PromovidoRef.current) {
      clip2PromovidoRef.current = true;
      const clip2 = videoRefs.current[1];
      if (clip2) {
        clip2.preload = 'auto';
        clip2.load();
      }
    }
  };

  /* El botón refleja el estado PERCIBIDO: "reproducir" si el usuario
     pausó o si el bucle aún no arranca (autoplay bloqueado); "pausar"
     mientras corre. Las pausas automáticas (IO/pestaña oculta) no lo
     alteran: ocurren justo cuando el botón no está a la vista y el
     bucle se reanuda solo al volver. */
  const mostrandoPlay = pausadoManual || !listo;

  const alternarPausa = () => {
    const video = videoRefs.current[activoRef.current];
    if (mostrandoPlay) {
      /* Reanudar (o arrancar por primera vez si el autoplay se bloqueó:
         el gesto del usuario autoriza este play()). Ref y estado se
         limpian ANTES del play para que avanzar()/sincronizar() no lo
         veten. */
      pausadoManualRef.current = false;
      setPausadoManual(false);
      if (!video) return;
      if (video.ended) {
        /* Pausa manual justo sobre el frame final: reanudar = avanzar. */
        avanzar(activoRef.current);
      } else {
        video.play().catch(() => {});
      }
    } else {
      pausadoManualRef.current = true;
      setPausadoManual(true);
      if (video) video.pause();
    }
  };

  return (
    <>
      <div ref={marcoRef} className="absolute inset-0">
        {/* Poster = LCP (preload inyectado por Home): pinta de inmediato
            mientras los clips descargan. object-center (no el 28% de la
            foto aérea): la entrada del hotel está centrada en el frame. */}
        <img
          src={POSTER}
          alt="Entrada principal de Aurea Vita entre palmeras al atardecer, con la iluminación cálida encendida y el Pacífico al fondo"
          width="1920"
          height="1080"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {!fallo &&
          clips.map((src, indice) => {
            /* Crossfade direccional (QA P3, ver nota en CROSSFADE): el
               clip 01 queda opaco permanente una vez listo; solo el 02
               anima entrada y salida. */
            const opaco = indice === 0 ? listo : activo === 1;
            return (
              <video
                key={src}
                ref={(el) => {
                  videoRefs.current[indice] = el;
                }}
                src={src}
                muted
                playsInline
                autoPlay={indice === 0}
                preload={indice === 0 ? 'auto' : 'none'}
                disablePictureInPicture
                disableRemotePlayback
                aria-hidden="true"
                tabIndex={-1}
                onPlaying={alReproducir}
                onEnded={() => avanzar(indice)}
                onError={() => {
                  /* Solo el clip visible tumba el video (queda el
                     poster); el error del clip en espera lo absorbe el
                     catch de avanzar(). */
                  if (indice === activoRef.current) setFallo(true);
                }}
                className={`absolute inset-0 h-full w-full object-cover object-center ${CROSSFADE} ${
                  opaco ? 'opacity-100' : 'opacity-0'
                }`}
              />
            );
          })}
      </div>
      {/* Control pausa/reproducir (QA P1 — WCAG 2.2.2). Hermano del
          marco y con z-20: los scrims de Home son hermanos posteriores
          sin z-index y lo taparían por orden de pintura; z-20 lo deja
          encima y clicable (el bloque de texto del hero es z-10 y no
          alcanza esta esquina; la BookingBar muerde el borde solo
          -mt-3/-mt-5, muy por debajo de bottom-6). Área táctil 44×44px
          exactos (h-11 w-11). El anillo de foco global usa currentColor
          (marino, invisible aquí): se fuerza marfil, como el CTA final
          de Home. Sin rounded: los controles del sitio son rectos (G2). */}
      {!fallo && (
        <button
          type="button"
          onClick={alternarPausa}
          aria-label={
            mostrandoPlay
              ? 'Reproducir video de fondo'
              : 'Pausar video de fondo'
          }
          className="absolute bottom-6 right-5 z-20 flex h-11 w-11 items-center justify-center bg-marino/40 text-marfil backdrop-blur-sm transition-colors duration-300 hover:bg-marino/60 focus-visible:outline-marfil sm:right-8"
        >
          {mostrandoPlay ? <IconoPlay /> : <IconoPausa />}
        </button>
      )}
    </>
  );
}
