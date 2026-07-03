import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/**
 * Pinned section — scrolling scrubs through the petals video.
 * The video is re-encoded with every frame as a keyframe (g=1),
 * so currentTime seeks are cheap. A small lerp in the ticker
 * keeps playback silky instead of steppy.
 */
export default function Scrub() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  useGSAP(() => {
    const video = videoRef.current

    // iOS/touch: seeking currentTime frame-by-frame is unreliable, so fall back
    // to plain autoplay-loop. The foreground timeline still moves with scroll.
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
          state.target = self.progress * (duration - 0.05)
        },
      })
    }

    // foreground timeline — moves WITH scroll on every device
    gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: '+=220%',
        pin: '.scrub__pin',
        scrub: 0.4,
      },
    })
      .fromTo('.scrub__video', { scale: 1.14 }, { scale: 1, ease: 'none' }, 0)
      .fromTo('.scrub__kanji', { yPercent: 46 }, { yPercent: -46, ease: 'none' }, 0)
      .fromTo('.scrub__caption', { y: 140, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out', duration: 0.25 }, 0.05)
      .to('.scrub__caption', { y: -120, opacity: 0, ease: 'power1.in', duration: 0.25 }, 0.75)

    return () => { if (tick) gsap.ticker.remove(tick) }
  }, { scope: ref })

  return (
    <section className="scrub" id="craft" ref={ref}>
      <div className="scrub__pin">
        <video
          ref={videoRef}
          className="scrub__video"
          muted
          playsInline
          preload="auto"
          src="/petals_scrub.mp4"
        />

        <div className="scrub__kanji" aria-hidden="true">花吹雪</div>

        <div className="scrub__caption">
          <span className="scrub__num">一</span>
          <h3>The wind turns the page.</h3>
          <p>Scroll, and the petals let go — one breath of spring loosened from the branch at a time.</p>
        </div>

      </div>
    </section>
  )
}
