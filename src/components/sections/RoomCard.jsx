import { Link } from 'react-router-dom'
import ImagePlaceholder from '../common/ImagePlaceholder.jsx'
import styles from './RoomCard.module.css'

function RoomCard({ title, price, description, imageDesc, buttonText = 'Reservar' }) {
  return (
    <article className={styles.card}>
      {/* REEMPLAZAR FOTO: usar <img> con la fotografía real de la habitación */}
      <ImagePlaceholder
        variant="room"
        description={imageDesc}
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.divider} aria-hidden="true" />
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceLabel}>Desde</span>
            <span className={styles.priceAmount}>{price}</span>
            <span className={styles.pricePeriod}>/ noche</span>
          </div>
          <Link to="/reservar" className={styles.cta}>{buttonText}</Link>
        </div>
      </div>
    </article>
  )
}

export default RoomCard
