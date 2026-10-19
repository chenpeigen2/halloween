import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useScroll } from 'framer-motion'

const links = [
  { href: '#origin', label: '起源' },
  { href: '#timeline', label: '时间线' },
  { href: '#customs', label: '习俗' },
  { href: '#symbols', label: '符号' },
  { href: '#cinema', label: 'Cinema' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  // 向下滚动隐藏，向上滚动出现
  useEffect(() =>
    scrollY.on('change', (y) => {
      if (open) return
      const down = y > lastY.current
      setHidden(down && y > 240)
      lastY.current = y
    }),
  )

  return (
    <m.header
      animate={{ y: hidden && !open ? -80 : 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/75 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 py-1.5" onClick={() => setOpen(false)}>
          <span className="text-2xl glow">🎃</span>
          <span className="font-display text-base tracking-[0.22em] text-gold transition-colors group-hover:text-ember sm:text-xl">
            ALL HALLOWS
          </span>
        </a>

        {/* 桌面端导航 */}
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-ash transition-colors hover:bg-white/5 hover:text-ember"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cinema"
              className="ml-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
            >
              🎬 今夜放映
            </a>
          </li>
        </ul>

        {/* 手机端汉堡按钮 */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ash transition-colors hover:border-ember/50 hover:text-ember sm:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
          </svg>
        </button>
      </nav>

      {/* 手机端下拉面板 */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl sm:hidden"
          >
            <ul className="px-5 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-3.5 text-[15px] text-bone transition-colors hover:text-ember"
                  >
                    {l.label}
                    <span className="text-ember/50">→</span>
                  </a>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <a
                  href="#cinema"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-gold/40 py-3 text-center text-sm text-gold"
                >
                  🎬 今夜放映
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  )
}
