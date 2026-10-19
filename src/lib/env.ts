import { useEffect, useState } from 'react'

/** 响应式媒体查询 hook */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    // 旧 iOS（<14）只有 addListener
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', sync)
      return () => mq.removeEventListener('change', sync)
    }
    mq.addListener(sync)
    return () => mq.removeListener(sync)
  }, [query])
  return matches
}

/** 是否有精确指针（鼠标/触控板）——触屏安卓上 whileHover 会“粘住” */
export function useHoverCapable(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

/** 低端设备（弱 CPU / 小内存，安卓中低端居多）：自动降级动效 */
export function useLowEnd(): boolean {
  const [lowEnd] = useState(() => {
    if (typeof navigator === 'undefined') return false
    const nav = navigator as Navigator & { deviceMemory?: number }
    const cores = nav.hardwareConcurrency ?? 8
    const mem = nav.deviceMemory ?? 8
    return cores <= 4 || mem <= 4
  })
  return lowEnd
}
