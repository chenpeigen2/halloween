import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useInView } from 'framer-motion'
import { movies, type Movie } from '../data/movies'
import { Poster } from './Poster'
import { SceneVignette } from './SceneFX'
import { useHoverCapable } from '../lib/env'

type TrailerState = 'idle' | 'probing' | 'playing' | 'offline'

/** 探测 YouTube 是否可达（无 CORS 探针，只看网络层是否通） */
async function probeYouTube(timeoutMs = 4000): Promise<boolean> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    await fetch('https://www.youtube.com', { mode: 'no-cors', signal: ctrl.signal })
    return true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

function MovieModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const [trailer, setTrailer] = useState<TrailerState>('idle')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const play = async () => {
    setTrailer('probing')
    const ok = await probeYouTube()
    setTrailer(ok ? 'playing' : 'offline')
  }

  return (
    <m.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${movie.titleZh} 详情`}
    >
      <div className="absolute inset-0 bg-black/88 backdrop-blur-md" onClick={onClose} />

      <m.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="safe-b relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-gold/30 bg-ink-2 shadow-[0_0_100px_rgba(255,140,66,0.16)] sm:flex"
      >
        {/* 海报：手机端限宽居中，桌面端占左栏 */}
        <div className="shrink-0 bg-black/30 p-5 sm:w-[38%] sm:p-0">
          <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-xl border border-white/10 sm:max-w-none sm:h-full sm:rounded-none sm:border-0 sm:border-r">
            <Poster movie={movie} className="block h-auto w-full sm:h-full" />
          </div>
        </div>

        <div className="flex-1 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-[11px] tracking-[0.3em] text-gold">
                {movie.titleEn.toUpperCase()} · {movie.year}
              </p>
              <h3 className="mt-2 font-cute text-2xl font-bold text-bone sm:text-3xl">{movie.titleZh}</h3>
            </div>
            <button
              onClick={onClose}
              aria-label="关闭"
              className="rounded-full border border-white/10 p-2.5 text-ash transition-colors hover:border-ember/60 hover:text-ember"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <span className="rounded-full bg-ink-3 px-2.5 py-1 text-xs text-ash">导演 · {movie.director}</span>
            {movie.tags.map((t) => (
              <span key={t} className="rounded-full border border-violet/40 px-2.5 py-1 text-xs text-violet">
                {t}
              </span>
            ))}
          </div>

          <p className="mt-4 text-[15px] leading-8 text-ash">{movie.synopsis}</p>

          <div className="mt-6 rounded-xl border border-gold/15 bg-black/25 p-3 sm:p-4">
            <AnimatePresence mode="wait">
              {trailer === 'idle' && (
                <m.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button
                    onClick={play}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-ember-2 via-ember to-[#ffb066] px-5 py-3.5 font-semibold text-[#2a1202] transition-transform hover:scale-[1.02]"
                  >
                    <span className="text-lg">▶</span> 播放预告片
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-ash/70">
                    预告片来自 YouTube，点击后开始加载
                  </p>
                </m.div>
              )}

              {trailer === 'probing' && (
                <m.div
                  key="probing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 py-8 text-sm text-ash"
                >
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ember border-t-transparent" />
                  正在连接放映厅…
                </m.div>
              )}

              {trailer === 'playing' && (
                <m.div
                  key="playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-video w-full overflow-hidden rounded-lg bg-black"
                >
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${movie.trailerId}?autoplay=1&rel=0`}
                    title={`${movie.titleZh} 预告片`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </m.div>
              )}

              {trailer === 'offline' && (
                <m.div
                  key="offline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 text-center"
                >
                  <p className="text-sm text-bone">🌙 通往 YouTube 的路被雾挡住了</p>
                  <p className="mt-1.5 text-xs leading-6 text-ash">
                    当前网络无法连接 YouTube，预告片暂时无法内嵌播放。
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailerId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block rounded-lg border border-ember/50 px-5 py-2.5 text-sm text-ember transition-colors hover:bg-ember hover:text-ink"
                  >
                    在 YouTube 打开 ↗
                  </a>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

export function Cinema() {
  const [active, setActive] = useState<Movie | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const hover = useHoverCapable()
  // 跑马灯不在视口时暂停
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInView = useInView(marqueeRef, { margin: '80px' })
  const strip = 'NOW SHOWING · 今夜放映 · TRICK OR TREAT · 午夜场 · 不给糖就捣蛋 · '

  return (
    <section ref={sectionRef} id="cinema" className="relative overflow-hidden py-24 sm:py-28">
      {/* 进入影院：舞台聚光渐入 */}
      <SceneVignette target={sectionRef} variant="cinema" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,#241020_0%,#120a18_42%,#0a0710_75%)]"
        aria-hidden="true"
      />

      {/* 舞台帘幕（桌面端） */}
      <div
        className="absolute inset-y-0 left-0 hidden w-16 bg-[linear-gradient(90deg,#3a0f1c_0%,#5c1626_28%,#2c0b14_62%,transparent_100%)] opacity-80 sm:block"
        aria-hidden="true"
      >
        <div className="bulbs absolute inset-y-0 right-2 w-4 opacity-70" />
      </div>
      <div
        className="absolute inset-y-0 right-0 hidden w-16 bg-[linear-gradient(270deg,#3a0f1c_0%,#5c1626_28%,#2c0b14_62%,transparent_100%)] opacity-80 sm:block"
        aria-hidden="true"
      >
        <div className="bulbs absolute inset-y-0 left-2 w-4 opacity-70" />
      </div>

      {/* 霓虹招牌 */}
      <div className="relative mx-auto max-w-6xl px-5 pt-16 text-center sm:px-16">
        <p className="kicker">Halloween Cinema</p>
        <m.h2
          initial={{ opacity: 0, scale: 0.82, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 90, damping: 13 }}
          className="neon text-stroke-dark mt-6 font-display text-4xl leading-tight tracking-[0.04em] text-ember sm:text-6xl"
          style={{ textShadow: '0 0 18px rgba(255,122,26,0.65), 0 0 60px rgba(255,122,26,0.35)' }}
        >
          万圣节 CINEMA
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-70px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ash sm:text-[15px]"
        >
          八部定义了万圣节夜晚的经典恐怖片。点开海报，看看你敢不敢按下播放。
        </m.p>
      </div>

      {/* 跑马灯 */}
      <div className="relative mt-10 overflow-hidden border-y border-gold/25 bg-black/35 py-3">
        <div
          ref={marqueeRef}
          className={`marquee flex w-max whitespace-nowrap font-display text-sm tracking-[0.22em] text-gold/85 sm:text-base ${marqueeInView ? '' : 'is-paused'}`}
        >
          <span className="pr-8">{strip.repeat(2)}</span>
          <span className="pr-8">{strip.repeat(2)}</span>
        </div>
      </div>

      {/* 海报墙 */}
      <div className="relative mx-auto max-w-6xl px-5 pt-12 sm:px-10">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-7">
          {movies.map((mv, i) => (
            <m.button
              key={mv.id}
              onClick={() => setActive(mv)}
              initial={{ opacity: 0, y: 64, rotate: i % 2 ? 9 : -9, scale: 0.86 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 110, damping: 14, delay: (i % 4) * 0.12 }}
              whileHover={hover ? { y: -10, rotate: i % 2 ? -1.6 : 1.6, scale: 1.03 } : undefined}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-xl border border-gold/20 bg-ink-2 text-left shadow-[0_16px_40px_-16px_rgba(0,0,0,0.85)] transition-colors hover:border-ember/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              aria-label={`查看《${mv.titleZh}》详情`}
            >
              <Poster movie={mv} className="block w-full" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/35 to-transparent p-3 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <p className="text-[13px] font-semibold text-bone sm:text-sm">{mv.titleZh}</p>
                <p className="mt-0.5 text-[11px] tracking-wider text-ember">▶ 播放预告</p>
              </div>
              {/* 票根角标 */}
              <span className="absolute left-2 top-2 rounded-full border border-gold/40 bg-black/55 px-2 py-0.5 text-[8px] tracking-[0.22em] text-gold/90">
                ADMIT ONE
              </span>
            </m.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <MovieModal movie={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
