import styles from './ImagePlaceholder.module.css'

// REEMPLAZAR FOTO: Sustituir este componente por <img src="..." alt="..." /> cuando se tengan las fotografías reales.
function ImagePlaceholder({ description = '', variant = 'default', className = '' }) {
  return (
    <div className={`${styles.placeholder} ${styles[variant]} ${className}`}>
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">📷</span>
        <span className={styles.label}>{description}</span>
      </div>
    </div>
  )
}

export default ImagePlaceholder
