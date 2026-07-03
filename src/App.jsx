import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { Analytics } from '@vercel/analytics/react'

import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Petals from './components/Petals.jsx'
import Hero from './components/Hero.jsx'
import Poem from './components/Poem.jsx'
import Scrub from './components/Scrub.jsx'
import Gallery from './components/Gallery.jsx'
import Still from './components/Still.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const [ready, setReady] = useState(false)
  const lenisRef = useRef(null)

  // smooth scroll + ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  const navigate = (target) => {
    lenisRef.current?.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
  }

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Petals />
      <div className="grain" aria-hidden="true" />
      <Nav onNavigate={navigate} />

      <main>
        <Hero ready={ready} />
        <Poem />
        <Scrub />
        <Gallery onNavigate={navigate} />
        <Still />
        <Footer onNavigate={navigate} />
      </main>

      <Analytics />
    </>
  )
}
