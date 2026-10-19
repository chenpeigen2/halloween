import type { RefObject } from 'react'
import { m, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * 滚动驱动的场景氛围：进入某板块时渐入聚光/暗角，离开时渐隐。
 * cinema  → 暖橙舞台聚光
 * timeline → 幽灵紫氛围
 */
export function SceneVignette({
  target,
  variant,
}: {
  target: RefObject<HTMLElement | null>
  variant: 'cinema' | 'timeline'
}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start 0.9', 'start 0.3', 'end 0.7', 'end 0.1'],
  })
  const raw = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const opacity = useSpring(raw, { stiffness: 110, damping: 22 })

  const overlay =
    variant === 'cinema'
      ? 'radial-gradient(ellipse at 50% 40%, rgba(255,150,80,0.13) 0%, rgba(6,4,12,0.55) 48%, rgba(4,2,8,0.88) 100%)'
      : 'radial-gradient(ellipse at 50% 45%, rgba(167,139,250,0.13) 0%, rgba(10,7,20,0.5) 52%, rgba(6,4,12,0.85) 100%)'

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ opacity, background: overlay }}
    >
      {/* 舞台追光锥（仅 cinema · 桌面端；移动端省略重滤镜） */}
      {variant === 'cinema' && (
        <div
          className="absolute left-1/2 top-[-8vh] hidden h-[72vh] w-[72vw] -translate-x-1/2 blur-2xl sm:block"
          style={{
            background:
              'conic-gradient(from 158deg at 50% 0%, transparent 42%, rgba(255,196,140,0.12) 50%, transparent 58%)',
          }}
        />
      )}
    </m.div>
  )
}
