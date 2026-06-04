import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Habitaciones', href: '/#habitaciones' },
  { label: 'Experiencias', href: '/#experiencias' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isReservarPage = location.pathname === '/reservar'

  return (
    <header className={`${styles.header} ${scrolled || isReservarPage ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo} aria-label="Aurea Vita — Inicio">
        <img src="/Aurea_Vita_logo.png" alt="Aurea Vita" className={styles.logoImg} />
      </Link>

      <nav
        className={`${styles.nav} ${menuOpen ? styles.open : ''}`}
        aria-label="Navegación principal"
      >
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={styles.navLink}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <Link to="/reservar" className={styles.cta} onClick={() => setMenuOpen(false)}>
          Reservar ahora
        </Link>
      </nav>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}

export default Header
