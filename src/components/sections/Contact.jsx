import { Link } from 'react-router-dom'
import ScrollReveal from '../common/ScrollReveal.jsx'
import ImagePlaceholder from '../common/ImagePlaceholder.jsx'
import styles from './Contact.module.css'

const contactInfo = [
  {
    icon: '📍',
    label: 'Dirección',
    value: 'Camino del Laurel 47, Col. Jardines del Pedregal, CDMX, CP 01900',
    href: null,
  },
  {
    icon: '📞',
    label: 'Teléfono',
    value: '+52 (55) 1234-5678',
    href: 'tel:+525512345678',
  },
  {
    icon: '✉',
    label: 'Email',
    value: 'reservas@aureavita.mx',
    href: 'mailto:reservas@aureavita.mx',
  },
  {
    icon: '🕐',
    label: 'Horario',
    value: 'Lunes a Domingo, 8:00 am – 10:00 pm',
    href: null,
  },
]

function Contact() {
  return (
    <section className={styles.section} id="contacto">
      <div className={styles.container}>
        <ScrollReveal animation="fadeUp">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Encuéntranos</span>
            <h2 className={styles.title}>Estamos aquí para ti</h2>
            <span className={styles.titleLine} aria-hidden="true" />
            <p className={styles.subtitle}>
              Ya sea que tengas una pregunta, quieras planear una estancia especial o simplemente
              desees saber más, nuestro equipo responde con gusto — siempre hay una persona real
              al otro lado.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal animation="slideInLeft" className={styles.infoCol}>
            <ul className={styles.infoList}>
              {contactInfo.map(({ icon, label, value, href }) => (
                <li key={label} className={styles.infoItem}>
                  <span className={styles.infoIcon} aria-hidden="true">{icon}</span>
                  <div>
                    <span className={styles.infoLabel}>{label}</span>
                    {href ? (
                      <a href={href} className={`${styles.infoValue} ${styles.infoLink}`}>{value}</a>
                    ) : (
                      <span className={styles.infoValue}>{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/reservar" className={styles.cta}>Reservar ahora</Link>
          </ScrollReveal>

          <ScrollReveal animation="slideInRight" className={styles.mapCol}>
            {/* REEMPLAZAR FOTO: Google Maps embed mostrando la ubicación del hotel en Camino del Laurel 47, CDMX */}
            <ImagePlaceholder
              variant="map"
              description="Mapa de ubicación del hotel — Camino del Laurel 47, Col. Jardines del Pedregal, CDMX"
              className={styles.map}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
