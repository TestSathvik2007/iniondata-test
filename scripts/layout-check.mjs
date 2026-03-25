import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "playwright-layout");

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

const pages = [
  { name: "home", label: "Home" },
  { name: "about", label: "About Us" },
  { name: "services", label: "Our Services" },
  { name: "contact", label: "Contact Us" },
  { name: "careers", label: "Careers" },
];

async function firstReachableBaseUrl(browser) {
  const candidates = ["http://localhost:5175/", "http://localhost:5173/"];
  for (const baseURL of candidates) {
    const page = await browser.newPage();
    try {
      const resp = await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 5000 });
      if (resp && resp.ok()) return baseURL;
    } catch {
      // ignore
    } finally {
      await page.close().catch(() => {});
    }
  }
  throw new Error("Could not reach localhost dev server on 5175 or 5173.");
}

async function clickNavTo(page, label, viewportName) {
  if (viewportName === "mobile") {
    const hamburger = page.locator("button.hamburger");
    if (await hamburger.count()) {
      await hamburger.click();
      await page.locator(".mobile-menu").waitFor({ state: "visible", timeout: 3000 });
      await page.locator(".mobile-menu").getByRole("button", { name: label, exact: true }).click();
      await page.locator(".mobile-menu").waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
      return;
    }
  }
  await page.locator("nav.navbar").getByRole("button", { name: label, exact: true }).click();
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const baseURL = await firstReachableBaseUrl(browser);
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      try {
        await page.goto(baseURL, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("nav.navbar", { timeout: 15000 });
        await page.waitForTimeout(250);

        for (const p of pages) {
          await page.waitForSelector("nav.navbar", { timeout: 15000 });
          await clickNavTo(page, p.label, vp.name);
          await page.waitForTimeout(350);
          await page.screenshot({
            path: path.join(OUT_DIR, `${vp.name}-${p.name}.png`),
            fullPage: true,
          });
        }
      } finally {
        await page.close().catch(() => {});
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

