// 移动端体检：横向溢出 / 卡死元素 / 动效重播 / 掉帧采样 / 汉堡菜单
// 用法：node mobile-check.mjs（需先 npm run dev）
import { chromium, devices } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 13'] })
const page = await ctx.newPage()
await page.addInitScript(() => {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.scrollBehavior = 'auto'
  })
})
await page.goto('http://localhost:5585/', { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(1200)

const to = (y) => page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y)

const overflow = await page.evaluate(() => ({ sw: document.scrollingElement.scrollWidth, iw: window.innerWidth }))
console.log('横向溢出:', overflow.sw > overflow.iw + 1 ? `✗ ${overflow.sw}>${overflow.iw}` : '✓ 无')

const jank = await page.evaluate(async () => {
  const gaps = []
  let last = performance.now(), stop = false
  const tick = (t) => { gaps.push(t - last); last = t; if (!stop) requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
  const total = document.scrollingElement.scrollHeight
  for (let i = 0; i < 40; i++) {
    window.scrollTo({ top: (total / 40) * i, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 60))
  }
  stop = true
  gaps.sort((a, b) => b - a)
  return { top3: gaps.slice(0, 3).map((g) => Math.round(g)), frames: gaps.length }
})
console.log('滚动帧间隔(ms) top3:', jank.top3, '· 采样帧数', jank.frames)

const replay = async (label) => {
  await to(0)
  await page.waitForTimeout(700)
  await page.evaluate(() => {
    const el = document.querySelector('#origin article')
    const r = el.getBoundingClientRect()
    window.scrollTo({ top: window.scrollY + r.top - 500, behavior: 'instant' })
  })
  await page.waitForTimeout(1500)
  const op = await page.evaluate(() => getComputedStyle(document.querySelector('#origin article')).opacity)
  console.log(`${label}:`, parseFloat(op) > 0.9 ? `✓ (${op})` : `✗ (${op})`)
}
await replay('动效重播')
await replay('二次重播')

await to(0)
await page.waitForTimeout(600)
const btn = page.locator('header button[aria-label="打开菜单"]')
console.log('汉堡按钮可见:', (await btn.isVisible()) ? '✓' : '✗')
await btn.click({ timeout: 8000 })
await page.waitForTimeout(500)
await page.screenshot({ path: '/tmp/m-menu.png', animations: 'disabled', scale: 'css', timeout: 60000 })
console.log('菜单截图: /tmp/m-menu.png')

await browser.close()
