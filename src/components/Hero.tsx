import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { AmbientGhosts, CandyRain } from './Ghosts'

/* ---------------- 倒计时 ---------------- */
function nextHalloween(): Date {
  const now = new Date()
  const y = now.getFullYear()
  const thisYear = new Date(y, 9, 31, 23, 59, 59)
  return now <= thisYear ? new Date(y, 9, 31) : new Date(y + 1, 9, 31)
}

function useCountdown() {
  const [left, setLeft] = useState(() => nextHalloween().getTime() - Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setLeft(nextHalloween().getTime() - Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])
  const s = Math.max(0, Math.floor(left / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

/* ---------------- 视差星空（三层，滚动时横向漂移） ---------------- */
function makeStars(count: number, seed: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 37 + seed * 13) % 100,
    top: (i * 53 + seed * 29) % 70,
    size: 1 + ((i * 7 + seed) % 3) * 0.6,
    dur: 2.2 + ((i * 13 + seed * 3) % 40) / 10,
    delay: ((i * 17 + seed * 7) % 50) / 10,
  }))
}

const STARS_FAR = makeStars(30, 1)
const STARS_MID = makeStars(22, 2)
const STARS_NEAR = makeStars(14, 3)

function StarBand({
  stars,
  progress,
  xRange,
  yRange = [0, 0],
  glow,
}: {
  stars: ReturnType<typeof makeStars>
  progress: MotionValue<number>
  xRange: [number, number]
  yRange?: [number, number]
  glow?: string
}) {
  const x = useTransform(progress, [0, 1], xRange)
  const y = useTransform(progress, [0, 1], yRange)
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ x, y, filter: glow ? `drop-shadow(0 0 6px ${glow})` : undefined }}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle absolute rounded-full bg-bone"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size * 2,
            height: s.size * 2,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </motion.div>
  )
}

/* ---------------- 蝙蝠 ---------------- */
const BATS = [
  { top: '14%', size: 30, dur: 26, delay: 0 },
  { top: '22%', size: 20, dur: 33, delay: 7 },
  { top: '9%', size: 24, dur: 29, delay: 13 },
  { top: '30%', size: 15, dur: 38, delay: 19 },
  { top: '18%', size: 26, dur: 31, delay: 24 },
]

