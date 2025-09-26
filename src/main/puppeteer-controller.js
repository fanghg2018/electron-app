const puppeteer = require('puppeteer')

let browser = null

async function runPuppeteerTask(url, logFn = console.log) {
  if (browser !== null) {
    // 如果浏览器已经启动，直接返回
    logFn('Puppeteer 已经在运行中。')
    return
  } else {
    logFn(`启动 Puppeteer，打开网址: ${url}`)

    browser = await puppeteer.launch({
      headless: false, // 如果需要无头浏览器，设置为 true
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    page.on('console', (msg) => {
      logFn(msg.text()) // 捕获 Puppeteer 的 console log
    })

    await page.goto(url, { waitUntil: 'domcontentloaded' })

    logFn(`页面加载完成：${url}`)

    const title = await page.title()

    return title //
  }
}

async function stopAutomation() {
  if (browser) {
    await browser.close()
    browser = null
  }
}

export { runPuppeteerTask, stopAutomation }
