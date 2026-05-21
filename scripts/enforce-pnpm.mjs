import { rmSync } from "node:fs";

for (const file of ["package-lock.json", "yarn.lock"]) {
  try {
    rmSync(file);
  } catch {
    // ignore missing files
  }
}

const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.includes("pnpm/")) {
  console.error("Use pnpm instead of npm or yarn (see README.md).");
  process.exit(1);
}
