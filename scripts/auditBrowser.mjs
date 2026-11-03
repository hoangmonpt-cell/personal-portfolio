import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public/screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
  { name: 'laptop_1366x768', width: 1366, height: 768 },
  { name: 'tablet_landscape_1024x768', width: 1024, height: 768 },
  { name: 'tablet_portrait_768x1024', width: 768, height: 1024 },
  { name: 'mobile_390x844', width: 390, height: 844, isMobile: true },
  { name: 'mobile_360x800', width: 360, height: 800, isMobile: true },
];

async function runBrowserAudit() {
  console.log('=== STARTING 3D DEVELOPER ROOM BROWSER AUDIT ===');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  });

  const consoleErrors = [];
  const results = {
    canvasFound: false,
    viewportsTested: [],
    overflowIssues: [],
    stationScreenshots: {},
    interactions: {},
    consoleErrors: [],
  };

  // 1. Desktop Test Suite
  const contextDesktop = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await contextDesktop.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error]: ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  // Ensure default state starts with dark mode
  await page.evaluate(() => localStorage.removeItem('portfolio_theme_mode'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check 3D Canvas element
  const canvasEl = await page.$('canvas');
  results.canvasFound = !!canvasEl;
  console.log('3D WebGL Canvas Detected:', !!canvasEl);

  // 1.1 Take Dark Mode Overview screenshot
  const darkOverviewPath = path.join(SCREENSHOT_DIR, 'dark_mode_overview.png');
  await page.screenshot({ path: darkOverviewPath });
  console.log('Dark Mode Overview Screenshot saved:', darkOverviewPath);

  // 1.2 Test Theme Toggle to Light Mode
  const themeToggleBtn = await page.$('button[data-testid="theme-toggle"]');
  if (themeToggleBtn) {
    console.log('Clicking Theme Toggle...');
    await themeToggleBtn.click();
    await page.waitForTimeout(600); // Allow react state & canvas tone mapping / lighting update

    const currentTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    results.themeToggledToLight = currentTheme === 'light';
    console.log('Current DOM data-theme after toggle:', currentTheme);

    // Save Light Mode Overview screenshot
    const lightOverviewPath = path.join(SCREENSHOT_DIR, 'light_mode_overview.png');
    await page.screenshot({ path: lightOverviewPath });
    console.log('Light Mode Overview Screenshot saved:', lightOverviewPath);

    // Test Workstation close-up in Light Mode
    const workBtn = await page.$('button:has-text("Bàn Dev")');
    if (workBtn) {
      await workBtn.click();
      await page.waitForTimeout(600);
      const lightWorkPath = path.join(SCREENSHOT_DIR, 'light_mode_workstation.png');
      await page.screenshot({ path: lightWorkPath });
      console.log('Light Mode Workstation Screenshot saved:', lightWorkPath);

      const closeBtn = await page.$('button[aria-label="Close Station Panel"]');
      if (closeBtn) {
        await closeBtn.click();
        await page.waitForTimeout(400);
      }
    }

    // Toggle back to Dark Mode
    await themeToggleBtn.click();
    await page.waitForTimeout(600);
    console.log('Toggled back to Dark Mode');
  }

  // Take Standard Overview screenshot
  const overviewPath = path.join(SCREENSHOT_DIR, 'desktop_1920x1080.png');
  await page.screenshot({ path: overviewPath });
  console.log('Overview Screenshot saved:', overviewPath);

  // Test Camera Navigation to each station & capture specific station screenshots
  const stationsToTest = [
    { id: 'workstation', buttonText: 'Bàn Dev', file: 'workstation_3d.png' },
    { id: 'projects', buttonText: 'Dự án', file: 'projects_3d.png' },
    { id: 'skills', buttonText: 'Kỹ năng', file: 'skills_3d.png' },
    { id: 'achievements', buttonText: 'Thành tích', file: 'achievements_3d.png' },
    { id: 'contact', buttonText: 'Liên hệ', file: 'contact_3d.png' },
  ];

  for (const st of stationsToTest) {
    const btn = await page.$(`button:has-text("${st.buttonText}")`);
    if (btn) {
      await btn.click();
      await page.waitForTimeout(600); // Allow smooth lerp camera transition and modal appearance
      
      const shotPath = path.join(SCREENSHOT_DIR, st.file);
      await page.screenshot({ path: shotPath });
      results.stationScreenshots[st.id] = fs.existsSync(shotPath);
      console.log(`Station [${st.id}] screenshot captured:`, shotPath);

      // Close modal / return to overview
      const closeBtn = await page.$('button[aria-label="Close Station Panel"]');
      if (closeBtn) {
        await closeBtn.click();
        await page.waitForTimeout(400);
      }
    }
  }

  // Test Camera Mode Toggle (Guided <-> Explore)
  const modeBtn = await page.$('button[title*="Camera"]');
  if (modeBtn) {
    await modeBtn.click();
    await page.waitForTimeout(300);
    const modeText = await modeBtn.textContent();
    results.interactions.cameraModeToggle = modeText?.includes('EXPLORE');
    console.log('Camera Mode Toggled to Explore:', results.interactions.cameraModeToggle);

    // Switch back to Guided
    await modeBtn.click();
    await page.waitForTimeout(300);
  }

  // Test 2D / 3D View Toggle
  const viewToggleBtn = await page.$('button[title*="Chuyển đổi"], button[title*="Toggle between"]');
  if (viewToggleBtn) {
    await viewToggleBtn.click();
    await page.waitForTimeout(600);
    const is2DEnabled = await page.isVisible('text=2D CLASSIC VIEW ENABLED');
    results.interactions.viewModeToggle2D = is2DEnabled;
    console.log('2D View Fallback Activated:', is2DEnabled);

    // Take screenshot of 2D View
    const classic2DPath = path.join(SCREENSHOT_DIR, 'classic_2d_view.png');
    await page.screenshot({ path: classic2DPath });

    // Switch back to 3D Room
    const enter3DBtn = await page.$('button:has-text("ENTER 3D DEVELOPER ROOM")');
    if (enter3DBtn) {
      await enter3DBtn.click();
      await page.waitForTimeout(600);
    }
  }

  await contextDesktop.close();

  // 2. Viewports & Overflow Testing (Mobile & Tablet)
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile || false,
    });
    const p = await ctx.newPage();
    await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);

    const hasOverflow = await p.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasOverflow) {
      results.overflowIssues.push(vp.name);
    }

    const shotName = `${vp.name}.png`;
    const shotPath = path.join(SCREENSHOT_DIR, shotName);
    await p.screenshot({ path: shotPath });

    results.viewportsTested.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      hasOverflow,
      screenshotSaved: fs.existsSync(shotPath),
    });

    await ctx.close();
  }

  await browser.close();
  results.consoleErrors = consoleErrors;

  console.log('=== AUDIT FINISHED ===');
  console.log(JSON.stringify(results, null, 2));
}

runBrowserAudit().catch((err) => {
  console.error('Audit Script Error:', err);
  process.exit(1);
});
