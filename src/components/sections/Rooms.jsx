import ScrollReveal from '../common/ScrollReveal.jsx'
import RoomCard from './RoomCard.jsx'
import styles from './Rooms.module.css'

const rooms = [
  {
    id: 1,
    title: 'Nido del Bosque',
    price: '$2,800 MXN',
    description:
      'El Nido del Bosque es el punto de partida perfecto para adentrarse en la experiencia Aurea Vita. Con vista directa al jardín y materiales naturales, esta habitación invita al descanso genuino desde el primer instante.',
    imageDesc:
      'Interior de habitación estándar con luz natural, cama king en lino blanco, tonos tierra, plantas vivas',
    buttonText: 'Reservar esta habitación',
  },
  {
    id: 2,
    title: 'Brisa Verde',
    price: '$4,500 MXN',
    description:
      'La Suite Brisa Verde amplía el horizonte de tu estancia con espacios generosos y una sala de estar donde el paisaje se convierte en protagonista. Cada mañana aquí comienza con brisa fresca y luz verde entre los árboles.',
    imageDesc:
      'Suite junior con sala de estar, ventanal al jardín, sofá de lino, copa de vino, orquídea blanca',
    buttonText: 'Reservar esta suite',
  },
  {
    id: 3,
    title: 'Cielo Dorado',
    price: '$8,200 MXN',
    description:
      'La Suite Cielo Dorado es la expresión más pura de lo que Aurea Vita representa: un espacio donde el lujo no grita, sino que susurra. Con terraza privada, alberca de inmersión y una vista que parece pintada.',
    imageDesc:
      'Terraza privada de la suite aurea al atardecer con alberca de inmersión, luz dorada, copa de champán',
    buttonText: 'Reservar la Suite Aurea',
  },
]

function Rooms() {
  return (
    <section className={styles.section} id="habitaciones">
      <div className={styles.container}>
        <ScrollReveal animation="fadeUp">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Nuestras habitaciones</span>
            <h2 className={styles.title}>Espacios que abrazan</h2>
            <span className={styles.titleLine} aria-hidden="true" />
            <p className={styles.subtitle}>
              Cada habitación en Aurea Vita fue diseñada como un mundo propio: íntimo,
              sensorial y pensado hasta el último detalle para que tu descanso sea absoluto.
            </p>
          </div>
        </ScrollReveal>
        <div className={styles.grid}>
          {rooms.map((room, i) => (
            <ScrollReveal key={room.id} animation="fadeUp" delay={i * 120}>
              <RoomCard {...room} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rooms
