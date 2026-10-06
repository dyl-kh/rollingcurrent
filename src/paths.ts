/** Prefix an in-app path with Vite's base so links work on GitHub Pages. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (path.startsWith("/")) return `${base}${path}`;
  return `${base}/${path}`;
}

/** Location pathname with the deploy base removed (`/` or `/gallery`). */
export function appPathname(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let path = window.location.pathname;
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  return path.replace(/\/$/, "") || "/";
}
