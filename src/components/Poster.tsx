import type { Movie } from '../data/movies'

/** 复古极简恐怖海报：每个 motif 手绘 SVG 图形 */
function Motif({ motif, ink }: { motif: Movie['motif']; ink: string }) {
  switch (motif) {
    case 'pumpkin':
      return (
        <g fill={ink} transform="translate(150 210)">
          <path d="M-78 0c0-46 35-78 78-78s78 32 78 78-35 78-78 78S-78 46-78 0z" opacity="0.14" />
          <path d="M-40-30 L-6-8 L-40 4 Z" />
          <path d="M40-30 L6-8 L40 4 Z" />
          <path d="M0-4 L-13 20 L13 20 Z" />
          <path d="M-46 34 h92 l-14 12 -12-10 -12 12 -12-10 -12 12 -12-10 -12 12 -14-10z" />
          <path d="M0-78 c-6-14 4-24 14-28 -4 12 2 20 8 26z" opacity="0.8" />
        </g>
      )
    case 'keyhole':
      return (
        <g transform="translate(150 210)">
          <rect x="-62" y="-95" width="124" height="190" rx="4" fill="none" stroke={ink} strokeWidth="3" opacity="0.5" />
          <text x="0" y="-52" textAnchor="middle" fill={ink} fontSize="34" fontFamily="var(--font-display)" letterSpacing="3">
            237
          </text>
          <g fill={ink}>
            <circle cx="0" cy="6" r="24" />
            <path d="M-10 20 L10 20 L15 62 L-15 62 Z" />
          </g>
          <path d="M-58 78 q10 26 0 44 q-8-18 0-44z M52 96 q9 22 0 38 q-7-16 0-38z" fill="#e23b3b" opacity="0.85" />
          <path d="M-70 -110 q20 26 6 54 q-6-30 -20-40z" fill="#e23b3b" opacity="0.5" />
        </g>
      )
    case 'lamp':
      return (
        <g transform="translate(150 210)">
          <circle cx="0" cy="-40" r="86" fill={ink} opacity="0.07" />
          <circle cx="0" cy="-40" r="54" fill={ink} opacity="0.1" />
          <path d="M0-96 l26 26 h-52z" fill={ink} />
          <rect x="-3" y="-70" width="6" height="150" fill={ink} />
          <ellipse cx="0" cy="-58" rx="24" ry="10" fill={ink} opacity="0.9" />
          <g fill="#050505" stroke={ink} strokeWidth="2">
            <circle cx="6" cy="76" r="11" />
            <path d="M-4 87 h20 l6 44 h-32z" />
            <path d="M0 131 v26 M0 131 l-12 22 M0 131 l12 22" stroke={ink} strokeWidth="4" fill="none" />
          </g>
          <path d="M-64 158 h128" stroke={ink} strokeWidth="3" opacity="0.55" />
        </g>
      )
    case 'eye':
      return (
        <g transform="translate(150 210)">
          <g opacity="0.22" stroke={ink} strokeWidth="2">
            <path d="M-96-120 v240 M-72-120 v240 M-48-120 v240 M48-120 v240 M72-120 v240 M96-120 v240" />
          </g>
          <path d="M-64 0 q64-52 128 0 q-64 52 -128 0z" fill="none" stroke={ink} strokeWidth="5" />
          <circle cx="0" cy="0" r="21" fill={ink} />
          <circle cx="7" cy="-7" r="6" fill="#0b0b0b" />
          <path d="M78-118 L34-14 L48-6 L92-108z" fill="#cfc9bd" opacity="0.85" />
          <path d="M48-6 q4 16 -6 26 q-4-16 6-26z" fill="#b3121f" />
        </g>
      )
    case 'claw':
      return (
        <g transform="translate(150 210)">
          <path d="M-70-42 q70-46 140 0 l6 8 h-152z" fill={ink} />
          <rect x="-84" y="-40" width="168" height="13" rx="6" fill={ink} />
          <g stroke={ink} strokeWidth="9" strokeLinecap="round" fill="none">
            <path d="M-46 40 q-16 60 -6 108" />
            <path d="M0 44 q-8 64 2 106" />
            <path d="M46 40 q14 62 4 106" />
          </g>
          <g stroke={ink} strokeWidth="4" opacity="0.65" fill="none">
            <path d="M-58 46 q-26 46 -30 76" />
            <path d="M58 46 q26 46 30 76" />
          </g>
        </g>
      )
    case 'hand':
      return (
        <g transform="translate(150 210)">
          <circle cx="52" cy="-84" r="40" fill={ink} opacity="0.9" />
          <circle cx="36" cy="-96" r="40" fill="#0b0b0b" />
          <g fill={ink}>
            <path d="M-46 40 q4-40 12-64 q4-12 12-8 q6 4 2 18 l-6 36 4 2z" />
            <path d="M-24 34 q0-56 6-84 q4-14 12-10 q7 4 3 18 l-8 74z" />
            <path d="M-2 34 q2-58 4-86 q2-14 11-11 q8 3 5 17 l-9 82z" />
            <path d="M20 38 q6-50 10-74 q4-13 12-9 q7 4 3 17l-11 70z" />
            <path d="M44 46 q10-34 16-50 q6-12 13-7 q6 5 1 17l-16 46z" />
            <rect x="-50" y="36" width="112" height="54" rx="14" />
          </g>
          <path d="M-96 92 h192" stroke={ink} strokeWidth="3" opacity="0.5" />
          <g stroke={ink} strokeWidth="3" opacity="0.35">
            <path d="M-70 92 l-8 26 M-30 92 l-6 22 M60 92 l7 24 M92 92 l5 18" />
          </g>
        </g>
      )
    case 'skull':
      return (
        <g transform="translate(150 210)">
          <path
            d="M-64-6 q0-84 64-84 t64 84 q0 40-26 56 l-4 30 q-2 12-14 12h-40 q-12 0-14-12l-4-30q-26-16-26-56z"
            fill={ink}
          />
          <g fill="#140608">
            <ellipse cx="-30" cy="-24" rx="20" ry="24" />
            <ellipse cx="30" cy="-24" rx="20" ry="24" />
            <path d="M0 4 l-14 26 h28z" />
            <rect x="-42" y="52" width="84" height="14" rx="4" />
          </g>
          <g stroke="#140608" strokeWidth="4">
            <path d="M-22 52 v14 M0 52 v14 M22 52 v14" />
          </g>
          <g fill="#d92b3a" opacity="0.9">
            <ellipse cx="-30" cy="-28" rx="7" ry="8" />
            <ellipse cx="30" cy="-28" rx="7" ry="8" />
          </g>
          <path d="M-52 76 q-10 30 4 48 q-2-30 6-44z" fill="#b3121f" opacity="0.8" />
        </g>
      )
    case 'sticks':
      return (
        <g transform="translate(150 210)">
          <g stroke={ink} strokeWidth="3" opacity="0.4">
            <path d="M-96-140 v280 M-64-140 v280 M64-140 v280 M96-140 v280" />
          </g>
          <g stroke={ink} strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M-34-110 v150 M-62-84 h56" />
            <path d="M-34-70 l-18-16 M-34-70 l18-16" />
            <path d="M34-96 v136 M6-64 h56" />
            <path d="M34-52 l-16-14 M34-52 l16-14" />
            <path d="M0 22 v86 M-22 46 h44" />
          </g>
          <g stroke={ink} strokeWidth="2" opacity="0.7">
            <path d="M-34-110 q-8-14 0-24 M34-96 q8-14 0-24" />
          </g>
        </g>
      )
  }
}

