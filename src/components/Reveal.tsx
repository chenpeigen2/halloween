import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  rotate?: number
  scale?: number
  blur?: boolean
}

/** 滚动揭示：淡入 + 位移 +（可选）旋转/缩放/失焦 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  rotate = 0,
  scale = 1,
  blur = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        rotate,
        scale,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** 滚动到视口时从 0 滚到目标数字 */
export function CountUp({
  to,
  duration = 1.8,
  decimals = 0,
  suffix = '',
}: {
  to: number
  duration?: number
  decimals?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { margin: '-60px' })
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setV(to))
      return () => cancelAnimationFrame(raf)
    }
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000))
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}
