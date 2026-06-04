import ScrollReveal from '../common/ScrollReveal.jsx'
import ImagePlaceholder from '../common/ImagePlaceholder.jsx'
import styles from './About.module.css'

const stats = [
  { value: '+12', label: 'Años de experiencia' },
  { value: '+4,800', label: 'Huéspedes satisfechos' },
  { value: '96%', label: 'Satisfacción verificada' },
  { value: '3', label: 'Premios de hospitalidad' },
]

function About() {
  return (
    <section className={styles.section} id="nosotros">
      <div className={styles.container}>
        <div className={styles.grid}>
          <ScrollReveal animation="slideInLeft" className={styles.textCol}>
            <div className={styles.textContent}>
              <span className={styles.eyebrow}>Nuestra historia</span>
              <h2 className={styles.title}>El origen de la vida dorada</h2>
              <span className={styles.titleLine} aria-hidden="true" />

              <p className={styles.body}>
                Aurea Vita nació de una convicción sencilla: que el descanso verdadero no se compra
                con metros cuadrados ni con lujos ostentosos, sino con atención genuina, belleza
                auténtica y una naturaleza que te recuerde quién eres. El hotel abrió sus puertas
                hace más de una década como un proyecto familiar con alma de refugio, y así ha permanecido.
              </p>
              <p className={styles.body}>
                Elegimos este rincón de México no por accidente, sino porque la tierra aquí tiene algo
                difícil de nombrar — una energía tranquila, un verde que calma y un silencio que sana.
                Diseñamos cada espacio respetando lo que ya existía: los árboles, la topografía, la luz.
                Construimos con el lugar, no sobre él.
              </p>
              <p className={styles.body}>
                Nuestra filosofía no ha cambiado desde el primer día: menos habitaciones, más presencia.
                Menos ruido, más escucha. Cada huésped que llega a Aurea Vita no es un número de reserva
                — es una historia que nos honra con su confianza, y que nos comprometemos a acompañar
                desde que llega hasta que parte.
              </p>
              <p className={styles.body}>
                Hoy, Aurea Vita sigue siendo un hotel pequeño y deliberadamente íntimo. Seguimos siendo
                familia. Y cada temporada, cada jardín que florece y cada huésped que regresa nos confirma
                que elegimos bien.
              </p>

              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>
                  "Quería un lugar donde la gente llegara para descansar de verdad — no para presumir
                  que estuvo aquí. Si al salir alguien siente que recuperó algo de sí mismo,
                  entonces hicimos nuestro trabajo."
                </p>
                <cite className={styles.quoteAuthor}>— Alejandro Montoya, Fundador de Aurea Vita</cite>
              </blockquote>

              <div className={styles.stats}>
                {stats.map(({ value, label }) => (
                  <div key={label} className={styles.stat}>
                    <span className={styles.statValue}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideInRight" className={styles.imageCol}>
            {/* REEMPLAZAR FOTO: Fotografía del fundador o del equipo en los jardines, luz natural, actitud relajada y genuina */}
            <ImagePlaceholder
              variant="about"
              description="Fundador o equipo del hotel en los jardines, luz natural, actitud relajada y genuina"
              className={styles.image}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default About
