import { chromium, devices } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 13'] })
const page = await ctx.newPage()
await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => (document.documentElement.style.scrollBehavior = 'auto')))
await page.goto('http://localhost:5586/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1200)

// 渐进滚动（模拟真实手势）
const glide = (page, toY, step) => page.evaluate(async ({ toY, step }) => {
  const cur = window.scrollY
  const dir = Math.sign(toY - cur)
  for (let y = cur; dir > 0 ? y < toY : y > toY; y += dir * Math.abs(step)) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 16))
  }
  window.scrollTo(0, toY)
}, { toY, step })

const targetY = await page.evaluate(() => {
  const el = document.querySelector('#origin article')
  return window.scrollY + el.getBoundingClientRect().top - 420
})

// 向下探索 → 应有动画
await glide(page, targetY, 60)
await page.waitForTimeout(140)
const d1 = await page.evaluate(() => getComputedStyle(document.querySelector('#origin article')).opacity)
await page.waitForTimeout(1100)
const d2 = await page.evaluate(() => getComputedStyle(document.querySelector('#origin article')).opacity)
console.log('向下(应播动画):', `${(+d1).toFixed(2)} → ${(+d2).toFixed(2)}`, parseFloat(d1) < 0.85 && parseFloat(d2) > 0.9 ? '✓' : '✗')

// 滑到底再往上滑回来 → 应瞬间可见
await glide(page, await page.evaluate(() => document.scrollingElement.scrollHeight), 400)
await page.waitForTimeout(500)
await glide(page, targetY, -220)
await page.waitForTimeout(140)
const u1 = await page.evaluate(() => getComputedStyle(document.querySelector('#origin article')).opacity)
console.log('向上(应瞬间可见):', (+u1).toFixed(2), parseFloat(u1) > 0.9 ? '✓' : '✗')
await browser.close()
