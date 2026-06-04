import { Link } from 'react-router-dom'
import ImagePlaceholder from '../common/ImagePlaceholder.jsx'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      {/* REEMPLAZAR FOTO: Vista panorámica del hotel al amanecer/atardecer entre vegetación densa, luz dorada, arquitectura integrada a la naturaleza */}
      <ImagePlaceholder
        variant="hero"
        description="Vista panorámica del hotel al amanecer entre vegetación densa, luz dorada"
        className={styles.heroImage}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.eyebrow}>Bienvenidos a</span>
        <h1 className={styles.title}>Bienvenido a tu vida dorada.</h1>
        <p className={styles.subtitle}>
          Aurea Vita es un refugio donde el tiempo se detiene con elegancia.
          Entre jardines, aromas naturales y una atención que anticipa cada deseo,
          descubrirás lo que significa descansar de verdad.
        </p>
        <div className={styles.ctas}>
          <Link to="/reservar" className={styles.ctaPrimary}>Descubre el hotel</Link>
          <a href="#habitaciones" className={styles.ctaSecondary}>Ver habitaciones</a>
        </div>
      </div>
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}

export default Hero
