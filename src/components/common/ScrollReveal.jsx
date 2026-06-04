import useScrollReveal from '../../hooks/useScrollReveal.js'
import styles from './ScrollReveal.module.css'

function ScrollReveal({ animation = 'fadeUp', delay = 0, threshold = 0.1, children }) {
  const [ref, isVisible] = useScrollReveal({ threshold })

  return (
    <div
      ref={ref}
      className={`${styles.base} ${styles[animation]} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
