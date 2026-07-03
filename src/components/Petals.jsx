import { useEffect, useRef } from 'react'

const COLORS = [
  'rgba(230, 162, 180, A)',
  'rgba(224, 133, 158, A)',
  'rgba(201, 85, 111, A)',
  'rgba(238, 190, 200, A)',
]

export default function Petals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = w < 820 ? 14 : 26
    const rand = (a, b) => a + Math.random() * (b - a)

    const spawn = (anywhere) => ({
      x: rand(-40, w + 40),
      y: anywhere ? rand(-h * 0.2, h) : rand(-120, -20),
      size: rand(5, 12),
      vy: rand(0.35, 1.1),
      vx: rand(-0.35, 0.5),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.02, 0.02),
      swayAmp: rand(12, 44),
      swaySpeed: rand(0.4, 1.1),
      phase: rand(0, Math.PI * 2),
      color: COLORS[(Math.random() * COLORS.length) | 0].replace('A', rand(0.35, 0.8).toFixed(2)),
      squish: rand(0.55, 0.8),
    })

    let petals = Array.from({ length: count }, () => spawn(true))

    let lastScroll = window.scrollY
    let scrollVel = 0

    const drawPetal = (p) => {
      ctx.save()
      ctx.translate(p.x + Math.sin(p.phase) * p.swayAmp, p.y)
      ctx.rotate(p.rot)
      ctx.scale(1, p.squish)
      ctx.beginPath()
      const s = p.size
      // simple petal: two curves meeting in a soft point
      ctx.moveTo(0, -s)
      ctx.bezierCurveTo(s, -s * 0.6, s * 0.9, s * 0.7, 0, s)
      ctx.bezierCurveTo(-s * 0.9, s * 0.7, -s, -s * 0.6, 0, -s)
      ctx.fillStyle = p.color
      ctx.fill()
      ctx.restore()
    }

    let t = 0
    const tick = () => {
      const sc = window.scrollY
      scrollVel += ((sc - lastScroll) - scrollVel) * 0.08
      lastScroll = sc
      t += 0.016

      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.phase += p.swaySpeed * 0.016
        p.y += p.vy + Math.min(Math.abs(scrollVel) * 0.03, 2.4)
        p.x += p.vx + Math.sin(t * 0.5 + p.phase) * 0.2
        p.rot += p.vr + scrollVel * 0.0004
        if (p.y > h + 40 || p.x < -80 || p.x > w + 80) Object.assign(p, spawn(false))
        drawPetal(p)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="petals" ref={canvasRef} aria-hidden="true" />
}
