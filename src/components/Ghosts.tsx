import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function GhostShape({ className, fill = '#e8e2d5' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
      <path
        d="M32 2C16 2 6 14 6 30v44l8-8 8 8 8-8 8 8 8-8 8 8V30C58 14 48 2 32 2z"
        fill={fill}
        opacity="0.85"
      />
      <circle cx="23" cy="32" r="5" fill="#07050b" />
      <circle cx="41" cy="32" r="5" fill="#07050b" />
      <ellipse cx="32" cy="47" rx="6" ry="8" fill="#07050b" />
    </svg>
  )
}

/** 环境漂浮幽灵 */
export function AmbientGhosts({ count = 5 }: { count?: number }) {
  const ghosts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 6 + ((i * 19) % 84),
    top: 18 + ((i * 23) % 60),
    size: 34 + ((i * 17) % 40),
    delay: (i % 5) * 1.1,
    duration: 5 + (i % 4),
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {ghosts.map((g) => (
        <div
          key={g.id}
          className="bob absolute opacity-[0.13]"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: g.size,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.duration}s`,
          }}
        >
          <GhostShape className="w-full" fill="#a855f7" />
        </div>
      ))}
    </div>
  )
}

/** 环境糖果雨：轻轻飘落的糖果 */
const CANDY_RAIN = ['🍬', '🍭', '🍩', '🍪', '🧁', '🍫']

export function CandyRain({ count = 6 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 8 + ((i * 29) % 84),
    size: 16 + ((i * 11) % 16),
    delay: (i * 3.4) % 18,
    duration: 15 + ((i * 7) % 10),
    glyph: CANDY_RAIN[i % CANDY_RAIN.length],
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((c) => (
        <span
          key={c.id}
          className="candy-drift absolute top-[-8%] select-none opacity-30"
          style={{
            left: `${c.left}%`,
            fontSize: c.size,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          {c.glyph}
        </span>
      ))}
    </div>
  )
}

type Burst = { id: number; x: number; y: number; glyph: string; rot: number; hue: string }

const TREATS = ['🍬', '🍭', '🎃', '🦇', '🍩', '🍪', '👻', '🌙', '💀', '🧁']
const HUES = ['#e8e2d5', '#ff7a1a', '#a855f7']

/** 彩蛋：点击页面任意处撒糖果（偶尔冒出幽灵） */
export function ClickTreats() {
  const [bursts, setBursts] = useState<Burst[]>([])
  const seq = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const onClick = (e: MouseEvent) => {
      const fresh: Burst[] = []
      // 每次点击撒 3 颗糖果 + 30% 概率附赠一只幽灵
      for (let k = 0; k < 3; k++) {
        const id = seq.current++
        const isGhost = k === 2 && Math.random() < 0.3
        fresh.push({
          id,
          x: e.clientX + (Math.random() - 0.5) * 90,
          y: e.clientY + (Math.random() - 0.5) * 40,
          glyph: isGhost ? '👻' : TREATS[Math.floor(Math.random() * TREATS.length)],
          rot: (Math.random() - 0.5) * 260,
          hue: HUES[id % HUES.length],
        })
      }
      setBursts((bs) => [...bs.slice(-11), ...fresh])
      window.setTimeout(
        () => setBursts((bs) => bs.filter((b) => !fresh.some((f) => f.id === b.id))),
        1900,
      )
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.span
            key={b.id}
            className="absolute select-none"
            style={{ left: b.x - 14, top: b.y - 14, fontSize: 28 }}
            initial={{ opacity: 0, y: 0, scale: 0.35, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: -120,
              scale: [0.35, 1.25, 1],
              rotate: b.rot,
              x: [(b.rot % 40) - 20, 0, (b.rot % 60) - 30],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.9, ease: 'easeOut' }}
          >
            {b.glyph}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
