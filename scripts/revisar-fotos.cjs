const { chromium } = require('C:/Users/itzlu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('node:fs/promises')
const path = require('node:path')
;(async () => {
  const dir = path.resolve(__dirname, '../qa-2026-10-29')
  await fs.mkdir(dir, { recursive: true })
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
  const results = []
  for (const width of [360, 390, 430, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width > 1000 ? 1000 : 844 } })
    const errors = [], failed = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('response', r => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`) })
    await page.goto('http://127.0.0.1:3036/?v=retrato-02')
    await page.waitForTimeout(1400)
    await page.screenshot({ path: path.join(dir, `hero-${width}.png`) })
    for (const id of ['materia', 'escritorio', 'projetos', 'contato']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await page.waitForTimeout(1000)
      await page.locator(`#${id} img`).evaluateAll(async images => { await Promise.all(images.filter(img => img.getClientRects().length).map(img => img.decode().catch(() => {}))) })
      await page.locator(`#${id}`).screenshot({ path: path.join(dir, `${id}-${width}.png`) })
    }
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      portrait: !!document.querySelector('img[src*="escritorio-arquitetas"]')?.naturalWidth,
      photographs: [...document.querySelectorAll('.portfolio__foto img')].every(i => i.naturalWidth > 0),
      whatsapp: [...document.querySelectorAll('a[href*="wa.me"]')].every(a => a.href.includes('/5548999189192')),
      watermark: !!document.querySelector('.marca-autoria'),
    }))
    await page.locator('#materia').scrollIntoViewIfNeeded()
    await page.locator('#pedra-botao').click()
    await page.waitForTimeout(700)
    const panel = await page.locator('#pedra-botao').getAttribute('aria-expanded')
    let menu = true
    if (width < 960) {
      await page.evaluate(() => scrollTo(0, 0))
      // Header exposes an accessible menu button; select by label rather than class fallback.
      const headerButton = page.locator('header button[aria-expanded]').first()
      if (await headerButton.count()) {
        await headerButton.click(); await page.keyboard.press('Escape')
        menu = await headerButton.getAttribute('aria-expanded') === 'false'
      }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.reload()
    await page.locator('#escritorio').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    const reducedAnimations = await page.locator('.estudio__retrato').evaluate(el => el.getAnimations().length)
    if (width === 390) await page.locator('#escritorio').screenshot({ path: path.join(dir, 'reduced-390.png') })
    results.push({ width, ...state, errors, failed, panel: panel === 'true', menu, reducedAnimations })
    await page.close()
  }
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  await noJS.goto('http://127.0.0.1:3036/')
  const prerender = await noJS.locator('.estudio__retrato').count() === 1 && await noJS.locator('a[href*="wa.me"]').count() >= 2
  await browser.close()
  await fs.writeFile(path.join(dir, 'results.json'), JSON.stringify({ results, prerender }, null, 2))
  console.log(JSON.stringify({ results, prerender }, null, 2))
  if (!prerender || results.some(r => r.overflow || !r.portrait || !r.photographs || r.errors.length || r.failed.length || !r.panel || !r.menu || r.reducedAnimations)) process.exitCode = 1
})().catch(e => { console.error(e); process.exit(1) })
