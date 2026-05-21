import { spawnSync } from "node:child_process";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(repoRoot, "artifacts/ebiz-site/dist/public");

const build = spawnSync("node", ["scripts/build-pages.mjs"], {
  cwd: repoRoot,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

if (!existsSync(path.join(distDir, "index.html"))) {
  console.error(`Missing build output: ${distDir}/index.html`);
  process.exit(1);
}

console.log(`Publishing ${distDir} to gh-pages branch...`);

const deploy = spawnSync(
  "pnpm",
  ["exec", "gh-pages", "-d", "artifacts/ebiz-site/dist/public", "-t", "true", "-m", "Deploy NorthSouth site"],
  {
    cwd: repoRoot,
    stdio: "inherit",
    shell: true,
    env: process.env,
  },
);

process.exit(deploy.status ?? 1);
