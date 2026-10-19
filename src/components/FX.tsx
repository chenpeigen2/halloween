import { useEffect, useRef, type ReactNode } from 'react'
import { m, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useHoverCapable } from '../lib/env'

/** 火把光标：暖光跟着鼠标走（仅鼠标设备） */
export function TorchCursor() {
  const hover = useHoverCapable()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 130, damping: 20, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 130, damping: 20, mass: 0.35 })

  useEffect(() => {
    if (!hover) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [hover, x, y])

  if (!hover) return null
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45]"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <div
        className="h-[560px] w-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,140,66,0.11) 0%, rgba(255,122,26,0.05) 34%, rgba(167,139,250,0.03) 55%, transparent 72%)',
        }}
      />
    </m.div>
  )
}

/** 右缘南瓜进度指示：随滚动下行旋转 */
export function ScrollPumpkin() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['6vh', '88vh'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 540])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.85])
  return (
    <m.div
      aria-hidden="true"
      className="fixed right-2.5 z-40 hidden select-none text-[26px] lg:block"
      style={{ y, rotate, scale }}
    >
      🎃
    </m.div>
  )
}

/** 磁吸：按钮朝鼠标方向轻微吸附（仅鼠标设备） */
export function Magnetic({
  children,
  strength = 0.32,
}: {
  children: ReactNode
  strength?: number
}) {
  const hover = useHoverCapable()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 13 })
  const sy = useSpring(y, { stiffness: 160, damping: 13 })

  if (!hover) return <>{children}</>

  return (
    <m.span
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.span>
  )
}
