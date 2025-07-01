
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const https = require("https");
const http = require("http");

const SITE_URL = "https://advocatkazan.framer.website";
const OUTPUT_DIR = path.resolve(__dirname, "../assets");
const INDEX_PATH = path.resolve(__dirname, "../index.html");

const DEVICES = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, userAgent: "" },
  { name: "tablet", viewport: { width: 768, height: 1024 }, userAgent: "" },
  { name: "mobile", viewport: { width: 375, height: 812 }, userAgent: "" },
];

const downloaded = new Set();

function sanitizeFilename(url) {
  const u = new URL(url);
  return u.pathname.split("/").pop().split("?")[0];
}

function downloadFile(fileUrl, outputPath) {
  return new Promise((resolve, reject) => {
    if (downloaded.has(outputPath)) return resolve();
    const proto = fileUrl.startsWith("https") ? https : http;
    proto.get(fileUrl, (res) => {
      if (res.statusCode !== 200) return resolve();
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        downloaded.add(outputPath);
        resolve();
      });
    }).on("error", reject);
  });
}

async function crawlAndSave(device) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(device.viewport);
  if (device.userAgent) await page.setUserAgent(device.userAgent);

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (["image", "stylesheet", "script", "font"].includes(req.resourceType()))
      req.continue();
    else req.continue();
  });

  const requests = new Set();
  page.on("response", async (response) => {
    const url = response.url();
    const ct = response.headers()["content-type"] || "";
    if (/(image|font|javascript|css|svg|woff|woff2)/.test(ct) && url.includes("framerusercontent")) {
      try {
        const filename = sanitizeFilename(url);
        const filepath = path.join(OUTPUT_DIR, filename);
        await downloadFile(url, filepath);
        requests.add(url);
      } catch (e) {}
    }
  });

  await page.goto(SITE_URL, { waitUntil: "networkidle2" });

  // Только при первом запуске сохраняем index.html
  if (device.name === "desktop") {
    const content = await page.content();
    fs.writeFileSync(INDEX_PATH, content, "utf-8");
  }

  await browser.close();
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const device of DEVICES) {
    console.log("🧭 Сканируем как:", device.name);
    await crawlAndSave(device);
  }
  console.log("✅ Готово: index.html и ресурсы скачаны");
})();
