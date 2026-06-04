import ScrollReveal from '../common/ScrollReveal.jsx'
import ExperienceCard from './ExperienceCard.jsx'
import styles from './Experiences.module.css'

const experiences = [
  {
    id: 1,
    icon: '🌿',
    title: 'Spa Aurea',
    description:
      'Técnicas ancestrales y tratamientos contemporáneos en un espacio diseñado para el silencio y la restauración. Cada sesión es un viaje hacia adentro.',
    imageDesc:
      'Interior de spa con iluminación tenue, mesa de masajes con sábanas blancas, pétalos, piedras calientes, difusor aromático',
  },
  {
    id: 2,
    icon: '🍽️',
    title: 'Restaurante Aurea',
    description:
      'Cocina que celebra los sabores de México con mirada gourmet. El chef trabaja con productores locales y de temporada para menús que sorprenden sin perder su autenticidad.',
    imageDesc:
      'Mesa elegante al aire libre, mantel de lino, vajilla artesanal de cerámica, platillo gourmet colorido, jardín al fondo',
  },
  {
    id: 3,
    icon: '🌱',
    title: 'Jardines Vivos',
    description:
      'El corazón verde del hotel: rincones de meditación, caminos entre flores silvestres y espacios de contemplación para desconectar del mundo exterior.',
    imageDesc:
      'Camino de piedra entre helechos y flores silvestres, luz filtrada por follaje, banca de madera rústica al costado',
  },
  {
    id: 4,
    icon: '✨',
    title: 'Servicio Personalizado',
    description:
      'Somos pocos y lo hacemos a propósito. Conocemos tu nombre desde que llegas y anticipamos lo que necesitas antes de que lo pidas.',
    imageDesc:
      'Empleado del hotel sirviendo copa de vino en terraza, expresión cálida genuina, jardín desenfocado al fondo, luz dorada',
  },
]

function Experiences() {
  return (
    <section className={styles.section} id="experiencias">
      <div className={styles.container}>
        <ScrollReveal animation="fadeUp">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Experiencias</span>
            <h2 className={styles.title}>Más que hospedaje</h2>
            <span className={styles.titleLine} aria-hidden="true" />
            <p className={styles.subtitle}>
              En Aurea Vita, cada rincón tiene algo que ofrecerte. Permítete explorar,
              relajarte y descubrir lo que solo aquí existe.
            </p>
          </div>
        </ScrollReveal>
        <div className={styles.grid}>
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.id} animation="fadeUp" delay={i * 100}>
              <ExperienceCard {...exp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experiences
