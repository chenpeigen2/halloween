import { GhostShape } from './Ghosts'
import { Reveal } from './Reveal'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-ink-2/70">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        <Reveal y={30} delay={0}>
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl glow">🎃</span>
            <span className="font-display text-xl tracking-[0.22em] text-gold">ALL HALLOWS</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-ash">
            一个关于万圣节的介绍站点：从萨温节的篝火，到影院里的尖叫。
          </p>
          <div className="mt-5 flex gap-3 text-xs tracking-[0.3em] text-ash/70">
            <span>SAMHAIN</span>
            <span className="text-ember/60">✦</span>
            <span>OCT. 31</span>
          </div>
        </div>

        </Reveal>

        <Reveal y={30} delay={0.15}>
        <div>
          <h4 className="font-display text-xs tracking-[0.35em] text-gold">SITEMAP</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-ash">
            {[
              ['#origin', '起源与历史'],
              ['#timeline', '两千年时间线'],
              ['#customs', '传统习俗'],
              ['#symbols', '符号与角色'],
              ['#cinema', '万圣节 Cinema'],
            ].map(([href, label]) => (
              <li key={href}>
                <a className="inline-flex items-center gap-2 transition-colors hover:text-ember" href={href}>
                  <span className="text-ember/50">—</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        </Reveal>

        <Reveal y={30} delay={0.3}>
        <div>
          <h4 className="font-display text-xs tracking-[0.35em] text-gold">NOTES</h4>
          <p className="mt-5 text-xs leading-6 text-ash">
            消费数据引自美国零售联合会（NRF）2024 年调查；预告片均链接至 YouTube
            官方/片方频道，版权归原权利人所有。本站仅作文化介绍与学习用途。
          </p>
        </div>
        </Reveal>
      </div>

      <Reveal y={16}>
      <div className="flex items-center justify-center gap-5 border-t border-white/5 py-7">
        <GhostShape className="bob h-7 w-7 opacity-35" fill="#a79dbb" />
        <p className="text-[11px] tracking-[0.55em] text-ash/60">TRICK OR TREAT</p>
        <GhostShape className="bob h-7 w-7 opacity-35" fill="#a79dbb" />
      </div>
      </Reveal>
    </footer>
  )
}
