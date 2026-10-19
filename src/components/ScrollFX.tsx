import { motion, useScroll, useSpring } from 'framer-motion'

/** 页面顶部：滚动进度条（糖果渐变） */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-ember-2 via-ember to-gold shadow-[0_0_12px_rgba(255,122,26,0.7)]"
      style={{ scaleX }}
    />
  )
}
