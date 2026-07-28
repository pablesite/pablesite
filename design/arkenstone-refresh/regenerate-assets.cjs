const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const http = require("http");

const FRONTEND_BASE = "http://172.26.0.1:5174";
const TMP_DIR = "/tmp/pablesite-public";
const OUT_DIR = "/tmp/pablesite-output";

function readPngSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    buffer,
  };
}

function httpRequest({
  hostname,
  port,
  method,
  reqPath,
  headers = {},
  body = "",
}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname, port, method, path: reqPath, headers },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () =>
          resolve({
            status: res.statusCode || 500,
            headers: res.headers,
            body: Buffer.concat(chunks),
          }),
        );
      },
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getTokens() {
  const payload = JSON.stringify({
    username: "test_plan",
    password: "test_plan",
  });
  const res = await httpRequest({
    hostname: "moneyplanner-dev-saas_backend-1",
    port: 8000,
    method: "POST",
    reqPath: "/api/auth/token/",
    headers: {
      Host: "localhost:8001",
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
    body: payload,
  });
  return JSON.parse(res.body.toString("utf8"));
}

async function installApiProxy(page) {
  await page.route("**/*", async (route) => {
    const url = route.request().url();
    if (!url.includes("/api/")) {
      await route.continue();
      return;
    }

    const target = new URL(url);
    let hostname;
    let port;
    let hostHeader;
    if (target.port === "8001") {
      hostname = "moneyplanner-dev-saas_backend-1";
      port = 8000;
      hostHeader = "localhost:8001";
    } else if (target.port === "8000") {
      hostname = "moneyplanner-dev-core_backend-1";
      port = 8000;
      hostHeader = "localhost:8000";
    } else {
      await route.continue();
      return;
    }

    const request = route.request();
    const postData = request.postDataBuffer() || Buffer.alloc(0);
    const headers = { ...request.headers(), host: hostHeader };
    delete headers["content-length"];
    if (postData.length) headers["content-length"] = String(postData.length);

    const res = await httpRequest({
      hostname,
      port,
      method: request.method(),
      reqPath: target.pathname + target.search,
      headers,
      body: postData,
    });

    const responseHeaders = {};
    for (const [key, value] of Object.entries(res.headers)) {
      if (typeof value === "string") responseHeaders[key] = value;
    }
    await route.fulfill({
      status: res.status,
      headers: responseHeaders,
      body: res.body,
    });
  });
}

async function cropBorder(page, inputPath, outputPath) {
  const { width, height, buffer } = readPngSize(inputPath);
  await page.setViewportSize({ width, height });
  const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
  await page.setContent(`
    <style>
      html, body {
        margin: 0;
        background: #050816;
      }
      .frame {
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
        background: #050816;
      }
      img {
        display: block;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        margin: -1px;
      }
    </style>
    <div class="frame">
      <img src="${dataUri}" alt="" />
    </div>
  `);
  await page.locator(".frame").screenshot({ path: outputPath });
}

async function composeNetWorth(page) {
  await page.goto(FRONTEND_BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1800);

  const generalPath = path.join(OUT_DIR, "net-worth-general.png");
  const evolutionPath = path.join(OUT_DIR, "net-worth-evolution.png");
  const composedPath = path.join(
    OUT_DIR,
    "arkenstone-patrimonio-composite.png",
  );

  await page.screenshot({
    path: generalPath,
    clip: { x: 1, y: 1, width: 1438, height: 500 },
  });

  await page
    .getByText(/evoluci/i)
    .first()
    .click();
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: evolutionPath,
    clip: { x: 1, y: 140, width: 1438, height: 760 },
  });

  const general = fs.readFileSync(generalPath).toString("base64");
  const evolution = fs.readFileSync(evolutionPath).toString("base64");
  const width = 1438;
  const gap = 20;
  const totalHeight = 500 + gap + 760;

  await page.setViewportSize({ width, height: totalHeight });
  await page.setContent(`
    <style>
      html, body {
        margin: 0;
        background: #050816;
      }
      .stack {
        width: ${width}px;
        min-height: ${totalHeight}px;
        background: #050816;
        display: grid;
        gap: ${gap}px;
      }
      img {
        display: block;
        width: ${width}px;
        height: auto;
      }
    </style>
    <div class="stack">
      <img src="data:image/png;base64,${general}" alt="" />
      <img src="data:image/png;base64,${evolution}" alt="" />
    </div>
  `);
  await page.locator(".stack").screenshot({ path: composedPath });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const cropContext = await browser.newContext();
  const cropPage = await cropContext.newPage();

  const cropTargets = [
    "arkenstone-mi-plan-resumen.png",
    "arkenstone-module-accounting-v2.png",
    "arkenstone-module-budget-v2.png",
    "arkenstone-module-monthly-close-v2.png",
    "arkenstone-module-plan-v2.png",
  ];

  for (const filename of cropTargets) {
    await cropBorder(
      cropPage,
      path.join(TMP_DIR, filename),
      path.join(OUT_DIR, filename),
    );
  }

  await cropContext.close();

  const tokens = await getTokens();
  const appContext = await browser.newContext({
    viewport: { width: 1440, height: 1400 },
    deviceScaleFactor: 1,
  });
  const appPage = await appContext.newPage();
  await installApiProxy(appPage);
  await appContext.addInitScript(
    ({ access, refresh }) => {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    },
    { access: tokens.access, refresh: tokens.refresh },
  );

  await composeNetWorth(appPage);
  await appContext.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
