import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from './SplitText.jsx'

export default function Hero({ ready }) {
  const ref = useRef(null)

  // intro — waits for loader
  useGSAP(() => {
    if (!ready) return
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.hero__title .char', {
      yPercent: 120,
      opacity: 0,
      rotate: 6,
      duration: 1.3,
      stagger: 0.055,
    })
      .from('.hero__kicker span', { yPercent: 110, duration: 1 }, '-=0.9')
      .from('.hero__sub span', { yPercent: 110, opacity: 0, duration: 1 }, '-=0.8')
      .from('.hero__vertical', { opacity: 0, y: 30, duration: 1.2 }, '-=0.8')
      .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.6')
  }, { scope: ref, dependencies: [ready] })

  // scroll parallax
  useGSAP(() => {
    gsap.to('.hero__video', {
      scale: 1.18,
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    gsap.to('.hero__content', {
      y: -110,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: '70% top',
        scrub: true,
      },
    })
  }, { scope: ref })

  return (
    <header className="hero" id="top" ref={ref}>
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        src="/Sakura_grow_on_paper_202607021536.mp4"
      />
      <div className="hero__wash" />

      <div className="hero__vertical" aria-hidden="true">春の夢、墨に咲く</div>

      <div className="hero__content">
        <p className="hero__kicker reveal-line"><span>An ink &amp; bloom atelier</span></p>
        <SplitText as="h1" className="hero__title">SAKURA</SplitText>
        <p className="hero__sub reveal-line"><span>Where a single brushstroke becomes spring.</span></p>
      </div>

      <div className="hero__scroll">
        <span>scroll</span>
        <i />
      </div>
    </header>
  )
}
