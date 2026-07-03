import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from './SplitText.jsx'

export default function Footer({ onNavigate }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('.cta__inner .char', {
      yPercent: 120,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 65%' },
    })
    gsap.from('.cta__jp, .cta__inner p, .cta__btn', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 60%' },
    })
  }, { scope: ref })

  const go = (e) => {
    e.preventDefault()
    onNavigate?.('#top')
  }

  return (
    <footer className="cta" id="visit" ref={ref}>
      <div className="cta__inner">
        <span className="cta__jp">ようこそ</span>
        <SplitText as="h2">Come sit beneath the tree.</SplitText>
        <p>
          Open daily from first light until the lanterns burn low.<br />
          Kyoto — and anywhere paper meets ink.
        </p>
        <a className="cta__btn" href="#top" onClick={go}><span>Begin again</span></a>
      </div>
      <div className="cta__foot">
        <span>© 2026 Sakura Atelier</span>
        <span className="cta__seal">桜</span>
        <span>花鳥風月</span>
      </div>
    </footer>
  )
}
