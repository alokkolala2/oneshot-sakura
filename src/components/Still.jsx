import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from './SplitText.jsx'

/**
 * The cat section — scroll-driven like the scrub section.
 * The video is keyframe-dense (g=1) so seeking is cheap.
 * Playback finishes at ~80% of the pin, then holds the last
 * frame while the text settles in.
 */
export default function Still() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  useGSAP(() => {
    const video = videoRef.current

    // iOS/touch: currentTime seeking is unreliable → autoplay-loop instead.
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    let tick
    if (isTouch) {
      video.muted = true
      video.loop = true
      const play = () => video.play().catch(() => {})
      play()
      video.addEventListener('loadeddata', play, { once: true })
    } else {
      video.pause()
      const state = { target: 0, current: 0 }
      tick = () => {
        const diff = state.target - state.current
        if (Math.abs(diff) < 0.001) return
        state.current += diff * 0.18
        if (video.readyState >= 2) video.currentTime = state.current
      }
      gsap.ticker.add(tick)

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: '+=220%',
        scrub: 0.4,
        onUpdate: (self) => {
          const duration = video.duration || 6
          // video completes at 80% of the pin, then freezes on its last frame
          const p = Math.min(self.progress / 0.8, 1)
          state.target = p * (duration - 0.05)
        },
      })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: '+=220%',
        pin: '.still__pin',
        scrub: 0.4,
      },
    })

    tl.fromTo('.still__veil', { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.2 }, 0)
      .fromTo('.still__video', { scale: 1.12 }, { scale: 1, ease: 'none', duration: 1 }, 0)
      // text arrives while the last frame holds
      .fromTo('.still__jp', { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: 'power1.out', duration: 0.12 }, 0.68)
      .fromTo(
        '.still__content .char',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.006, ease: 'power2.out', duration: 0.16 },
        0.72
      )
      .fromTo('.still__sub', { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: 'power1.out', duration: 0.12 }, 0.82)

    return () => { if (tick) gsap.ticker.remove(tick) }
  }, { scope: ref })

  return (
    <section className="still" ref={ref}>
      <div className="still__pin">
        <video
          ref={videoRef}
          className="still__video"
          muted
          playsInline
          preload="auto"
          src="/cat_scrub.mp4"
        />
        <div className="still__veil" />
        <div className="still__content">
          <p className="still__jp" aria-hidden="true">猫は知っている</p>
          <SplitText as="h2">The cat already knows.</SplitText>
          <p className="still__sub">Stillness is not the absence of motion — it is motion, perfectly at rest.</p>
        </div>
      </div>
    </section>
  )
}
