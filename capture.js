const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  
  console.log('Navigating to Figma...');
  await page.goto('https://www.figma.com/design/pTsLIIzrx4DlrWANsVIJJX/portfolio-mayank?node-id=29-3&t=RO5T2TjcZp9PzK2r-4', { waitUntil: 'networkidle' });

  console.log('Waiting for canvas to render...');
  await page.waitForTimeout(10000);

  console.log('Taking screenshot...');
  await page.screenshot({ path: 'figma_design.png', fullPage: true });

  console.log('Done.');
  await browser.close();
})();
