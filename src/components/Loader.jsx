import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Loader({ onDone }) {
  const ref = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => onDone?.(),
    })
    tl.from('.loader__seal', { scale: 0, rotate: -30, duration: 0.7, ease: 'back.out(2)' })
      .to('.loader__bar span', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '-=0.2')
      .to(ref.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.15 })
      .set(ref.current, { display: 'none' })
  }, { scope: ref })

  return (
    <div className="loader" ref={ref}>
      <div className="loader__seal">桜</div>
      <div className="loader__bar"><span /></div>
    </div>
  )
}