export function Poster({ movie, className }: { movie: Movie; className?: string }) {
  return (
    <svg
      viewBox="0 0 300 450"
      className={className}
      role="img"
      aria-label={`${movie.titleZh} (${movie.year}) 复古海报`}
    >
      <defs>
        <radialGradient id={`sky-${movie.id}`} cx="50%" cy="38%" r="82%">
          <stop offset="0%" stopColor={movie.ink} stopOpacity="0.16" />
          <stop offset="52%" stopColor={movie.bg} stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.82" />
        </radialGradient>
        <linearGradient id={`sheen-${movie.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="26%" stopColor="#fff" stopOpacity="0" />
          <stop offset="88%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.42" />
        </linearGradient>
      </defs>

      <rect width="300" height="450" fill={movie.bg} />
      <rect width="300" height="450" fill={`url(#sky-${movie.id})`} />

      {/* 地平线辉光 */}
      <ellipse cx="150" cy="330" rx="150" ry="42" fill={movie.ink} opacity="0.07" />

      <Motif motif={movie.motif} ink={movie.ink} />

      {/* 顶部片名 */}
      <text
        x="150"
        y="36"
        textAnchor="middle"
        fill={movie.ink}
        fontSize="11"
        letterSpacing="2.2"
        fontFamily="var(--font-display)"
        opacity="0.95"
      >
        {movie.titleEn.toUpperCase()}
      </text>
      <line x1="60" y1="48" x2="240" y2="48" stroke={movie.ink} strokeWidth="0.8" opacity="0.5" />
      <path d="M150 44 l4 4 -4 4 -4-4z" fill={movie.ink} opacity="0.8" />

      {/* 底部信息 */}
      <text
        x="150"
        y="378"
        textAnchor="middle"
        fill={movie.ink}
        stroke="#0a0710"
        strokeWidth="3.5"
        paintOrder="stroke"
        fontSize="26"
        fontWeight="700"
        letterSpacing="2.5"
        fontFamily="var(--font-cute)"
      >
        {movie.titleZh}
      </text>
      <line x1="88" y1="394" x2="212" y2="394" stroke={movie.ink} strokeWidth="0.8" opacity="0.45" />
      <text
        x="150"
        y="416"
        textAnchor="middle"
        fill="#a79dbb"
        fontSize="11"
        letterSpacing="2.5"
        fontFamily="var(--font-body)"
      >
        {movie.year} · {movie.director}
      </text>

      {/* 内框与整体光泽 */}
      <rect x="10" y="10" width="280" height="430" fill="none" stroke={movie.ink} strokeWidth="1" opacity="0.28" />
      <rect width="300" height="450" fill={`url(#sheen-${movie.id})`} />
    </svg>
  )
}
