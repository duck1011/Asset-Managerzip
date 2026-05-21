import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnamePath = path.join(repoRoot, "artifacts/ebiz-site/public/CNAME");

/**
 * GitHub Pages base path for Vite:
 * - "/" when a custom domain is configured (CNAME file or PAGES_CUSTOM_DOMAIN)
 * - "/<repo>/" for project pages (username.github.io/repo/)
 */
export function resolvePagesBasePath(options = {}) {
  const env = options.env ?? process.env;
  const explicit =
    options.basePath ??
    env.PAGES_BASE_PATH ??
    (env.GITHUB_ACTIONS === "true" ? env.BASE_PATH : undefined);

  if (explicit) {
    return normalizeBasePath(explicit);
  }

  if (env.PAGES_CUSTOM_DOMAIN?.trim()) {
    return "/";
  }

  if (existsSync(cnamePath)) {
    const domain = readFileSync(cnamePath, "utf8").trim();
    if (domain) {
      return "/";
    }
  }

  const repoName =
    env.GITHUB_REPOSITORY?.split("/")[1] ??
    env.PAGES_REPO_NAME ??
    options.repoName ??
    "Asset-Managerzip";

  return normalizeBasePath(`/${repoName}/`);
}

export function normalizeBasePath(basePath) {
  if (!basePath || basePath === "/") {
    return "/";
  }

  let normalized = basePath.startsWith("/") ? basePath : `/${basePath}`;
  if (!normalized.endsWith("/")) {
    normalized += "/";
  }

  return normalized;
}
