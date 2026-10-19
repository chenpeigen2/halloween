import { chromium, devices } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['Pixel 7'] })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => (document.documentElement.style.scrollBehavior = 'auto')))
await page.goto('http://localhost:5585/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1800) // 等入场动画结束

const res = await page.evaluate(async () => {
  const gaps = []
  let last = performance.now(), stop = false
  const tick = (t) => { gaps.push(t - last); last = t; if (!stop) requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
  // 起步拖动：前 500px，模拟手指慢拖
  for (let i = 0; i < 20; i++) {
    window.scrollBy(0, 25)
    await new Promise((r) => setTimeout(r, 50))
  }
  await new Promise((r) => setTimeout(r, 200))
  stop = true
  const sorted = [...gaps].sort((a, b) => b - a)
  return {
    top3: sorted.slice(0, 3).map((g) => Math.round(g)),
    avg: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length),
    frames: gaps.length,
    slow: gaps.filter((g) => g > 32).length,
  }
})
console.log('起步拖动(前500px @4x降速):', JSON.stringify(res))
await browser.close()
