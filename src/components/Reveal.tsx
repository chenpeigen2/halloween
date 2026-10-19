import { useEffect, useRef, type ReactNode } from 'react'
import { m, useInView } from 'framer-motion'
import { useMediaQuery } from '../lib/env'

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
  // blur 只在"宽屏 + 鼠标设备"上启用：触屏/安卓 GPU 滤镜太贵
  const strongGpu = useMediaQuery('(min-width: 1024px) and (hover: hover)')
  const useBlur = blur && strongGpu
  return (
    <m.div
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        rotate,
        scale,
        filter: useBlur ? 'blur(10px)' : 'blur(0px)',
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
    </m.div>
  )
}

/** 滚动到视口时从 0 滚到目标数字（直接写 DOM，不触发 React 重渲染） */
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

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    const fmt = (v: number) => (decimals ? v.toFixed(decimals) : String(Math.round(v)))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fmt(to) + suffix
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000))
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))) + suffix
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, decimals, suffix])

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  )
}
