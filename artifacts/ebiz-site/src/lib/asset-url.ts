/** Prefix public asset paths with the Vite base URL (required for GitHub Pages subpaths). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
