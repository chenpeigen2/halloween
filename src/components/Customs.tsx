import { m } from 'framer-motion'
import { SectionHead } from './SectionHead'
import { revealTransition, useRevealState } from './Reveal'

const customs = [
  {
    emoji: '🍬',
    title: '不给糖就捣蛋',
    en: 'Trick-or-Treat',
    body: '孩子们戴上装扮、挨家敲门喊出那句经典口令。它继承自中世纪的「Souling」与苏格兰的「Guising」——讨来的从灵魂之饼，变成了巧克力与玉米糖。',
  },
  {
    emoji: '🎃',
    title: '南瓜灯',
    en: "Jack-o'-lantern",
    body: '刻出鬼脸的南瓜灯是万圣节的门面。传说源于爱尔兰「吝啬鬼杰克」——他提着被魔鬼塞了炭火的芜菁灯游荡。移民到美国后，人们发现本地南瓜远比芜菁好刻。',
  },
  {
    emoji: '🎭',
    title: '变装',
    en: 'Costumes',
    body: '从凯尔特人披兽皮扮鬼，到中世纪的面具游行，再到今天的超级英雄与恐怖经典——换一副皮囊，是万圣节最古老的仪式。',
  },
  {
    emoji: '🏚️',
    title: '鬼屋与恐怖片马拉松',
    en: 'Haunted House',
    body: '排队走进迷宫式的鬼屋、或窝在沙发连看整夜恐怖片——现代人用安全的方式，重温先民对黑暗的敬畏。',
  },
  {
    emoji: '🍎',
    title: '漂浮苹果',
    en: 'Bobbing for Apples',
    body: '把苹果浮在水面上用嘴去咬——罗马波莫娜女神节的游戏残片，至今仍在英美乡村聚会上出现。',
  },
  {
    emoji: '🕯️',
    title: '点亮门廊与篝火',
    en: 'Candles & Bonfires',
    body: '德鲁伊祭司点燃大篝火献祭过冬；今天换成门廊上的蜡烛串灯与电子南瓜——同一个目的：在最黑的夜里守住光。',
  },
]

export function Customs() {
  const { ref: gridRef, inView, playing } = useRevealState('-60px')
  return (
    <section id="customs" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(26,18,48,0.55)_18%,rgba(26,18,48,0.55)_82%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHead
          kicker="🍭"
          title="传统习俗"
          en="Customs & Traditions"
          desc="六件小事，构成一个节日的夜晚。"
        />

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {customs.map((c, i) => (
            <m.article
              key={c.title}
              initial={{ opacity: 0, y: 36, rotate: i % 2 ? 2.5 : -2.5 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : { opacity: 0, y: 36, rotate: i % 2 ? 2.5 : -2.5 }
              }
              transition={revealTransition(playing, {
                duration: 0.6,
                delay: (i % 3) * 0.12,
                ease: [0.2, 0.7, 0.2, 1],
              })}
              className="card group p-7"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.07] to-transparent text-3xl shadow-[inset_0_0_22px_rgba(255,140,66,0.12)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  {c.emoji}
                </span>
                <span className="font-display text-[10px] tracking-[0.28em] text-gold/70 uppercase">
                  {c.en}
                </span>
              </div>
              <h3 className="mt-5 font-cute text-lg font-semibold text-bone">{c.title}</h3>
              <div className="mt-2.5 h-px w-10 bg-ember/70 transition-all duration-500 group-hover:w-20" />
              <p className="mt-3 text-sm leading-7 text-ash">{c.body}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
