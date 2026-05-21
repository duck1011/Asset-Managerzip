import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/** SPA fallback + Jekyll bypass for GitHub Pages artifact deploys. */
export function githubPagesPlugin(outDir: string): Plugin {
  return {
    name: "github-pages",
    apply: "build",
    closeBundle() {
      if (process.env.GITHUB_PAGES !== "true") {
        return;
      }

      const indexHtml = path.join(outDir, "index.html");
      if (!fs.existsSync(indexHtml)) {
        throw new Error(
          `GitHub Pages build failed: missing ${indexHtml}. Check vite build.outDir.`,
        );
      }

      fs.copyFileSync(indexHtml, path.join(outDir, "404.html"));
      fs.writeFileSync(path.join(outDir, ".nojekyll"), "\n");
    },
  };
}
