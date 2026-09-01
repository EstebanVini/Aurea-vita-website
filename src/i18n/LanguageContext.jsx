import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ui } from './ui.js';

/**
 * Contexto de idioma ES/EN (ronda 31 ago 2026, docs/planeacion_i18n.md).
 * Sin dependencias nuevas: el sitio ya evita librerías (ver usePageMeta).
 *
 * - Persistencia en localStorage (clave `aurea-vita-lang`), no cookie:
 *   SPA estática sin backend — nadie lee cookies del lado servidor y
 *   localStorage no viaja en cada request ni exige aviso de cookies.
 *   Todo acceso va en try/catch: en modo privado / storage bloqueado
 *   el getter y el setter pueden lanzar, y el sitio debe seguir vivo.
 * - Primera visita sin preferencia guardada: navigator.language(s) —
 *   si empieza con "en" se arranca en inglés; en cualquier otro caso,
 *   español (idioma principal del sitio). La elección manual siempre
 *   gana y se persiste.
 * - <html lang> se sincroniza vía efecto para lectores de pantalla
 *   (el index.html trae "es-MX" de arranque; aquí pasa a "es"/"en").
 */

const STORAGE_KEY = 'aurea-vita-lang';
const IDIOMAS = ['es', 'en'];

function idiomaInicial() {
  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    if (IDIOMAS.includes(guardado)) return guardado;
  } catch {
    /* Modo privado / storage bloqueado: se cae a la detección. */
  }
  const preferido = (
    navigator.languages?.[0] ??
    navigator.language ??
    ''
  ).toLowerCase();
  return preferido.startsWith('en') ? 'en' : 'es';
}

const LanguageContext = createContext({ lang: 'es', setLang: () => {} });

export function LanguageProvider({ children }) {
  /* Inicializador perezoso: localStorage/navigator se leen una vez. */
  const [lang, setLangState] = useState(idiomaInicial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((nuevo) => {
    if (!IDIOMAS.includes(nuevo)) return;
    setLangState(nuevo);
    try {
      window.localStorage.setItem(STORAGE_KEY, nuevo);
    } catch {
      /* Sin persistencia disponible: el cambio vive en la sesión. */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Hook de idioma activo: { lang: 'es' | 'en', setLang }. */
export function useLang() {
  return useContext(LanguageContext);
}

/** Sub-objeto del diccionario de UI en el idioma activo (src/i18n/ui.js). */
export function useT() {
  const { lang } = useLang();
  return ui[lang];
}
