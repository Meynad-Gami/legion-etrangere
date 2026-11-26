// Construit une version « fichier unique » du site : dist/legion-etrangere.html
// Tout est intégré (script, styles, polices, images, fond de carte) : le fichier s'ouvre par double-clic.
// Prérequis : `npm run export` (fournit la feuille de style compilée et les polices).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const dist = path.join(root, "dist");
if (!existsSync(path.join(out, "index.html"))) throw new Error("Lancer d'abord `npm run export`.");
mkdirSync(dist, { recursive: true });

// 1. Script : un seul bundle, avec next/link et next/navigation remplacés par le routeur par hash.
const shim = (p) => path.join(root, "standalone", p);
const result = await build({
  entryPoints: [shim("entry.tsx")],
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "error",
  plugins: [
    {
      name: "standalone-aliases",
      setup(b) {
        b.onResolve({ filter: /^next\/link$/ }, () => ({ path: shim("shims/next-link.tsx") }));
        b.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: shim("shims/next-navigation.ts") }));
        b.onResolve({ filter: /^@\/lib\/topology$/ }, (args) =>
          args.importer.endsWith(path.join("standalone", "topology.ts"))
            ? { path: path.join(root, "lib", "topology.ts") }
            : { path: shim("topology.ts") },
        );
      },
    },
  ],
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

// 2. Styles : feuille compilée par l'export Next, polices converties en data URI.
const indexHtml = readFileSync(path.join(out, "index.html"), "utf8");
const cssFiles = [...indexHtml.matchAll(/<link rel="stylesheet" href="([^"]+\.css)"/g)].map((m) => m[1]);
// Les url() des polices sont relatives au fichier CSS : on les résout puis on les intègre.
const css = cssFiles
  .map((f) => {
    const file = path.join(out, f);
    return readFileSync(file, "utf8").replace(/url\(([^)]+\.woff2)\)/g, (_, p) => {
      const clean = p.replace(/^["']|["']$/g, "");
      const abs = clean.startsWith("/") ? path.join(out, clean) : path.resolve(path.dirname(file), clean);
      return `url(data:font/woff2;base64,${readFileSync(abs).toString("base64")})`;
    });
  })
  .join("\n");
if (/url\((?!data:)[^)]*\.woff2/.test(css)) throw new Error("Police non intégrée");
const htmlClass = indexHtml.match(/<html[^>]*class="([^"]*)"/)?.[1] ?? "";

// 3. Images : redimensionnées et compressées (sips, macOS), puis intégrées.
const tmp = mkdtempSync(path.join(tmpdir(), "legion-"));
const assets = {};
for (const dir of ["archives", "portraits", "insignes", "brand"]) {
  for (const file of readdirSync(path.join(root, "public", dir))) {
    const src = path.join(root, "public", dir, file);
    if (!statSync(src).isFile()) continue;
    const isPng = file.endsWith(".png");
    const max = dir === "archives" ? (file.startsWith("hero") ? 1600 : 960) : 420;
    const dst = path.join(tmp, `${dir}-${file}`.replace(/\.\w+$/, isPng ? ".png" : ".jpg"));
    const args = ["-Z", String(max)];
    if (!isPng) args.push("-s", "format", "jpeg", "-s", "formatOptions", "68");
    execFileSync("sips", [...args, src, "--out", dst], { stdio: "ignore" });
    assets[`/${dir}/${file}`] = `data:${isPng ? "image/png" : "image/jpeg"};base64,${readFileSync(dst).toString("base64")}`;
  }
}
const favicon = assets["/brand/fanion-legion.png"];

// 4. Assemblage.
const html = `<!doctype html>
<html lang="fr" class="${htmlClass}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#262e36">
<title>Légion étrangère, une histoire depuis 1831</title>
<meta name="description" content="Une carte interactive pour découvrir, comprendre et transmettre l'histoire de la Légion étrangère.">
<link rel="icon" href="${favicon}">
<style>${css}</style>
</head>
<body class="min-h-svh">
<div id="root"></div>
<script>window.__ASSETS__=${JSON.stringify(assets)};</script>
<script>${js}</script>
</body>
</html>
`;
const target = path.join(dist, "legion-etrangere.html");
writeFileSync(target, html);
console.log(`${target} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} Mo)`);
