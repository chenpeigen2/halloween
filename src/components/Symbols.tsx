import { m } from 'framer-motion'
import { SectionHead } from './SectionHead'
import { useHoverCapable } from '../lib/env'
import { revealTransition, useRevealState } from './Reveal'

const symbols = [
  {
    emoji: '🧙‍♀️',
    title: '女巫',
    body: '尖帽与扫帚的组合定型于近代插画，但女巫形象本身来自中世纪的猎巫恐惧——以及凯尔特德鲁伊的自然崇拜。',
  },
  {
    emoji: '👻',
    title: '幽灵',
    body: '萨温夜界门洞开，亡魂返回人间。给亡灵留下食物、熄灯避让——最早的万圣节传统都围绕着「他们来了」。',
  },
  {
    emoji: '🐈‍⬛',
    title: '黑猫',
    body: '中世纪传说里它是女巫的「魅使」（familiar），也有人说女巫会化成黑猫——从此黑猫成了不祥的代名词。',
  },
  {
    emoji: '🦇',
    title: '蝙蝠',
    body: '围绕篝火飞舞的蝙蝠被德鲁伊视为预兆；斯托克的德古拉之后，它成了吸血鬼的固定随从。',
  },
  {
    emoji: '🕷️',
    title: '蜘蛛与网',
    body: '角落里的蛛网象征被时间遗忘的房屋与命运之网；民间传说里，蛛网上落着的是尚未离去的灵魂。',
  },
  {
    emoji: '💀',
    title: '骷髅与死亡之舞',
    body: '中世纪的「Danse Macabre」让骷髅与活人共舞，提醒世人死亡面前人人平等——后来成了最经典的万圣节符号。',
  },
  {
    emoji: '🧟',
    title: '怪物三人组',
    body: '吸血鬼、木乃伊、狼人——1930 年代环球影业把它们搬上银幕，万圣节的「标准惊吓套餐」从此配齐。',
  },
  {
    emoji: '🌕',
    title: '满月与稻草人',
    body: '满月夜是狼人变身的舞台；立在田里的稻草人本为驱鸟，却总在深夜悄悄挪动了位置。',
  },
]

export function Symbols() {
  const hover = useHoverCapable()
  const { ref: gridRef, inView, playing } = useRevealState('-50px')
  return (
    <section id="symbols" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <SectionHead
        kicker="🕸️"
        title="符号与角色"
        en="Icons & Creatures"
        desc="当夜幕降临，这些形象就成了万圣节的语言。"
      />

      <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
        {symbols.map((s, i) => (
          <m.article
            key={s.title}
            initial={{ opacity: 0, scale: 0.78, y: 26 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.78, y: 26 }
            }
            transition={revealTransition(playing, {
              type: 'spring',
              stiffness: 130,
              damping: 13,
              delay: (i % 4) * 0.1,
            })}
            whileHover={hover ? { scale: 1.03 } : undefined}
            className="card group relative overflow-hidden p-6 text-center hover:z-10"
          >
            {/* 顶部微光 */}
            <div className="absolute inset-x-0 -top-10 h-20 bg-gradient-to-b from-violet/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-violet/25 bg-ink-3 text-3xl shadow-[inset_0_0_24px_rgba(167,139,250,0.22)] transition-transform duration-500 group-hover:scale-110">
              {s.emoji}
            </div>
            <h3 className="mt-4 font-cute text-base font-semibold text-bone">{s.title}</h3>
            <div className="mx-auto mt-2.5 h-px w-8 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <p className="mt-3 text-[13px] leading-6 text-ash">{s.body}</p>
          </m.article>
        ))}
      </div>
    </section>
  )
}
