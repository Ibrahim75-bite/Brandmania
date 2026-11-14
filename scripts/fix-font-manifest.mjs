import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const mediaDir = path.join(rootDir, '.next', 'static', 'media');

if (!fs.existsSync(mediaDir)) {
  console.log('[fix-font-manifest] no .next/static/media directory; nothing to repair');
  process.exit(0);
}

const preloadableFonts = fs
  .readdirSync(mediaDir)
  .filter((file) => /\.p\.(woff2|woff)$/.test(file))
  .map((file) => `static/media/${file}`)
  .sort();

if (preloadableFonts.length === 0) {
  console.log('[fix-font-manifest] no preloadable font files emitted; nothing to repair');
  process.exit(0);
}

const appDirRel = fs.existsSync(path.join(rootDir, 'src', 'app'))
  ? 'src/app'
  : 'app';
const appDir = path.resolve(rootDir, appDirRel);
const appDirBase = path.dirname(appDir) + path.sep;
const rootLayoutKey = (appDirBase + 'app/layout').replace(/[\\/]/g, path.sep);

const preloadTags = preloadableFonts
  .map((fontFile) => {
    const ext = /\.(woff2|woff)$/.exec(fontFile)[1];
    return `<link rel="preload" href="/_next/${fontFile}" as="font" crossorigin="" type="font/${ext}"/>`;
  })
  .join('');

function collectHtmlFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(full, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const serverDirs = [path.join(rootDir, '.next', 'server')];
const standaloneServerDir = path.join(rootDir, '.next', 'standalone', '.next', 'server');
if (fs.existsSync(standaloneServerDir)) {
  serverDirs.push(standaloneServerDir);
}

let manifestsPatched = 0;
let htmlPatched = 0;

for (const serverDir of serverDirs) {
  const manifestPath = path.join(serverDir, 'next-font-manifest.json');
  if (fs.existsSync(manifestPath)) {
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      console.error(`[fix-font-manifest] unreadable manifest: ${manifestPath}`);
      process.exit(1);
    }

    if (!manifest.app || Object.keys(manifest.app).length === 0) {
      manifest.app = { [rootLayoutKey]: preloadableFonts };
      manifest.appUsingSizeAdjust = preloadableFonts.some((file) => file.includes('-s'));

      const manifestJson = JSON.stringify(manifest, null);
      fs.writeFileSync(manifestPath, manifestJson);

      const edgeManifestPath = path.join(serverDir, 'next-font-manifest.js');
      if (fs.existsSync(edgeManifestPath)) {
        fs.writeFileSync(edgeManifestPath, `self.__NEXT_FONT_MANIFEST=${JSON.stringify(manifestJson)}`);
      }

      manifestsPatched += 1;
    }
  }

  const appHtmlDir = path.join(serverDir, 'app');
  if (!fs.existsSync(appHtmlDir)) {
    continue;
  }

  for (const htmlPath of collectHtmlFiles(appHtmlDir)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    let modified = false;

    if (!html.includes('as="font"')) {
      const headIndex = html.indexOf('<head>');
      if (headIndex !== -1) {
        html = html.slice(0, headIndex + 6) + preloadTags + html.slice(headIndex + 6);
        modified = true;
      }
    }

    const expectLinks = html.match(/<link rel="expect"[^>]*>/g);
    if (expectLinks) {
      html = html.replace(/<link rel="expect"[^>]*>/g, '');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(htmlPath, html);
      htmlPatched += 1;
    }
  }
}

console.log(
  `[fix-font-manifest] preloadable fonts: ${preloadableFonts.length}; manifests repaired: ${manifestsPatched}; html files patched: ${htmlPatched}`
);

if (manifestsPatched === 0 && htmlPatched === 0) {
  console.log('[fix-font-manifest] manifests populated and font preloads present; nothing to repair');
}
