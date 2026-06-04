import ImagePlaceholder from '../common/ImagePlaceholder.jsx'
import styles from './ExperienceCard.module.css'

function ExperienceCard({ icon, title, description, imageDesc }) {
  return (
    <article className={styles.card}>
      {/* REEMPLAZAR FOTO: usar <img> con la fotografía real de la experiencia */}
      <ImagePlaceholder
        variant="experience"
        description={imageDesc}
        className={styles.image}
      />
      <div className={styles.body}>
        <span className={styles.icon} aria-hidden="true">{icon}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  )
}

export default ExperienceCard
