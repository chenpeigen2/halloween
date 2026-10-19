import { motion } from 'framer-motion'

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
  return (
    <div className="mb-14 text-center">
      {/* 小标：淡入 + 两侧金线展开 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="kicker"
      >
        {en}
      </motion.div>

      {/* 标题：逐字弹入 */}
      <h2 className="text-stroke-soft mt-5 font-cute text-3xl font-bold tracking-[0.14em] text-bone sm:text-[2.6rem]">
        {[...title].map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 28, rotate: i % 2 ? 7 : -7, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ margin: '-80px' }}
            transition={{
              delay: 0.12 + i * 0.07,
              type: 'spring',
              stiffness: 140,
              damping: 12,
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </h2>

      {/* 装饰线：从中间向两侧展开 */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.2 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="rule-orn mt-5 text-gold"
      >
        <span className="text-lg opacity-90">{kicker}</span>
      </motion.div>

      {desc && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-ash"
        >
          {desc}
        </motion.p>
      )}
    </div>
  )
}
