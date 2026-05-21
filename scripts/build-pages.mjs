import { spawnSync } from "node:child_process";
import { resolvePagesBasePath } from "./resolve-pages-base.mjs";

const basePath = resolvePagesBasePath();

console.log(`Building ebiz-site for GitHub Pages (BASE_PATH=${basePath})`);

const result = spawnSync(
  "pnpm",
  ["--filter", "@workspace/ebiz-site", "run", "build"],
  {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      BASE_PATH: basePath,
      GITHUB_PAGES: "true",
      NODE_ENV: "production",
    },
  },
);

process.exit(result.status ?? 1);
