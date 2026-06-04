import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const hotelLinks = [
  { label: 'Habitaciones', href: '/#habitaciones' },
  { label: 'Experiencias', href: '/#experiencias' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
]

const legalLinks = [
  { label: 'Aviso de Privacidad', href: '#' },
  { label: 'Términos y Condiciones', href: '#' },
  { label: 'Política de Cancelación', href: '#' },
  { label: 'Accesibilidad', href: '#' },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="Aurea Vita — Inicio">
            <img src="/Aurea_Vita_logo.png" alt="Aurea Vita" className={styles.logoImg} />
          </Link>
          <p className={styles.tagline}>"Donde la vida florece en oro."</p>
          <address className={styles.contact}>
            <a href="tel:+525512345678">+52 (55) 1234-5678</a>
            <a href="mailto:reservas@aureavita.mx">reservas@aureavita.mx</a>
          </address>
        </div>

        <nav className={styles.column} aria-label="Links del hotel">
          <p className={styles.columnTitle}>Hotel</p>
          <ul>
            {hotelLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={styles.link}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.column} aria-label="Links legales">
          <p className={styles.columnTitle}>Legal</p>
          <ul>
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={styles.link}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.column}>
          <p className={styles.columnTitle}>Síguenos</p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">FB</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2026 Aurea Vita. Todos los derechos reservados.
        </p>
        <p className={styles.signature}>Diseñado con amor y raíces mexicanas.</p>
      </div>
    </footer>
  )
}

export default Footer
