import { chromium, devices } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['Pixel 7'] })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => (document.documentElement.style.scrollBehavior = 'auto')))
await page.goto('http://localhost:5585/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1500)
const res = await page.evaluate(async () => {
  // 先滑到起源区底部（走过边界），再反向上滑回顶部，测量
  const boundary = document.querySelector('#origin').getBoundingClientRect().height + window.innerHeight * 0.6
  window.scrollTo(0, boundary)
  await new Promise((r) => setTimeout(r, 700))
  const gaps = []
  let last = performance.now(), stop = false
  const tick = (t) => { gaps.push(t - last); last = t; if (!stop) requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
  for (let i = 0; i < 22; i++) {
    window.scrollBy(0, -220)
    await new Promise((r) => setTimeout(r, 55))
  }
  await new Promise((r) => setTimeout(r, 250))
  stop = true
  const sorted = [...gaps].sort((a, b) => b - a)
  return { top3: sorted.slice(0, 3).map((g) => Math.round(g)), avg: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length), frames: gaps.length }
})
console.log('上滑 Hero↔起源:', JSON.stringify(res))
await browser.close()
