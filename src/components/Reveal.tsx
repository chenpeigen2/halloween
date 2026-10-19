import { useEffect, useRef, type ReactNode } from 'react'
import { m, useInView, type Transition } from 'framer-motion'
import { scrollDirectionNow, useMediaQuery } from '../lib/env'

/**
 * 入场动效播放策略：
 * - 向下滚（含快速甩动）→ 一律播放入场动画
 * - 向上滚（回顶）且从上缘进入 → 瞬间显示，保顺滑
 * - 离开视口 → 瞬间复位，下次向下滚照常播
 */
export function useRevealState(margin: `${number}px` = '-70px') {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin })
  const el = ref.current
  const enteredFromBottom = el
    ? el.getBoundingClientRect().top > window.innerHeight * 0.5
    : true
  const scrollingDown = scrollDirectionNow() !== 'up'
  return {
    ref,
    inView,
    playing: inView && (scrollingDown || enteredFromBottom),
  }
}

/** 根据 playing 返回 transition：不播放时零时长 */
export function revealTransition(playing: boolean, enter: Transition): Transition {
  return playing ? enter : { duration: 0 }
}

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
  const { ref, inView, playing } = useRevealState()

  const hidden = {
    opacity: 0,
    y,
    x,
    rotate,
    scale,
    filter: useBlur ? 'blur(10px)' : 'blur(0px)',
  }
  const shown = { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }

  return (
    <m.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={revealTransition(playing, {
        duration: 0.75,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      })}
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
