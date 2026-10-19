import { useRef } from 'react'
import { m, useScroll, useSpring } from 'framer-motion'
import { SectionHead } from './SectionHead'
import { SceneVignette } from './SceneFX'

const events = [
  {
    era: '约公元前 500 年',
    title: '凯尔特人的萨温节',
    desc: '10 月 31 日夜，篝火点燃，新一年开始，亡灵游荡人间。',
    side: 'left',
  },
  {
    era: '公元前 1 世纪',
    title: '罗马人并入两节',
    desc: '诸灵节与波莫娜女神节融入凯尔特庆典，苹果与坚果进入传统。',
    side: 'right',
  },
  {
    era: '公元 835 年',
    title: '诸圣节确立',
    desc: '教皇格里高利四世定 11 月 1 日为诸圣节，前夜即「万圣夜」。',
    side: 'left',
  },
  {
    era: '中世纪',
    title: 'Souling 与 Guising',
    desc: '穷人讨「灵魂之饼」，孩童戴面具挨户表演换取食物——糖果的前身。',
    side: 'right',
  },
  {
    era: '17 世纪 · 爱尔兰',
    title: '吝啬鬼杰克的传说',
    desc: '被魔鬼拒之门外的杰克提着芜菁灯流浪，南瓜灯由此而来。',
    side: 'left',
  },
  {
    era: '1845–1852',
    title: '大饥荒与移民潮',
    desc: '爱尔兰人把万圣节习俗带到美国，节日在新大陆生根。',
    side: 'right',
  },
  {
    era: '1950 年代',
    title: '不给糖就捣蛋定型',
    desc: '美国郊区儿童游戏标准化，万圣节成为孩子的节日。',
    side: 'left',
  },
  {
    era: '1978 年',
    title: '《月光光心慌慌》上映',
    desc: '卡朋特的面具杀手让万圣节与恐怖片永久绑定。',
    side: 'right',
  },
  {
    era: '今天',
    title: '全球化的糖果之夜',
    desc: 'NRF 数据：美国 2023 年万圣节消费 122 亿美元，72% 的人参与庆祝。',
    side: 'left',
  },
]

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  // 中轴随滚动“生长”
  const spineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ['start 0.85', 'end 0.55'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section ref={sectionRef} id="timeline" className="relative overflow-hidden py-20 sm:py-28">
      {/* 幽灵紫氛围渐入 */}
      <SceneVignette target={sectionRef} variant="timeline" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(167,139,250,0.09)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-6">
        <SectionHead
          kicker="⏳"
          title="两千年时间线"
          en="Timeline"
          desc="九个瞬间，把一盏篝火变成了全球节日。"
        />
      </div>

      <div ref={spineRef} className="relative mx-auto max-w-4xl px-6">
        {/* 发光中轴（随滚动生长） */}
        <m.div
          className="absolute inset-y-0 left-[calc(50%-0.5px)] hidden w-px sm:block"
          aria-hidden="true"
          style={{
            scaleY,
            originY: 0,
            background:
              'linear-gradient(180deg, transparent 0%, rgba(232,192,122,0.15) 8%, rgba(255,140,66,0.75) 50%, rgba(232,192,122,0.15) 92%, transparent 100%)',
            boxShadow: '0 0 18px rgba(255,140,66,0.35)',
          }}
        />

        <ol className="space-y-9">
          {events.map((e, i) => (
            <m.li
              key={e.title}
              initial={{ opacity: 0, x: e.side === 'left' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`relative sm:flex sm:items-center ${
                e.side === 'right' ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <div className={`sm:w-1/2 ${e.side === 'right' ? 'sm:pl-10' : 'sm:pr-10'}`}>
                <div className="card px-6 py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-round text-xs font-bold tracking-[0.28em] text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs tracking-[0.22em] text-ember">{e.era}</span>
                  </div>
                  <h3 className="mt-2 font-cute text-lg font-semibold text-bone">{e.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ash">{e.desc}</p>
                </div>
              </div>

              {/* 节点：发光菱形 */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-ember bg-ink sm:block"
                style={{ boxShadow: '0 0 16px rgba(255,140,66,0.8)' }}
              />
              <span className="hidden sm:block sm:w-1/2" />
            </m.li>
          ))}
        </ol>

        {/* 收尾 */}
        <m.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="rule-orn mt-14 text-gold"
        >
          <span className="text-sm tracking-[0.5em]">FIN</span>
        </m.div>
      </div>
    </section>
  )
}
