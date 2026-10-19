import { m } from 'framer-motion'
import { revealTransition, useRevealState } from './Reveal'
import { useHoverCapable } from '../lib/env'

export function SectionHead({
  kicker,
  title,
  desc,
  en,
}: {
  kicker: string
  title: string
  desc?: string
  en: string
}) {
  // 触屏用 tween：逐字 spring 在安卓上积分器开销大
  const hover = useHoverCapable()
  // 整个标题组共用一个观察器；向上滚时全部瞬间显示
  const { ref, inView, playing } = useRevealState('-80px')

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="mb-14 text-center">
      {/* 小标 */}
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={revealTransition(playing, { duration: 0.6 })}
        className="kicker"
      >
        {en}
      </m.div>

      {/* 标题：逐字弹入 */}
      <h2 className="text-stroke-soft mt-5 font-cute text-3xl font-bold tracking-[0.14em] text-bone sm:text-[2.6rem]">
        {[...title].map((ch, i) => (
          <m.span
            key={`${ch}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 28, rotate: i % 2 ? 7 : -7, scale: 0.8 }}
            animate={
              inView
                ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
                : { opacity: 0, y: 28, rotate: i % 2 ? 7 : -7, scale: 0.8 }
            }
            transition={revealTransition(
              playing,
              hover
                ? { delay: 0.12 + i * 0.07, type: 'spring', stiffness: 140, damping: 12 }
                : { delay: 0.12 + i * 0.07, duration: 0.5 },
            )}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </m.span>
        ))}
      </h2>

      {/* 装饰线 */}
      <m.div
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }}
        transition={revealTransition(playing, { duration: 0.7, delay: 0.35 })}
        className="rule-orn mt-5 text-gold"
      >
        <span className="text-lg opacity-90">{kicker}</span>
      </m.div>

      {desc && (
        <m.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={revealTransition(playing, { duration: 0.7, delay: 0.45 })}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-ash"
        >
          {desc}
        </m.p>
      )}
    </div>
  )
}