function Bats() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BATS.map((b) => (
        <div
          key={`${b.top}-${b.size}`}
          className="bat absolute"
          style={{ top: b.top, width: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <svg viewBox="0 0 100 46" fill="#150d24">
            <path className="wing" d="M50 12c-6-10-18-14-30-8-3-8-12-8-18-2 4 1 6 5 6 10 6-3 12-1 16 5 6-5 14-6 22-2z" />
            <path className="wing" d="M50 12c6-10 18-14 30-8 3-8 12-8 18-2-4 1-6 5-6 10-6-3-12-1-16 5-6-5-14-6-22-2z" />
            <ellipse cx="50" cy="24" rx="7" ry="12" />
            <path d="M46 13l-4-8 6 4zM54 13l4-8-6 4z" />
            <path d="M44 34l-3 10h5zM56 34l3 10h-5z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

/* ---------------- 前景：古宅与墓园剪影 ---------------- */
function Landscape() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* 远山 */}
      <path
        d="M0 190L120 120l90 48 130-72 120 66 140-84 120 78 150-92 130 88 140-62 160 84 180-70 130 62v104H0z"
        fill="#120c1e"
      />
      {/* 古宅 */}
      <g fill="#07050d">
        <rect x="620" y="120" width="180" height="120" />
        <path d="M610 122l100-62 100 62z" />
        <rect x="800" y="150" width="62" height="90" />
        <path d="M794 152l38-30 38 30z" />
        <rect x="656" y="86" width="16" height="42" />
      </g>
      {/* 窗内烛光 */}
      <g fill="#ff8c42" opacity="0.85">
        <rect x="648" y="150" width="22" height="28" />
        <rect x="700" y="150" width="22" height="28" />
        <rect x="752" y="150" width="22" height="28" />
        <rect x="818" y="172" width="18" height="24" />
      </g>
      <g fill="#07050d">
        <rect x="652" y="152" width="2.5" height="24" opacity="0.9" />
        <rect x="656.5" y="152" width="2.5" height="24" opacity="0.9" />
        <rect x="661" y="152" width="2.5" height="24" opacity="0.9" />
        <rect x="704" y="152" width="2.5" height="24" opacity="0.9" />
        <rect x="708.5" y="152" width="2.5" height="24" opacity="0.9" />
        <rect x="713" y="152" width="2.5" height="24" opacity="0.9" />
      </g>
      {/* 枯树 */}
      <g stroke="#07050d" strokeWidth="7" fill="none" strokeLinecap="round">
        <path d="M240 250v-78M240 200l-32-34M240 190l30-38M240 176l-22-28" />
        <path d="M1180 250v-88M1180 196l-30-32M1180 186l34-36M1180 172l-18-26" />
      </g>
      {/* 墓碑 */}
      <g fill="#07050d">
        <path d="M420 250v-40a16 16 0 0132 0v40zM470 250v-30a13 13 0 0126 0v30zM512 250v-46h30v46z" />
        <path d="M900 250v-36a15 15 0 0130 0v36zM950 250v-26a11 11 0 0122 0v26z" />
      </g>
      {/* 地面 */}
      <rect y="238" width="1440" height="62" fill="#07050d" />
      <path d="M0 244q180-16 360 0t360 0 360 0 360 0v56H0z" fill="#07050d" />

      {/* 发光南瓜灯（会眨眼） */}
      <g transform="translate(1080 196)">
        <ellipse cx="0" cy="56" rx="46" ry="8" fill="#ff8c42" opacity="0.16" />
        <path className="glow" d="M-38 22c0-20 17-32 38-32s38 12 38 32-17 32-38 32-38-12-38-32z" fill="#ff6a00" opacity="0.92" />
        <path d="M-2 12q-3-14 8-18-3 8 2 18z" fill="#3f7d2f" />
        <g className="blink">
          <path d="M-19 12l11 6-11 4z M19 12l-11 6 11 4z M0 18l-6 10h12z" fill="#210f02" />
        </g>
        <path d="M-16 34h32l-6 5-5-4-5 5-5-4-5 5-6-4z" fill="#210f02" />
      </g>
    </svg>
  )
}

/* ---------------- 逐字散开标题 ---------------- */
function ScatterChar({
  ch,
  i,
  progress,
}: {
  ch: string
  i: number
  progress: MotionValue<number>
}) {
  const dir = i % 2 ? 1 : -1
  const dist = 1 + Math.abs(i - 4) * 0.55 // 两端字飞得更远
  const y = useTransform(progress, [0, 1], [0, -(36 + dist * 72)])
  const x = useTransform(progress, [0, 1], [0, dir * dist * 48])
  const rotate = useTransform(progress, [0, 1], [0, dir * dist * 18])
  const opacity = useTransform(progress, [0, 0.55], [1, 0])

  return (
    <motion.span
      className="text-ember-grad text-stroke-dark inline-block"
      style={{ y, x, rotate, opacity }}
    >
      {ch}
    </motion.span>
  )
}

function ScatterTitle({ progress }: { progress: MotionValue<number> }) {
  return (
    <h1
      className="font-display text-[clamp(2.6rem,12vw,3.6rem)] leading-[1.02] tracking-[0.02em] sm:text-[6.4rem]"
      aria-label="HALLOWEEN"
    >
      {[...'HALLOWEEN'].map((ch, i) => (
        <ScatterChar key={`${ch}-${i}`} ch={ch} i={i} progress={progress} />
      ))}
    </h1>
  )
}

/* ---------------- Hero ---------------- */
const pad = (v: number) => String(v).padStart(2, '0')

export function Hero() {
  const { days, hours, minutes, seconds } = useCountdown()

  // 视差：滚动时各层以不同速度移动
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yMoon = useTransform(scrollYProgress, [0, 1], [0, -160])
  const yLand = useTransform(scrollYProgress, [0, 1], [0, -40])
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 130])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scaleMoon = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const cells: [number, string][] = [
    [days, 'DAYS'],
    [hours, 'HOURS'],
    [minutes, 'MINUTES'],
    [seconds, 'SECONDS'],
  ]

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 夜空 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_18%,#2c1a52_0%,#160e2c_38%,#0a0710_72%)]" />
      <StarBand stars={STARS_FAR} progress={scrollYProgress} xRange={[0, -40]} yRange={[0, -20]} />
      <StarBand stars={STARS_MID} progress={scrollYProgress} xRange={[0, 55]} yRange={[0, -45]} glow="rgba(167,139,250,0.8)" />
      <StarBand stars={STARS_NEAR} progress={scrollYProgress} xRange={[0, -110]} yRange={[0, -80]} glow="rgba(255,196,140,0.9)" />

      {/* 月亮 */}
      <motion.div
        style={{ y: yMoon, scale: scaleMoon }}
        className="pointer-events-none absolute top-[12%] right-[10%] sm:right-[14%]"
        aria-hidden="true"
      >
        <div className="absolute -inset-16 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -inset-6 rounded-full bg-gold/15 blur-xl" />
        <div className="relative h-28 w-28 rounded-full bg-gradient-to-b from-[#f6e8c8] to-[#cbb387] shadow-[0_0_90px_rgba(232,192,122,0.5)] sm:h-36 sm:w-36">
          <span className="absolute left-[22%] top-[30%] h-4 w-4 rounded-full bg-[#b89b6c]/60" />
          <span className="absolute right-[26%] top-[52%] h-6 w-6 rounded-full bg-[#b89b6c]/50" />
          <span className="absolute left-[46%] top-[18%] h-2.5 w-2.5 rounded-full bg-[#b89b6c]/60" />
          <span className="absolute left-[16%] top-[62%] h-3 w-3 rounded-full bg-[#b89b6c]/55" />
        </div>
      </motion.div>

      <Bats />
      <AmbientGhosts count={5} />
      <CandyRain count={7} />

      {/* 雾 */}
      <div className="fog absolute bottom-24 left-0 h-36 w-[70%] rounded-full bg-violet/10 blur-3xl" />
      <div className="fog-slow absolute bottom-40 left-0 h-28 w-[85%] rounded-full bg-ember/10 blur-3xl" />

      {/* 前景：古宅与墓园剪影（慢速视差） */}
      <motion.div style={{ y: yLand }} className="absolute inset-x-0 bottom-0">
        <Landscape />
      </motion.div>

      {/* 内容 */}
      {/* 内容（反向视差 + 渐隐） */}
      <motion.div
        style={{ y: yContent, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-28 pb-52 text-center sm:px-6 sm:pb-64"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="kicker"
        >
          Samhain · October 31
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mt-6"
        >
          <ScatterTitle progress={scrollYProgress} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="text-gold-grad text-stroke-dark mt-3 font-cute text-xl tracking-[0.55em] indent-[0.55em] sm:text-3xl sm:tracking-[0.9em] sm:indent-[0.9em]"
        >
          万圣节之夜
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-ash sm:text-base"
        >
          两千年前的凯尔特人相信，十月的最后一夜是生者与亡者之间界门最薄的时刻。
          <br className="hidden sm:block" />
          今夜，我们依然点亮南瓜灯——为黑暗中的来客，也为屏幕前的你。
        </motion.p>

        {/* 倒计时 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="card card-frame mx-auto mt-10 w-fit px-5 py-5 sm:px-8 sm:py-6"
        >
          <p className="text-[10px] tracking-[0.5em] text-gold/80 uppercase">
            Countdown to All Hallows' Eve
          </p>
          <div className="mt-5 flex items-start gap-3 sm:gap-7">
            {cells.map(([v, label], i) => (
              <div key={label} className="flex items-start gap-3 sm:gap-7">
                {i > 0 && (
                  <span className="hidden font-display text-3xl leading-none text-ember/35 pt-2 select-none sm:block">·</span>
                )}
                <div className="flex flex-col items-center">
                  <span className="font-round text-3xl font-extrabold text-ember tabular-nums sm:text-5xl">
                    {pad(v)}
                  </span>
                  <span className="mt-1.5 text-[9px] tracking-[0.32em] text-ash">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#origin"
            className="rounded-full bg-gradient-to-r from-ember-2 via-ember to-[#ffb066] px-7 py-3.5 text-sm font-semibold text-[#2a1202] shadow-[0_10px_34px_-8px_rgba(255,122,26,0.55)] transition-transform hover:scale-105 sm:px-8"
          >
            探索起源 →
          </a>
          <a
            href="#cinema"
            className="rounded-full border border-gold/45 px-7 py-3.5 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10 sm:px-8"
          >
            🎬 今夜放映
          </a>
        </motion.div>
      </motion.div>

      {/* 滚动提示 */}
      <a
        href="#origin"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ash/70 transition-colors hover:text-ember"
      >
        <span className="text-[10px] tracking-[0.42em]">SCROLL</span>
        <span className="h-9 w-px bg-gradient-to-b from-ember/70 to-transparent" />
      </a>
    </section>
  )
}
