import { Link } from 'react-router-dom'
import styles from './ReservarPage.module.css'

function ReservarPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.decorIcon} aria-hidden="true">✦</span>

        <h1 className={styles.title}>Tu reserva, muy pronto aquí.</h1>
        <span className={styles.titleLine} aria-hidden="true" />

        <p className={styles.subtitle}>
          Estamos preparando nuestro sistema de reservas en línea para que puedas planear
          tu estancia de manera fácil y segura desde esta página. Gracias por tu paciencia
          — vale la pena esperar.
        </p>

        <p className={styles.contactIntro}>
          Mientras tanto, nuestro equipo está disponible para ayudarte a planear tu visita
          de manera personal y sin costo adicional. Escríbenos o llámanos:
        </p>

        <div className={styles.contactCard}>
          <a href="tel:+525512345678" className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">📞</span>
            <span>+52 (55) 1234-5678</span>
          </a>
          <a href="mailto:reservas@aureavita.mx" className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">✉</span>
            <span>reservas@aureavita.mx</span>
          </a>
          <p className={styles.contactHours}>Lun – Dom, 8:00 am – 10:00 pm</p>
        </div>

        <Link to="/" className={styles.backButton}>
          ← Volver al inicio
        </Link>

        <p className={styles.expectation}>
          Próximamente podrás reservar directamente aquí, elegir tu habitación
          y personalizar tu experiencia en Aurea Vita — todo en minutos.
        </p>
      </div>
    </div>
  )
}

export default ReservarPage
