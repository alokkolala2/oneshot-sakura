import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Poem() {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('.poem__jp', {
      opacity: 0,
      letterSpacing: '1.4em',
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })
    gsap.from('.poem__text .line > span', {
      yPercent: 115,
      duration: 1.2,
      stagger: 0.18,
      ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 62%' },
    })
    gsap.from('.poem__seal', {
      scale: 0,
      rotate: 25,
      duration: 0.8,
      ease: 'back.out(2.5)',
      scrollTrigger: { trigger: '.poem__seal', start: 'top 88%' },
    })
  }, { scope: ref })

  return (
    <section className="poem" id="spirit" ref={ref}>
      <p className="poem__jp" aria-hidden="true">花は散りても</p>
      <h2 className="poem__text">
        <span className="line"><span>Petals fall, <em>the tree does not grieve.</em></span></span>
        <span className="line"><span>Ink dries, <em>the story keeps blooming.</em></span></span>
      </h2>
      <div className="poem__seal">押印</div>
    </section>
  )
}
