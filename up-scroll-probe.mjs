import { chromium, devices } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['Pixel 7'] })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => (document.documentElement.style.scrollBehavior = 'auto')))
await page.goto('http://localhost:5585/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1500)

// 先滑到底（走过所有板块）
await page.evaluate(() => window.scrollTo({ top: document.scrollingElement.scrollHeight, behavior: 'instant' }))
await page.waitForTimeout(800)

// 上滑到顶，测帧
const res = await page.evaluate(async () => {
  const gaps = []
  let last = performance.now(), stop = false
  const tick = (t) => { gaps.push(t - last); last = t; if (!stop) requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
  for (let i = 0; i < 24; i++) {
    window.scrollBy(0, -180)
    await new Promise((r) => setTimeout(r, 55))
  }
  await new Promise((r) => setTimeout(r, 250))
  stop = true
  const sorted = [...gaps].sort((a, b) => b - a)
  return {
    top3: sorted.slice(0, 3).map((g) => Math.round(g)),
    avg: Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length),
    frames: gaps.length,
  }
})
console.log('上滑到顶(@4x降速):', JSON.stringify(res))

// 验证：向上滚时元素应"瞬间"可见（不播动画）
await page.evaluate(() => window.scrollTo({ top: document.scrollingElement.scrollHeight, behavior: 'instant' }))
await page.waitForTimeout(600)
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })) // 瞬间回顶
await page.waitForTimeout(120)
const fast = await page.evaluate(() => {
  const els = [...document.querySelectorAll('#origin article, #customs article')]
  const vis = els.filter((el) => parseFloat(getComputedStyle(el).opacity) > 0.9).length
  return { total: els.length, visible: vis }
})
console.log('向上滚经过的元素瞬间可见:', fast.visible, '/', fast.total, fast.visible === fast.total ? '✓' : '✗')

// 再验证向下重播
await page.waitForTimeout(1200)
const replay = await page.evaluate(() => getComputedStyle(document.querySelector('#origin article')).opacity)
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
await page.waitForTimeout(300)
await page.evaluate(() => {
  const el = document.querySelector('#origin article')
  const r = el.getBoundingClientRect()
  window.scrollTo({ top: window.scrollY + r.top - 450, behavior: 'instant' })
})
await page.waitForTimeout(1500)
const replay2 = await page.evaluate(() => getComputedStyle(document.querySelector('#origin article')).opacity)
console.log('向下重播:', parseFloat(replay2) > 0.9 ? `✓ (${replay} → ${replay2})` : `✗ (${replay} → ${replay2})`)
await browser.close()
