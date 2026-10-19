import { motion } from 'framer-motion'
import { SectionHead } from './SectionHead'
import { CountUp, Reveal } from './Reveal'

const stats = [
  { value: <CountUp to={2000} suffix="+" />, label: '年历史' },
  { value: <CountUp to={122} />, label: '亿美元 · 2023 美国消费峰值' },
  { value: <CountUp to={72} suffix="%" />, label: '美国消费者参与庆祝' },
  { value: <CountUp to={8} />, label: '部万圣节必看恐怖片' },
]

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

const blocks = [
  {
    title: '萨温节 · Samhain',
    body: '万圣节的源头是两千多年前爱尔兰、苏格兰与威尔士凯尔特人的萨温节（古爱尔兰语意为「夏之终结」）。凯尔特人的新年始于 10 月 31 日——这一天既是盛夏的终点，也是一年中最黑暗、最湿冷季节的起点。德鲁伊祭司会点燃巨大的篝火，宰杀牲畜、储备过冬，人们相信这一夜亡灵会回到人间，生者与死者之间的界门只为一晚敞开。',
    highlight: '生者与亡者的界门',
  },
  {
    title: '罗马与基督教的层层叠加',
    body: '公元前 1 世纪罗马人征服凯尔特地区后，把纪念亡者的「诸灵节」（Feralia）与掌管果树的波莫娜女神节并入当地庆典——苹果、坚果这些万圣节传统至今仍带着罗马的影子。公元 835 年，教皇格里高利四世将 11 月 1 日定为「诸圣节」，用以纪念所有圣徒；前一夜便成了「诸圣夜」（All Hallows\' Eve），缩写即 Halloween。萨温节则被教会改称为「万灵节」。',
    highlight: "All Hallows' Eve",
  },
  {
    title: '从爱尔兰带到新大陆',
    body: '中世纪的「Souling」习俗里，穷人会在诸圣夜挨家挨户演唱祈祷，换取「灵魂之饼」——这是「不给糖就捣蛋」最古老的雏形。1845–1852 年的爱尔兰大饥荒让上百万爱尔兰人远渡重洋，也把萨温节、女巫传说和怪谈一起带到了美国。19 世纪末的波士顿与纽约开始出现有组织的万圣节游行，塞勒姆更因 1692 年的女巫审判而成为万圣节圣地。',
    highlight: '灵魂之饼',
  },
  {
    title: '商业化的糖果与尖叫',
    body: '进入 20 世纪，万圣节从民间习俗变成一门大生意：1950 年代美国郊区定型了「不给糖就捣蛋」的儿童游戏，1978 年《月光光心慌慌》则把万圣节写进了恐怖片的 DNA。今天它已是全球性的流行文化节日——据美国零售联合会（NRF）统计，2023 年美国万圣节消费创下 122 亿美元的纪录，2024 年也达约 116 亿美元，约 72% 的美国消费者会参与庆祝。',
    highlight: '116 亿美元',
  },
]

export function Origin() {
  return (
    <section id="origin" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <SectionHead
        kicker="🎃"
        title="起源与历史"
        en="Origins & History"
        desc="从凯尔特的篝火到霓虹灯下的糖果——万圣节是层层叠叠的两千年。"
      />

      <div className="grid gap-7 sm:grid-cols-2">
        {blocks.map((b, i) => (
          <motion.article
            key={b.title}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ margin: '-80px' }}
            className="card card-frame p-8"
          >
            <div className="flex items-center gap-4">
              <span className="font-display text-4xl text-ember/45">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-cute text-lg font-semibold text-bone">{b.title}</h3>
            </div>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
            <p className="mt-4 text-[15px] leading-8 text-ash">{b.body}</p>
            <p className="mt-5 inline-block rounded-full border border-ember/35 bg-ember/10 px-4 py-1.5 text-xs tracking-wider text-ember">
              ✦ {b.highlight}
            </p>
          </motion.article>
        ))}
      </div>
      {/* 数据彩蛋：滚动到此数字从 0 跳起来 */}
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12} y={26}>
            <div className="card h-full px-5 py-6 text-center">
              <p className="font-round text-3xl font-extrabold text-ember sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs leading-5 text-ash">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
