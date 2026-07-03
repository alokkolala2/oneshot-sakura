import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from './SplitText.jsx'

const PANELS = [
  {
    img: '/create_scene_on_background_2K_202607021959.jpeg',
    alt: 'Watercolor garden with pagoda and bridge under blooming sakura',
    num: '二',
    title: 'The Bridge of Quiet Water',
    text: 'Cross slowly. The pond below holds every spring that ever was, and it is in no hurry to let one go.',
    link: 'Walk the garden',
    side: 'left',
  },
  {
    img: '/Create_mountain_scene_background_2K_202607021959.jpeg',
    alt: 'Ink-wash mountain temple wrapped in mist and blossoms',
    num: '三',
    title: 'The Temple Above the Mist',
    text: 'Higher than the birds, older than the fog. The mountain wears its blossoms the way monks wear silence.',
    link: 'Climb the path',
    side: 'right',
  },
]

export default function Gallery({ onNavigate }) {
  const ref = useRef(null)

  useGSAP(() => {
    // heading chars
    gsap.from('.gallery__head .char', {
      yPercent: 120,
      opacity: 0,
      stagger: 0.04,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.gallery__head', start: 'top 75%' },
    })
    gsap.from('.gallery__jp', {
      opacity: 0,
      letterSpacing: '1.6em',
      duration: 1.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery__head', start: 'top 78%' },
    })

    gsap.utils.toArray('.panel').forEach((panel) => {
      const img = panel.querySelector('.panel__img img')
      const fromRight = panel.classList.contains('panel--right')

      // ink-wipe reveal
      gsap.fromTo(
        panel.querySelector('.panel__img'),
        { clipPath: fromRight ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0%)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: panel, start: 'top 70%' },
        }
      )
      gsap.fromTo(
        img,
        { scale: 1.35 },
        {
          scale: 1.08,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 70%' },
        }
      )
      // slow parallax drift while in view
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      )
      // text block
      gsap.from(panel.querySelectorAll('.panel__num, .panel__text h3, .panel__text p, .panel__link'), {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: panel, start: 'top 58%' },
      })
    })
  }, { scope: ref })

  const go = (e) => {
    e.preventDefault()
    onNavigate?.('#visit')
  }

  return (
    <section className="gallery" id="garden" ref={ref}>
      <div className="gallery__head">
        <span className="gallery__jp">庭園</span>
        <SplitText as="h2">The Garden</SplitText>
      </div>

      {PANELS.map((p) => (
        <div className={`panel panel--${p.side}`} key={p.num}>
          <figure className="panel__img">
            <img src={p.img} alt={p.alt} loading="lazy" />
          </figure>
          <div className="panel__text">
            <span className="panel__num">{p.num}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <a className="panel__link" href="#visit" onClick={go}>
              {p.link} <i>→</i>
            </a>
          </div>
        </div>
      ))}
    </section>
  )
}
